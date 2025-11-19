## Ringkasan
- Menyalin seluruh kode game CBT dari referensi ke halaman `'/mentoring/level/3'` tanpa perubahan.
- Menambahkan komponen dan data pendukung ke project agar import `@/components/cbt-game/*` dan `@/lib/cbt-game-data` bekerja.
- Memastikan tombol level ketiga di halaman `'/mentoring'` sudah redirect ke `'/mentoring/level/3'` (link dinamis sudah ada).

## Sumber → Tujuan
- Sumber:
  - `referensi/cbt-game-conquer-negative-thoughts/src/app/page.tsx`
  - `referensi/cbt-game-conquer-negative-thoughts/src/components/cbt-game/CBTGameContainer.tsx`
  - `referensi/cbt-game-conquer-negative-thoughts/src/components/cbt-game/BattleEncounter.tsx`
  - `referensi/cbt-game-conquer-negative-thoughts/src/components/cbt-game/AvatarSelection.tsx`
  - `referensi/cbt-game-conquer-negative-thoughts/src/lib/cbt-game-data.ts`
- Tujuan:
  - `resources/js/pages/mentoring/levels/level-3.tsx`
  - `resources/js/components/cbt-game/CBTGameContainer.tsx`
  - `resources/js/components/cbt-game/BattleEncounter.tsx`
  - `resources/js/components/cbt-game/AvatarSelection.tsx`
  - `resources/js/lib/cbt-game-data.ts`

## Implementasi
1. Salin file referensi ke path tujuan yang setara agar impor alias `@/...` tetap sama persis.
2. Buat `level-3.tsx` yang merender `CBTGameContainer` sesuai `page.tsx` referensi (layout, kelas CSS, footer), tanpa modifikasi.
3. Verifikasi rute: `routes/web.php` sudah mengizinkan ID 3 dan me-render `mentoring/levels/level-3`.
4. Navigasi halaman mentoring:
   - “Semua Level” sudah menggunakan `Link href={\`/mentoring/level/${level.id}\`}`, sehingga tombol level ketiga otomatis ke `/mentoring/level/3` jika tidak `locked`.

## Verifikasi
- Buka `'/mentoring'` dan klik tombol level ketiga (paling bawah) untuk memastikan redirect ke `'/mentoring/level/3'`.
- Di `'/mentoring/level/3'`, jalankan game: intro → pilih avatar → battle → victory/game over.

Saya akan menyalin file-file tersebut sekarang, tanpa mengubah isinya, lalu memastikan semuanya berjalan.