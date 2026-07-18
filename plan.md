# Project Plan: Minimalist Static PDF Library ("ruangbaca")

## 1. Project Overview
Membangun platform perpustakaan PDF berbasis web bernama **"ruangbaca"** yang bersifat **100% Read-Only** bagi pengunjung. Pengelolaan konten (menambah atau menghapus buku) dilakukan secara eksklusif melalui terminal *developer* dengan pendekatan *Git-based*. Proyek ini difokuskan pada kecepatan akses yang maksimal dengan pengiriman JavaScript seminimal mungkin.

*Target Domain Vercel:* `ruangbaca.vercel.app`

## 2. Tech Stack Requirements
*   **Framework:** Astro (Fokus pada performa statis dan kecepatan).
*   **Styling:** Tailwind CSS (Light Mode only).
*   **PDF Engine:** `react-pdf` (Diintegrasikan ke dalam Astro menggunakan integrasi `@astrojs/react` dengan arahan `client:only` agar PDF viewer dirender khusus di browser klien).
*   **Storage & Database (Local):** Direktori lokal `/public` untuk menyimpan file PDF dan gambar *cover*. File lokal `books.json` digunakan sebagai sumber data.
*   **Deployment:** Vercel (Free Plan, terintegrasi dengan GitHub CI/CD).

## 3. Core Features & UI Layout

### A. Main Gallery (Home Page - Read Only)
*   **UI Design:** Terinspirasi dari Studocu. Sidebar di kiri untuk navigasi statis, dan *main area* di kanan menggunakan *Bento grid/Card layout* untuk menampilkan daftar buku.
*   **Book Cards:** Hanya menampilkan gambar *cover*, judul, dan tombol "Read".
*   **Data Fetching:** Komponen Astro membaca data array dari file statis `books.json` untuk merender daftar buku menjadi HTML murni saat proses *build*.

### B. PDF Reader (Read Only)
*   **Reader Page:** Saat buku diklik, pengguna masuk ke halaman *reader*. File PDF dipanggil dari direktori `/public` dan dirender menggunakan komponen React di dalam halaman Astro.
*   **Controls:** Kontrol navigasi standar (Next/Prev Page, Zoom In/Out).

## 4. Developer Workflow (Manajemen Konten via Terminal)
Karena tidak ada *dashboard* UI untuk manajemen konten, *developer* wajib mengikuti standar operasional berikut untuk memperbarui buku:

*   **Menambahkan Buku:**
    1. Masukkan file PDF baru ke direktori `/public/pdfs/`.
    2. Masukkan gambar *cover* ke direktori `/public/covers/`.
    3. Buka file `data/books.json` di *code editor*, lalu tambahkan objek JSON baru yang berisi metadata buku tersebut.
    4. Buka terminal, eksekusi: `git add .` -> `git commit -m "add new book"` -> `git push origin main`.
*   **Menghapus Buku:**
    1. Hapus file PDF dan *cover* dari direktori `/public/`.
    2. Hapus objek buku tersebut dari `data/books.json`.
    3. Eksekusi commit dan *push* melalui terminal.

## 5. Development Phases
1.  **Phase 1: Setup Repository.** Inisialisasi *project* Astro, instal `@astrojs/react` dan Tailwind CSS. Buat repositori di GitHub, hubungkan ke Vercel, dan set *Project Name* di Vercel menjadi `ruangbaca`.
2.  **Phase 2: UI & Data Structure.** Setup folder `/public` dan buat file `books.json` dengan data *dummy*. Buat *layout* galeri menggunakan Tailwind CSS.
3.  **Phase 3: PDF Viewer.** Implementasi `react-pdf` sebagai *React Island* di dalam halaman Astro, pastikan dapat membaca file statis dari folder `/public` dengan lancar.
4.  **Phase 4: Final Test & Deployment.** Lakukan *push* terakhir ke GitHub untuk memicu Vercel *auto-deployment*. Lakukan verifikasi performa di URL *production*
