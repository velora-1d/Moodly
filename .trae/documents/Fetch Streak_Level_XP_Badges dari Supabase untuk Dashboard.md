## Ringkasan
- Ambil semua metrik dashboard dari Supabase: Streak, Level, Total XP, Badges.
- Tanpa mengubah mood tracker; Streak dihitung dari `mood_logs` seperti sekarang.
- Level/XP/Badges diambil dari sumber DB yang jelas dan efisien.

## Sumber Data
- Streak: `mood_logs` (sudah ada di kode) → hitung streak harian.
- XP & Level: agregasi dari `user_xp_events` (kolom: `amount`, `source`, `occurred_at`). Level default: `floor(total_points/50)+1` (bisa diubah mudah).
- Badges: hitung dari `user_achievements` (status `unlocked` atau `unlocked_at IS NOT NULL`).

## SQL (Jalankan di Supabase SQL Editor jika belum ada)
1) View kompatibel XP (jika belum dibuat):
```sql
DROP VIEW IF EXISTS public.xp_events;
CREATE OR REPLACE VIEW public.xp_events AS
SELECT id, user_id, amount AS points, source AS type, occurred_at AS created_at
FROM public.user_xp_events;
```
2) View agregat untuk dashboard (tanpa tabel baru, ringan dan up-to-date):
```sql
CREATE OR REPLACE VIEW public.dashboard_user_stats AS
SELECT
  u.id AS user_id,
  COALESCE(SUM(ux.amount), 0)                AS total_points,
  FLOOR(COALESCE(SUM(ux.amount),0) / 50) + 1 AS level,
  COALESCE((
    SELECT COUNT(*) FROM public.user_achievements ua
    WHERE ua.user_id = u.id
      AND (ua.status = 'unlocked' OR ua.unlocked_at IS NOT NULL)
  ), 0) AS badges_count
FROM public.users u
LEFT JOIN public.user_xp_events ux ON ux.user_id = u.id
GROUP BY u.id;
```
3) Indeks pendukung performa:
```sql
CREATE INDEX IF NOT EXISTS user_xp_events_user_occurred_idx ON public.user_xp_events (user_id, occurred_at);
CREATE INDEX IF NOT EXISTS user_achievements_user_idx ON public.user_achievements (user_id, status, unlocked_at);
CREATE UNIQUE INDEX IF NOT EXISTS mood_logs_user_date_unique ON public.mood_logs (user_id, date);
```
4) Opsi alternatif (jika ingin tabel materialized):
```sql
CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id integer PRIMARY KEY,
  level integer DEFAULT 1 NOT NULL,
  total_points integer DEFAULT 0 NOT NULL,
  badges_count integer DEFAULT 0 NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);
-- (bisa ditambah job/peristiwa untuk sinkronisasi)
```

## Perubahan Kode (frontend) – `resources/js/pages/dashboard.tsx`
- Tetap: Streak dihitung dari `mood_logs` (blok yang ada).
- Ganti pembacaan statistik dengan view baru (fallback jika kosong):
```ts
// Baca agregat dashboard dari view
const { data: agg } = await supabase
  .from("dashboard_user_stats")
  .select("level,total_points,badges_count")
  .eq("user_id", userId)
  .limit(1);
const row = Array.isArray(agg) ? agg[0] : null;
if (row) setStats({ level: row.level, totalPoints: row.total_points, badges: row.badges_count });
```
- Untuk XP harian (progress): tetap pakai `xp_events` (view kompatibel) dengan filter `created_at >= today` (sudah selaras di kode).
- Error/Loading: gunakan state yang sudah ditambahkan untuk tampilkan fallback bila data belum ada.

## Pengujian
- Masukkan 1–2 baris ke `user_xp_events` untuk salah satu `user_id` (mis. 16) dan verifikasi:
  - `SELECT * FROM public.xp_events WHERE user_id=16 ORDER BY created_at DESC LIMIT 5;`
  - `SELECT * FROM public.dashboard_user_stats WHERE user_id=16;`
- Buka Dashboard; nilai Level/XP/Badges ter-update. Streak tetap dari `mood_logs`.

Konfirmasi rencana ini. Setelah Anda konfirmasi, saya akan:
1) Memodifikasi `dashboard.tsx` untuk membaca dari `dashboard_user_stats`.
2) Menjaga jalur XP harian tetap pakai `xp_events` (view) dan write ke `user_xp_events`.
3) Menambah minimal guard/fallback bila data agregat belum tersedia.