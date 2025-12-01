## Ringkasan Tujuan
- Melakukan audit komprehensif komponen dashboard yang membutuhkan data database.
- Verifikasi skema dan akses Supabase via MCP/PostgREST.
- Merancang perubahan skema (tanpa menyentuh mood tracker) dan integrasi di frontend.
- Menyusun rencana pengujian dan dokumentasi perubahan.

## Audit Komponen Dashboard
- Sumber file: `resources/js/pages/dashboard.tsx`
  - Client Supabase: `resources/js/lib/supabaseClient.ts:1-19` (env-based, fallback not_configured).
- Komponen dan kebutuhan data:
  - Kalender Mood & Streak
    - Query: `mood_logs` untuk `date, created_at, mood, label` → `dashboard.tsx:118–147`
    - Frekuensi: load awal + update saat pencatatan mood.
  - Daily XP Progress
    - Query: agregasi XP hari ini dari tabel event XP → `dashboard.tsx:152–159`
    - Frekuensi: load awal + setiap aksi XP bertambah.
  - Ringkasan Statistik (level, total points, badges)
    - Query: `user_stats` (1 baris per user) → `dashboard.tsx:161–169`
    - Frekuensi: load awal, jarang berubah.
  - Invite Teman via Email
    - Mutasi: insert ke `invites` → `dashboard.tsx:265–277`
    - Frekuensi: saat submit form.
  - Quick Actions & Navigasi
    - Tidak membutuhkan data DB (hanya link) → `dashboard.tsx:86–93`.
  - Mood Quick (modal)
    - Baca/Update/Insert ke `mood_logs` → `dashboard.tsx:174–227`.
    - Catatan: Sesuai instruksi, tidak ada modifikasi pada logika mood tracker.

## Verifikasi Akses Supabase via MCP
- PostgREST introspeksi:
  - `mood_logs` tersedia dan dapat dibaca (data terambil — valid).
  - `xp_events` TIDAK ditemukan; hint menyarankan `public.user_xp_events`.
  - `user_xp_events` tersedia (GET `limit=1` mengembalikan `[]`, tabel ada namun mungkin kosong).
  - `user_stats` TIDAK ditemukan (hint mengarah ke `public.users`, bukan yang dibutuhkan).
  - `invites` TIDAK ditemukan.
- Implikasi:
  - Kode dashboard saat ini mengacu ke `xp_events`, `user_stats`, `invites` yang belum konsisten dengan skema Supabase.

## Rekomendasi Skema Database (Tanpa Menyentuh Mood Tracker)
- Pertahankan `mood_logs` apa adanya; tambahkan indeks bila belum ada:
  - Index: `(user_id, date)` dan unique `(user_id, date)` untuk mencegah duplikasi harian.
- Event XP
  - Opsi A (disarankan): Selaraskan frontend ke nama `user_xp_events` (yang ada), kolom yang digunakan: `id, user_id, points, type, created_at`.
  - Opsi B: Buat view `xp_events` yang memetakan ke `user_xp_events` demi backward-compat.
  - Index: `(user_id, created_at)`, `(user_id, type)` untuk filter dan agregasi harian.
- Statistik Pengguna
  - Buat tabel `user_stats` dengan kolom: `user_id (PK/unique)`, `level int`, `total_points int`, `badges_count int`, `updated_at timestamptz`.
  - Index: unique `(user_id)`.
- Undangan Teman
  - Buat tabel `invites`: `id`, `inviter_user_id`, `email`, `created_at`, `status enum('pending','sent','failed') default 'pending'`.
  - Index: `(inviter_user_id, created_at)`, `(email)`.
- Kebijakan RLS (Row Level Security) untuk client (anon key):
  - `mood_logs`: read/write terbatas ke `user_id == auth.uid (map)` — saat ini `user_id` adalah numeric app user; jika tidak ada integrasi auth Supabase, tetap gunakan kebijakan berbasis kolom `user_id` yang dicocokkan dari sesi aplikasi.
  - `user_xp_events`: insert/read dibatasi `user_id` milik user.
  - `user_stats`: read terbatas ke `user_id` milik user; write via service role (server-side) bila diperlukan.
  - `invites`: insert/read dibatasi ke `inviter_user_id` milik user.

## Integrasi Frontend (Tanpa Mengubah Mood Tracker)
- Penyesuaian referensi tabel:
  - Ganti akses `xp_events` → `user_xp_events` di `dashboard.tsx:152, 218, 239`.
  - Tetap gunakan `mood_logs` (tidak diubah).
  - Tambahkan akses `user_stats` setelah tabel dibuat; fallback jika kosong: gunakan state default yang sudah ada (`stats`).
  - Tambahkan akses `invites` setelah tabel dibuat; form tetap sama, hanya endpoint yang konsisten.
- Error handling:
  - Standarisasi `try/catch` dengan toast yang ada; log error minimal (tanpa membocorkan detail).
  - Tambahkan guard `isSupabaseConfigured` (sudah ada) dan loading state per blok (spinner/skeleton untuk statistik & daily XP).
- Loading state:
  - `dailyXP`, `stats` dan kalender menampilkan skeleton saat `isLoading` per kelompok.
- Tidak ada perubahan pada komponen mood tracker dan logikanya.

## Pengujian
- Integritas data:
  - Verifikasi unique `(user_id, date)` pada `mood_logs` mencegah duplikasi.
  - Verifikasi agregasi XP harian dari `user_xp_events` cocok dengan progress bar.
  - Verifikasi `user_stats` 1 baris per user; fallback bekerja saat kosong.
  - Verifikasi insert ke `invites` berhasil dengan RLS aktif.
- Performa:
  - Uji query dengan filter `(user_id, created_at >= today)` pada `user_xp_events` — pastikan index digunakan.
  - Uji list mood bulanan — ukuran respons tetap ringan.
- Keamanan/RLS:
  - Uji akses dengan anon key (client) untuk operasi yang diizinkan.
  - Uji operasi write yang harusnya ditolak untuk user lain (negative tests).

## Dokumentasi
- Ringkasan perubahan skema: tabel baru, indeks, constraint, dan alasan.
- Catat penyesuaian nama tabel yang diacu oleh frontend (`user_xp_events`).
- Tidak ada perubahan pada mood tracker; tuliskan ini secara eksplisit.

## Langkah Eksekusi Setelah Disetujui
1. Buat/memperbarui skema Supabase: `user_stats`, `invites`, view `xp_events` (opsional), indeks & constraint.
2. Implementasikan RLS kebijakan untuk tabel terkait.
3. Modifikasi minimal di `dashboard.tsx` untuk menyelaraskan nama tabel (khusus `user_xp_events`) dan menambah loading/error handling.
4. Jalankan pengujian lokal dengan MCP (GET-only untuk verifikasi) dan staging write-tests menggunakan service role.
5. Dokumentasikan perubahan.

Konfirmasi rencana di atas. Setelah konfirmasi, saya akan mengeksekusi perubahan skema dan penyesuaian kode sesuai poin-poin yang ditetapkan.