## Tujuan
- Semua level dapat diakses oleh pemain baru (tidak hilang/terkunci).
- Level yang belum selesai tetap tampil dengan animasi shrink/pulse seperti "Pagi yang Produktif".
- Saat pemain menyelesaikan level, tombol otomatis berubah ke gaya "selesai" (cek hijau + bintang) berdasarkan data database.

## Data & SQL
- Tabel yang dipakai: `levels` dan `level_completions` (sudah Anda isi).
- Upsert penyelesaian:
  - SQL fungsi opsional:
    ```sql
    CREATE OR REPLACE FUNCTION public.upsert_level_completion(p_user_id integer, p_level_id integer, p_stars smallint)
    RETURNS void LANGUAGE sql AS $$
    INSERT INTO public.level_completions (user_id, level_id, stars, completed_at)
    VALUES (p_user_id, p_level_id, p_stars, CASE WHEN p_stars > 0 THEN now() ELSE NULL END)
    ON CONFLICT (user_id, level_id)
    DO UPDATE SET
      stars = EXCLUDED.stars,
      completed_at = CASE WHEN EXCLUDED.stars > 0 THEN now() ELSE public.level_completions.completed_at END,
      updated_at = now();
    $$;
    ```
  - Dari aplikasi (supabase-js) akan dipakai `.upsert({ user_id, level_id, stars, completed_at })` dengan `onConflict: 'user_id,level_id'` untuk idempoten.

## Perubahan UI Mentoring
- File: `resources/js/pages/mentoring/index.tsx`.
- Fetch data tetap: join `levels` dengan `level_completions` untuk user aktif (sudah ada).
- Mapping status:
  - Saat ini: non-completed => `locked`. Diubah menjadi: non-completed => `current` (animasi shrink/pulse) dan tetap bisa diakses.
  - Completed (stars > 0) => `completed` (cek hijau + bintang).
- Rendering grid level:
  - Hilangkan cabang `locked` yang menampilkan ikon kunci.
  - Semua level render sebagai `Link` ke `/mentoring/level/{id}`.
  - Tambahkan animasi pulse untuk semua level yang `status !== 'completed'` (efek ring shrink seperti sekarang).

## Trigger Auto-Complete per Level
- Level 1 (`resources/js/pages/mentoring/levels/level-1.tsx`):
  - Kondisi selesai: `breaths >= targetBreaths`.
  - Implementasi: di `useEffect` yang memonitor `breaths`, ketika mencapai target:
    - Panggil helper `markLevelCompleted(userId, 1, stars)`.
    - `stars` dapat ditentukan dari performa (mis. `bestStreak` atau mencapai target penuh => 3 bintang).
- Level 2 (`resources/js/pages/mentoring/levels/level-2.tsx`):
  - Kondisi selesai: `round >= totalRounds` atau `gameState === 'completed'`.
  - Implementasi: di `useEffect` yang memonitor akhir permainan:
    - Panggil `markLevelCompleted(userId, 2, stars)`, misalnya berdasarkan `accuracy`.
- Level 3 (`resources/js/pages/mentoring/levels/level-3.tsx`):
  - Jika `CBTGameContainer` memberi sinyal end-of-game, tambahkan callback atau `postMessage` untuk memicu `markLevelCompleted(userId, 3, stars)`.

## Helper Client
- Tambah util `markLevelCompleted(userId: number, levelId: number, stars: number)`:
  - Menggunakan `supabase.from('level_completions').upsert(..., { onConflict: 'user_id,level_id' })`.
  - Idempoten, aman dari double-register.
  - Setelah sukses, tampilkan `toast.success` dan (opsional) update state lokal agar UI berubah tanpa reload.

## Validasi & UX
- Mentoring page sudah memuat ulang status dari DB saat mount; setelah selesai level, UI akan konsisten setelah kembali ke halaman Mentoring.
- Bila ingin live update, dapat memanggil re-fetch state pada saat sukses upsert.
- Animasi: gunakan ring pulse untuk semua non-completed; completed menampilkan cek hijau + bintang sesuai `stars`.

## Dampak Kode
- Update mapping status di Mentoring (1 file), tambah helper upsert (util kecil), dan menambahkan efek trigger di 2 file level (Level1, Level2). Tidak mengubah layout, hanya logic dan animasi seperti permintaan.

## Konfirmasi
- Jika disetujui, saya akan mengimplementasikan:
  - Mapping status agar semua level aksesibel dan animasi untuk non-completed.
  - Helper `markLevelCompleted`.
  - Trigger di Level1 & Level2 untuk menandai penyelesaian dan mengubah tombol ke gaya selesai.
