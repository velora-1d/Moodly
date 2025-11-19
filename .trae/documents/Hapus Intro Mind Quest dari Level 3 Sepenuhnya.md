## Tujuan
- Menghapus tampilan landing/intro sepenuhnya dari `/mentoring/level/3` agar langsung ke pemilihan avatar lalu bermain.

## Implementasi
1. Ubah `handleRestart` di `CBTGameContainer.tsx` untuk kembali ke `avatar_selection` alih-alih `intro`.
2. Hapus blok render `gameState === 'intro'` sehingga halaman intro tidak pernah muncul.
3. Biarkan tipe state `GameState` dan fungsi lain tetap agar perubahan minimal dan aman.

## Verifikasi
- Buka `/mentoring/level/3`: langsung tampil “Choose Your Hero”.
- Setelah kemenangan atau game over dan memilih “Play Again”: kembali ke pemilihan avatar, tanpa intro.

Saya akan menerapkan perubahan sekarang.