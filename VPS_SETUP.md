# VPS Setup Guide

Panduan setup imuii-portal di VPS menggunakan file `config.js` (tanpa .env).

## Keuntungan Menggunakan config.js

- ✅ Lebih mudah di-edit di VPS (tidak perlu setup .env)
- ✅ Semua konfigurasi di satu file
- ✅ Tidak perlu rebuild setelah edit (jika edit langsung di dist)
- ✅ Lebih mudah untuk debugging

## Setup di VPS

### 1. Clone Repository

```bash
git clone <repository-url>
cd imuii-portal
npm install
```

### 2. Konfigurasi

Edit file `src/config/config.js`:

```javascript
const config = {
  api: {
    baseUrl: "https://api.imuii.id", // Ganti dengan API URL Anda
  },
  sso: {
    webBaseUrl: "https://imuii.id", // Ganti dengan web URL Anda
    portalBaseUrl: "https://portal.imuii.id", // Ganti dengan portal URL Anda
  },
  features: {
    useDummyData: false, // false untuk production
  },
};
```

### 3. Build

```bash
npm run build
```

Output akan di folder `dist/`.

### 4. Deploy

Copy folder `dist/` ke web server (Nginx, Apache, dll).

**Contoh dengan Nginx:**

```nginx
server {
    listen 80;
    server_name portal.imuii.id;

    root /path/to/imuii-portal/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 5. Update Konfigurasi Setelah Deploy

Jika perlu update konfigurasi setelah build:

**Option 1: Rebuild**
```bash
# Edit src/config/config.js
npm run build
# Deploy dist/ lagi
```

**Option 2: Edit Langsung di dist (Quick Fix)**
```bash
# Edit dist/assets/*.js (cari file yang berisi config)
# Atau gunakan sed untuk replace
sed -i 's|https://api.imuii.id|https://your-api-url.com|g' dist/assets/*.js
```

**Note**: Option 2 hanya untuk quick fix. Untuk production, lebih baik rebuild.

## Environment-Specific Configs

Jika perlu config berbeda untuk development/production:

1. Buat `config.development.js` dan `config.production.js`
2. Update build script di `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "build:dev": "cp src/config/config.development.js src/config/config.js && vite build",
    "build:prod": "cp src/config/config.production.js src/config/config.js && vite build"
  }
}
```

3. Build dengan:
```bash
npm run build:prod  # untuk production
npm run build:dev   # untuk development
```

## Troubleshooting

### Config Tidak Berubah Setelah Edit

- Pastikan edit file `src/config/config.js` (bukan `config.example.js`)
- Rebuild aplikasi: `npm run build`
- Clear browser cache

### API Calls Failing

- Check `api.baseUrl` di config.js
- Check CORS settings di backend
- Check network connectivity

### SSO Login Not Working

- Check `sso.webBaseUrl` dan `sso.portalBaseUrl` di config.js
- Check callback URL configured di imuii-web
- Check cookie domain settings

## Security Notes

- File `config.js` berisi URL public (tidak sensitif)
- Jangan commit sensitive data (API keys, secrets) ke config.js
- Untuk sensitive data, gunakan environment variables atau secure storage

