## Tujuan
- Menambah fitur dan polish visual agar Level 1 lebih menarik, mudah digunakan, dan tetap konsisten dengan UI repo.
- Menjaga integrasi Supabase aman (hindari duplikasi sesi/completion) dan menyediakan ringkasan setelah selesai.

## Perubahan yang Diusulkan
1. Kontrol Pace & Auto-Guide
- Slider "Pace" (3–6 detik) untuk durasi inhale/exhale.
- Mode auto-guide: siklus otomatis (Inhale→Exhale) dengan tombol Start/Stop.

2. Audio & Aksesibilitas
- Toggle suara lembut (ding) saat pergantian fase (WebAudio), default off.
- Shortcuts: I (Inhale), E (Exhale), R (Reset), S (Start/Stop auto).

3. Persistensi Preferensi
- Simpan preferensi `pet`, `targetBreaths`, dan `pace` di `localStorage` (key per user+level).

4. Ringkasan Selesai
- Modal ringkasan: total breaths, best combo, durasi, bintang yang didapat.
- Tombol "Kembali ke Peta Mentoring".

5. Integrasi Supabase Aman
- Debounce completion (hindari multi-write ketika state re-render).
- Payload sesi meliputi `pace`, `autoGuide`, `bestStreak`.

6. Polish Visual
- Micro-animations pada tombol dan badges.
- Desain warna/gradasi mengikuti skema repo (shadcn + tailwind), tanpa mengubah layout global.

## Validasi
- Uji manual: pace/auto-guide, audio, keyboard, modal ringkasan.
- Cek insert/update di `level_sessions`, `level_completions`, `xp_events` via MCP PostgREST; fallback runtime bila MCP tidak tersedia.

## Hasil
- Level 1 menjadi lebih engaging, tetap konsisten, dan seluruh data terekam untuk tiap user secara aman.