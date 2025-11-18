## Tujuan
- Menyisakan hanya tampilan ringkasan selesai (seperti gambar) di halaman `'/mentoring/level/2'`.
- Menyatukan gaya dengan halaman-halaman lain (TopNav, background gradien, kontainer) agar konsisten.

## Perubahan Utama
1. Bungkus halaman Level 2 dengan `LevelLayout` untuk konsistensi:
   - `DashboardTopNav` di atas, background gradien, dan kontainer `max-w-7xl` mengikuti pola halaman mentoring lain.
2. Hapus seluruh logika permainan/playing state di `level-2.tsx`.
3. Tampilkan hanya komponen ringkasan selesai:
   - Judul “Excellent Work!”, subteks deskriptif.
   - Grid 4 kartu statistik: `Final Score`, `Best Streak`, `Accuracy`, `Avg Reaction` menggunakan `Card` shadcn dengan border lembut yang serasi.
   - Bagian “Achievements Unlocked” menampilkan `Badge` yang unlocked.
   - Tombol aksi `Play Again` (opsi: kembali ke mentoring agar alur terasa natural).
4. Data statistik dan achievements:
   - Ambil dari storage jika tersedia (opsional: `useLevelState` dapat membaca riwayat dari Supabase `level_sessions`/`level_completions`).
   - Jika tidak ada data, tampilkan nilai default 0/— sambil menjaga tampilan sama.

## File Terdampak
- `resources/js/pages/mentoring/levels/level-2.tsx` — refactor untuk hanya menampilkan ringkasan selesai, dibungkus `LevelLayout`.

## Verifikasi
- Buka `'/mentoring/level/2'` dan pastikan:
  - TopNav dan background konsisten.
  - Hanya ada tampilan ringkasan selesai yang responsif.
  - Tombol `Play Again` berfungsi (default: kembali ke `'/mentoring'`).

Jika disetujui, saya akan menerapkan perubahan ini dan memastikan tampilannya seragam dengan halaman lain.