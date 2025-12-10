# IM-UII Portal

Portal untuk menampilkan showcase projects dan portfolios dari mahasiswa IM-UII.

## Overview

IM-UII Portal adalah aplikasi React yang terintegrasi dengan:
- **imuii-server**: Backend API untuk projects dan portfolios
- **imuii-web**: SSO authentication provider

## Setup

### Prerequisites

- Node.js 18+ 
- npm atau yarn

### Installation

```bash
npm install
```

### Configuration

Aplikasi menggunakan file `src/config/config.js` untuk konfigurasi (lebih mudah untuk setup di VPS).

**Setup Configuration:**

1. Copy example file:
```bash
cp src/config/config.example.js src/config/config.js
```

2. Edit `src/config/config.js` dengan nilai yang sesuai:

```javascript
const config = {
  // API Configuration
  api: {
    baseUrl: "https://api.imuii.id", // Change to your API URL
  },

  // SSO Configuration
  sso: {
    webBaseUrl: "https://imuii.id", // Change to your web URL
    portalBaseUrl: "https://portal.imuii.id", // Change to your portal URL
  },

  // Feature Flags
  features: {
    useDummyData: false, // Set to true for development with dummy data
  },
};
```

**Note**: 
- Untuk development, gunakan staging URLs sesuai environment yang tersedia
- File `config.js` sudah di-set dengan default production values
- Untuk VPS deployment, cukup edit file ini tanpa perlu setup .env

### Development

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build

```bash
npm run build
```

## Integration

### Backend API (imuii-server)

Portal menggunakan API endpoints berikut:

- `GET /api/v1/projects?owner_id={userId}&page={page}&limit={limit}` - Get projects by owner
- `GET /api/v1/projects/{id}` - Get project by ID
- `PUT /api/v1/projects/{id}` - Update project (including showcase fields)
- `GET /api/v1/portfolios?user_id={userId}&page={page}&limit={limit}` - Get portfolios by user
- `GET /api/v1/portfolios/{id}` - Get portfolio by ID
- `PUT /api/v1/portfolios/{id}` - Update portfolio (including showcase fields)

**Showcase Fields**:
- `showcase_title` (string, max 200 chars)
- `showcase_description` (text)
- `team_members` (JSON array: [{name, email, role}])
- `youtube_link` (URL)
- `thumbnail_url` (URL)
- `tags` (JSON array of strings)
- `is_showcased` (boolean)

### SSO Authentication (imuii-web)

Portal menggunakan SSO flow dengan imuii-web:

1. User klik Login → redirect ke `${VITE_WEB_BASE_URL}/auth/login?redirect=${portalCallbackUrl}`
2. User login di imuii-web
3. imuii-web redirect kembali ke `${VITE_PORTAL_BASE_URL}/auth/callback` dengan JWT token di cookie
4. Portal extract token dari cookie dan store untuk API calls

**JWT Token**:
- Stored di cookie dengan nama `imuii-token`
- Attached ke API requests sebagai `Authorization: Bearer {token}`
- Auto-redirect ke login jika token expired (401 response)

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (AuthContext)
├── hooks/          # Custom hooks (useProjects, usePortfolios, etc.)
├── pages/          # Page components
├── services/       # API service layer
└── utils/          # Utility functions (cookie, JWT, etc.)
```

## Features

- **Showcase Page**: Display deployed projects and portfolios
- **Detail Page**: Show project/portfolio details with showcase fields
- **Edit Form**: Update showcase fields (owner only)
- **Search & Filter**: Search by title, filter by tags
- **SSO Login**: Single Sign-On dengan imuii-web
- **Protected Routes**: Owner-only edit functionality

## Troubleshooting

### API Calls Failing
- Check `VITE_API_BASE_URL` is correct
- Check CORS configuration di backend
- Check JWT token valid (check cookie `imuii-token`)
- Check network connectivity

### SSO Login Not Working
- Check `VITE_WEB_BASE_URL` is correct
- Check callback URL configured di imuii-web
- Check cookie domain settings (should be `.imuii.id` for production)
- Check SameSite attribute (should be "lax" or "none" for cross-domain)

### Showcase Fields Not Showing
- Check database migration run di backend
- Check API response includes showcase fields
- Check field names match (snake_case from API vs camelCase in frontend)

### Update Not Working
- Check validation rules (title max 200, URLs valid format)
- Check request body format matches API expectations
- Check authorization (owner only)
- Check API endpoint correct

## Development Notes

- **Dummy Data Mode**: Set `VITE_USE_DUMMY_DATA=true` untuk development tanpa backend
- **API Response Format**: Backend returns `{ success: true, data: {...}, message: "..." }`, frontend extracts `data` field
- **Error Handling**: 401 errors auto-redirect to login, other errors show toast messages
