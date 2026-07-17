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

## 🚀 Tutorial Cara Penggunaan Web & CMS

Website ini sudah di-_deploy_ dan dapat diakses secara publik. Sebagai pemilik web, Anda bisa mengubah keseluruhan isi konten melalui Admin Dashboard tanpa perlu mengerti bahasa pemrograman.

> 📖 **Butuh panduan lengkap?**
> Silakan baca **[Buku Panduan Penggunaan (GUIDEBOOK.md)](./GUIDEBOOK.md)** yang berisi instruksi lengkap untuk mengelola website ini dari awal sampai akhir!

### 1. Cara Mengakses Admin Dashboard
1. Buka browser Anda dan kunjungi halaman utama website.
2. Tambahkan `/login` di akhir URL (contoh: `https://portofolio-shaffa.vercel.app/login`).
3. Masukkan PIN akses admin Rahasia Anda.
4. Setelah login sukses, Anda akan langsung dibawa ke halaman `/admin` (Admin Dashboard).

### 2. Cara Mengubah & Memperbarui Konten
Di dalam Admin Dashboard, terdapat beberapa *tab* di menu sebelah kiri yang bisa Anda pilih:

- **Memperbarui Profil Dasar (Home, About, Contact):** 
  Masuk ke salah satu tab tersebut, lalu ubah teks yang ada di dalam form. Jangan khawatir bingung, karena setiap kotak pengisian sudah dilengkapi dengan contoh teks berwarna abu-abu (dalam Bahasa Indonesia) untuk memandu Anda! Setelah selesai, jangan lupa klik tombol **Save Settings**.
- **Menambahkan Data Baru (Projects, Skills, Experience, Education, Values):**
  1. Klik tab yang ingin ditambahkan (misal: **Projects**).
  2. Klik tombol **+ Add Project** (atau tombol *add* lainnya).
  3. Akan muncul *popup* form pengisian. Isi data sesuai petunjuk yang ada.
  4. Klik **Save**. Data baru akan otomatis ditambahkan ke daftar dan langsung tampil di halaman depan website!
- **Mengedit / Menghapus Data:** 
  Pada setiap daftar item (misal di daftar Proyek atau Pengalaman), terdapat tombol berlogo **Pensil** (untuk mengubah data) dan berlogo **Tempat Sampah** merah (untuk menghapus). Klik saja tombol tersebut dan konfirmasi.

Semudah itu! Anda kini memegang kendali penuh atas website portofolio Anda.

---

## 👨‍💻 Tentang Pembuat

Web dinamis yang sangat fungsional dan indah ini dirancang dan dikembangkan secara penuh oleh **Dhaffa Galang Fahriza**. 

Fokus utama dalam pengembangan web ini adalah memastikan bahwa pemilik web (Shaffanadia) dapat dengan mudah mengelola personal brandingnya tanpa harus bergantung pada seorang *developer* di masa depan.

---
*© 2024 Portofolio Dinamis. All rights reserved.*
