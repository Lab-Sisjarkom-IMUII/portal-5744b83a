# 🔗 PHASE 9: INTEGRATION WITH IMUII-SERVER & IMUII-WEB

## 📋 Overview
Integrasi imuii-portal dengan imuii-server (backend API) dan imuii-web (SSO authentication). Phase ini mencakup backend extensions, API integration testing, dan SSO flow verification.

---

## ✅ 9.1 Backend Extensions (imuii-server)

### Step 9.1.1: Review Current Database Schema
- [ ] Buka `imuii-server/internal/model/project.go`
- [ ] Review existing Project model structure
- [ ] Note current fields dan types
- [ ] Check GORM tags dan constraints
- [ ] Review migration files structure

### Step 9.1.2: Review Current Portfolio Model
- [ ] Buka `imuii-server/internal/model/portfolio.go`
- [ ] Review existing Portfolio model structure
- [ ] Compare dengan Project model
- [ ] Note differences dan similarities

### Step 9.1.3: Plan Showcase Fields for Project Model
- [ ] Plan new fields untuk Project:
  - `ShowcaseTitle` (string, nullable, max 200 chars)
  - `ShowcaseDescription` (text, nullable)
  - `TeamMembers` (JSONB, nullable) - array of {name, email, role}
  - `YouTubeLink` (string, nullable, URL validation)
  - `ThumbnailURL` (string, nullable, URL validation)
  - `Tags` (JSONB, nullable) - array of strings
  - `IsShowcased` (boolean, default: true)
- [ ] Document field purposes
- [ ] Plan GORM tags untuk each field
- [ ] Plan validation rules

### Step 9.1.4: Plan Showcase Fields for Portfolio Model
- [ ] Plan same fields seperti Project:
  - `ShowcaseTitle`
  - `ShowcaseDescription`
  - `TeamMembers`
  - `YouTubeLink`
  - `ThumbnailURL`
  - `Tags`
  - `IsShowcased`
- [ ] Ensure consistency dengan Project model
- [ ] Document field purposes

### Step 9.1.5: Create Database Migration - Project Model
- [ ] Buka atau buat migration file di `imuii-server/scripts/migrations/`
- [ ] Create migration untuk add showcase fields ke projects table:
  ```sql
  ALTER TABLE projects 
  ADD COLUMN showcase_title VARCHAR(200),
  ADD COLUMN showcase_description TEXT,
  ADD COLUMN team_members JSONB,
  ADD COLUMN youtube_link VARCHAR(500),
  ADD COLUMN thumbnail_url VARCHAR(500),
  ADD COLUMN tags JSONB,
  ADD COLUMN is_showcased BOOLEAN DEFAULT true;
  ```
- [ ] Add indexes jika perlu (untuk search/filter)
- [ ] Test migration script

### Step 9.1.6: Create Database Migration - Portfolio Model
- [ ] Create migration untuk add showcase fields ke portfolios table:
  ```sql
  ALTER TABLE portfolios 
  ADD COLUMN showcase_title VARCHAR(200),
  ADD COLUMN showcase_description TEXT,
  ADD COLUMN team_members JSONB,
  ADD COLUMN youtube_link VARCHAR(500),
  ADD COLUMN thumbnail_url VARCHAR(500),
  ADD COLUMN tags JSONB,
  ADD COLUMN is_showcased BOOLEAN DEFAULT true;
  ```
- [ ] Ensure consistency dengan projects migration
- [ ] Test migration script

### Step 9.1.7: Update Project Model - Add Fields
- [ ] Buka `imuii-server/internal/model/project.go`
- [ ] Add showcase fields ke struct:
  ```go
  ShowcaseTitle      *string         `gorm:"column:showcase_title;type:varchar(200)" json:"showcase_title,omitempty"`
  ShowcaseDescription *string        `gorm:"column:showcase_description;type:text" json:"showcase_description,omitempty"`
  TeamMembers        datatypes.JSON  `gorm:"column:team_members;type:jsonb" json:"team_members,omitempty"`
  YouTubeLink        *string         `gorm:"column:youtube_link;type:varchar(500)" json:"youtube_link,omitempty"`
  ThumbnailURL       *string         `gorm:"column:thumbnail_url;type:varchar(500)" json:"thumbnail_url,omitempty"`
  Tags               datatypes.JSON  `gorm:"column:tags;type:jsonb" json:"tags,omitempty"`
  IsShowcased        bool            `gorm:"column:is_showcased;default:true" json:"is_showcased"`
  ```
- [ ] Import `gorm.io/datatypes` jika belum
- [ ] Verify GORM tags correct
- [ ] Test model compilation

### Step 9.1.8: Update Portfolio Model - Add Fields
- [ ] Buka `imuii-server/internal/model/portfolio.go`
- [ ] Add same showcase fields ke Portfolio struct
- [ ] Ensure consistency dengan Project model
- [ ] Test model compilation

### Step 9.1.9: Run Database Migration
- [ ] Backup database sebelum migration
- [ ] Run migration script untuk projects table
- [ ] Run migration script untuk portfolios table
- [ ] Verify columns added correctly
- [ ] Test dengan sample data

### Step 9.1.10: Update Project Repository - Include Showcase Fields
- [ ] Buka `imuii-server/internal/repository/project.go` (atau similar)
- [ ] Review existing repository methods
- [ ] Ensure all SELECT queries include showcase fields
- [ ] Update Create method untuk handle showcase fields
- [ ] Update Update method untuk handle showcase fields
- [ ] Test repository methods

### Step 9.1.11: Update Portfolio Repository - Include Showcase Fields
- [ ] Buka `imuii-server/internal/repository/portfolio.go` (atau similar)
- [ ] Review existing repository methods
- [ ] Ensure all SELECT queries include showcase fields
- [ ] Update Create method untuk handle showcase fields
- [ ] Update Update method untuk handle showcase fields
- [ ] Test repository methods

### Step 9.1.12: Update Project Service - Validation
- [ ] Buka `imuii-server/internal/service/project.go` (atau similar)
- [ ] Add validation untuk showcase fields:
  - ShowcaseTitle: max 200 chars
  - YouTubeLink: valid URL format
  - ThumbnailURL: valid URL format
  - TeamMembers: valid JSON array structure
  - Tags: valid JSON array of strings
- [ ] Add validation functions
- [ ] Test validation logic

### Step 9.1.13: Update Portfolio Service - Validation
- [ ] Buka `imuii-server/internal/service/portfolio.go` (atau similar)
- [ ] Add same validation seperti Project service
- [ ] Test validation logic

### Step 9.1.14: Update Project API Handler - GET by ID
- [ ] Buka `imuii-server/internal/handler/project.go` (atau routes)
- [ ] Find GET `/api/v1/projects/:id` handler
- [ ] Verify response includes showcase fields
- [ ] Test endpoint dengan Postman/curl
- [ ] Verify JSON response format

### Step 9.1.15: Update Project API Handler - PUT (Update)
- [ ] Find PUT `/api/v1/projects/:id` handler
- [ ] Update handler untuk accept showcase fields di request body
- [ ] Add validation untuk showcase fields
- [ ] Test endpoint dengan Postman/curl
- [ ] Verify update working correctly

### Step 9.1.16: Update Portfolio API Handler - GET by ID
- [ ] Buka `imuii-server/internal/handler/portfolio.go` (atau routes)
- [ ] Find GET `/api/v1/portfolios/:id` handler
- [ ] Verify response includes showcase fields
- [ ] Test endpoint dengan Postman/curl
- [ ] Verify JSON response format

### Step 9.1.17: Update Portfolio API Handler - PUT (Update)
- [ ] Find PUT `/api/v1/portfolios/:id` handler
- [ ] Update handler untuk accept showcase fields di request body
- [ ] Add validation untuk showcase fields
- [ ] Test endpoint dengan Postman/curl
- [ ] Verify update working correctly

### Step 9.1.18: Update Projects List Endpoint - Include Showcase Fields
- [ ] Find GET `/api/v1/projects` handler (list endpoint)
- [ ] Verify response includes showcase fields untuk each project
- [ ] Test dengan query params (owner_id, status, etc.)
- [ ] Verify pagination still working

### Step 9.1.19: Update Portfolios List Endpoint - Include Showcase Fields
- [ ] Find GET `/api/v1/portfolios` handler (list endpoint)
- [ ] Verify response includes showcase fields untuk each portfolio
- [ ] Test dengan query params
- [ ] Verify pagination still working

### Step 9.1.20: Test All Backend Changes
- [ ] Test GET project by ID dengan showcase fields
- [ ] Test PUT project update dengan showcase fields
- [ ] Test GET portfolio by ID dengan showcase fields
- [ ] Test PUT portfolio update dengan showcase fields
- [ ] Test list endpoints dengan showcase fields
- [ ] Verify backward compatibility (existing data)
- [ ] Test error handling

---

## ✅ 9.2 Frontend Integration - Switch to Real API

### Step 9.2.1: Review Current Environment Configuration
- [ ] Buka `imuii-portal/.env.local` (atau `.env.example`)
- [ ] Review current environment variables
- [ ] Note current `VITE_API_BASE_URL` value
- [ ] Check `VITE_USE_DUMMY_DATA` flag

### Step 9.2.2: Get Real API Base URL
- [ ] Contact backend team untuk get production/staging API URL
- [ ] Or check imuii-server documentation
- [ ] Verify API URL accessible
- [ ] Test API health endpoint (jika ada)

### Step 9.2.3: Update Environment Variables
- [ ] Update `.env.local`:
  ```env
  VITE_API_BASE_URL=https://api.imuii.id
  VITE_USE_DUMMY_DATA=false
  ```
- [ ] Or set sesuai environment (staging/production)
- [ ] Update `.env.example` dengan real URL (tanpa sensitive data)
- [ ] Document environment variables

### Step 9.2.4: Test API Client Configuration
- [ ] Buka `imuii-portal/src/services/apiClient.js`
- [ ] Verify base URL menggunakan `import.meta.env.VITE_API_BASE_URL`
- [ ] Test API client initialization
- [ ] Verify interceptors working (JWT token attachment)
- [ ] Test error handling (401 redirect)

### Step 9.2.5: Test Projects API - Get Projects
- [ ] Start imuii-portal dev server
- [ ] Navigate ke showcase page
- [ ] Check browser Network tab
- [ ] Verify API call ke `/api/v1/projects` (atau sesuai endpoint)
- [ ] Check response format matches expected
- [ ] Verify showcase fields included di response

### Step 9.2.6: Test Projects API - Get Project by ID
- [ ] Navigate ke project detail page
- [ ] Check Network tab untuk API call
- [ ] Verify API call ke `/api/v1/projects/:id`
- [ ] Check response includes showcase fields
- [ ] Verify data displayed correctly

### Step 9.2.7: Test Projects API - Update Project
- [ ] Login sebagai project owner
- [ ] Navigate ke project detail page
- [ ] Click Edit button
- [ ] Update showcase fields (title, description, team members, etc.)
- [ ] Submit form
- [ ] Check Network tab untuk PUT request
- [ ] Verify request body includes showcase fields
- [ ] Verify response includes updated data
- [ ] Verify UI updated correctly

### Step 9.2.8: Test Portfolios API - Get Portfolios
- [ ] Navigate ke showcase page
- [ ] Check Network tab untuk portfolios API call
- [ ] Verify API call ke `/api/v1/portfolios` (atau sesuai endpoint)
- [ ] Check response format matches expected
- [ ] Verify showcase fields included

### Step 9.2.9: Test Portfolios API - Get Portfolio by ID
- [ ] Navigate ke portfolio detail page
- [ ] Check Network tab untuk API call
- [ ] Verify API call ke `/api/v1/portfolios/:id`
- [ ] Check response includes showcase fields
- [ ] Verify data displayed correctly

### Step 9.2.10: Test Portfolios API - Update Portfolio
- [ ] Login sebagai portfolio owner
- [ ] Navigate ke portfolio detail page
- [ ] Click Edit button
- [ ] Update showcase fields
- [ ] Submit form
- [ ] Check Network tab untuk PUT request
- [ ] Verify request body includes showcase fields
- [ ] Verify response includes updated data
- [ ] Verify UI updated correctly

### Step 9.2.11: Fix API Response Format Differences
- [ ] Compare real API response dengan expected format
- [ ] Check field name differences (snake_case vs camelCase)
- [ ] Update hooks/services jika perlu mapping
- [ ] Test all API calls again
- [ ] Fix any compatibility issues

### Step 9.2.12: Test Error Handling
- [ ] Test dengan invalid project/portfolio ID
- [ ] Test dengan unauthorized access
- [ ] Test dengan network error
- [ ] Verify error messages displayed correctly
- [ ] Verify error states working

### Step 9.2.13: Test Loading States
- [ ] Verify loading skeletons appear during API calls
- [ ] Test dengan slow network (throttle di DevTools)
- [ ] Verify loading states smooth
- [ ] Test multiple simultaneous API calls

### Step 9.2.14: Remove Dummy Data Code (Optional)
- [ ] After all tests passed, consider removing dummy data code
- [ ] Or keep for development/testing purposes
- [ ] Document how to switch back to dummy data if needed
- [ ] Update README dengan instructions

---

## ✅ 9.3 SSO Integration with imuii-web

### Step 9.3.1: Review SSO Flow Documentation
- [ ] Buka `imuii-web` documentation untuk SSO flow
- [ ] Review `AUTH_FLOW.md` atau similar documentation
- [ ] Understand JWT token structure
- [ ] Understand callback flow
- [ ] Note required configuration

### Step 9.3.2: Review Current Auth Implementation
- [ ] Buka `imuii-portal/src/services/authService.js`
- [ ] Review `redirectToLogin` function
- [ ] Review `handleLoginCallback` function
- [ ] Check redirect URL configuration
- [ ] Verify callback URL path

### Step 9.3.3: Get imuii-web Base URL
- [ ] Contact frontend team untuk get imuii-web URL
- [ ] Or check documentation
- [ ] Verify URL accessible
- [ ] Note production vs staging URLs

### Step 9.3.4: Update Environment Variables - Web URL
- [ ] Update `.env.local`:
  ```env
  VITE_WEB_BASE_URL=https://imuii.id
  VITE_PORTAL_BASE_URL=https://portal.imuii.id
  ```
- [ ] Update sesuai environment
- [ ] Update `.env.example`

### Step 9.3.5: Configure Redirect URL in imuii-web
- [ ] Contact imuii-web team
- [ ] Request add redirect URL untuk imuii-portal:
  - `https://portal.imuii.id/auth/callback` (production)
  - Or staging URL sesuai environment
- [ ] Verify redirect URL added to allowed list
- [ ] Test redirect URL accessible

### Step 9.3.6: Update Auth Service - Redirect URL
- [ ] Buka `imuii-portal/src/services/authService.js`
- [ ] Update `redirectToLogin` function:
  ```js
  const redirectUrl = `${import.meta.env.VITE_WEB_BASE_URL}/auth/login?redirect=${encodeURIComponent(window.location.origin + '/auth/callback')}`;
  ```
- [ ] Verify redirect URL format correct
- [ ] Test redirect URL construction

### Step 9.3.7: Update Login Callback Handler
- [ ] Buka `imuii-portal/src/pages/LoginCallback.jsx`
- [ ] Review callback handler logic
- [ ] Verify JWT token extraction dari URL params atau cookie
- [ ] Check token validation
- [ ] Verify user data extraction
- [ ] Test callback flow

### Step 9.3.8: Test SSO Login Flow - Manual
- [ ] Start imuii-portal dev server
- [ ] Navigate ke portal
- [ ] Click Login button
- [ ] Verify redirect ke imuii-web login page
- [ ] Login dengan valid credentials
- [ ] Verify redirect back ke portal dengan token
- [ ] Verify token stored correctly
- [ ] Verify user logged in

### Step 9.3.9: Test JWT Token Validation
- [ ] After login, check stored token
- [ ] Verify token structure (header.payload.signature)
- [ ] Decode token payload (jwt.io atau code)
- [ ] Verify user data in token
- [ ] Check token expiration
- [ ] Test token refresh jika ada

### Step 9.3.10: Test API Calls with JWT Token
- [ ] After login, navigate ke showcase page
- [ ] Check Network tab untuk API calls
- [ ] Verify Authorization header includes JWT token
- [ ] Format: `Authorization: Bearer <token>`
- [ ] Verify API calls successful dengan token
- [ ] Test unauthorized access (invalid token)

### Step 9.3.11: Test Logout Flow
- [ ] Click Logout button
- [ ] Verify token removed
- [ ] Verify redirect ke login atau home
- [ ] Verify user state cleared
- [ ] Test login again after logout

### Step 9.3.12: Test Token Expiration Handling
- [ ] Wait for token expiration (atau manually expire)
- [ ] Try to make API call
- [ ] Verify 401 error handled
- [ ] Verify redirect to login
- [ ] Test auto-refresh jika implemented

### Step 9.3.13: Test Cross-Domain Cookie (if needed)
- [ ] If imuii-web and imuii-portal different domains
- [ ] Test cookie sharing configuration
- [ ] Verify SameSite attribute
- [ ] Test secure flag untuk HTTPS
- [ ] Fix any cookie issues

### Step 9.3.14: Test Protected Routes
- [ ] Test accessing protected route tanpa login
- [ ] Verify redirect to login
- [ ] Test accessing protected route dengan login
- [ ] Verify access granted
- [ ] Test edit functionality (owner only)

### Step 9.3.15: Test User Context
- [ ] After login, verify user context populated
- [ ] Check user data di Navbar
- [ ] Verify user menu working
- [ ] Test user-specific features
- [ ] Verify owner checks working

---

## ✅ 9.4 Integration Testing & Verification

### Step 9.4.1: End-to-End Test - Showcase Page
- [ ] Login dengan valid user
- [ ] Navigate ke showcase page
- [ ] Verify projects and portfolios loaded
- [ ] Verify showcase fields displayed correctly
- [ ] Test search functionality
- [ ] Test filter functionality
- [ ] Test sort functionality
- [ ] Verify all features working

### Step 9.4.2: End-to-End Test - Detail Page
- [ ] Click on project card
- [ ] Verify detail page loaded
- [ ] Verify all showcase fields displayed
- [ ] Test edit functionality (as owner)
- [ ] Update showcase fields
- [ ] Verify update successful
- [ ] Verify changes reflected
- [ ] Test share functionality

### Step 9.4.3: End-to-End Test - Edit Form
- [ ] Navigate to project detail (as owner)
- [ ] Click Edit button
- [ ] Fill all showcase fields:
  - Title
  - Description
  - Team members (add/remove)
  - YouTube link
  - Tags (add/remove)
  - Thumbnail URL
- [ ] Submit form
- [ ] Verify API call successful
- [ ] Verify data updated
- [ ] Test validation (invalid URLs, etc.)

### Step 9.4.4: Test Error Scenarios
- [ ] Test with invalid API URL
- [ ] Test with network disconnected
- [ ] Test with expired token
- [ ] Test with invalid project/portfolio ID
- [ ] Test with unauthorized access
- [ ] Verify all error states handled gracefully

### Step 9.4.5: Performance Testing
- [ ] Test page load time
- [ ] Test API response time
- [ ] Test with large datasets
- [ ] Test search/filter performance
- [ ] Optimize jika perlu

### Step 9.4.6: Browser Compatibility Testing
- [ ] Test di Chrome
- [ ] Test di Firefox
- [ ] Test di Safari
- [ ] Test di Edge
- [ ] Test di mobile browsers
- [ ] Fix any compatibility issues

### Step 9.4.7: Responsive Design Testing
- [ ] Test di desktop (1920x1080)
- [ ] Test di tablet (768x1024)
- [ ] Test di mobile (375x667)
- [ ] Verify all features accessible
- [ ] Fix any responsive issues

### Step 9.4.8: Documentation Update
- [ ] Update README dengan integration instructions
- [ ] Document environment variables
- [ ] Document API endpoints used
- [ ] Document SSO flow
- [ ] Update troubleshooting guide

---

## 📦 Deliverables Checklist

### Backend (imuii-server):
- [ ] Database migration untuk showcase fields
- [ ] Project model updated dengan showcase fields
- [ ] Portfolio model updated dengan showcase fields
- [ ] API handlers updated untuk include showcase fields
- [ ] Service & repository layers updated
- [ ] Validation added untuk showcase fields
- [ ] All endpoints tested dan working

### Frontend (imuii-portal):
- [ ] Environment variables configured dengan real URLs
- [ ] Dummy data mode disabled
- [ ] All API calls working dengan real backend
- [ ] API response format compatibility verified
- [ ] Error handling tested
- [ ] Loading states working correctly

### SSO Integration:
- [ ] Redirect URL configured di imuii-web
- [ ] Login flow working end-to-end
- [ ] JWT token validation working
- [ ] API calls dengan JWT token working
- [ ] Logout flow working
- [ ] Token expiration handled
- [ ] Protected routes working

### Testing:
- [ ] End-to-end tests passed
- [ ] Error scenarios tested
- [ ] Performance acceptable
- [ ] Browser compatibility verified
- [ ] Responsive design verified
- [ ] Documentation updated

---

## 🎯 Next Phase

Setelah Phase 9 selesai, lanjut ke **Phase 7: UI Enhancements** (optional) atau **Phase 8: Deployment & Optimization**

---

## 📝 Notes

- **Backend First**: Disarankan untuk complete backend extensions dulu sebelum frontend integration
- **Staging First**: Test di staging environment sebelum production
- **Incremental**: Test setiap step sebelum lanjut ke step berikutnya
- **Documentation**: Update dokumentasi saat implementasi
- **Communication**: Maintain communication dengan backend dan imuii-web teams

---

## 🆘 Troubleshooting

### API Calls Failing
- Check API base URL correct
- Check CORS configuration di backend
- Check JWT token valid
- Check network connectivity
- Check API endpoint paths

### SSO Login Not Working
- Check redirect URL configured correctly
- Check callback URL accessible
- Check JWT token format
- Check cookie settings
- Check SameSite attribute

### Showcase Fields Not Showing
- Check database migration run
- Check API response includes fields
- Check frontend mapping correct
- Check field names match (snake_case vs camelCase)

### Update Not Working
- Check validation rules
- Check request body format
- Check authorization (owner only)
- Check API endpoint correct
- Check error messages

