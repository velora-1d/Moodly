## Tujuan
- Menambahkan popup akhir sesi di Level 3 (CBT Game) dengan ringkasan skor/akurasi/durasi dan visual bintang.
- Mengubah tombol level menjadi gaya "completed" setelah selesai bermain.
- Menulis hasil ke database secara idempoten: menyimpan completion, award XP, dan menghindari double-award.

## Perubahan UI
- File target: `resources/js/pages/mentoring/levels/level-3.tsx`.
- Tambah state untuk: `showSummary`, `summary`, `reportedComplete`.
- Tambah `Dialog` berisi:
  - Header gradien dengan badge "+XP".
  - Visual bintang (3 slot) diisi sesuai hasil.
  - Grid ringkas metrik: skor/akurasi/durasi.
  - Tombol: "Ulangi" (reset game) dan "Tutup" (kembali ke Mentoring).

## Deteksi Selesai Game
- Tambah callback `onComplete(payload)` di pembungkus Level 3.
- Modifikasi pemanggilan `<CBTGameContainer />` menjadi `<CBTGameContainer onComplete={onComplete} />`.
- Jika komponen belum mendukung callback:
  - Opsi A: Tambahkan `window.postMessage({ type: 'cbt-complete', payload })` dari dalam game; Level 3 mendengarkan `message`.
  - Opsi B: Emit custom event `document.dispatchEvent(new CustomEvent('cbt-complete', { detail: payload }))` lalu Level 3 menangkapnya.

## Award DB Idempoten
- Mengikuti pola Level 1 untuk idempoten:
  - Cek completion existing: `getCompletion(userId, levelId)` (lihat `resources/js/pages/mentoring/levels/useLevelState.ts:7–11`).
  - Hitung `stars` (misalnya: `accuracy >= 90 → 3`, `>= 70 → 2`, lainnya 1) dan `xp_award` (mis. 75 untuk Level 3 sesuai XP di Mentoring).
  - Insert/upsert `level_completions` dengan `onConflict: 'user_id,level_id'`.
  - Award `xp_events` hanya jika `xp_awarded` sebelumnya belum ada (hindari double-award).
- Tambah efek `reportedComplete` agar tidak menulis berulang saat state re-render.

## Sinkronisasi ke Mentoring
- Mentoring sudah mem-fetch `level_completions`; setelah popup ditutup/kembali ke `/mentoring`, level akan tampil sebagai "completed" dengan cek hijau + bintang dan animasi shrink berhenti untuk level tersebut.

## SQL Referensi
- Upsert completion (jalankan di SQL Editor tanpa placeholder jika perlu testing manual):
```sql
WITH lv AS (SELECT id FROM public.levels WHERE slug = 'pagi-yang-produktif')
INSERT INTO public.level_completions (user_id, level_id, stars, xp_awarded, completed_at)
SELECT 42, lv.id, 3, 75, now() FROM lv
ON CONFLICT (user_id, level_id)
DO UPDATE SET
  stars = GREATEST(public.level_completions.stars, EXCLUDED.stars),
  xp_awarded = public.level_completions.xp_awarded,
  completed_at = COALESCE(public.level_completions.completed_at, EXCLUDED.completed_at),
  updated_at = now();
```
- Award XP event sekali:
```sql
INSERT INTO public.xp_events (user_id, points, type, created_at)
SELECT 42, 75, 'level_complete', now()
WHERE NOT EXISTS (
  SELECT 1 FROM public.level_completions lc
  JOIN public.levels l ON l.id = lc.level_id
  WHERE lc.user_id = 42 AND l.slug = 'pagi-yang-produktif' AND lc.xp_awarded > 0
);
```

## Langkah Implementasi
1. Tambah state & Dialog popup di Level 3, meniru pola Level 1.
2. Tambah `onComplete` untuk menerima payload dari CBT game (score, accuracy, duration).
3. Implement `awardLevel3Completion(userId, payload)` yang:
   - Hitung `stars` dan `xp_award`.
   - `getCompletion → upsert completion → insert xp_events bila belum pernah`.
   - Set `reportedComplete = true` dan tampilkan popup.
4. Ubah `<CBTGameContainer />` agar memanggil `onComplete` atau emit event saat selesai.

## Validasi
- Selesaikan game → popup tampil dengan ringkasan.
- Reload `/mentoring` → level 3 tampil sebagai completed (cek hijau + bintang), non-completed tetap animasi.
- Award XP hanya sekali meski popup/halaman dibuka ulang.

Jika disetujui, saya akan menerapkan perubahan di Level 3 dan (jika perlu) menambah callback/event pada CBTGameContainer untuk mengirimkan payload penyelesaian game.