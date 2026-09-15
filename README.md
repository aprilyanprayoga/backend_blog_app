# Backend Blog App

Backend REST API untuk aplikasi Blog, dibuat menggunakan Express.js + TypeScript, dengan database MySQL (Drizzle ORM) dan penyimpanan gambar di Cloudinary.

Project ini dibuat untuk keperluan Uji Level Kompetensi Keahlian (ATS) RPL.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Bahasa**: TypeScript
- **Database**: MySQL
- **ORM**: Drizzle ORM
- **Penyimpanan Gambar**: Cloudinary
- **Upload Middleware**: Multer

## Struktur Folder

```
server/
├── src/
│   ├── config/         # konfigurasi database & cloudinary
│   ├── controllers/    # logic tiap endpoint
│   ├── db/             # schema & koneksi drizzle
│   ├── middlewares/    # upload middleware
│   ├── models/         # query ke database
│   ├── routes/         # definisi route
│   ├── services/       # helper cloudinary (upload/delete)
│   ├── app.ts
│   └── server.ts
├── drizzle/             # migration files
├── drizzle.config.ts
└── package.json
```

## Instalasi

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```
3. Buat file `.env` di root folder, isi sesuai contoh:
   ```
   PORT=3000

   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=blog_app1

   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Buat database MySQL dengan nama sesuai `DB_NAME` di atas
5. Push schema ke database:
   ```bash
   npx drizzle-kit push
   ```
6. Jalankan server:
   ```bash
   npm run dev
   ```
   Server akan berjalan di `http://localhost:3000`

## Endpoint API

### Categories

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/categories` | Ambil semua kategori |
| GET | `/api/categories/:id` | Ambil detail kategori |
| POST | `/api/categories` | Tambah kategori baru |
| PUT | `/api/categories/:id` | Update kategori |
| DELETE | `/api/categories/:id` | Hapus kategori |

### Posts

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/posts` | Ambil semua artikel |
| GET | `/api/posts/:id` | Ambil detail artikel |
| POST | `/api/posts` | Buat artikel baru (form-data, field `thumbnail` untuk gambar) |
| PUT | `/api/posts/:id` | Update artikel (form-data) |
| DELETE | `/api/posts/:id` | Hapus artikel |

## ERD

Skema database terdiri dari 2 tabel:
- **categories** — menyimpan data kategori artikel
- **posts** — menyimpan data artikel, dengan relasi many-to-one ke categories melalui `category_id`

## Branching

Repository ini menggunakan strategi branching:
- `master` — versi stabil awal
- `develop` — kumpulan seluruh fitur yang sudah selesai
- `feature/*` — pengembangan tiap fitur secara terpisah
