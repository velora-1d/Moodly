## Tujuan
- Menggantikan seluruh konten di route `/mentoring` dengan halaman dari `referensi/mental-health-journey-levels`, menyalin UI/UX dan interaksi secara identik.
- Memastikan semua fitur (animasi, modal, progress, badge, ikon) berfungsi di lingkungan Laravel+Vite+Inertia tanpa perubahan visual/behavior.

## Inventaris Sumber
- Sumber baru:
  - `referensi/mental-health-journey-levels/src/app/game-journey/page.tsx` (halaman utama journey)
  - `referensi/mental-health-journey-levels/src/app/page.tsx` (redirect ke `/game-journey`)
- UI yang dipakai di sumber:
  - `Button`, `Progress`, `Badge`, `Card` → tersedia di project utama: `resources/js/components/ui/{button,progress,badge,card}.tsx`
  - Ikon: `lucide-react` (sudah ada)
  - Animasi: `framer-motion` (sudah ada)

## Strategi Integrasi
- Render konten `GameJourney` langsung di `/mentoring` untuk menjaga kesederhanaan (tanpa membuat route baru `/mentoring/game-journey`).
- Tidak menggunakan `AppLayout` agar tampilan 1:1 sesuai sumber (header gradient, layout penuh layar, dll). Jika dibutuhkan breadcrumb nantinya, akan ditambahkan opsional tanpa mengubah tampilan inti.
- Menjaga nama komponen dan struktur class Tailwind persis seperti di sumber.

## Implementasi (File-Level)
1. `resources/js/pages/mentoring/index.tsx`
   - Ganti konten lama (HeroBanner, CourseCurriculum, Footer) dengan implementasi `GameJourneyPage` dari sumber.
   - Impor: `framer-motion`, `lucide-react`, `@/components/ui/{button,progress,badge,card}`.
   - Porting logika state: `selectedLevel`, `showAchievement`, fungsi `handleLevelClick`, `generatePath`, `positions`, `levels`.
   - Pastikan JSX dan Tailwind class identik.
2. (Opsional) Simpan komponen hasil porting dalam subfolder `pages/mentoring/components` bila ingin rapih; namun untuk menjaga “copas” identik, boleh inline di `index.tsx`.
3. Jangan mengubah route backend; tetap gunakan `/mentoring` yang sudah ada (cek `resources/js/routes/index.ts:352-418`).

## Validasi Fungsi
- Interaksi node: klik level membuka modal; status `locked/current/completed` berperilaku sesuai.
- Animasi: munculnya node, badge, tooltip, popup achievement.
- Progress: perhitungan progress dan XP berjalan.
- Tampilan: header gradient, path zigzag SVG, posisi node identik.

## Testing
- Dev run: buka `/mentoring` di dev server dan uji manual semua interaksi.
- SSR: verifikasi halaman ter-render baik tanpa `AppLayout` dan tidak ada error Inertia.
- Responsif: cek tampilan pada viewport mobile/desktop.

## Deliverables
- Perubahan satu file `resources/js/pages/mentoring/index.tsx` yang berisi porting penuh.
- Catatan uji fungsi dan screenshot (opsional).

## Catatan
- Tidak menyalin file `src/app/page.tsx` (redirect) karena kita langsung menampilkan journey di `/mentoring`.
- Jika Anda membutuhkan route terpisah seperti sumber (`/game-journey`), saya siapkan opsi B: tambah route di Laravel (`routes/web.php`) dan generator Wayfinder, lalu `mentoring` meng-redirect ke `/mentoring/game-journey`. Ini opsional dan hanya jika Anda minta.