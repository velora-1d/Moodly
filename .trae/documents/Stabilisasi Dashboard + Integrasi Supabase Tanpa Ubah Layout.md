## Tujuan
- Mengatasi halaman `/dashboard` yang blank dengan menstabilkan logika fetch/insert.
- Integrasi penuh ke Supabase (mood logs, XP events, user stats, invites) tanpa mengubah layout/markup visual.

## Diagnosis & Perlindungan
1. Tambahkan guard `isSupabaseConfigured` (cek `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`). Jika tidak terkonfigurasi, lewati fetch agar tidak terjadi error runtime.
2. Bungkus semua operasi Supabase (`select/insert/update`) dalam `try/catch` dan abaikan error dengan fallback state aman. Tampilkan `toast.error` non-blocking.
3. Pastikan `auth.user?.id` ada; jika tidak, render UI dan skip fetch.

## Integrasi Data Tanpa Ubah Layout
1. Mood Tracker
   - Load: `select date, created_at, mood, label from mood_logs where user_id = :id order by created_at asc`
   - Upsert: cek baris per `user_id+date`, lalu `update` atau `insert`; tutup popup, sinkronkan emoji kalender.
   - Streak: hitung dari `moodHistory` berurutan mundur mulai hari ini.
2. XP Harian
   - Load: jumlah `points` dari `xp_events` untuk hari ini.
   - Aksi “Kerjakan”: `insert xp_events (points=2, type='daily_task')`, kemudian update angka progress tanpa mengubah UI.
3. Achievements
   - Opsional load dari `user_stats (level, total_points, badges_count)`; jika data tidak ada, fallback ke nilai default agar UI tetap tampil.
4. Undang Teman
   - Submit: `insert invites (inviter_user_id, email, created_at)`, toast sukses.

## Verifikasi
- Build dan uji `/dashboard`: tidak blank; semua komponen tampil.
- Simpan mood: tersimpan/terupdate; popup tertutup; emoji tampil di kalender.
- “Kerjakan”: XP bertambah dan disimpan.
- Achievements: tampil sesuai data (fallback jika tabel kosong).

## Catatan
- Tidak ada perubahan pada struktur/markup UI; hanya menambah logika defensif dan integrasi Supabase.
- Jika ada error MCP PostgREST, tetap gunakan Supabase client yang sudah terpasang di project untuk eksekusi di runtime aplikasi.