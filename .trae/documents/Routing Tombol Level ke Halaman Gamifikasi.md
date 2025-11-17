## Tujuan
- Membuat semua tombol/area level di halaman `/mentoring` melakukan navigasi ke `/mentoring/level/{id}` sesuai level masing-masing.

## Rincian Perubahan
1. CTA Level Aktif
- Sudah menggunakan tautan; pastikan `Link href={`/mentoring/level/${currentLevel.id}`}` tetap ada dan prefetch aktif.

2. Node Level di Peta
- Ganti aksi `onClick={handleLevelClick}` pada setiap node level yang tidak `locked` menjadi tautan `Link` dengan `href={`/mentoring/level/${level.id}`}`.
- Untuk level `locked`, tetap nonaktif: tidak ada `Link`, hanya tooltip.
- Tambahkan `aria-label` dan kelas `cursor-pointer` untuk aksesibilitas.

3. Tooltip/Aksi
- Di tooltip, ubah action utama menjadi tautan ke halaman level untuk konsistensi (tanpa mengubah tampilan).

4. Validasi Route
- Route backend sudah ada dan dibatasi ke level `[1,2,3]`; mengakses level di luar ini akan 404 (sesuai penghapusan).

## Verifikasi
- Klik node level 1/2/3 menavigasi ke halaman masing-masing.
- Level yang `locked` tidak bisa diklik; tetap menampilkan status.
- Build sukses tanpa error TypeScript.

## Catatan
- Tidak mengubah layout atau gaya visual; hanya wiring navigasi.
- Prefetch aktif untuk pengalaman navigasi cepat.