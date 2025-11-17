## Tujuan
- Terapkan game “Napas Tenang” dari `referensi/napas-tenang-game` ke halaman `mentoring/levels/level-1.tsx`.
- Ikuti seluruh logic permainan (phase inhale/exhale, breaths, combo streak, elapsed, pet selector, particle burst) dan sinkronkan dengan Supabase (session + completion + XP).
- Jaga konsistensi UI/UX sesuai codebase: gunakan `LevelLayout`, komponen UI yang sudah ada, dan gaya typography/padding yang seragam.

## Analisis Sumber
- Komponen asal: `src/components/BreathingGame.tsx` (Next style) memakai `Card`, `Button`, `Progress`, `Badge`, `framer-motion`.
- State/logic: `phase`, `breaths`, `targetBreaths`, `started`, `elapsed`, `burst`, `pet`, `streak`, `bestStreak`, `exhaleFx` + handlers `onInhale`, `onExhale`, `onReset`.
- UI: header dengan badges, guide circle dengan animasi, buddy (boat/balloon/cat), progress, controls, efek partikel.

## Integrasi ke Level-1
1. Struktur & Layout
- Bungkus permainan dengan `LevelLayout` untuk konsistensi header/nav.
- Pertahankan blok `CardHeader`, `CardContent`, `Progress`, `Badge` agar selaras dengan shadcn di repo.

2. Logic & State
- Porting state/handlers sepenuhnya: `phase`, `breaths`, `targetBreaths`, `started`, `elapsed`, `burst`, `pet`, `streak`, `bestStreak`, `exhaleFx`.
- Timer `elapsed` via `useEffect` ketika `started`.
- Efek animasi `ParticleBurst` dan `AnimatePresence` dipakai sama.

3. Supabase Integrasi (via useLevelState)
- `startSession(auth.user.id, 1)` saat pertama kali `started` berubah true (trigger di handler inhale/exhale jika sebelumnya false).
- Ketika `completed` (`breaths >= targetBreaths`), lakukan:
  - `endSession(userId, 1, payload: { breaths, targetBreaths, bestStreak }, durationMs: elapsed*1000)`
  - `complete(userId, 1, stars: aturan berikut, xp: 50)`
- Aturan bintang:
  - 3 bintang: selesai target tanpa reset dan `bestStreak >= 4`
  - 2 bintang: selesai target
  - 1 bintang: belum selesai (tidak memicu complete)

4. Konsistensi UI/UX
- Typography dan spacing mengikuti pola halaman lain (titles `text-xl`, description kecil, grid spacing `gap-6`).
- Warna gradien dan badges konsisten (variant `secondary` untuk status, `default` saat combo tinggi).
- Pet selector tombol `size="sm"`/`variant` seperti di referensi namun tetap shadcn.

5. Routing
- Rute sudah tersedia `GET mentoring/level/{id}` dan dibatasi ke `[1,2,3]`; tidak ada perubahan tambahan.

## Validasi
- Build dan buka `/mentoring/level/1`: permainan berjalan, inhale/exhale menaikkan breaths, combo dan efek muncul.
- Sesi/complete tercatat di Supabase, kembali ke `/mentoring` node level 1 menjadi completed dengan bintang.

## Deliverables
- `resources/js/pages/mentoring/levels/level-1.tsx` diperbarui dengan logic permainan napas tenang.
- Integrasi Supabase via `useLevelState` tetap utuh dan konsisten.