# Personal CV — React Native & Expo

## 1. Deskripsi Proyek

Personal CV merupakan aplikasi profil pribadi berbasis React Native dan Expo yang dikembangkan sebagai proyek pembelajaran pengembangan aplikasi mobile.

Aplikasi ini bertujuan untuk menampilkan informasi pribadi, deskripsi diri, keterampilan, pengalaman, portofolio, riwayat pendidikan, dan informasi kontak dalam sebuah antarmuka yang responsif dan interaktif.

Pengembangan aplikasi menerapkan struktur kode modular, pemisahan tanggung jawab komponen dan logika, pengelolaan tema, serta penanganan berbagai kondisi aplikasi.

## 2. Teknologi yang Digunakan

Teknologi dan tools yang digunakan dalam pengembangan aplikasi:

- **React Native:** Membangun antarmuka aplikasi.
- **Expo:** Framework untuk mempermudah pengembangan aplikasi React Native.
- **Expo Router:** Mengatur navigasi menggunakan sistem file-based routing.
- **TypeScript:** Menambahkan sistem tipe pada kode JavaScript.
- **React Hooks:** Mengelola state dan logika komponen.
- **AsyncStorage:** Menyimpan preferensi tema secara lokal.
- **StyleSheet:** Mengatur tampilan dan styling komponen.
- **React Native Web:** Menjalankan aplikasi melalui browser.

## 3. Fitur Aplikasi

Aplikasi Personal CV memiliki beberapa fitur utama:

1. **Home:** Menampilkan identitas dan informasi profil pribadi.
2. **About:** Menampilkan deskripsi diri dan pengalaman.
3. **Skills:** Menampilkan daftar keterampilan.
4. **Portfolio:** Menampilkan proyek yang pernah dikerjakan beserta teknologi yang digunakan.
5. **Academic:** Menampilkan informasi pendidikan dan perkembangan akademik.
6. **Contact:** Menyediakan formulir kontak dengan validasi input.
7. **Dark Mode:** Mengubah tampilan aplikasi antara Light Mode dan Dark Mode.
8. **Penyimpanan Preferensi Tema:** Menyimpan pilihan tema menggunakan AsyncStorage agar tetap dipertahankan setelah aplikasi dimuat ulang.
9. **Loading, Error, dan Empty State:** Memberikan informasi ketika data sedang dimuat, terjadi kesalahan, atau belum tersedia.
10. **Responsive UI:** Menyesuaikan tampilan berdasarkan ukuran layar.

## 4. Struktur Folder Proyek

Struktur utama proyek:

UTS/
├── assets/
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── about.tsx
│   │   ├── skills.tsx
│   │   ├── portfolio.tsx
│   │   ├── academic.tsx
│   │   ├── contact.tsx
│   │   └── explore.tsx
│   ├── components/
│   │   ├── academic/
│   │   │   ├── AcademicHeader.tsx
│   │   │   ├── LearningProgress.tsx
│   │   │   └── ScoreCard.tsx
│   │   ├── data/
│   │   │   ├── academic.json
│   │   │   ├── AcademicData.ts
│   │   │   ├── experience.json
│   │   │   ├── portfolio.json
│   │   │   ├── PortfolioData.ts
│   │   │   ├── profile.json
│   │   │   └── ProfileData.ts
│   │   ├── ui/
│   │   │   └── collapsible.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ExperienceTimeline.tsx
│   │   ├── NavigationMenu.tsx
│   │   ├── PageLayout.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── ProfileHeader.tsx
│   │   └── ThemeContext.tsx
│   ├── constants/
│   │   └── theme.ts
│   ├── hooks/
│   │   ├── useAcademic.ts
│   │   ├── usePortfolio.ts
│   │   ├── useProfile.ts
│   │   ├── use-color-scheme.ts
│   │   ├── use-color-scheme.web.ts
│   │   └── use-theme.ts
│   ├── services/
│   │   ├── academicService.ts
│   │   ├── portfolioService.ts
│   │   └── profileService.ts
│   └── global.css
├── app.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

## 5. Arsitektur dan Pembagian Tanggung Jawab

Proyek menggunakan pendekatan modular dengan pembagian tanggung jawab sebagai berikut:

- **App:** Mengelola halaman aplikasi dan navigasi.
- **Components:** Menyediakan komponen antarmuka yang dapat digunakan kembali.
- **Data:** Menyimpan data profil, pendidikan, dan portofolio.
- **Hooks:** Mengelola state, loading, error, dan logika pengambilan data.
- **Services:** Mengelola proses pengambilan dan pengolahan data.
- **ThemeContext:** Mengelola tema aplikasi dan preferensi Dark Mode.

Pemisahan tersebut bertujuan agar kode lebih terorganisasi, mudah dipahami, dan mudah dikembangkan.

## 6. Penanganan Kondisi Aplikasi

Aplikasi menerapkan beberapa mekanisme penanganan kondisi:

- **Loading State:** Ditampilkan ketika proses pengambilan data berlangsung.
- **Error State:** Menampilkan informasi kesalahan dan menyediakan fungsi untuk mencoba kembali.
- **Empty State:** Memberikan informasi ketika data belum tersedia.
- **Form Validation:** Memeriksa kelengkapan dan format input pada formulir kontak.
- **Interaction Feedback:** Memberikan informasi keberhasilan atau kegagalan interaksi.
- **Theme Persistence:** Menyimpan preferensi tema secara lokal.

## 7. Cara Instalasi dan Menjalankan Aplikasi

Pastikan Node.js dan npm sudah terpasang pada komputer.

### Langkah 1 — Instalasi Dependensi

Buka terminal pada direktori utama proyek, kemudian jalankan:

```bash
npm install
```

### Langkah 2 — Menjalankan Aplikasi

Untuk menjalankan aplikasi melalui browser:

```bash
npx expo start --web
```

Untuk menjalankan aplikasi dengan membersihkan cache:

```bash
npx expo start --web --clear
```

### Langkah 3 — Pemeriksaan TypeScript

Untuk memeriksa kesalahan tipe pada kode:

```bash
npx tsc --noEmit
```

## 8. Sumber dan Pengelolaan Data

Aplikasi menggunakan data lokal atau mock service untuk menyediakan informasi profil, pendidikan, dan portofolio.

Service bertanggung jawab mengelola proses pengambilan data, sedangkan custom hooks mengatur state dan kondisi yang ditampilkan pada halaman.

Pendekatan ini digunakan untuk menerapkan konsep pemisahan data dan logika aplikasi tanpa memerlukan integrasi API eksternal.

## 9. Catatan Implementasi

Beberapa hal yang perlu diperhatikan:

- Data profil, pendidikan, dan portofolio menggunakan data lokal/mock service.
- Pengambilan data melalui service merupakan simulasi, bukan integrasi API eksternal.
- Formulir kontak menggunakan simulasi proses pengiriman dan belum terhubung dengan email, backend, atau database.
- Preferensi tema disimpan menggunakan AsyncStorage.
- Aplikasi dapat dijalankan melalui browser menggunakan React Native Web.

## 10. Tujuan Pengembangan

Proyek ini dikembangkan untuk menerapkan konsep pengembangan aplikasi mobile yang terstruktur, modular, mudah dipelihara, responsif, serta memiliki pengalaman pengguna yang baik.

Melalui proyek ini, diharapkan dapat memahami penerapan React Native, Expo Router, TypeScript, pengelolaan state, pemisahan tanggung jawab kode, penyimpanan lokal, dan penanganan kondisi aplikasi.

---

**Personal CV — React Native & Expo**

Project Pengembangan Aplikasi Mobile.