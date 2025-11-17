## Tujuan
- Membuat halaman gamifikasi baru untuk tiap level di `/mentoring` (6 level) yang berfokus pada penurunan stres (breathing, mindfulness, routine, reframing, sleep, positive energy).
- Menghubungkan ke Supabase per user agar status tombol di peta mentoring akurat: belum dikerjakan vs sudah selesai.

## Skema Data Supabase
- `mentoring_levels(id, slug, title, category, xp_reward, ord)` – metadata level (seed awal)
- `level_sessions(id, user_id, level_id, started_at, ended_at, duration_ms, payload jsonb)` – log sesi latihan
- `level_completions(id, user_id, level_id, completed_at, stars int, xp_awarded int)` – status selesai + bintang
- `xp_events(user_id, points, type, created_at)` – gunakan untuk reward XP: `level_session`, `level_complete`
- RLS: read/write hanya untuk baris dengan `user_id` sama

## Halaman & Rute
- Laravel routes:
  - `GET /mentoring/level/{id}` → render Inertia `mentoring/levels/level-{id}`
  - Opsional slug: `GET /mentoring/{slug}` map ke level id
- Frontend React (Inertia):
  - `resources/js/pages/mentoring/levels/level-1.tsx` – Box Breathing (4–4–4–4, 4 siklus)
  - `level-2.tsx` – Mindfulness Timer (5–10 menit + prompt)
  - `level-3.tsx` – Morning Routine Checklist (5 item)
  - `level-4.tsx` – Stress Reframing (CBT thought record)
  - `level-5.tsx` – Sleep Wind-down (2 dari 3 aktivitas)
  - `level-6.tsx` – Positive Energy (3 gratitude + affirmations)
  - Shared: `mentoring/levels/LevelLayout.tsx`, `mentoring/levels/useLevelState.ts`

## Hook Integrasi (`useLevelState(levelId)`) 
- `getCompletion()` → `level_completions` satu baris user+level
- `getSessionHistory()` → last 10 dari `level_sessions`
- `startSession()` → insert `level_sessions.started_at`
- `endSession(payload)` → update sesi + insert `xp_events(type='level_session')`
- `complete(stars)` → insert `level_completions` + `xp_events(type='level_complete', points=mentoring_levels.xp_reward)`

## Peta Mentoring (Status Tombol)
- Pada `resources/js/pages/mentoring/index.tsx`:
  - Fetch `level_completions` untuk semua `level_id` user
  - Node `completed` menampilkan bintang dari DB; `current` ditentukan dari level berikutnya yang belum selesai; `locked` jika prasyarat belum
  - Tombol diarahkan ke `/mentoring/level/{id}` dan label menyesuaikan: "Mulai Pelajaran" atau "Ulangi Pelajaran"

## Validasi & MCP
- Verifikasi tabel dengan MCP PostgREST:
  - GET `mentoring_levels?select=id,slug,title,category,xp_reward,ord`
  - GET `level_completions?user_id=eq.<uid>&select=level_id,stars,completed_at`
  - GET `level_sessions?user_id=eq.<uid>&select=level_id,started_at,ended_at`
  - GET `xp_events?user_id=eq.<uid>&select=points,type,created_at`
- Jika MCP gagal, cek env dan jalankan build/dev; fallback menguji fetch runtime.

## Keamanan & UX
- Tidak mengubah layout global; komponen baru mengikuti UI yang ada.
- Guard Supabase env (`SUPABASE_URL`, `SUPABASE_ANON_KEY`/`VITE_*`) di semua operasi; UI tetap render jika DB tidak tersedia.

## Langkah Eksekusi
1. Buat skema tabel (atau gunakan yang ada jika sudah dibuat) dan RLS
2. Tambah route Laravel untuk level
3. Implement `LevelLayout`, `useLevelState`, dan halaman `level-1..6`
4. Update peta mentoring untuk pakai status real dari `level_completions`
5. Validasi end-to-end per user, termasuk XP dan bintang

## Deliverables
- 6 halaman level fungsional + hook integrasi Supabase
- Status peta mentoring akurat dari database
- Uji MCP PostgREST yang menunjukkan data terbaca/tersimpan per user