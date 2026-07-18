# Update Plan: UI/UX Enhancement "ruangbaca"

## 1. Tujuan Pembaruan
Fokus pembaruan ini adalah untuk mengisi kekosongan visual (*white space*) pada antarmuka pengguna tanpa menghilangkan identitas desain minimalis. Pembaruan mencakup optimalisasi tata letak grid, penambahan elemen navigasi statis, dan peningkatan kelengkapan informasi pada UI pembaca.

## 2. Pembaruan Sidebar Kiri (Navigasi)
*   **Search Bar (Visual Dummy):** Tambahkan elemen input pencarian statis lengkap dengan ikon kaca pembesar di bagian atas sidebar, tepat di bawah logo/judul aplikasi.
*   **Daftar Kategori Statis:** Tambahkan daftar label kategori atau genre buku (misalnya: "All Books", "Psychology", "Technology", "Finance") di bawah menu "Library" untuk memberikan struktur hierarki visual.
*   **Footer Sidebar:** Tambahkan elemen teks kecil di bagian paling bawah sidebar yang berisi informasi hak cipta (contoh: "© 2026 ruangbaca.") untuk menutup ruang kosong di area bawah layar.

## 3. Pembaruan Halaman Utama (Main Gallery)
*   **Grid Responsif Ekstra:** Ubah *class* Tailwind pada *container grid* buku agar lebih dinamis menyesuaikan lebar layar monitor besar (contoh penggunaan: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`).
*   **Metadata Kartu Buku:** Tambahkan elemen teks berukuran kecil (*text-sm* atau *text-xs* dengan warna abu-abu) pada setiap kartu buku di bawah teks judul untuk menampilkan informasi ekstra, seperti genre buku atau tahun rilis.
*   **Hero Section / Banner:** Tambahkan satu elemen kotak memanjang horizontal di atas *grid* daftar buku utama dengan label "Featured Book" atau "Recently Added" untuk memberikan titik fokus utama saat pengguna pertama kali membuka web.

## 4. Pembaruan Halaman PDF Reader
*   **Indikator Halaman Terbaca:** Tambahkan elemen teks pada *floating bar* (menu kontrol atas) untuk menampilkan informasi halaman saat ini berbanding total halaman (contoh format: "Page 1 / 342").
*   **Tombol Navigasi Halaman:** Tambahkan tombol panah "Prev" dan "Next" bersebelahan dengan indikator halaman untuk memudahkan navigasi presisi menggunakan klik.
*   **Tombol Utilitas Ekstra:** Tambahkan ikon fungsional opsional di sudut kanan atas menu kontrol, seperti opsi "Fullscreen Mode" atau "Download PDF" agar fungsi *reader* terasa lebih utuh.