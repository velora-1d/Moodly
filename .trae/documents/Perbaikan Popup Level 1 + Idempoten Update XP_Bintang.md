## Tujuan
- Mempercantik popup akhir sesi Level 1 dengan ringkasan skor, bintang, dan XP yang didapat.
- Menulis ke database untuk memperbarui XP dan bintang secara idempoten (tanpa double-award).
- Mengubah tombol di halaman Mentoring: level yang selesai berubah ke gaya “completed”; yang belum selesai tetap animasi shrink/pulse.

## Perubahan UI (Level 1)
- File: `resources/js/pages/mentoring/levels/level-1.tsx`
- Di bagian `Dialog` yang tampil saat selesai:
  - Header yang kuat, warna gradien.
  - Grid ringkas: Breaths, Target, Best Streak, Durasi.
  - Komponen bintang (3 slot) yang diisi sesuai `summary.stars`.
  - Badge XP dengan angka XP yang didapat (mis. 50).
  - Tombol aksi: `Ulangi` (reset sesi) dan `Tutup` (menutup popup; navigasi/biarkan user kembali ke Mentoring).
- Style tetap mengikuti Tailwind yang ada di proyek (gradien ungu/pink, badge/Progress yang sama).

## Logika Penilaian & Award
- Saat sesi selesai (sudah ada di `useEffect`):
  - Hitung `stars` (contoh: `bestStreak >= 4 ? 3 : 2`, sudah ada di Level 1; bisa disesuaikan jika perlu).
  - `xp_award` konstan (mis. 50) atau berbasis performa; kita gunakan nilai konstan seperti saat ini.
  - Tampilkan ringkasan di popup.

## Tulis ke Database (Idempoten)
- Gunakan helper yang sudah ada: `useLevelState.ts` memiliki `getCompletion`, `startSession`, `endSession`, dan `complete`.
- Ubah alur agar idempoten:
  - Cek `getCompletion(userId, levelId)`.
  - Jika belum ada, lakukan insert completion + insert `xp_events`.
  - Jika sudah ada:
    - Update `stars` hanya jika nilai baru lebih tinggi (hindari penurunan bintang).
    - `xp_awarded`: bila kolom sudah ada (ada di helper), tambahkan `xp_events` hanya bila belum pernah diberi XP (atau award selisih bila ingin menambah). Paling aman: award XP hanya sekali saat pertama kali selesai.
  - Implementasi menggunakan `supabase.from('level_completions').upsert({...}, { onConflict: 'user_id,level_id' })` agar aman dari race/double-click.
- Tambahkan visual feedback (toast sukses) setelah award.

## Sinkronisasi Mentoring (Index)
- Sudah disesuaikan agar semua level non-completed dapat diakses, dan animasi pulse untuk non-completed.
- Setelah popup ditutup dan user kembali ke `/mentoring`, fetch mengubah status ke `completed` dan menampilkan cek hijau + bintang.

## Query SQL (Referensi)
- Upsert completion (langsung di SQL Editor tanpa placeholder):
```sql
WITH lv AS (SELECT id FROM public.levels WHERE slug = 'mengenal-diri')
INSERT INTO public.level_completions (user_id, level_id, stars, xp_awarded, completed_at)
SELECT 42, lv.id, 3, 50, now() FROM lv
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
SELECT 42, 50, 'level_complete', now()
WHERE NOT EXISTS (
  SELECT 1 FROM public.level_completions lc
  JOIN public.levels l ON l.id = lc.level_id
  WHERE lc.user_id = 42 AND l.slug = 'mengenal-diri' AND lc.xp_awarded > 0
);
```

## Implementasi Teknis (Langkah)
1. Perindah `DialogContent` di Level 1: header, grid metrik, komponen bintang, badge XP, tombol.
2. Tambahkan helper `awardLevelCompletion` di Level 1 yang:
   - Memanggil `getCompletion`.
   - Menentukan `stars` dan `xp_award`.
   - Menjalankan `upsert` completion idempoten.
   - Menulis `xp_events` hanya untuk award pertama.
3. Panggil helper di `useEffect` selesai sesi (gantikan atau lengkapi pemanggilan `complete`).
4. Pastikan state lokal `hasCompleted`/`summary` diupdate agar popup muncul dan Mentoring menandai `completed` saat kembali.

## Catatan
- Tidak mengubah layout, hanya logic dan UI popup.
- Menjaga aksesibilitas (semua informasi teks, warna kontras, tombol jelas).
- Jika ingin live update status di Mentoring tanpa kembali, bisa menambahkan event bus atau re-fetch setelah menutup popup; opsional.

Silakan konfirmasi, maka saya akan langsung menerapkan perubahan di file Level 1 dan helper sesuai rencana ini.