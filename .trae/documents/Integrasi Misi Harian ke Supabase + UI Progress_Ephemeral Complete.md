## Target
- Fetch misi harian/mingguan dari database.
- Progress bertambah saat aksi (contoh: daily task, XP gained, streak).
- Saat misi lengkap, kartu menampilkan state “Selesai 1/1 100%” 2 detik lalu menghilang.
- Tidak mengubah mood tracker; hanya membaca datanya untuk misi terkait.

## Skema Database
### Tipe & Tabel
```sql
-- Reset period tipe
DO $$ BEGIN
  CREATE TYPE mission_reset_period AS ENUM ('daily','weekly');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Definisi misi
CREATE TABLE IF NOT EXISTS public.missions (
  id bigserial PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  icon_bg text NOT NULL,
  target_total integer NOT NULL,
  xp_reward integer NOT NULL,
  reset_period mission_reset_period NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  order_index integer DEFAULT 0 NOT NULL
);

-- Progress tersimpan (untuk misi berbasis manual/increment)
CREATE TABLE IF NOT EXISTS public.user_mission_progress (
  id bigserial PRIMARY KEY,
  user_id bigint NOT NULL,
  mission_id bigint NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
  period_key date NOT NULL,
  progress integer DEFAULT 0 NOT NULL,
  completed_at timestamptz,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE (user_id, mission_id, period_key)
);

-- Indeks
CREATE INDEX IF NOT EXISTS user_mission_progress_user_period_idx
  ON public.user_mission_progress (user_id, period_key);
```

### View Sumber Data
Gunakan sumber yang sudah ada agar progress otomatis bertambah tanpa menulis manual.
```sql
-- XP events kompatibel (jika belum)
DROP VIEW IF EXISTS public.xp_events;
CREATE OR REPLACE VIEW public.xp_events AS
SELECT id, user_id, amount AS points, source AS type, occurred_at AS created_at
FROM public.user_xp_events;

-- Misi terhitung otomatis (join definisi + progress harian)
CREATE OR REPLACE VIEW public.user_daily_missions AS
SELECT m.id AS mission_id, m.slug, m.title, m.description, m.icon, m.icon_bg,
       m.target_total, m.xp_reward, m.order_index,
       u.id AS user_id,
       COALESCE(mp.progress, 0) AS stored_progress,
       -- progress dihitung dari sumber terkait
       CASE m.slug
         WHEN 'daily_tasks' THEN (
           SELECT COUNT(*) FROM public.user_xp_events ux
           WHERE ux.user_id = u.id AND ux.source = 'daily_task'
             AND ux.occurred_at::date = current_date
         )
         WHEN 'gain_10_xp' THEN (
           SELECT COALESCE(SUM(points),0) FROM public.xp_events xe
           WHERE xe.user_id = u.id AND xe.created_at::date = current_date
         )
         WHEN 'reach_100_points' THEN (
           SELECT COALESCE(SUM(points),0) FROM public.xp_events xe
           WHERE xe.user_id = u.id AND xe.created_at::date = current_date
         )
         WHEN 'keep_streak' THEN (
           SELECT CASE WHEN EXISTS (
             SELECT 1 FROM public.mood_logs ml
             WHERE ml.user_id = u.id AND ml.date = current_date
           ) THEN 1 ELSE 0 END
         )
         ELSE COALESCE(mp.progress,0)
       END AS computed_progress,
       COALESCE(mp.completed_at, NULL) AS completed_at
FROM public.users u
CROSS JOIN public.missions m
LEFT JOIN public.user_mission_progress mp
  ON mp.user_id = u.id AND mp.mission_id = m.id AND mp.period_key = current_date
WHERE m.reset_period = 'daily' AND m.is_active = true;

-- Indeks pendukung
CREATE INDEX IF NOT EXISTS user_xp_events_user_occurred_idx
  ON public.user_xp_events (user_id, occurred_at);
CREATE UNIQUE INDEX IF NOT EXISTS mood_logs_user_date_unique
  ON public.mood_logs (user_id, date);
```

### Seed Misi Harian (opsional)
```sql
INSERT INTO public.missions (slug,title,description,icon,icon_bg,target_total,xp_reward,reset_period,order_index)
VALUES
('daily_tasks','Selesaikan 10 misi lagi hari ini','Target harian kamu untuk terus berkembang','🎯','from-purple-400 to-purple-600',10,50,'daily',1),
('gain_10_xp','Dapatkan 10 XP','Complete any lesson or exercise','⚡','from-yellow-400 to-orange-500',10,50,'daily',2),
('reach_100_points','Capai Target Harian','Reach 100 points in one day','🎯','from-blue-400 to-cyan-500',100,100,'daily',3),
('keep_streak','Jaga Streak-mu','Don\'t break your daily streak','🔥','from-orange-400 to-red-500',1,75,'daily',4)
ON CONFLICT (slug) DO NOTHING;
```

## Integrasi Frontend (rencana perubahan minimal)
- File: `resources/js/pages/missions/index.tsx`
- Tambah fetch Supabase:
  - Baca `user_daily_missions` untuk `user_id` aktif, urutkan `order_index`.
  - Map ke `MissionCard` props: `progress = computed_progress`, `total = target_total`, `xp = xp_reward`, `isCompleted = (computed_progress >= target_total || completed_at IS NOT NULL)`.
- Saat user menyelesaikan aksi (contoh tombol “Selesaikan” atau sistem mendeteksi kenaikan):
  - Untuk misi berbasis manual/increment (yang tidak computed), upsert ke `user_mission_progress` (naikkan `progress`, set `completed_at` jika mencapai `target_total`).
  - Untuk misi computed (contoh XP/streak), cukup refresh data; progress naik otomatis dari sumber (xp_events/mood_logs).
- State ephemeral “Selesai” 2 detik:
  - Setelah `isCompleted` terdeteksi, set state lokal kartu: `showComplete = true` → render badge “Selesai”, angka `1/1` dan `100%` bila total 1.
  - `setTimeout(() => setHidden(true), 2000)` untuk menyembunyikan kartu, atau ganti menjadi “claimed”/remove dari list.

## Contoh Upsert (untuk misi selain yang computed)
```ts
await supabase.from('user_mission_progress').upsert({
  user_id,
  mission_id,
  period_key: new Date().toISOString().slice(0,10),
  progress: current + 1,
  updated_at: new Date().toISOString(),
  completed_at: current + 1 >= target ? new Date().toISOString() : null,
}, { onConflict: 'user_id,mission_id,period_key' });
```

## Pengujian
- Tambah event: `INSERT INTO public.user_xp_events (user_id, amount, source, occurred_at) VALUES (16, 5, 'daily_task', now());` → periksa `user_daily_missions` progress.
- Catat mood hari ini → misi streak menjadi 1/1.
- Verifikasi UI: kartu menunjukkan “Selesai” → hilang setelah 2 detik.

## Keamanan
- Terapkan RLS read/write sesuai tabel:
  - `user_mission_progress`: akses hanya baris dengan `user_id` milik user.
  - View hanya read; write ke tabel sumber (`user_xp_events`, `user_mission_progress`).

Silakan jalankan SQL di atas. Setelah konfirmasi, saya akan menghubungkan `missions/index.tsx` ke view `user_daily_missions`, menambahkan upsert untuk misi non-computed, serta UI ephemeral complete 2 detik.