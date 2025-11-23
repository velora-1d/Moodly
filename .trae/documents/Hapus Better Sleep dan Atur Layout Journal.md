## Ringkas Tujuan

* Menghapus seluruh section/hero komponen "Better Sleep" (MindQuest Sleep) dari halaman landing.

* Mengubah layout section "MindQuest Journal" agar kartu/jurnal box berada di sisi kanan pada layar besar, menjaga konsistensi dan kerapian halaman.

## Lokasi Kode Terkait

* Komposisi landing: `resources/js/pages/duo_ref/app/page.tsx` (memuat ProductsAbc dan ProductsMath)

  * Impor dan render Sleep: `resources/js/pages/duo_ref/app/page.tsx:10` (import) dan `:28` (render `<ProductsAbc />`)

  * Render Journal: `resources/js/pages/duo_ref/app/page.tsx:29` (`<ProductsMath />`)

* Better Sleep section: `resources/js/components/components/sections/products-abc.tsx`

* MindQuest Journal section: `resources/js/components/components/sections/products-math.tsx`

* Footer program list (opsional hapus tautan Sleep): `resources/js/components/components/sections/footer.tsx:17–24`

## Rencana Implementasi

1. Hapus Better Sleep dari Landing

* Hapus baris impor `ProductsAbc` di `resources/js/pages/duo_ref/app/page.tsx:10`.

* Hapus elemen `<ProductsAbc />` di `resources/js/pages/duo_ref/app/page.tsx:28`.

* Opsional: hapus item "MindQuest Sleep" dari `productLinks` di footer (`resources/js/components/components/sections/footer.tsx:21`) agar tidak menampilkan tautan yang tidak ada.

1. Atur Layout MindQuest Journal (kartu di kanan)

* Di `resources/js/components/components/sections/products-math.tsx`, susun grid dua kolom agar:

  * Kolom kiri: blok teks/badge/judul/fitur/CTA (kontainer saat ini mulai di `:45`).

  * Kolom kanan: kontainer kartu journaling (kontainer saat ini mulai di `:8–43`).

* Cara teknis yang rapi dan responsif:

  * Pindahkan JSX kontainer kartu setelah blok teks, atau gunakan utility order Tailwind: tambahkan `lg:order-2` pada kontainer kartu (`:8`) dan `lg:order-1` pada kontainer teks (`:45`).

  * Ubah alignment kontainer kartu menjadi `lg:justify-end` (saat ini `lg:justify-start` di `:8`) agar menempel sisi kanan.

  * Penyesuaian estetika: ubah badge pena mengambang dari `-left-4` ke `-right-4` (`:39`) agar posisinya sesuai ketika berada di kanan.

* Mobile tetap satu kolom (urutan natural), desktop dua kolom dengan kartu di kanan.

1. Rapikan Spasi dan Konsistensi

* Pastikan jarak `gap` antar kolom tetap `gap-8 lg:gap-12` agar konsisten dengan section lain.

* Tidak mengubah tipografi/warna; hanya penataan ulang kolom.

## Verifikasi

* Jalankan dev server dan buka homepage untuk memastikan:

  * Section Better Sleep tidak tampil (tidak ada badge "Better Sleep", judul "mindquest sleep", maupun kartu "Sleep Better Tonight").

  * Section MindQuest Journal menampilkan teks di kiri dan kartu journaling di kanan pada viewport `lg` dan lebih besar; tetap satu kolom pada mobile.

* Periksa footer: jika opsi penghapusan dilakukan, pastikan item "MindQuest Sleep" tidak lagi muncul.

## Dampak & Keamanan

* Tidak menghapus file komponen dari repo; hanya tidak dirender agar mudah di-rollback bila diperlukan.

* Perubahan hanya pada struktur JSX dan class Tailwind, tanpa menyentuh logic atau state.

* Tidak ada secret/konfigurasi diubah.

## Output yang Diharapkan

* Landing bersih tanpa bagian Better Sleep.

* Journal konsisten: teks kiri, kartu kanan, layout rapi dan responsif.

