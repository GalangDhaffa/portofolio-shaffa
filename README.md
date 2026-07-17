# Dynamic Portfolio - Shaffanadia

Selamat datang di repositori web portofolio dinamis untuk **Shaffanadia**. Web ini bukan sekadar portofolio statis biasa, melainkan dilengkapi dengan **Sistem Manajemen Konten (CMS)** mandiri berbasis Firebase yang memungkinkan pemilik web untuk mengubah isi konten secara langsung melalui halaman Admin Dashboard tanpa harus menyentuh kode sama sekali!

Dibuat dengan ❤️ oleh **Dhaffa Galang Fahriza**.

---

## 🌟 Pengenalan Web

Web ini dirancang khusus untuk menampilkan profil profesional, pencapaian akademik, pengalaman, proyek, hingga kemampuan yang dimiliki oleh Shaffanadia. Dengan desain UI/UX modern (bernuansa warna Lavender, Blush, dan Teal), web ini menawarkan pengalaman visual yang menarik dan interaktif bagi pengunjung.

Selain itu, web ini dilengkapi dengan sistem keamanan login, dan sebuah Admin Dashboard khusus di mana semua data yang tampil di halaman utama (seperti teks perkenalan, daftar proyek, hingga link sosial media) dapat diatur secara *real-time*.

---

## ✨ Fitur Utama

1. **Desain Modern & Responsif**
   Tampilan yang memukau di berbagai perangkat (Desktop, Tablet, Mobile) dengan menggunakan Tailwind CSS dan animasi yang halus.

2. **Admin Dashboard (CMS-like)**
   Halaman khusus admin (terlindungi oleh login) untuk mengatur keseluruhan isi website. Terdiri dari beberapa tab:
   - **Home & About:** Mengatur teks sapaan, deskripsi diri, foto profil, dan perjalanan akademik.
   - **Projects:** Menambah, mengedit, dan menghapus portofolio/proyek (mendukung upload gambar otomatis dikompresi).
   - **Skills:** Mengatur kemampuan (skill) beserta persentase penguasaannya.
   - **Experience & Education:** Mencatat riwayat pengalaman organisasi, kepemimpinan, dan riwayat pendidikan.
   - **Contact & Socials:** Mengatur email, lokasi, nomor telepon, dan link sosial media dinamis dengan ikon yang dapat disesuaikan.
   
3. **Database Real-Time (Firebase)**
   Semua perubahan di Dashboard akan otomatis disimpan di Firebase Cloud Firestore dan langsung diperbarui di halaman publik dengan urutan data terbaru (Newest First).

4. **Notifikasi Interaktif**
   Menggunakan `SweetAlert2` untuk memberikan notifikasi cantik setiap kali admin berhasil menyimpan, mengedit, atau menghapus data.

---

## 🚀 Tutorial Cara Penggunaan

### 1. Menjalankan Website di Komputer Lokal (Localhost)
Pastikan Anda sudah menginstal **Node.js**.

1. Buka terminal (Command Prompt / PowerShell / Git Bash).
2. Arahkan ke folder proyek ini.
3. Instal semua dependensi dengan menjalankan perintah:
   ```bash
   npm install
   ```
4. Jalankan *development server*:
   ```bash
   npm run dev
   ```
5. Buka browser dan akses tautan yang muncul (biasanya `http://localhost:5173`).

### 2. Cara Mengakses Admin Dashboard
1. Buka browser dan pergi ke halaman `/login` (misalnya `http://localhost:5173/login`).
2. Masukkan PIN akses admin (Sesuai dengan kode akses yang telah diatur di dalam sistem).
3. Setelah berhasil login, Anda akan dialihkan ke `/admin` (Admin Dashboard).

### 3. Cara Mengubah Konten Website
1. **Memperbarui Profil Dasar:** Pergi ke tab **Home** atau **About** di Dashboard. Isi form yang tersedia (terdapat teks contoh/petunjuk berbahasa Indonesia untuk memudahkan Anda), lalu klik "Save Settings".
2. **Menambahkan Data Baru (Proyek, Pengalaman, dll):**
   - Pergi ke tab yang diinginkan (misal: **Projects**).
   - Klik tombol **+ Add Project**.
   - Isi form pada popup modal yang muncul.
   - Klik **Save** dan data akan langsung tersimpan.
3. **Mengedit / Menghapus Data:** Di setiap daftar data di dashboard, terdapat ikon **Pensil** (untuk mengedit) dan ikon **Tempat Sampah** (untuk menghapus).

---

## 👨‍💻 Tentang Pembuat

Web dinamis yang sangat fungsional dan indah ini dirancang dan dikembangkan secara penuh oleh **Dhaffa Galang Fahriza**. 

Fokus utama dalam pengembangan web ini adalah memastikan bahwa pemilik web (Shaffanadia) dapat dengan mudah mengelola personal brandingnya tanpa harus bergantung pada seorang *developer* di masa depan.

---
*© 2024 Portofolio Dinamis. All rights reserved.*
