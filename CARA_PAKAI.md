# 🚀 Panduan Cepat Setup Moodly

Ikuti langkah-langkah sederhana ini untuk menjalankan proyek di laptop Anda:

### Langkah 0: Clone Repositori
Clone proyek ini ke laptop Anda dan masuk ke foldernya.
```bash
git clone https://github.com/velora-1d/Moodly.git
cd Moodly
```

### Langkah 1: Persiapan Sistem
Instal PostgreSQL dan Docker secara otomatis.
```bash
./setup-system.sh
```

### Langkah 2: Inisialisasi Proyek
Instal semua library, setup database, dan isi data dummy (seeder) otomatis.
*(Pastikan Docker Desktop sudah dalam keadaan RUNNING sebelum menjalankan ini)*
```bash
./setup-project.sh
```

### Langkah 3: Mulai Pengembangan
Jalankan server aplikasi dan database secara bersamaan.
```bash
./vendor/bin/sail npm run dev
```

---

### 🌐 Akses Aplikasi
Buka browser dan akses: **[http://localhost](http://localhost)**

### 🛑 Menghentikan Server
Jika sudah selesai bekerja, hentikan container dengan:
```bash
./vendor/bin/sail stop
```
