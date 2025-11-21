## Ruang Lingkup & Batasan
- Tidak mengubah tampilan visual (kelas Tailwind, layout, komponen UI tetap).
- Fokus pada perapihan internal, fungsionalitas tombol, dan optimasi performa.
- Hasilkan dokumentasi perubahan, laporan testing tombol, dan benchmark sebelum/sesudah.

## Gambaran Arsitektur (Konteks Eksekusi)
- Backend: Laravel + Inertia (routes di `routes/*.php`, shell di `resources/views/app.blade.php`).
- Frontend: Vite + React + TypeScript + Tailwind v4 (entri `resources/js/app.tsx`, SSR `resources/js/ssr.tsx`).
- Page resolver sudah lazy via `import.meta.glob('./pages/**/*.tsx')` di `resources/js/app.tsx:12-16`.
- Code-splitting rollup sudah diaktifkan untuk deps besar (`vite.config.ts:74-95`).

## 1) Pembersihan Kode
- Modul tidak terpakai:
  - Hapus `zustand` (tidak ada import di `resources/js`), pertahankan lainnya karena terpakai nyata (`@supabase/supabase-js`, `recharts`, `framer-motion`, Radix, `sonner`, `ziggy-js`, dll.).
- File tidak digunakan:
  - Buang halaman tidak ter-route di `resources/js/pages/` (mis. `welcome.tsx`, `duo_ref/**`) agar tidak ikut ter-glob sebagai page dan mengurangi total chunk.
  - Pertahankan folder `referensi/**` di luar jalur runtime; jika perlu, pindahkan ke lokasi arsip internal atau tandai exclude dalam tooling (tanpa sentuh UI).
- Struktur direktori:
  - Pertahankan pola wrapper `resources/js/components/ui/*` yang re-export ke `resources/js/components/components/ui/*` (mis. `resources/js/components/ui/input.tsx:1`) karena dipakai oleh alias `@/components`.
  - Rapikan alias tetap sesuai `vite.config.ts:44-51` (tanpa perubahan perilaku).

## 2) Fungsi Tombol: Pengujian & Perbaikan Bug
- Inventaris interaksi (contoh representatif):
  - Navigasi: header/top/bottom/sidebar (`resources/js/components/*nav*`, Link Inertia).
  - Aksi halaman: `dashboard.tsx` (mood, XP), `missions/index.tsx`, `mentoring/index.tsx` + `levels/*`, `profile/index.tsx` (friend actions), `shop/index.tsx` (cart), 2FA (`components/two-factor-*.tsx`).
- Rencana pengujian:
  - Tambahkan uji fungsional berbasis `vitest + @testing-library/react` untuk klik tombol/submit form tanpa mengubah UI runtime.
  - Buat matriks skenario: navigasi, aksi CRUD ringan (friends/mood), setup 2FA, kontrol mini-game level 1–3.
  - Jalankan uji manual tambahan untuk interaksi yang tergantung backend (Supabase / endpoint Laravel) dengan data stub jika env kosong.
- Perbaikan bug fungsional yang ditemukan:
  - Tambahkan `AbortController` pada `fetch(...)` yang panjang (mis. `resources/js/pages/profile/index.tsx:87-120`) untuk mencegah update state setelah unmount.
  - Pastikan tombol yang melakukan `fetch` menonaktifkan aksi ganda (debounce/disabled state) jika terdeteksi double-submit.

## 3) Optimasi Performa
- Analisis awal:
  - Besar deps utama sudah dipecah: `recharts`, `framer-motion`, `@radix-ui/*`, `supabase` (lihat `vite.config.ts:79-92`).
  - Image shim sudah default lazy (`resources/js/lib/next-image-shim.tsx:49`).
- Tindakan optimasi (tanpa ubah UI):
  - Pastikan `recharts` dan komponen chart di-load secara dinamis di halaman yang butuh (split per komponen berat).
  - Tinjau import `framer-motion` di halaman berat, pindahkan ke dynamic import jika hanya untuk animasi non-kritis di fold bawah.
  - Supabase: ganti agregasi client-side besar menjadi agregasi server-side PostgREST (mis. `points.sum()` di `profile/index.tsx` alih-alih menarik 10k baris) untuk menurunkan payload.
  - Aktifkan cancellation untuk request panjang (profil/dashboard) agar tidak ada work sia-sia ketika navigasi cepat.
  - Tinjau file image besar di `public/images/**` dan pastikan loading `lazy` via shim (tanpa ubah aset).
- Kompresi & build:
  - Pertahankan compress Brotli/Gzip (`vite-plugin-compression` di `vite.config.ts:32-41`).
  - Gunakan `bundle-visualizer.html` yang sudah dihasilkan untuk baseline & verifikasi.

## 4) Perbaikan Memory Leaks
- Tutup `AudioContext` pada unmount di Level 1 (`resources/js/pages/mentoring/levels/level-1.tsx`) dan bersihkan timer:
  - Tambah cleanup: `audioCtxRef.current?.close()` dan `clearTimeout/clearInterval` yang relevan.
- Tambah cleanup pada `setTimeout` one-shot di `mentoring/index.tsx` dan `two-factor-*` agar tidak memanggil `setState` setelah unmount.

## 5) Benchmark & Laporan
- Benchmark sebelum/sesudah:
  - Jalankan `npm run build` untuk ukuran bundle; dokumentasikan ukuran `dist` per chunk utama dan time-to-build.
  - Profil dev: ukur waktu navigasi pertama (dashboard/home) dan interaksi tombol utama menggunakan Performance panel.
  - Catat payload Supabase sebelum/sesudah agregasi.
- Laporan testing fungsi tombol:
  - Ekspor matriks uji (kasus, langkah, hasil) dan ringkas bug yang diperbaiki.
- Dokumentasi perubahan:
  - Daftar paket dihapus, file yang dibersihkan, perubahan internal (cleanup effect, cancellation, lazy import) dengan rujukan path.

## Verifikasi & Risiko
- Semua perubahan bersifat internal: tidak menyentuh kelas/konten yang memengaruhi tampilan.
- Uji snap-shot visual tidak dilakukan; fokus pada fungsionalitas klik & performa.
- Rollback aman: perubahan modular per-file, dapat dibalik jika perlu.

## Eksekusi Setelah Disetujui
1) Bersihkan dependency & pages tidak terpakai (hapus `zustand`, hapus `welcome.tsx` dan `pages/duo_ref/**`).
2) Tambah tests ringan untuk tombol kritikal dengan `vitest + @testing-library/react` (dev-only).
3) Implementasi optimasi (agregasi Supabase, dynamic import selektif, cancellation fetch).
4) Perbaiki cleanup `AudioContext` dan timer.
5) Jalankan benchmark sebelum/sesudah dan susun seluruh deliverables (dok perubahan, laporan testing, hasil benchmark).