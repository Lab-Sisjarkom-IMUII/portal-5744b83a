# 📊 PHASE 3: API INTEGRATION

## 📋 Overview
Integrasi dengan imuii-server API untuk fetch projects dan portfolios data.

---

## ✅ 3.1 Projects API Integration

### Step 3.1.1: Create Project Service - Structure
- [ ] Buat file `src/services/projectService.js`
- [ ] Import apiClient functions (apiGet, apiPut)
- [ ] Define base endpoint: `/api/v1/projects`
- [ ] Plan functions yang akan dibuat:
  - `getProjectsByOwner(ownerId, page, limit)`
  - `getProjectById(id)`
  - `updateProject(id, data)`
  - `getAllDeployedProjects(page, limit)`

### Step 3.1.2: Create Project Service - Get Projects by Owner
- [ ] Add function `getProjectsByOwner(ownerId, page = 1, limit = 10)`:
  - Construct query params: `?owner_id=${ownerId}&page=${page}&limit=${limit}`
  - Call `apiGet('/api/v1/projects' + query params)`
  - Return response data
  - Handle errors
- [ ] Export function
- [ ] Test function dengan real ownerId

### Step 3.1.3: Create Project Service - Get Project by ID
- [ ] Add function `getProjectById(id)`:
  - Call `apiGet(`/api/v1/projects/${id}`)`
  - Return project data
  - Handle errors (404 jika not found)
- [ ] Export function
- [ ] Test function dengan real project ID

### Step 3.1.4: Create Project Service - Update Project
- [ ] Add function `updateProject(id, data)`:
  - Validate data structure
  - Call `apiPut(`/api/v1/projects/${id}`, data)`
  - Return updated project data
  - Handle errors
- [ ] Export function
- [ ] Test function dengan real project ID dan data

### Step 3.1.5: Create Project Service - Get All Deployed Projects
- [ ] Add function `getAllDeployedProjects(page = 1, limit = 100)`:
  - Note: Endpoint ini mungkin perlu dibuat di backend
  - Atau filter di frontend setelah fetch all
  - For now, create placeholder function
  - Will be implemented after backend endpoint ready
- [ ] Export function
- [ ] Document bahwa ini akan diupdate nanti

### Step 3.1.6: Create useProjects Hook - Structure
- [ ] Buat file `src/hooks/useProjects.js`
- [ ] Import React hooks (useState, useEffect)
- [ ] Import `getProjectsByOwner` dari projectService
- [ ] Import `useAuth` untuk get current user
- [ ] Create hook structure:
  - State untuk `projects` (array)
  - State untuk `loading` (boolean)
  - State untuk `error` (string atau null)
  - State untuk `pagination` (object dengan page, limit, total)

### Step 3.1.7: Create useProjects Hook - Fetch Logic
- [ ] Add `useEffect` untuk fetch data:
  - Get current user dari `useAuth`
  - If user exists, call `getProjectsByOwner(user.id)`
  - Set loading state
  - Handle success: set projects data
  - Handle error: set error message
  - Set loading to false
- [ ] Add dependency array: [user]

### Step 3.1.8: Create useProjects Hook - Return Values
- [ ] Return object dengan:
  - `projects` - array of projects
  - `loading` - boolean
  - `error` - string atau null
  - `pagination` - pagination info
  - `refetch` - function untuk refetch data
- [ ] Export hook

### Step 3.1.9: Create useProject Hook - Structure
- [ ] Buat file `src/hooks/useProject.js`
- [ ] Import React hooks
- [ ] Import `getProjectById` dari projectService
- [ ] Create hook dengan parameter `projectId`:
  - State untuk `project` (object atau null)
  - State untuk `loading` (boolean)
  - State untuk `error` (string atau null)

### Step 3.1.10: Create useProject Hook - Fetch Logic
- [ ] Add `useEffect` untuk fetch data:
  - If projectId exists, call `getProjectById(projectId)`
  - Set loading state
  - Handle success: set project data
  - Handle error: set error message
  - Set loading to false
- [ ] Add dependency: [projectId]

### Step 3.1.11: Create useProject Hook - Return Values
- [ ] Return object dengan:
  - `project` - project object atau null
  - `loading` - boolean
  - `error` - string atau null
  - `refetch` - function untuk refetch
- [ ] Export hook

### Step 3.1.12: Test Projects API Integration
- [ ] Create test component atau test di browser console
- [ ] Test `useProjects` hook:
  - Verify data fetched
  - Verify loading states
  - Verify error handling
- [ ] Test `useProject` hook:
  - Test dengan valid project ID
  - Test dengan invalid project ID
  - Verify error handling
- [ ] Fix any issues

---

## ✅ 3.2 Portfolios API Integration

### Step 3.2.1: Create Portfolio Service - Structure
- [ ] Buat file `src/services/portfolioService.js`
- [ ] Import apiClient functions
- [ ] Define base endpoint: `/api/v1/portfolios`
- [ ] Plan functions:
  - `getPortfolios(userId, page, limit)`
  - `getPortfolioById(id)`
  - `updatePortfolio(id, data)`

### Step 3.2.2: Create Portfolio Service - Get Portfolios
- [ ] Add function `getPortfolios(userId, page = 1, limit = 100)`:
  - Construct query params: `?user_id=${userId}&page=${page}&limit=${limit}`
  - Note: Check API docs untuk exact query param name
  - Call `apiGet('/api/v1/portfolios' + query params)`
  - Return response data
  - Handle errors
- [ ] Export function
- [ ] Test function

### Step 3.2.3: Create Portfolio Service - Get Portfolio by ID
- [ ] Add function `getPortfolioById(id)`:
  - Call `apiGet(`/api/v1/portfolios/${id}`)`
  - Return portfolio data
  - Handle errors
- [ ] Export function
- [ ] Test function

### Step 3.2.4: Create Portfolio Service - Update Portfolio
- [ ] Add function `updatePortfolio(id, data)`:
  - Validate data structure
  - Call `apiPut(`/api/v1/portfolios/${id}`, data)`
  - Return updated portfolio data
  - Handle errors
- [ ] Export function
- [ ] Test function

### Step 3.2.5: Create usePortfolios Hook - Structure
- [ ] Buat file `src/hooks/usePortfolios.js`
- [ ] Import React hooks
- [ ] Import `getPortfolios` dari portfolioService
- [ ] Import `useAuth` untuk get current user
- [ ] Create hook structure:
  - State untuk `portfolios` (array)
  - State untuk `loading` (boolean)
  - State untuk `error` (string atau null)
  - State untuk `pagination`

### Step 3.2.6: Create usePortfolios Hook - Fetch Logic
- [ ] Add `useEffect` untuk fetch data:
  - Get current user dari `useAuth`
  - If user exists, call `getPortfolios(user.id)`
  - Set loading state
  - Handle success: set portfolios data
  - Handle error: set error message
  - Set loading to false
- [ ] Add dependency: [user]

### Step 3.2.7: Create usePortfolios Hook - Return Values
- [ ] Return object dengan:
  - `portfolios` - array of portfolios
  - `loading` - boolean
  - `error` - string atau null
  - `pagination` - pagination info
  - `refetch` - function untuk refetch
- [ ] Export hook

### Step 3.2.8: Create usePortfolio Hook - Structure
- [ ] Buat file `src/hooks/usePortfolio.js`
- [ ] Import React hooks
- [ ] Import `getPortfolioById` dari portfolioService
- [ ] Create hook dengan parameter `portfolioId`:
  - State untuk `portfolio` (object atau null)
  - State untuk `loading` (boolean)
  - State untuk `error` (string atau null)

### Step 3.2.9: Create usePortfolio Hook - Fetch Logic
- [ ] Add `useEffect` untuk fetch data:
  - If portfolioId exists, call `getPortfolioById(portfolioId)`
  - Set loading state
  - Handle success: set portfolio data
  - Handle error: set error message
  - Set loading to false
- [ ] Add dependency: [portfolioId]

### Step 3.2.10: Create usePortfolio Hook - Return Values
- [ ] Return object dengan:
  - `portfolio` - portfolio object atau null
  - `loading` - boolean
  - `error` - string atau null
  - `refetch` - function untuk refetch
- [ ] Export hook

### Step 3.2.11: Test Portfolios API Integration
- [ ] Test `usePortfolios` hook:
  - Verify data fetched
  - Verify loading states
  - Verify error handling
- [ ] Test `usePortfolio` hook:
  - Test dengan valid portfolio ID
  - Test dengan invalid portfolio ID
  - Verify error handling
- [ ] Fix any issues

---

## ✅ 3.3 Combined Showcase Data

### Step 3.3.1: Create useShowcase Hook - Structure
- [ ] Buat file `src/hooks/useShowcase.js`
- [ ] Import React hooks
- [ ] Import `useProjects` dan `usePortfolios` hooks
- [ ] Create hook structure:
  - State untuk `items` (combined array)
  - State untuk `loading` (boolean)
  - State untuk `error` (string atau null)

### Step 3.3.2: Create useShowcase Hook - Fetch Both Data
- [ ] Call `useProjects()` hook
- [ ] Call `usePortfolios()` hook
- [ ] Get projects dan portfolios data
- [ ] Get loading states dari both hooks
- [ ] Get error states dari both hooks

### Step 3.3.3: Create useShowcase Hook - Filter Deployed Items
- [ ] Add `useEffect` untuk combine dan filter:
  - Filter projects: `status === 'deployed'`
  - Filter portfolios: `status === 'deployed'`
  - Filter by `is_showcased === true` (jika field sudah ada)
  - Combine both arrays
  - Add type field: `{ type: 'project', ...project }` atau `{ type: 'portfolio', ...portfolio }`

### Step 3.3.4: Create useShowcase Hook - Sort by Date
- [ ] Sort combined array:
  - Sort by `created_at` atau `updated_at` (newest first)
  - Use `Date` comparison
  - Maintain stable sort
- [ ] Update items state dengan sorted array

### Step 3.3.5: Create useShowcase Hook - Handle Loading State
- [ ] Combine loading states:
  - `loading = projectsLoading || portfoliosLoading`
  - Set loading state
- [ ] Update loading state di return

### Step 3.3.6: Create useShowcase Hook - Handle Error State
- [ ] Combine error states:
  - If projects error exists, set error
  - If portfolios error exists, append atau replace error
  - Set error state
- [ ] Update error state di return

### Step 3.3.7: Create useShowcase Hook - Handle Empty State
- [ ] Check jika items array empty:
  - After filtering, check length
  - Return empty array jika no items
- [ ] Note: Empty state UI akan dihandle di component

### Step 3.3.8: Create useShowcase Hook - Optimize with useMemo
- [ ] Import `useMemo` dari React
- [ ] Wrap filter dan sort logic dengan `useMemo`:
  - Dependencies: projects, portfolios
  - Memoize filtered dan sorted array
  - Update items state dengan memoized value
- [ ] This prevents unnecessary recalculations

### Step 3.3.9: Create useShowcase Hook - Refetch Function
- [ ] Add `refetch` function:
  - Call `refetch` dari useProjects
  - Call `refetch` dari usePortfolios
  - Both will trigger re-fetch
- [ ] Add ke return object

### Step 3.3.10: Create useShowcase Hook - Return Values
- [ ] Return object dengan:
  - `items` - combined and filtered array
  - `loading` - boolean
  - `error` - string atau null
  - `refetch` - function untuk refetch
  - `projectsCount` - number of projects (optional)
  - `portfoliosCount` - number of portfolios (optional)
- [ ] Export hook

### Step 3.3.11: Test useShowcase Hook
- [ ] Create test component
- [ ] Use `useShowcase` hook
- [ ] Verify:
  - Data combined correctly
  - Only deployed items shown
  - Sorted by date (newest first)
  - Loading states working
  - Error handling working
  - Refetch working
- [ ] Fix any issues

### Step 3.3.12: Add Caching (Optional)
- [ ] Consider adding caching:
  - Use SWR atau React Query untuk better caching
  - Or implement simple cache dengan useState
  - Cache duration: 5 minutes (configurable)
  - Invalidate cache on refetch
- [ ] Implement jika diperlukan

---

## 📦 Deliverables Checklist

- [ ] ✅ Project service created dengan semua functions
- [ ] ✅ useProjects hook created dan tested
- [ ] ✅ useProject hook created dan tested
- [ ] ✅ Portfolio service created dengan semua functions
- [ ] ✅ usePortfolios hook created dan tested
- [ ] ✅ usePortfolio hook created dan tested
- [ ] ✅ useShowcase hook created untuk combine data
- [ ] ✅ Filter logic implemented (deployed items only)
- [ ] ✅ Sort logic implemented (newest first)
- [ ] ✅ Loading states handled
- [ ] ✅ Error states handled
- [ ] ✅ All hooks tested dan working correctly

---

## 🎯 Next Phase
Setelah Phase 3 selesai, lanjut ke **Phase 4: Showcase Page**

