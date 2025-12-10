# 📦 Dummy Data untuk MVP

Dokumen ini menjelaskan penggunaan dummy data untuk development dan MVP awal.

## 🎯 Tujuan

Dummy data digunakan untuk:
- Development frontend tanpa perlu backend yang fully ready
- Testing UI/UX dengan data yang realistic
- Demo MVP awal
- Development paralel frontend dan backend

## 📁 File Dummy Data

**Location**: `src/data/dummyData.js`

File ini berisi:
- **dummyUsers**: 3 sample users
- **dummyProjects**: 4 sample projects dengan showcase fields
- **dummyPortfolios**: 3 sample portfolios dengan showcase fields

## 🔧 Cara Menggunakan

### Option 1: Auto-enable (Recommended untuk MVP)

Kosongkan atau hapus `VITE_API_BASE_URL` di `.env.local`:

```env
# VITE_API_BASE_URL=
VITE_API_BASE_URL=
```

Hooks akan otomatis menggunakan dummy data jika `VITE_API_BASE_URL` tidak ada.

### Option 2: Manual Enable

Set `VITE_USE_DUMMY_DATA=true` di `.env.local`:

```env
VITE_API_BASE_URL=https://api.imuii.id
VITE_USE_DUMMY_DATA=true
```

## 📊 Data yang Tersedia

### Projects (4 items)
1. **E-Commerce Platform** - Ahmad Fauzi
   - Tags: React, Node.js, E-Commerce, Payment Gateway
   - Team: 2 members
   - YouTube link: ada
   - Thumbnail: ada

2. **Task Management App** - Siti Nurhaliza
   - Tags: Vue.js, Firebase, Real-time, Collaboration
   - Team: 1 member
   - YouTube link: tidak ada

3. **Weather Dashboard** - Budi Santoso
   - Tags: React, API Integration, Data Visualization, Weather
   - Team: 2 members
   - YouTube link: ada

4. **Social Media Analytics** - Ahmad Fauzi
   - Tags: Python, Data Analytics, Machine Learning, Social Media
   - Team: 1 member
   - YouTube link: tidak ada

### Portfolios (3 items)
1. **Ahmad Fauzi - Full Stack Developer**
   - Tags: Portfolio, Full Stack, React, Node.js
   - Deploy URL: https://ahmadfauzi.imuii.id

2. **Siti Nurhaliza - UI/UX Designer**
   - Tags: Portfolio, UI/UX, Design, Figma
   - YouTube link: ada
   - Deploy URL: https://sitinurhaliza.imuii.id

3. **Budi Santoso - Data Analyst**
   - Tags: Portfolio, Data Analysis, Visualization, Python
   - Deploy URL: https://budisantoso.imuii.id

## 🔄 Switch ke Real API

Ketika backend sudah ready:

1. Set `VITE_API_BASE_URL` dengan URL backend yang benar
2. Set `VITE_USE_DUMMY_DATA=false` atau hapus variable tersebut
3. Restart development server

Hooks akan otomatis switch ke real API.

## 📝 Catatan

- Dummy data menggunakan struktur yang sama dengan real API response
- Showcase fields (showcase_title, showcase_description, team_members, youtube_link, tags, thumbnail_url) sudah included
- Data akan di-filter untuk hanya show items dengan `status === "deployed"`
- Semua items sudah memiliki `type` field ("project" atau "portfolio")

## 🧪 Testing

Untuk test dengan dummy data:

1. Pastikan `.env.local` tidak punya `VITE_API_BASE_URL` atau set `VITE_USE_DUMMY_DATA=true`
2. Start dev server: `npm run dev`
3. Navigate ke showcase page
4. Test search, filter, dan detail pages

## 🎨 Customize Dummy Data

Edit `src/data/dummyData.js` untuk:
- Menambah/mengurangi projects atau portfolios
- Mengubah data existing
- Menambah showcase fields
- Menyesuaikan dengan kebutuhan testing

