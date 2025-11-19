## Tujuan
- Menghapus landing/intro di `/mentoring/level/3` sehingga halaman langsung menampilkan "Choose Your Hero" dan setelah memilih avatar, langsung bermain.

## Implementasi
1. Ubah initial state game di `CBTGameContainer.tsx` dari `'intro'` menjadi `'avatar_selection'`.
2. Hilangkan komentar yang tidak perlu di file yang sama untuk mengikuti gaya kode.
3. Tidak mengubah alur pemilihan avatar—`handleAvatarSelect` sudah langsung mengatur state ke `'playing'`.

## Verifikasi
- Buka `/mentoring/level/3`: langsung muncul layar "Choose Your Hero" tanpa intro.
- Pilih avatar: game langsung masuk ke mode bermain.

Saya akan menerapkan perubahan ini sekarang.