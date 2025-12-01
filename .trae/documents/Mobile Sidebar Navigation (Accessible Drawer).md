## Tujuan
- Mengaktifkan panel navigasi mobile dengan drawer kiri, overlay, dan fokus-trap.
- Mempertahankan sidebar persisten di desktop (≥1024px) dan konten utama tetap.
- Output satu contoh mandiri dapat di-copy-paste, dengan komentar pada bagian kunci.

## Implementasi
- Teknologi: Vanilla HTML/CSS/JS (mobile-first) untuk portabilitas tinggi.
- Struktur: header (app bar), nav (sidebar), main (konten). Sidebar sebagai overlay di mobile, fixed di desktop.
- Perilaku:
  - Toggle lewat tombol hamburger; close via overlay, tombol close, Escape.
  - Lock scroll body saat drawer terbuka.
  - Fokus-trap di drawer saat terbuka.
- Navigasi:
  - Menu dibangun dari array JS `{id,label,icon,href,section}`.
  - Menandai item aktif berdasarkan `currentPath`.
- Styling/UX:
  - CSS variables untuk warna/spasi; transisi halus; state aktif dengan background, border kiri, teks bold.

## Output
- Berikan satu file HTML berisi CSS/JS inline, lengkap dengan komentar dan siap jalan.