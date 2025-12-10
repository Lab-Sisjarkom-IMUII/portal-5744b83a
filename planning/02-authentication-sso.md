# 🔐 PHASE 2: AUTHENTICATION & SSO

## 📋 Overview
Setup sistem authentication dengan SSO integration ke imuii-web menggunakan JWT token.

---

## ✅ 2.1 JWT Token Management

### Step 2.1.1: Create Utils Folder Structure
- [ ] Verify folder `src/utils/` sudah ada
- [ ] Plan utility functions yang akan dibuat:
  - `cookie.js` - Cookie utilities
  - `jwt.js` - JWT utilities
  - `auth.js` - Auth utilities

### Step 2.1.2: Create Cookie Utility - Get Cookie Function
- [ ] Buat file `src/utils/cookie.js`
- [ ] Create function `getCookie(name)`:
  - Parse document.cookie
  - Find cookie dengan name yang diberikan
  - Return cookie value atau null
- [ ] Test function dengan browser console

### Step 2.1.3: Create Cookie Utility - Set Cookie Function
- [ ] Add function `setCookie(name, value, days)`:
  - Set cookie dengan expiration
  - Handle secure flag jika HTTPS
  - Handle SameSite attribute
- [ ] Test function

### Step 2.1.4: Create Cookie Utility - Delete Cookie Function
- [ ] Add function `deleteCookie(name)`:
  - Set cookie dengan expiration di past
  - Clear cookie value
- [ ] Test function

### Step 2.1.5: Create Cookie Utility - Get Auth Token
- [ ] Add function `getAuthToken()`:
  - Call `getCookie('imuii-token')`
  - Return token atau null
- [ ] Export function
- [ ] Test function

### Step 2.1.6: Create JWT Utility - Decode Token
- [ ] Buat file `src/utils/jwt.js`
- [ ] Create function `decodeToken(token)`:
  - Split token by '.'
  - Decode base64 payload
  - Parse JSON payload
  - Return decoded payload atau null
- [ ] Handle errors (invalid token format)
- [ ] Test function dengan sample token

### Step 2.1.7: Create JWT Utility - Check Expiration
- [ ] Add function `isTokenExpired(token)`:
  - Decode token menggunakan `decodeToken`
  - Get `exp` field dari payload
  - Compare dengan current time
  - Return boolean (true jika expired)
- [ ] Handle case jika token tidak punya exp field
- [ ] Test function

### Step 2.1.8: Create JWT Utility - Validate Token
- [ ] Add function `isTokenValid(token)`:
  - Check jika token exists
  - Check jika token tidak expired
  - Return boolean
- [ ] Test function

### Step 2.1.9: Create Auth Utility - Clear Token
- [ ] Buat file `src/utils/auth.js`
- [ ] Create function `clearAuthToken()`:
  - Call `deleteCookie('imuii-token')`
  - Clear dari localStorage jika ada (optional)
- [ ] Export function
- [ ] Test function

### Step 2.1.10: Create useAuth Hook - Structure
- [ ] Buat file `src/hooks/useAuth.js`
- [ ] Import React hooks (useState, useEffect)
- [ ] Import cookie dan JWT utilities
- [ ] Create basic hook structure:
  - State untuk `isAuthenticated`
  - State untuk `user`
  - State untuk `isLoading`
- [ ] Return state values

### Step 2.1.11: Create useAuth Hook - Check Authentication
- [ ] Add function `checkAuth()`:
  - Get token dari cookie
  - Validate token
  - Set `isAuthenticated` state
  - Return authentication status
- [ ] Add function ke hook

### Step 2.1.12: Create useAuth Hook - Logout Function
- [ ] Add function `logout()`:
  - Call `clearAuthToken()`
  - Reset `isAuthenticated` state
  - Reset `user` state
  - Redirect ke login (akan diimplementasi nanti)
- [ ] Add function ke hook

### Step 2.1.13: Create useAuth Hook - Initialize
- [ ] Add `useEffect` untuk check auth on mount
- [ ] Call `checkAuth()` saat component mount
- [ ] Set `isLoading` state selama checking
- [ ] Update hook return values

---

## ✅ 2.2 SSO Integration dengan imuii-web

### Step 2.2.1: Create Auth Service - Login Redirect
- [ ] Buat file `src/services/authService.js`
- [ ] Import environment variable `VITE_WEB_BASE_URL`
- [ ] Create function `redirectToLogin(returnUrl)`:
  - Get current URL sebagai returnUrl jika tidak provided
  - Construct login URL: `${VITE_WEB_BASE_URL}/auth/login?redirect=${returnUrl}`
  - Use `window.location.href` untuk redirect
- [ ] Export function
- [ ] Test function (akan redirect, jadi test dengan hati-hati)

### Step 2.2.2: Create Auth Service - Handle Login Callback
- [ ] Add function `handleLoginCallback()`:
  - Check jika token sudah ada di cookie setelah redirect
  - If token exists, call verify API (akan dibuat nanti)
  - Get returnUrl dari URL params atau default ke '/'
  - Redirect ke returnUrl
- [ ] Export function

### Step 2.2.3: Create Protected Route Component
- [ ] Buat file `src/components/ProtectedRoute.jsx`
- [ ] Import `useAuth` hook
- [ ] Import `Navigate` dari react-router-dom
- [ ] Define component dengan props: children
- [ ] Get auth state dari `useAuth`
- [ ] Show loading spinner jika `isLoading` true
- [ ] Redirect ke login jika `!isAuthenticated`
- [ ] Render children jika authenticated
- [ ] Export component

### Step 2.2.4: Update Route Configuration - Public Routes
- [ ] Buka route configuration file
- [ ] Identify public routes:
  - `/` - Showcase (public)
  - `/project/:id` - Project detail (public)
  - `/portfolio/:id` - Portfolio detail (public)
- [ ] Keep these routes public (no ProtectedRoute wrapper)

### Step 2.2.5: Update Route Configuration - Protected Routes
- [ ] Identify protected routes (akan ditambahkan nanti):
  - Edit routes (akan dibuat di Phase 5)
- [ ] Wrap protected routes dengan `<ProtectedRoute>`
- [ ] Test protected route redirect

### Step 2.2.6: Update Navbar - Login Button Handler
- [ ] Buka `src/components/Navbar.jsx`
- [ ] Import `redirectToLogin` dari authService
- [ ] Import `useAuth` hook
- [ ] Get `isAuthenticated` dari `useAuth`
- [ ] Update login button onClick:
  - Call `redirectToLogin()` dengan current URL
- [ ] Test login button redirect

### Step 2.2.7: Create Login Callback Page
- [ ] Buat file `src/pages/LoginCallback.jsx`
- [ ] Import `useEffect` dari React
- [ ] Import `useNavigate` dari react-router-dom
- [ ] Import `handleLoginCallback` dari authService
- [ ] Create component:
  - Show loading state
  - Call `handleLoginCallback()` di useEffect
  - Handle errors
- [ ] Export component

### Step 2.2.8: Add Login Callback Route
- [ ] Buka route configuration
- [ ] Add route: `/auth/callback` → LoginCallback component
- [ ] Test route

### Step 2.2.9: Test SSO Flow
- [ ] Start development server
- [ ] Click login button
- [ ] Verify redirect ke imuii-web login
- [ ] Login di imuii-web
- [ ] Verify redirect kembali ke portal
- [ ] Check token di cookie
- [ ] Fix any issues

---

## ✅ 2.3 API Client Setup dengan Authentication

### Step 2.3.1: Create API Client Base
- [ ] Buat file `src/services/apiClient.js`
- [ ] Import axios (atau setup fetch)
- [ ] Import environment variable `VITE_API_BASE_URL`
- [ ] Create axios instance (atau fetch wrapper):
  - Base URL dari env variable
  - Default headers: `Content-Type: application/json`
- [ ] Export instance

### Step 2.3.2: Create Request Interceptor - Attach Token
- [ ] Add request interceptor:
  - Get token dari cookie menggunakan `getAuthToken()`
  - If token exists, add ke headers:
    - `Authorization: Bearer ${token}`
  - Return config
- [ ] Test interceptor dengan console.log

### Step 2.3.3: Create Response Interceptor - Handle 401
- [ ] Add response interceptor:
  - Check response status
  - If status === 401:
    - Clear auth token
    - Redirect ke login
    - Return rejected promise
- [ ] Test dengan invalid token

### Step 2.3.4: Create Response Interceptor - Handle Other Errors
- [ ] Update response interceptor:
  - If status === 403: return error dengan message
  - If status === 500: return error dengan message
  - If network error: return network error message
  - Return error response untuk other statuses
- [ ] Test error handling

### Step 2.3.5: Create Generic API Functions - GET
- [ ] Add function `apiGet(url, config = {})`:
  - Use axios.get atau fetch GET
  - Return response data
  - Handle errors
- [ ] Export function
- [ ] Test function

### Step 2.3.6: Create Generic API Functions - POST
- [ ] Add function `apiPost(url, data, config = {})`:
  - Use axios.post atau fetch POST
  - Return response data
  - Handle errors
- [ ] Export function
- [ ] Test function

### Step 2.3.7: Create Generic API Functions - PUT
- [ ] Add function `apiPut(url, data, config = {})`:
  - Use axios.put atau fetch PUT
  - Return response data
  - Handle errors
- [ ] Export function
- [ ] Test function

### Step 2.3.8: Create Generic API Functions - DELETE
- [ ] Add function `apiDelete(url, config = {})`:
  - Use axios.delete atau fetch DELETE
  - Return response data
  - Handle errors
- [ ] Export function
- [ ] Test function

### Step 2.3.9: Create User API Service - Structure
- [ ] Buat file `src/services/userService.js`
- [ ] Import apiClient functions
- [ ] Define base endpoint: `/api/v1/users`

### Step 2.3.10: Create User API Service - Verify Token
- [ ] Add function `verifyToken()`:
  - Call `apiGet('/api/v1/users/verify')`
  - Return user data dari response
  - Handle errors
- [ ] Export function
- [ ] Test function dengan valid token

### Step 2.3.11: Create User API Service - Get User Info
- [ ] Add function `getUserInfo(userId)`:
  - Call `apiGet(`/api/v1/users/${userId}`)`
  - Return user data
  - Handle errors
- [ ] Export function
- [ ] Test function

### Step 2.3.12: Test API Client with Mock Data
- [ ] Create test file atau test di browser console
- [ ] Test GET request
- [ ] Test POST request
- [ ] Test error handling
- [ ] Verify token attached di headers
- [ ] Fix any issues

---

## ✅ 2.4 User Context & State Management

### Step 2.4.1: Create AuthContext - Structure
- [ ] Buat file `src/contexts/AuthContext.jsx`
- [ ] Import React (createContext, useContext, useState, useEffect)
- [ ] Import cookie dan JWT utilities
- [ ] Import `verifyToken` dari userService
- [ ] Create context: `const AuthContext = createContext()`
- [ ] Export context

### Step 2.4.2: Create AuthContext - State
- [ ] Create AuthProvider component
- [ ] Add state:
  - `user` - user data (null initially)
  - `isAuthenticated` - boolean (false initially)
  - `isLoading` - boolean (true initially)
- [ ] Return context provider dengan value

### Step 2.4.3: Create AuthContext - Initialize Function
- [ ] Add function `initializeAuth()`:
  - Get token dari cookie
  - If token valid:
    - Call `verifyToken()` API
    - Set user data
    - Set `isAuthenticated` to true
  - Else:
    - Set `isAuthenticated` to false
  - Set `isLoading` to false
- [ ] Call di `useEffect` on mount

### Step 2.4.4: Create AuthContext - Login Function
- [ ] Add function `login(userData)`:
  - Set user data
  - Set `isAuthenticated` to true
  - Set `isLoading` to false
- [ ] Add ke context value

### Step 2.4.5: Create AuthContext - Logout Function
- [ ] Add function `logout()`:
  - Clear auth token
  - Reset user to null
  - Set `isAuthenticated` to false
  - Redirect ke login (optional)
- [ ] Add ke context value

### Step 2.4.6: Create AuthContext - Refresh User Function
- [ ] Add function `refreshUser()`:
  - Call `verifyToken()` API
  - Update user data
  - Handle errors (logout jika token invalid)
- [ ] Add ke context value

### Step 2.4.7: Create useAuth Hook - Update to Use Context
- [ ] Buka `src/hooks/useAuth.js`
- [ ] Import `useContext` dari React
- [ ] Import `AuthContext`
- [ ] Update hook:
  - Use `useContext(AuthContext)`
  - Return context values
  - Add error handling jika context tidak available

### Step 2.4.8: Wrap App with AuthProvider
- [ ] Buka `src/main.jsx` atau `src/App.jsx`
- [ ] Import `AuthProvider` dari AuthContext
- [ ] Wrap app dengan `<AuthProvider>`
- [ ] Test context working

### Step 2.4.9: Update Navbar - Use Auth Context
- [ ] Buka `src/components/Navbar.jsx`
- [ ] Import `useAuth` hook
- [ ] Get `user` dan `isAuthenticated` dari hook
- [ ] Update user menu:
  - Show user name/avatar jika logged in
  - Show login button jika not logged in
- [ ] Add logout button jika logged in
- [ ] Test navbar updates

### Step 2.4.10: Update ProtectedRoute - Use Context
- [ ] Buka `src/components/ProtectedRoute.jsx`
- [ ] Update untuk use `useAuth` hook (yang sudah menggunakan context)
- [ ] Verify protected route working dengan context
- [ ] Test redirect flow

### Step 2.4.11: Test Complete Auth Flow
- [ ] Test login flow:
  - Click login → redirect ke imuii-web
  - Login di imuii-web
  - Redirect kembali → token verified
  - User data loaded
  - Navbar updated
- [ ] Test logout flow:
  - Click logout
  - Token cleared
  - User data cleared
  - Redirect to login
- [ ] Test protected routes
- [ ] Fix any issues

---

## 📦 Deliverables Checklist

- [ ] ✅ Cookie utility functions created dan tested
- [ ] ✅ JWT utility functions created dan tested
- [ ] ✅ useAuth hook created (initial version)
- [ ] ✅ SSO redirect working
- [ ] ✅ Login callback handler working
- [ ] ✅ Protected routes implemented
- [ ] ✅ API client service created dengan interceptors
- [ ] ✅ Generic API functions (GET, POST, PUT, DELETE)
- [ ] ✅ User API service created
- [ ] ✅ AuthContext created dan implemented
- [ ] ✅ AuthProvider wrapping app
- [ ] ✅ useAuth hook updated untuk use context
- [ ] ✅ Navbar updated dengan auth state
- [ ] ✅ Complete auth flow tested dan working

---

## 🎯 Next Phase
Setelah Phase 2 selesai, lanjut ke **Phase 3: API Integration**

