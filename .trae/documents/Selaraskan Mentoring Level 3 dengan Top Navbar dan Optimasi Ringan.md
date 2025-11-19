## Tujuan
- Membuat `/mentoring/level/3` konsisten dengan halaman lain: memakai Top Navbar dan layout yang sama.
- Optimasi ringan agar halaman lebih cepat dan hemat resource.

## Perubahan yang Diusulkan
1. Bungkus halaman dengan `LevelLayout`:
   - Menambahkan Top Navbar (`DashboardTopNav`) dan background gradien seragam.
   - Menghapus overlay gambar Unsplash dan footer statis untuk mengurangi beban jaringan.
2. Lazy-load komponen game:
   - Menggunakan `React.lazy` + `Suspense` untuk `CBTGameContainer` agar initial bundle lebih kecil.
3. Optimasi gambar dan efek:
   - Menambahkan `loading="lazy"` pada `<img>` monster di `BattleEncounter.tsx`.
   - Menjadikan `canvas-confetti` di-load secara dinamis saat kemenangan (dynamic import) agar tidak membebani initial load.

## File Terdampak
- `resources/js/pages/mentoring/levels/level-3.tsx` — gunakan `LevelLayout`, hapus background/ footer, lazy-load game.
- `resources/js/components/cbt-game/BattleEncounter.tsx` — `loading="lazy"` untuk `<img>`.
- `resources/js/components/cbt-game/CBTGameContainer.tsx` — ubah `triggerConfetti` ke dynamic import.

## Verifikasi
- Buka `/mentoring/level/3` dan pastikan Top Navbar muncul, tampilan seragam.
- Mainkan game untuk memastikan fungsi tetap sama; saat kemenangan, konfeti tetap muncul meski di-load dinamis.

Jika disetujui, saya akan menerapkan perubahan tersebut dan memverifikasi performa serta fungsionalitas.