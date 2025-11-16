## Tujuan
- Ekstrak navbar dari `/dashboard` menjadi komponen reusable.
- Gunakan komponen tersebut di halaman lain, dengan highlight aktif sesuai halaman.

## Sumber & Struktur
- Sumber navbar: `resources/js/pages/dashboard.tsx:170-211` (elemen `<nav>` + daftar quick actions).
- Tempat komponen baru: `resources/js/components/dashboard-top-nav.tsx` (sesuai pola komponen shared).

## API Komponen
- `DashboardTopNav`
  - Props opsional:
    - `items?: Array<{ href: string; icon: React.ComponentType<any>; label: string }>` — default memakai route helpers (`mentoring`, `leaderboard`, `missions`, `shop`, `profile`).
  - Highlight aktif: otomatis via `usePage().url` dibanding `href` (string path).
  - Menampilkan identitas user dari `usePage().props.auth.user.name`.

## Implementasi
1. Buat file `resources/js/components/dashboard-top-nav.tsx`:
   - Pindahkan JSX `<nav>` dari dashboard, jadikan komponen.
   - Ganti `quickActions` hard-coded menjadi parameterizable + highlight berbasis `usePage().url`.
   - Gunakan `Link` dari Inertia, `lucide-react` ikon, dan util Tailwind yang sama.
2. Update halaman `/dashboard`:
   - Hapus navbar inline, import dan gunakan `<DashboardTopNav />` di atas `<main>`.
3. Integrasi halaman lain:
   - `resources/js/pages/mentoring/index.tsx`: tempatkan `<DashboardTopNav />` di bagian paling atas (sebelum konten journey) agar konsisten.
   - `resources/js/pages/profile/index.tsx`, `missions/index.tsx`, `shop/index.tsx`, `leaderboard/index.tsx`: tambahkan `<DashboardTopNav />` sebelum konten utama.
4. Opsi AppLayout
   - Tambah prop `headerComponent?: ReactNode` di `AppLayout` (`resources/js/layouts/app-layout.tsx`).
   - Jika disediakan, render `headerComponent` menggantikan header default; halaman yang memakai `AppLayout` cukup kirim `<DashboardTopNav />` tanpa duplikasi header.

## Validasi
- Buka tiap halaman dan pastikan:
  - Navbar tampil identik, responsif, sticky top.
  - Item active tersorot sesuai halaman.
  - Navigasi antar halaman berfungsi dan state highlight mengikuti URL.

## Deliverables
- File komponen baru `dashboard-top-nav.tsx`.
- Perubahan di `dashboard.tsx` untuk memakai komponen.
- Integrasi pada halaman disebut di atas atau melalui `AppLayout` dengan prop `headerComponent`.
- Uji manual navigasi dan highlight aktif di semua halaman terkait.