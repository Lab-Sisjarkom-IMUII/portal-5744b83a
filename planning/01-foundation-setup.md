# 🎯 PHASE 1: FOUNDATION & SETUP

## 📋 Overview
Setup dasar project, dependencies, design system, dan layout structure.

---

## ✅ 1.1 Project Initialization & Dependencies

### Step 1.1.1: Review Current Project Structure
- [ ] Buka dan review file `package.json` yang sudah ada
- [ ] Check versi React dan Vite yang digunakan
- [ ] Review struktur folder `src/` yang sudah ada
- [ ] Identifikasi apa yang sudah ada dan apa yang perlu ditambahkan

### Step 1.1.2: Install Routing Dependencies
- [ ] Install `react-router-dom` dengan command: `npm install react-router-dom`
- [ ] Verify installation di `package.json`
- [ ] Check versi yang terinstall

### Step 1.1.3: Install API Client Dependencies
- [ ] Install `axios` dengan command: `npm install axios`
- [ ] Atau decide untuk menggunakan native `fetch` API
- [ ] Jika pilih axios, verify installation

### Step 1.1.4: Install Styling Dependencies
- [ ] Install Tailwind CSS dengan command: `npm install -D tailwindcss postcss autoprefixer`
- [ ] Install Tailwind CSS plugins jika diperlukan
- [ ] Verify installation

### Step 1.1.5: Install Animation Dependencies (Optional)
- [ ] Install `framer-motion` dengan command: `npm install framer-motion`
- [ ] Verify installation
- [ ] Note: Optional, bisa skip jika tidak perlu animations

### Step 1.1.6: Install Icon Dependencies
- [ ] Install `lucide-react` dengan command: `npm install lucide-react`
- [ ] Verify installation
- [ ] Check icon set yang tersedia

### Step 1.1.7: Create Folder Structure
- [ ] Buat folder `src/components/` jika belum ada
- [ ] Buat folder `src/pages/` jika belum ada
- [ ] Buat folder `src/services/` jika belum ada
- [ ] Buat folder `src/contexts/` jika belum ada
- [ ] Buat folder `src/hooks/` jika belum ada
- [ ] Buat folder `src/utils/` jika belum ada
- [ ] Buat folder `src/lib/` jika belum ada
- [ ] Verify semua folder sudah dibuat

### Step 1.1.8: Setup Environment Variables
- [ ] Buat file `.env.local` di root project
- [ ] Tambahkan `VITE_API_BASE_URL=https://api.imuii.id`
- [ ] Tambahkan `VITE_WEB_BASE_URL=https://imuii.id`
- [ ] Tambahkan `VITE_PORTAL_BASE_URL=https://portal.imuii.id`
- [ ] Buat file `.env.example` sebagai template
- [ ] Copy isi `.env.local` ke `.env.example` (tanpa nilai sensitive)
- [ ] Add `.env.local` ke `.gitignore` jika belum ada

### Step 1.1.9: Verify Dependencies
- [ ] Run `npm install` untuk memastikan semua dependencies terinstall
- [ ] Check `node_modules/` folder
- [ ] Verify tidak ada error di console

---

## ✅ 1.2 Design System & Theme Setup

### Step 1.2.1: Initialize Tailwind CSS
- [ ] Run command: `npx tailwindcss init -p`
- [ ] Verify file `tailwind.config.js` dan `postcss.config.js` terbuat
- [ ] Check konfigurasi default

### Step 1.2.2: Configure Tailwind Config File
- [ ] Buka `tailwind.config.js`
- [ ] Setup content paths: `['./index.html', './src/**/*.{js,ts,jsx,tsx}']`
- [ ] Add primary color: `primary: '#7C3AED'` di theme.extend.colors
- [ ] Add accent color: `accent: '#0D9488'` di theme.extend.colors
- [ ] Add background colors untuk light/dark mode
- [ ] Add text colors
- [ ] Add border colors
- [ ] Save dan verify tidak ada syntax error

### Step 1.2.3: Setup Tailwind CSS in Main CSS
- [ ] Buka file CSS utama (biasanya `src/index.css` atau `src/App.css`)
- [ ] Add Tailwind directives di top:
  - `@tailwind base;`
  - `@tailwind components;`
  - `@tailwind utilities;`
- [ ] Save file

### Step 1.2.4: Import Fonts - Inter
- [ ] Buka `index.html` atau main CSS file
- [ ] Add Google Fonts link untuk Inter:
  - `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">`
- [ ] Atau import via CSS: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');`

### Step 1.2.5: Import Fonts - JetBrains Mono
- [ ] Add Google Fonts link untuk JetBrains Mono:
  - `<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">`
- [ ] Atau import via CSS

### Step 1.2.6: Setup Font Variables in CSS
- [ ] Di CSS file, add CSS variables:
  - `--font-inter: 'Inter', sans-serif;`
  - `--font-mono: 'JetBrains Mono', monospace;`
- [ ] Apply ke body: `font-family: var(--font-inter);`
- [ ] Apply ke code elements: `font-family: var(--font-mono);`

### Step 1.2.7: Create Button Component
- [ ] Buat file `src/components/Button.jsx`
- [ ] Define props: variant (primary, secondary, accent), size, children, onClick, disabled
- [ ] Implementasi styling dengan Tailwind classes
- [ ] Add hover dan active states
- [ ] Add disabled state styling
- [ ] Export component
- [ ] Test render component di App.jsx

### Step 1.2.8: Create Card Component
- [ ] Buat file `src/components/Card.jsx`
- [ ] Define props: children, className, onClick
- [ ] Implementasi base card styling dengan Tailwind
- [ ] Add shadow dan border
- [ ] Add hover effects (optional)
- [ ] Export component
- [ ] Test render component

### Step 1.2.9: Create Input Component
- [ ] Buat file `src/components/Input.jsx`
- [ ] Define props: type, placeholder, value, onChange, label, error
- [ ] Implementasi input styling dengan Tailwind
- [ ] Add label styling
- [ ] Add error state styling
- [ ] Add focus states
- [ ] Export component
- [ ] Test render component

### Step 1.2.10: Create Modal/Dialog Component
- [ ] Buat file `src/components/Modal.jsx`
- [ ] Define props: isOpen, onClose, title, children
- [ ] Implementasi overlay backdrop
- [ ] Implementasi modal container
- [ ] Add close button
- [ ] Add animation untuk open/close (optional)
- [ ] Handle click outside untuk close
- [ ] Export component
- [ ] Test render component

### Step 1.2.11: Create Toast/Notification Component
- [ ] Buat file `src/components/Toast.jsx`
- [ ] Define props: message, type (success, error, warning, info), isVisible, onClose
- [ ] Implementasi toast container styling
- [ ] Add different colors untuk each type
- [ ] Add auto-dismiss functionality
- [ ] Add manual close button
- [ ] Add animation untuk show/hide
- [ ] Export component
- [ ] Test render component

### Step 1.2.12: Create Loading/Spinner Component
- [ ] Buat file `src/components/Spinner.jsx`
- [ ] Define props: size, color
- [ ] Implementasi spinner dengan CSS animation
- [ ] Add different sizes (sm, md, lg)
- [ ] Export component
- [ ] Test render component

### Step 1.2.13: Setup Dark Mode Support (Optional)
- [ ] Decide apakah perlu dark mode
- [ ] Jika ya, setup Tailwind dark mode: `darkMode: 'class'` di config
- [ ] Add dark mode colors di theme
- [ ] Create toggle component untuk switch dark/light mode
- [ ] Store preference di localStorage

### Step 1.2.14: Create Utility Classes
- [ ] Review utility classes yang sering digunakan
- [ ] Add custom utility classes di Tailwind config jika perlu
- [ ] Document utility classes yang dibuat

---

## ✅ 1.3 Layout & Navigation Setup

### Step 1.3.1: Install React Router
- [ ] Verify `react-router-dom` sudah terinstall
- [ ] Check versi di `package.json`

### Step 1.3.2: Create Route Configuration
- [ ] Buat file `src/lib/routes.js` atau `src/routes.js`
- [ ] Define route paths:
  - `/` - Home/Showcase page
  - `/project/:id` - Project detail
  - `/portfolio/:id` - Portfolio detail
- [ ] Export route configuration

### Step 1.3.3: Setup Router in Main App
- [ ] Buka `src/main.jsx` atau `src/App.jsx`
- [ ] Import `BrowserRouter` dari react-router-dom
- [ ] Wrap app dengan `<BrowserRouter>`
- [ ] Import `Routes` dan `Route` dari react-router-dom
- [ ] Setup basic routes structure
- [ ] Test routing working

### Step 1.3.4: Create Layout Component
- [ ] Buat file `src/components/Layout.jsx`
- [ ] Define props: children
- [ ] Import Navbar dan Footer components (akan dibuat selanjutnya)
- [ ] Structure layout:
  - Navbar di top
  - Main content area dengan children
  - Footer di bottom
- [ ] Add container untuk content
- [ ] Export component

### Step 1.3.5: Create Navbar Component - Structure
- [ ] Buat file `src/components/Navbar.jsx`
- [ ] Create basic structure:
  - Container div
  - Logo/branding section
  - Navigation links section
  - User menu section (placeholder untuk sekarang)
- [ ] Add basic styling dengan Tailwind
- [ ] Make it responsive (mobile menu akan ditambahkan nanti)

### Step 1.3.6: Create Navbar Component - Logo
- [ ] Add logo image atau text branding
- [ ] Link logo ke home page (`/`)
- [ ] Style logo dengan Tailwind
- [ ] Make logo responsive

### Step 1.3.7: Create Navbar Component - Navigation Links
- [ ] Add navigation links:
  - Home/Showcase link
  - About link (optional)
- [ ] Style links dengan Tailwind
- [ ] Add active state styling
- [ ] Make links responsive

### Step 1.3.8: Create Navbar Component - User Menu Placeholder
- [ ] Add placeholder untuk user menu
- [ ] Add conditional rendering: show login button jika not logged in
- [ ] Add placeholder untuk user menu jika logged in
- [ ] Style dengan Tailwind
- [ ] Note: Akan diimplementasi di Phase 2

### Step 1.3.9: Create Navbar Component - Login Button
- [ ] Add login button
- [ ] Style button dengan Tailwind (gunakan Button component jika sudah dibuat)
- [ ] Add onClick handler (placeholder, akan redirect ke imuii-web nanti)
- [ ] Make button responsive

### Step 1.3.10: Create Footer Component - Structure
- [ ] Buat file `src/components/Footer.jsx`
- [ ] Create basic structure:
  - Container div
  - Links section
  - Copyright section
- [ ] Add basic styling dengan Tailwind
- [ ] Make it responsive

### Step 1.3.11: Create Footer Component - Links
- [ ] Add links ke:
  - imuii-web (https://imuii.id)
  - imuii-server docs (jika ada)
  - GitHub repository (jika ada)
- [ ] Style links dengan Tailwind
- [ ] Make links open in new tab (target="_blank")

### Step 1.3.12: Create Footer Component - Copyright
- [ ] Add copyright text
- [ ] Include current year
- [ ] Style dengan Tailwind
- [ ] Center align

### Step 1.3.13: Create Footer Component - Social Media (Optional)
- [ ] Add social media links jika ada:
  - Twitter
  - LinkedIn
  - GitHub
- [ ] Add icons menggunakan lucide-react
- [ ] Style dengan Tailwind

### Step 1.3.14: Integrate Layout in Routes
- [ ] Update route configuration
- [ ] Wrap routes dengan Layout component
- [ ] Test layout rendering di semua pages

### Step 1.3.15: Setup Mobile Menu
- [ ] Add hamburger menu icon untuk mobile
- [ ] Add state untuk toggle mobile menu
- [ ] Create mobile menu overlay
- [ ] Add animation untuk open/close
- [ ] Make navigation links accessible di mobile menu
- [ ] Test mobile menu functionality

### Step 1.3.16: Test Navigation
- [ ] Test semua navigation links working
- [ ] Test mobile menu di mobile view
- [ ] Test responsive design di berbagai screen sizes
- [ ] Fix any issues

---

## 📦 Deliverables Checklist

- [ ] ✅ Project structure rapi dengan semua folder yang diperlukan
- [ ] ✅ Semua dependencies terinstall dan working
- [ ] ✅ Environment variables configured
- [ ] ✅ Tailwind CSS configured dengan color scheme
- [ ] ✅ Typography setup (Inter & JetBrains Mono)
- [ ] ✅ Base components created (Button, Card, Input, Modal, Toast, Spinner)
- [ ] ✅ Layout component created
- [ ] ✅ Navbar component created dan responsive
- [ ] ✅ Footer component created
- [ ] ✅ Routing system working
- [ ] ✅ All components tested dan rendering correctly

---

## 🎯 Next Phase
Setelah Phase 1 selesai, lanjut ke **Phase 2: Authentication & SSO**

