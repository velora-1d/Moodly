## Tujuan
- Menambahkan popup pemilihan mood dengan emoji pada halaman `/dashboard`.
- Menyimpan mood terpilih dan catatan ke Supabase (`mood_logs`) serta menambah XP (`xp_events`).
- Memperbarui indikator streak dan XP harian secara realtime di dashboard.

## Implementasi
1. Import komponen dialog dan textarea, serta `toast` untuk notifikasi.
2. Tambahkan state: `isMoodOpen`, `selectedMood`, `note`.
3. Ganti tombol “Catat Mood Hari Ini” agar membuka dialog.
4. Dialog berisi grid emoji (😡, 😟, 😐, 🙂, 😄) dan textarea opsional.
5. Submit akan:
   - Insert ke `mood_logs` dengan `user_id`, `created_at`, `mood`, `label`.
   - Insert ke `xp_events` dengan `points` (mis. 2) dan `type`.
   - Update `moodHistory`, `streak`, `dailyXP`, tutup dialog, tampilkan toast sukses.

## Validasi
- Uji pemilihan emoji dan penyimpanan data ke Supabase.
- Lihat perubahan streak/XP dan tampilan fallback loader bila diperlukan.
- Build produksi untuk memastikan tidak ada error bundling.