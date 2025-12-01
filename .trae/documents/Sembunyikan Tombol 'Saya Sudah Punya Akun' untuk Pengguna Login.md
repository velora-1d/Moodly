## Rencana
- Deteksi status login dari `auth` via `usePage` (Inertia props) di landing/hero.
- Render tombol "Saya Sudah Punya Akun" hanya jika `auth?.user` tidak ada.
- Tidak mengubah tombol "Mulai Perjalanan".
- Verifikasi: pengguna login → tombol hilang; pengguna guest → tombol tampil.

## Implementasi
- Edit `resources/js/components/components/sections/hero-section.tsx`:
  - Import `usePage`.
  - Ambil `auth` dari props.
  - Bungkus render tombol kedua dengan kondisi `!auth?.user`.

Siap lanjut implementasi perubahan di file tersebut.