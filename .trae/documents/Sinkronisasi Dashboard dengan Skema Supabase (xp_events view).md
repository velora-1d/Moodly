## Tujuan
- Menyelaraskan akses data dashboard dengan skema Supabase terbaru (view xp_events dan tabel user_xp_events).
- Menambahkan loading dan error handling tanpa mengubah mood tracker.

## Perubahan Kode yang Diusulkan
- Pembacaan XP harian:
  - Ubah sumber baca dari `user_xp_events` ke `xp_events` sehingga kolom yang dipakai (`points`, `created_at`) konsisten dengan view.
- Penulisan event XP:
  - Tetap tulis ke `user_xp_events` menggunakan kolom `amount`, `source`, `occurred_at` agar aman (write ke view tidak selalu dijamin).
- Loading & error handling:
  - Tambah state `loading` dan `loadError` pada dashboard.
  - Tampilkan nilai fallback saat loading dan kirim toast saat error.
- Mood tracker: tidak diubah.

## Verifikasi Setelah Implementasi
- MCP: GET `/xp_events?select=id,user_id,points,type,created_at&limit=1` untuk memastikan view aktif.
- MCP: GET `/user_stats` dan `/invites` untuk cek keberadaan tabel (boleh kosong).
- Manual: Baca XP harian pada dashboard; insert event dari aksi (akan menambah bar daily XP bila ada data).

## Catatan
- Tidak ada perubahan pada logika mood tracker.
- Perubahan minimal di `resources/js/pages/dashboard.tsx` pada blok baca/tulis XP dan state loading/error.

Konfirmasi untuk melanjutkan implementasi perubahan di atas.