# 📋 TO-DO LIST: IMUII-PORTAL

## 🎯 Overview
Website showcase untuk mempresentasikan semua project dan portfolio yang telah di-deploy di imuii-server. Website ini akan menjadi seperti ajang expo untuk menampilkan hasil karya mahasiswa.

---

## 🔐 **1. AUTHENTICATION & SSO INTEGRATION**

### 1.1 Setup Authentication dengan imuii-web (SSO)
- [ ] Buat utility untuk handle JWT token dari cookie `imuii-token`
- [ ] Implementasi redirect ke imuii-web untuk login jika belum authenticated
  - Redirect ke: `https://imuii.id/auth/login?redirect=https://portal.imuii.id`
- [ ] Setup API client untuk verify token ke `imuii-server`
  - Endpoint: `GET /api/v1/users/verify`
- [ ] Buat context/hook untuk manage authentication state
- [ ] Setup protected routes middleware

### 1.2 User Session Management
- [ ] Buat service untuk get user info dari JWT token
- [ ] Implementasi auto-refresh token jika expired
- [ ] Setup logout functionality (clear cookie & redirect ke imuii-web)

---

## 🎨 **2. UI/UX & THEME SETUP**

### 2.1 Setup Design System
- [ ] Install & setup Tailwind CSS (mengikuti imuii-web)
- [ ] Setup color scheme sesuai imuii-web:
  - Primary: `#7C3AED` (Violet 600)
  - Accent: `#0D9488` (Teal 600)
- [ ] Setup typography (Inter & JetBrains Mono fonts)
- [ ] Buat component library dasar (Button, Card, Input, Modal, dll)

### 2.2 Layout & Navigation
- [ ] Buat Navbar component (konsisten dengan imuii-web)
- [ ] Buat Footer component
- [ ] Setup routing (React Router)
- [ ] Buat layout wrapper untuk semua pages

---

## 📊 **3. DATA FETCHING & API INTEGRATION**

### 3.1 Setup API Client
- [ ] Buat API client service untuk komunikasi dengan imuii-server
  - Base URL: `https://api.imuii.id` atau dari env variable
- [ ] Setup axios/fetch dengan interceptors untuk:
  - Auto-attach JWT token ke headers
  - Handle 401 (redirect ke login)
  - Error handling & retry logic

### 3.2 API Endpoints Integration
- [ ] **Projects API:**
  - [ ] `GET /api/v1/projects?owner_id=xxx` - Get user's projects
  - [ ] `GET /api/v1/projects/:id` - Get project detail
  - [ ] `PUT /api/v1/projects/:id` - Update project metadata
- [ ] **Portfolios API:**
  - [ ] `GET /api/v1/portfolios?page=1&limit=100` - Get user's portfolios
  - [ ] `GET /api/v1/portfolios/:id` - Get portfolio detail
  - [ ] `PUT /api/v1/portfolios/:id` - Update portfolio metadata
- [ ] **User API:**
  - [ ] `GET /api/v1/users/verify` - Verify JWT & get user info

---

## 🏠 **4. HOMEPAGE / SHOWCASE PAGE**

### 4.1 Showcase Grid Layout
- [ ] Buat halaman showcase utama yang menampilkan semua project/portfolio
- [ ] Filter & display hanya yang status = `deployed`
- [ ] Implementasi grid layout responsive (masonry atau card grid)
- [ ] Setup pagination atau infinite scroll
- [ ] Buat ProjectCard component untuk menampilkan:
  - Preview thumbnail/screenshot
  - Project name
  - Description (truncated)
  - Owner info
  - Deploy URL link
  - Tags/categories (jika ada)

### 4.2 Search & Filter
- [ ] Implementasi search functionality (by name, description)
- [ ] Filter by type (Project vs Portfolio)
- [ ] Filter by owner/user
- [ ] Sort options (newest, oldest, alphabetical)

---

## 📝 **5. PROJECT/PORTFOLIO DETAIL PAGE**

### 5.1 Detail View
- [ ] Buat detail page untuk project/portfolio
- [ ] Tampilkan informasi lengkap:
  - Title/Name
  - Description
  - Owner/Team info
  - Deploy URL (link ke website)
  - YouTube link (jika ada)
  - Created date
  - Status badge
- [ ] Embed preview/iframe website (optional)
- [ ] Social share buttons

### 5.2 Edit Metadata (untuk Owner)
- [ ] Buat edit modal/form untuk owner project
- [ ] Fields yang bisa di-edit:
  - **Title/Name** (required)
  - **Description** (textarea, markdown support?)
  - **Team Members** (array of names/emails)
  - **YouTube Link** (URL validation)
  - **Tags/Categories** (optional)
  - **Featured Image/Thumbnail** (optional, upload)
- [ ] Validasi form sebelum submit
- [ ] Call API `PUT /api/v1/projects/:id` atau `PUT /api/v1/portfolios/:id`
- [ ] Show success/error toast notifications

---

## 🗄️ **6. DATABASE SCHEMA EXTENSION (imuii-server)**

### 6.1 Extend Project Model
- [ ] Tambahkan fields baru ke `Project` model:
  - `ShowcaseTitle` (string, nullable) - Custom title untuk showcase
  - `ShowcaseDescription` (text, nullable) - Custom description
  - `TeamMembers` (JSON array, nullable) - List team members
  - `YouTubeLink` (string, nullable) - YouTube promo video URL
  - `ThumbnailURL` (string, nullable) - Custom thumbnail image
  - `IsShowcased` (boolean, default: true) - Flag untuk hide/show di showcase
  - `Tags` (JSON array, nullable) - Tags untuk filtering

### 6.2 Extend Portfolio Model
- [ ] Tambahkan fields yang sama ke `Portfolio` model:
  - `ShowcaseTitle`
  - `ShowcaseDescription`
  - `TeamMembers`
  - `YouTubeLink`
  - `ThumbnailURL`
  - `IsShowcased`
  - `Tags`

### 6.3 Database Migration
- [ ] Buat migration script untuk add columns baru
- [ ] Update GORM models di imuii-server
- [ ] Update API response models

---

## 🔧 **7. BACKEND API EXTENSIONS (imuii-server)**

### 7.1 Update Project API
- [ ] Update `PUT /api/v1/projects/:id` handler untuk accept fields baru
- [ ] Validasi YouTube URL format
- [ ] Validasi team members array
- [ ] Update project service & repository

### 7.2 Update Portfolio API
- [ ] Update `PUT /api/v1/portfolios/:id` handler untuk accept fields baru
- [ ] Validasi yang sama seperti project

### 7.3 New Showcase API (Optional)
- [ ] Buat endpoint khusus untuk showcase: `GET /api/v1/showcase`
  - Return semua project/portfolio dengan `status = 'deployed'` dan `is_showcased = true`
  - Support filtering & pagination
  - Include owner info

---

## 🎯 **8. FEATURES TAMBAHAN**

### 8.1 User Profile Integration
- [ ] Tampilkan user profile di showcase card
- [ ] Link ke user profile page (jika ada)
- [ ] Avatar & name display

### 8.2 Analytics & Stats (Future)
- [ ] Track view counts per project/portfolio
- [ ] Track click-through rates
- [ ] Display stats di detail page

### 8.3 Featured/Highlighted Projects
- [ ] Support untuk featured projects (pin to top)
- [ ] Admin functionality untuk mark as featured

---

## 🧪 **9. TESTING & QUALITY ASSURANCE**

### 9.1 Testing
- [ ] Unit tests untuk API client
- [ ] Component tests untuk UI components
- [ ] Integration tests untuk auth flow
- [ ] E2E tests untuk critical flows

### 9.2 Error Handling
- [ ] Handle API errors gracefully
- [ ] Show user-friendly error messages
- [ ] Handle network failures
- [ ] Handle expired tokens

---

## 🚀 **10. DEPLOYMENT & CONFIGURATION**

### 10.1 Environment Setup
- [ ] Setup environment variables:
  - `VITE_API_BASE_URL` - imuii-server API URL
  - `VITE_WEB_BASE_URL` - imuii-web URL untuk SSO redirect
  - `VITE_PORTAL_BASE_URL` - imuii-portal URL sendiri

### 10.2 Build & Deploy
- [ ] Setup build script
- [ ] Setup production build optimization
- [ ] Deploy ke hosting (Vercel/Netlify/Cloudflare Pages)
- [ ] Setup custom domain (portal.imuii.id)

### 10.3 SEO & Performance
- [ ] Setup meta tags untuk SEO
- [ ] Setup Open Graph tags
- [ ] Optimize images & assets
- [ ] Setup lazy loading untuk images

---

## 📱 **11. RESPONSIVE DESIGN**

- [ ] Mobile-first responsive design
- [ ] Tablet layout optimization
- [ ] Desktop layout optimization
- [ ] Test di berbagai device sizes

---

## 📚 **12. DOCUMENTATION**

- [ ] Update README.md dengan setup instructions
- [ ] Document API integration
- [ ] Document authentication flow
- [ ] Document deployment process

---

## 🔗 **DEPENDENCIES ANTAR MODULE**

### imuii-portal → imuii-web
- SSO authentication (redirect ke login, verify token)

### imuii-portal → imuii-server
- Get projects/portfolios data
- Update project/portfolio metadata
- Verify JWT token

### imuii-server → Database
- Migration untuk add showcase fields
- Update models & repositories

---

## 🎯 **PRIORITAS IMPLEMENTASI**

### Phase 1 (MVP - Minimum Viable Product)
1. Authentication & SSO integration
2. Basic UI setup & theme
3. API client setup
4. Showcase page (read-only)
5. Detail page (read-only)

### Phase 2 (Core Features)
6. Edit metadata functionality
7. Database migration & API updates
8. Search & filter
9. Responsive design

### Phase 3 (Enhancements)
10. Advanced features (analytics, featured projects)
11. Performance optimization
12. Testing & documentation

