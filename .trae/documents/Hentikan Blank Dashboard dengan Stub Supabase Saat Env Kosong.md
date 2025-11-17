## Masalah
- Client Supabase dibuat saat import. Jika `SUPABASE_URL`/`ANON_KEY` kosong, pembuatan client gagal di waktu import dan halaman menjadi blank sebelum UI bisa render.

## Solusi
- Ubah `resources/js/lib/supabaseClient.ts` agar ketika env kosong, mengekspor stub yang aman: `from().eq().order().limit().gte().select()/insert()/update()` mengembalikan Promise dengan error status, bukan melempar exception.
- Tidak mengubah layout atau komponen lain.

## Langkah
1. Deteksi env: baca `VITE_SUPABASE_*` dan fallback ke `SUPABASE_*`.
2. Jika ada, buat client seperti biasa; jika tidak ada, ekspor stub dengan builder chaining kompatibel.
3. Build dan verifikasi `/dashboard` tidak blank; operasi Supabase akan diabaikan oleh guard dan UI tetap tampil.

## Validasi
- Tanpa env, halaman tetap tampil dan dialog/kalender tidak crash.
- Dengan env yang benar, memakai client asli dan semua fitur database berjalan seperti sebelumnya.