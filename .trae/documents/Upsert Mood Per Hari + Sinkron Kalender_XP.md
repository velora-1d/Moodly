## Tujuan
- Memungkinkan mengganti emoji mood pada hari yang sudah memiliki catatan.
- Update langsung ke database Supabase dan merefleksikan perubahan di kalender serta indikator XP/streak.

## Implementasi
1. Upsert mood per hari:
   - Cek baris `mood_logs` berdasarkan `user_id` dan `date` (hari ini).
   - Jika ada, `update` kolom `mood`, `label`, `updated_at`.
   - Jika tidak ada, `insert` baris baru dengan `date`, `created_at`.
2. State sinkron:
   - Gunakan `hadMoodBefore = !!moodHistory[today]` sebelum menyimpan.
   - Setelah DB sukses, set `moodHistory[today] = { emoji, label }`.
   - XP/streak hanya ditambah jika sebelumnya belum ada mood untuk hari itu.
3. Kalender:
   - Sudah membaca `emoji` dari `moodHistory` dan menampilkan di sel (tidak perlu perubahan besar).
4. UX:
   - Popup ditutup otomatis setelah simpan.
   - Tampilkan toast “Mood dicatat” atau “Mood diperbarui” sesuai kondisi.

## Validasi
- Uji: pilih emoji, simpan; ulangi dengan emoji berbeda pada hari yang sama → DB `mood_logs` berubah, kalender menampilkan emoji baru, XP tidak bertambah ganda.
- Build untuk memastikan tanpa error.