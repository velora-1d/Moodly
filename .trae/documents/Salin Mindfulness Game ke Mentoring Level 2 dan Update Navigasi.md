## Ringkasan
- Menyalin isi file referensi “Mindfulness Focus Game” apa adanya ke halaman `'/mentoring/level/2'`.
- Mengubah tombol “lanjut ke level” di halaman `'/mentoring'` agar redirect ke `'/mentoring/level/2'`.
- Memastikan rute sudah valid dan halaman berfungsi identik.

## Sumber dan Tujuan
- Sumber: `referensi/fokus-positif-latihan-mindfulness/src/app/mindfulness-game/page.tsx`
- Tujuan: `resources/js/pages/mentoring/levels/level-2.tsx`
- Rute server: `routes/web.php` sudah memiliki `Route::get('mentoring/level/{id}', ...)` untuk id `1,2,3` dan me-render `mentoring/levels/level-{id}`.

## Implementasi
1. Salin penuh konten file sumber ke `resources/js/pages/mentoring/levels/level-2.tsx`:
   - Menjaga struktur dan UI persis sama (termasuk `"use client"`, state, logika game, animasi, komponen UI).
   - Impor `@/components/ui/*`, `framer-motion`, dan `lucide-react` dibiarkan sama—kompatibel dengan project saat ini.
   - Tidak membungkus dengan `LevelLayout`; konten dibuat identik sebagaimana di referensi.
2. Perbarui tombol “lanjut ke level” di halaman mentoring agar mengarah eksplisit ke level 2:
   - Lokasi: `resources/js/pages/mentoring/index.tsx:189-191`
   - Ubah `Link href={\`/mentoring/level/${currentLevel.id}\`}` menjadi `Link href="/mentoring/level/2"`.
   - Tidak mengubah tombol lain agar perilaku halaman tetap seperti sekarang selain CTA tengah.

## Verifikasi
- Jalankan aplikasi dan buka `'/mentoring'`.
- Klik tombol “Mulai Pelajaran” (CTA tengah) untuk memastikan redirect ke `'/mentoring/level/2'`.
- Di `'/mentoring/level/2'`, pastikan:
  - Area permainan tampil (“Mindfulness Focus Game”) dan dapat dimainkan.
  - Bar progres, animasi, feedback, dan achievements berfungsi.
  - Tombol “Play Again” mengulang permainan.

## Catatan Teknis
- Dependensi `framer-motion`, `lucide-react`, dan komponen UI sudah dipakai di codebase (aman untuk reuse).
- Rute untuk `'/mentoring/level/2'` sudah tersedia, jadi tidak perlu menambah route baru.

Silakan konfirmasi rencana ini. Setelah disetujui, saya akan melakukan perubahan dan menjalankan verifikasi end-to-end.