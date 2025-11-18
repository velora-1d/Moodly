## Tujuan
- Mengembalikan game latihan konsentrasi di `'/mentoring/level/2'` persis seperti versi referensi.
- Menjaga konsistensi tema dengan halaman lain menggunakan `LevelLayout` (TopNav, background, kontainer).

## Implementasi
1. Refactor `resources/js/pages/mentoring/levels/level-2.tsx`:
   - Mengembalikan seluruh state dan logika game: header, stats bar, progress, area permainan, feedback, completed summary, achievements, tombol Play Again.
   - Membungkus seluruh konten dengan `LevelLayout` agar selaras dengan halaman mentoring.
   - Memastikan kelas Tailwind konsisten (mis. `dark:bg-black/30`).
2. Tidak mengubah rute ataupun CTA di halaman mentoring; hanya memulihkan game di level 2.

## Verifikasi
- Buka `'/mentoring/level/2'` dan pastikan game tampil dan dapat dimainkan.
- Cek animasi feedback, bar progres, perhitungan skor, tampilan completed serta achievements.

Saya akan langsung menerapkan perubahan ini dan memverifikasi tampilannya.