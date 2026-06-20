# Cozy Pixel Farm

Project prototype game pixel farming sederhana yang dibuat menggunakan React, Vite, Tailwind CSS, dan Phaser 3.

## 1. Cara Instal Dependency

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/). Jalankan perintah berikut di root folder project untuk menginstal seluruh dependency:

```bash
npm install
```

## 2. Cara Menjalankan Project (Development)

Untuk menjalankan server development lokal dengan auto-reload (HMR):

```bash
npm run dev
```

Server biasanya akan berjalan di [http://localhost:5173/](http://localhost:5173/).

## 3. Lokasi Menyimpan Asset

Semua asset static game (seperti gambar, tileset, dan sprite sheet) harus disimpan di folder `public` agar bisa diakses langsung oleh Phaser:

```text
public/assets/farm/
```

Path yang sedang digunakan saat ini:
- Background/Tileset: `public/assets/farm/Free ver.png`
- Rumah: `public/assets/farm/House.png`
- Dekorasi/Objek: `public/assets/farm/Objects.png`
- Karakter (Sprite Sheet):
  - `public/assets/farm/Player/MPlayer 1 idle.png`
  - `public/assets/farm/Player/MPlayer 1 walking.png`

## 4. Struktur Project

```text
pixel-farm-game/
├── public/
│   └── assets/
│       └── farm/                  # Tempat menyimpan asset game (.png)
│
├── src/
│   ├── components/
│   │   └── GameCanvas.jsx         # Komponen React untuk container Phaser 3
│   │
│   ├── game/
│   │   ├── config/
│   │   │   └── assetConfig.js     # Pengaturan dimensi & frame sprite sheet
│   │   └── scenes/
│   │       ├── BootScene.js       # Preloader scene dengan error handling
│   │       └── FarmScene.js       # Scene utama (pergerakan, animasi, map)
│   │
│   ├── App.jsx                    # Dashboard UI dengan Tailwind CSS
│   ├── index.css                  # Konfigurasi Tailwind CSS v4 & base style
│   └── main.jsx                   # Entry point aplikasi React
│
├── package.json                   # Konfigurasi dependensi project
├── vite.config.js                 # Konfigurasi Vite + React + Tailwind CSS
└── README.md                      # Dokumentasi project
```

## 5. Cara Menambahkan Scene Baru

Untuk menambahkan scene Phaser baru, ikuti langkah berikut:

1. Buat file scene baru di dalam folder `src/game/scenes/` (misalnya `MarketScene.js`).
2. Warisi dari `Phaser.Scene` dan buat struktur dasarnya:
   ```javascript
   import Phaser from 'phaser';

   export default class MarketScene extends Phaser.Scene {
     constructor() {
       super('MarketScene');
     }
     
     create() {
       // Kode inisialisasi scene
     }
     
     update() {
       // Kode game loop
     }
   }
   ```
3. Impor scene tersebut di dalam `src/components/GameCanvas.jsx` dan masukkan ke dalam array `scene` pada objek `config`:
   ```javascript
   import MarketScene from '../game/scenes/MarketScene';
   // ...
   const config = {
     // ...
     scene: [BootScene, FarmScene, MarketScene]
   };
   ```
4. Untuk berpindah ke scene baru dari scene yang sedang berjalan (misal dari `FarmScene.js`), gunakan:
   ```javascript
   this.scene.start('MarketScene');
   ```

## 6. Cara Melakukan Build Production

Untuk membuat build production yang siap dideploy (mengoptimasi file javascript dan CSS):

```bash
npm run build
```

Hasil build akan berada di dalam folder `dist/` yang siap untuk dihosting.

Untuk menguji hasil build production secara lokal, gunakan:

```bash
npm run preview
```
