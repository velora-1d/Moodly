## Ringkas Tujuan
- Buat halaman baru “Daily Journaling” dengan top navbar yang sama seperti `/dashboard`.
- Layout 4 section: 🌅 Morning Reflection, 💭 Gratitude Journal, 🎯 Goal Setting, 🔥 Streak Tracker (menampilkan “7 Days Streak!” + progress).
- Fitur inti: Guided Prompts, Mood Tracking, Private & Secure (enkripsi data), Daily Reminders.
- Desain: konsisten tema, micro-interactions, ikon sesuai section.
- Fitur tambahan: Progress tracker streak, tombol akses cepat ke jurnal sebelumnya, ekspor data (CSV dan print-to-PDF).
- Teknis: responsif, aksesibilitas, dark/light mode, optimasi performa.
- Testing: alur journaling, keamanan data (enkripsi), kompatibilitas browser, A/B testing stub.
- Tambahkan route dan helper agar bisa diakses via `/journal`.

## Lokasi & Integrasi
- Navbar: gunakan `DashboardTopNav` (`resources/js/components/dashboard-top-nav.tsx`).
- Supabase: pakai `resources/js/lib/supabaseClient.ts` dengan fallback otomatis jika env tidak dikonfigurasi.
- Route: tambah ke `routes/web.php` dalam grup `auth, verified` → `Inertia::render('journal/index')`. Wayfinder akan mengenerate helper di `resources/js/routes/index.ts` (`journal()`), sehingga dapat dipakai di navbar/CTA.

## Implementasi Halaman
- Tambah `resources/js/pages/journal/index.tsx`:
  - Header dengan `DashboardTopNav`.
  - Empat section:
    - Morning Reflection: textarea + guided prompts (pertanyaan harian), tombol simpan.
    - Gratitude Journal: list input poin gratitude (min 3), simpan.
    - Goal Setting: input tujuan mingguan, checkbox progress.
    - Streak Tracker: kartu menampilkan “🔥 7 Days Streak!” dan progress bar.
  - Akses cepat: panel “Recent entries” (7 hari terakhir) dengan tombol buka.
  - Ekspor: tombol `Export CSV` (generate CSV di client) dan `Print PDF` (buka tampilan print-friendly untuk di-save sebagai PDF).
  - Micro-interaction: framer-motion untuk animasi hover, submit success.
  - Aksesibilitas: `aria-label`, `role`, fokus ring.
  - Mode gelap/terang: memakai kelas tema dari Tailwind (mengikuti `app.css`).
  - Performa: pecah section menjadi komponen ringan, lazy-load ikon berat.

## Enkripsi & Penyimpanan
- Buat util `resources/js/lib/crypto.ts`:
  - KDF: PBKDF2 dari passphrase pengguna (diset sekali di halaman) → kunci AES-GCM.
  - `encrypt(text, passphrase) → { iv, salt, ciphertextBase64 }`.
  - `decrypt(payload, passphrase) → text`.
  - Jika Supabase dikonfigurasi: simpan ke tabel `journal_entries` (kolom: `user_id`, `type`, `payload_json`, `created_at`).
  - Jika tidak: simpan ke `localStorage` per user (`journal:<userId>:YYYY-MM-DD`).

## Mood Tracking & Reminders
- Mood tracking: komponen kecil untuk memilih emoji mood harian + catatan; reuse pola dari dashboard (lihat `resources/js/pages/dashboard.tsx:480–503`) dan simpan ke `mood_logs` Supabase jika tersedia, fallback localStorage.
- Daily Reminders: banner in-app yang muncul jika belum journaling hari ini; opsi aktifkan `Notification API` (izin pengguna) → notifikasi ringan pada jam yang dipilih (disimpan di localStorage).

## Ekspor Data
- CSV: generate dari entries yang terdekripsi (kolom: tanggal, tipe, konten).
- PDF: tampilan print-friendly (route/query `?print=1`) → gunakan `window.print()` untuk ekspor tanpa dependensi tambahan.

## Routing
- Tambahkan ke `routes/web.php`:
  - `Route::get('journal', fn() => Inertia::render('journal/index'))->name('journal');`
- (Opsional) Tambahkan item “Journal” ke `DashboardTopNav` melalui props atau di tempat lain jika diperlukan.

## Testing
- Tambah tes Vitest:
  - `crypto.spec.ts`: memastikan `encrypt`/`decrypt` konsisten (AES-GCM + PBKDF2).
  - `csv.spec.ts`: generator CSV menghasilkan header dan baris yang benar.
  - `journal.flow.spec.tsx`: render halaman, isi prompt, simpan, tampil di daftar terbaru.
  - Keamanan: dekripsi gagal dengan passphrase salah.
  - Kompatibilitas: mock `crypto.subtle` dan `Notification` untuk browser yang tidak mendukung.

## Verifikasi
- Jalankan dev server, buka `/journal`, uji:
  - Layout empat section rapi; kartu streak tampil “7 Days Streak!”.
  - Simpan entri terenkripsi dan tampil pada “Recent entries” setelah didekripsi.
  - Mood tracking bekerja dan tidak error saat Supabase tidak tersedia.
  - Ekspor CSV mengunduh file; `Print PDF` membuka dialog print.
  - Responsif dan aksesibilitas oke (tab order/focus ring).

## Catatan Keamanan
- Tidak menyimpan passphrase di server; hanya di memori sesi dan localStorage opsional atas izin user.
- Payload hanya tersimpan dalam bentuk terenkripsi di DB.
- Tidak menambah dependensi baru; gunakan Web Crypto API dan util yang ada.

Silakan konfirmasi. Setelah disetujui, saya akan menambahkan halaman, util enkripsi, rute, dan tes, lalu menjalankan verifikasi end-to-end.