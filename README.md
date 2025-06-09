# Dokumentasi Proyek Chat App

## Gambaran Umum Proyek
Proyek ini adalah aplikasi chat real-time yang terdiri dari dua bagian utama: frontend dan backend. Frontend dibangun menggunakan React dengan Vite sebagai build tool, sedangkan backend menggunakan Express.js dengan integrasi socket.io untuk komunikasi real-time dan MongoDB sebagai database.

## Backend
- **Server:** Menggunakan Express.js untuk membuat REST API.
- **Socket.io:** Digunakan untuk komunikasi real-time antara client dan server, termasuk manajemen pengguna online.
- **Database:** MongoDB digunakan untuk menyimpan data pengguna dan pesan.
- **Routes:**
  - `/api/auth`: Endpoint untuk autentikasi pengguna.
  - `/api/messages`: Endpoint untuk pengelolaan pesan.
  - `/api/status`: Endpoint untuk pengecekan status server.
- **Fitur utama backend:**
  - Manajemen koneksi socket dan pengguna online.
  - Penyimpanan dan pengambilan pesan dari database.
  - Middleware untuk parsing JSON dan CORS.

## Frontend
- **Framework:** React dengan routing menggunakan React Router.
- **Context API:** Menggunakan `AuthContext` untuk manajemen autentikasi dan `ChatContext` untuk manajemen data chat.
- **Routing:**
  - `/`: Halaman utama (HomePage), hanya dapat diakses jika pengguna sudah login.
  - `/login`: Halaman login, hanya dapat diakses jika pengguna belum login.
  - `/profile`: Halaman profil pengguna, hanya dapat diakses jika pengguna sudah login.
- **Fitur utama frontend:**
  - Tampilan splash screen saat aplikasi dimulai.
  - Background animasi yang menarik.
  - Notifikasi toast untuk interaksi pengguna.
  - Manajemen status autentikasi dan data chat secara global menggunakan Context API.

## Cara Menjalankan Proyek
1. **Backend:**
   - Pastikan MongoDB sudah berjalan.
   - Masuk ke folder `server`.
   - Install dependencies dengan `pnpm install` atau `npm install`.
   - Jalankan server dengan `pnpm start` atau `node server.js`.
2. **Frontend:**
   - Masuk ke folder `client`.
   - Install dependencies dengan `pnpm install` atau `npm install`.
   - Jalankan aplikasi dengan `pnpm run dev` atau `npm run dev`.
   - Buka browser dan akses `http://localhost:3000`.

## Catatan
- Pastikan environment variables untuk koneksi database dan konfigurasi lainnya sudah diatur dengan benar.
- Proyek ini sudah diuji secara menyeluruh untuk memastikan semua fitur berjalan dengan baik.

---

Dokumentasi ini dibuat untuk memudahkan pengembang memahami struktur dan cara kerja proyek chat real-time ini.
