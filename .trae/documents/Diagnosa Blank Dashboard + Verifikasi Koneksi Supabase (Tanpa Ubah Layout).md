## Masalah
- Vite hanya mengekspos env dengan prefix `VITE_` ke kode client. Jika `.env` memakai `SUPABASE_URL` dan `SUPABASE_ANON_KEY` tanpa prefix, `import.meta.env` akan `undefined` → koneksi Supabase gagal dan halaman bisa blank.

## Solusi Tanpa Ubah Layout
1. Update client Supabase agar mendukung kedua nama env:
   - Prioritas: `import.meta.env.VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY`.
   - Fallback: `import.meta.env.SUPABASE_URL`/`SUPABASE_ANON_KEY` diekspos lewat Vite `define`.
2. Ekspos env non-`VITE_` ke client di `vite.config.ts`:
   - Tambah `define: { 'import.meta.env.SUPABASE_URL': process.env.SUPABASE_URL, 'import.meta.env.SUPABASE_ANON_KEY': process.env.SUPABASE_ANON_KEY }` agar variabel tersedia di bundle.
3. Guard di dashboard tetap aktif untuk mencegah crash saat env kosong.
4. Verifikasi koneksi:
   - Build lalu buka `/dashboard`: UI tampil, mood popup simpan, emoji muncul di kalender, XP harian bertambah.

## Langkah Validasi
- Cek bahwa `SUPABASE_URL` dan `SUPABASE_ANON_KEY` terisi di `.env`.
- Jalankan build; uji fetch mood (`mood_logs`), XP (`xp_events`), dan stats (`user_stats`).
- Pastikan `auth.user.id` cocok dengan `user_id` di tabel Supabase.

## Catatan
- Tidak ada perubahan visual/markup pada dashboard; hanya wiring env agar koneksi DB berfungsi sesuai nama variabel yang Anda inginkan.