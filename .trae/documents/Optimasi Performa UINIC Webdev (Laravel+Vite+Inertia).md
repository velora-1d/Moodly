## Ringkasan Arsitektur Saat Ini
- Bundler: Vite dengan `laravel-vite-plugin`, React, Tailwind, precompression Brotli/Gzip (`vite.config.ts`)
- Entrypoint: `resources/js/app.tsx` (client), `resources/js/ssr.tsx` (SSR), CSS `resources/css/app.css`
- Shell: `resources/views/app.blade.php`
- Aset: `public/images/**`, favicon/logo di `public/*`
- Caching: kuat via `public/.htaccess` (Cache-Control immutable, precompressed `.br`/`.gz`)
- Lazy-loading: belum ada `dynamic import`/`React.lazy` di `resources/**/*.{ts,tsx}`
- Image helper: alias `next/image` → `resources/js/lib/next-image-shim.tsx`

## Fase 1: Audit & Analisis
1. Jalankan Lighthouse (Mobile & Desktop) pada halaman utama dan halaman berat (mentoring, dashboard). Simpan skor LCP/CLS/TBT/TTI.
2. Gunakan Chrome DevTools Coverage untuk mendeteksi CSS/JS tak terpakai.
3. Tambah analisis bundle dengan visualizer:
   - Tambahkan `vite-plugin-visualizer` untuk treemap ukuran vendor/chunk.
4. Inventaris library aktual dari `package.json` dan impor nyata di `resources/js/**`.
5. Identifikasi kandidat berat dan jarang dipakai: `recharts`, `framer-motion`, `@radix-ui/*` tertentu, ikon `lucide-react`, `@supabase/supabase-js` (client-only use).
6. Catat komponen yang memuat aset eksternal (CloudFront/Supabase) untuk evaluasi preconnect/CDN.

## Fase 2: Optimasi Library
1. Hapus library yang tidak terpakai hasil audit.
2. Ganti library besar bila memenuhi kebutuhan:
   - Grafik: jika kebutuhan sederhana → pertimbangkan `uPlot` atau tetap `recharts` tetapi di-lazy-load.
   - Animasi ringan: pertimbangkan `motion-one` (lebih kecil) atau pertahankan `framer-motion` dengan lazy-load.
3. Impor ikon `lucide-react` secara per-ikon, hindari impor massal.
4. Pastikan hanya subpaket `@radix-ui/*` yang dipakai.

## Fase 3: Code Splitting
1. Terapkan `React.lazy`/`@loadable/component` pada komponen berat (grafik, editor, animasi, modul auth Supabase) dengan `Suspense` fallback ringan.
2. Split per-rute Inertia: pastikan halaman besar dimuat via dynamic import.
3. Atur vendor-split di `vite.config.ts` menggunakan `build.rollupOptions.output.manualChunks` untuk memisah: `recharts`, `framer-motion`, `@radix-ui`, `@supabase/supabase-js`.
4. Verifikasi `cssCodeSplit` aktif dan tidak ada CSS global besar yang ikut semua halaman.

## Fase 4: Optimasi Aset
1. Konversi gambar lokal prioritas (hero/banner/logo besar di `public/images/**`) ke WebP/AVIF; simpan fallback JPG/PNG bila perlu.
2. Update `resources/js/lib/next-image-shim.tsx` untuk default `loading="lazy"`, `decoding="async"`, dan dukungan `sizes/srcset` responsif.
3. Terapkan lazy loading dan ukuran responsif pada komponen yang memakai gambar:
   - `resources/js/components/components/sections/hero-section.tsx`
   - `resources/js/pages/mentoring/components/sections/hero-banner.tsx`
   - `resources/js/pages/mentoring/components/sections/trusted-logos.tsx`
4. Review `resources/css/app.css` untuk CSS kustom tidak terpakai. Pastikan Tailwind v4 menghasilkan CSS minimal.
5. Minify sudah dilakukan oleh Vite; verifikasi hasil build.

## Fase 5: Peningkatan Performa
1. Caching: gunakan konfigurasi `public/.htaccess` yang sudah ada; pastikan HTML tidak di-cache lama.
2. Critical Rendering Path:
   - Pertimbangkan inline critical CSS untuk above-the-fold di `resources/views/app.blade.php` atau preload CSS utama.
   - Preload font penting (`woff2`) jika ada.
3. Tambahkan `link rel="preconnect"`/`dns-prefetch` untuk origin eksternal yang sering dipakai: `cloudfront.net`, `supabase.co` di `app.blade.php`.
4. Opsional: tambahkan `vite-plugin-pwa` untuk cache aset statis dan offline ringan.

## Fase 6: CDN
1. Jika belum, konfigurasi CDN untuk aset build:
   - Set `.env ASSET_URL` dan `vite.config.ts` `base` ke domain CDN.
   - Pastikan upload hasil `public/build` ke CDN dan header cache sesuai.
2. Validasi rujukan aset di Blade dan Inertia memakai helper yang menghormati `ASSET_URL`.

## Fase 7: Testing & Validasi
1. Uji performa sebelum/sesudah: Lighthouse, WebPageTest (opsional), Catat Web Vitals (LCP/CLS/FID/TBT/TTI). Buat tabel komparatif.
2. Sanity/E2E: jalankan skenario utama (navigasi, auth, grafik, formulir) untuk memastikan tidak ada fungsi rusak setelah penghapusan/lazy-load.
3. Verifikasi SSR Inertia tetap berfungsi dengan `React.lazy` boundary dan fallback.
4. Monitoring pasca-deploy: aktifkan pengukuran Web Vitals (mis. `web-vitals` lib) dan log ke analytics/telemetri.

## Fase 8: Backup & Staging
1. Buat branch kerja `perf-optimization` dan backup aset besar (`public/images`) ke arsip.
2. Deploy ke lingkungan staging; verifikasi precompression `.br/.gz` dan header cache (`public/.htaccess`).
3. Setelah lulus validasi, merge melalui PR; siap rollback jika ada regresi.

## Perubahan File Terarah (Untuk Implementasi Nanti)
- `vite.config.ts`: tambah `vite-plugin-visualizer`, atur `manualChunks`, pastikan kompresi sesuai ambang.
- `resources/js/lib/next-image-shim.tsx`: set default lazy/async + dukungan `sizes/srcset`.
- Komponen gambar (hero/banner/logo): update atribut `sizes/srcset` dan pastikan `loading="lazy"`.
- `resources/views/app.blade.php`: tambahkan `preconnect`/`dns-prefetch`, optional preload font/CSS, optional inline critical CSS.
- `package.json`: hapus dependensi tidak terpakai, tambah analyzer/PWA bila dipilih.

## Deliverables
- Laporan audit (Lighthouse + Coverage + visualizer treemap)
- Diff perubahan (PR) terstruktur per fase
- Grafik bundle visualizer (HTML)
- Hasil uji sebelum/sesudah dan ringkasan pengurangan ukuran/latensi