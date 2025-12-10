# 🏠 PHASE 4: SHOWCASE PAGE

## 📋 Overview
Membuat halaman showcase dengan grid layout, search, dan filter functionality.

---

## ✅ 4.1 Showcase Grid Layout

### Step 4.1.1: Create ShowcasePage Component - Structure
- [ ] Buat file `src/pages/ShowcasePage.jsx`
- [ ] Import React hooks (useState, useEffect)
- [ ] Import `useShowcase` hook
- [ ] Import Layout component
- [ ] Create basic component structure
- [ ] Export component

### Step 4.1.2: Create ShowcasePage Component - Use Hook
- [ ] Call `useShowcase()` hook
- [ ] Destructure: `items`, `loading`, `error`, `refetch`
- [ ] Add console.log untuk debug (remove later)

### Step 4.1.3: Create ShowcasePage Component - Loading State
- [ ] Check jika `loading === true`
- [ ] Show loading UI:
  - Import Skeleton component (akan dibuat nanti)
  - Show multiple skeleton cards
  - Or show simple loading spinner
- [ ] Return early jika loading

### Step 4.1.4: Create ShowcasePage Component - Error State
- [ ] Check jika `error` exists
- [ ] Show error UI:
  - Error message
  - Retry button (call refetch on click)
- [ ] Return early jika error

### Step 4.1.5: Create ShowcasePage Component - Empty State
- [ ] Check jika `items.length === 0`
- [ ] Show empty state UI:
  - Empty state message
  - Illustration atau icon (optional)
  - Call to action (optional)
- [ ] Return early jika empty

### Step 4.1.6: Create ShowcasePage Component - Grid Layout
- [ ] Add container div dengan max-width
- [ ] Add grid container dengan Tailwind:
  - `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
  - Add gap: `gap-4` atau `gap-6`
- [ ] Map through items dan render ProjectCard
- [ ] Add key prop untuk each card

### Step 4.1.7: Create ProjectCard Component - Structure
- [ ] Buat file `src/components/ProjectCard.jsx`
- [ ] Define props: `item` (project atau portfolio), `onClick`
- [ ] Create basic card structure dengan Card component
- [ ] Export component

### Step 4.1.8: Create ProjectCard Component - Thumbnail
- [ ] Add thumbnail image:
  - Check jika `item.thumbnail_url` exists
  - If exists, use that image
  - Else, use default placeholder image
  - Add `alt` attribute
  - Style dengan Tailwind: `w-full h-48 object-cover`
  - Add lazy loading: `loading="lazy"`

### Step 4.1.9: Create ProjectCard Component - Title
- [ ] Display title:
  - Use `item.showcase_title` atau `item.name`
  - Style dengan Tailwind: heading style
  - Truncate jika terlalu panjang: `truncate`
  - Add to card

### Step 4.1.10: Create ProjectCard Component - Description
- [ ] Display description:
  - Use `item.showcase_description` atau `item.description`
  - Truncate to 2-3 lines: `line-clamp-2` atau `line-clamp-3`
  - Style dengan Tailwind
  - Add to card

### Step 4.1.11: Create ProjectCard Component - Owner Info
- [ ] Display owner info:
  - Check jika `item.owner` atau `item.user` exists
  - Display owner name
  - Display owner avatar jika available
  - Style dengan Tailwind
  - Add to card

### Step 4.1.12: Create ProjectCard Component - Deploy URL
- [ ] Add deploy URL link:
  - Check `item.deploy_url` atau generate dari name
  - Add external link icon (lucide-react)
  - Style sebagai button atau link
  - Open in new tab: `target="_blank" rel="noopener noreferrer"`
  - Add to card

### Step 4.1.13: Create ProjectCard Component - Type Badge
- [ ] Add type badge:
  - Display "Project" atau "Portfolio" based on `item.type`
  - Style dengan different colors
  - Add to card

### Step 4.1.14: Create ProjectCard Component - Hover Effects
- [ ] Add hover effects dengan Tailwind:
  - Scale: `hover:scale-105`
  - Shadow: `hover:shadow-lg`
  - Transition: `transition-transform duration-200`
- [ ] Add cursor pointer: `cursor-pointer`

### Step 4.1.15: Create ProjectCard Component - Click Handler
- [ ] Add onClick handler:
  - Navigate ke detail page: `/project/:id` atau `/portfolio/:id`
  - Use `useNavigate` dari react-router-dom
  - Or use `onClick` prop dari parent
- [ ] Test navigation

### Step 4.1.16: Create Skeleton Components - CardSkeleton
- [ ] Buat file `src/components/CardSkeleton.jsx`
- [ ] Create skeleton structure:
  - Image placeholder (gray box)
  - Title placeholder (gray bar)
  - Description placeholder (multiple gray bars)
- [ ] Add pulse animation: `animate-pulse`
- [ ] Export component

### Step 4.1.17: Integrate Skeleton in ShowcasePage
- [ ] Import CardSkeleton
- [ ] Show 6-8 skeleton cards saat loading
- [ ] Use same grid layout
- [ ] Test loading state

### Step 4.1.18: Add Pagination - Structure
- [ ] Decide: pagination atau infinite scroll
- [ ] If pagination:
  - Add pagination component
  - Track current page
  - Update useShowcase untuk accept page parameter
- [ ] If infinite scroll:
  - Setup intersection observer
  - Load more on scroll to bottom

### Step 4.1.19: Implement Pagination (if chosen)
- [ ] Create Pagination component:
  - Previous button
  - Page numbers
  - Next button
  - Current page indicator
- [ ] Add state untuk current page
- [ ] Update API call dengan page parameter
- [ ] Handle page changes

### Step 4.1.20: Implement Infinite Scroll (if chosen)
- [ ] Add `useEffect` untuk detect scroll
- [ ] Use Intersection Observer API
- [ ] Load more items saat reach bottom
- [ ] Append new items to existing array
- [ ] Show loading indicator saat loading more

---

## ✅ 4.2 Search & Filter Functionality

### Step 4.2.1: Create SearchBar Component - Structure
- [ ] Buat file `src/components/SearchBar.jsx`
- [ ] Define props: `value`, `onChange`, `placeholder`
- [ ] Create input field dengan Tailwind styling
- [ ] Add search icon (lucide-react)
- [ ] Export component

### Step 4.2.2: Create SearchBar Component - Debounce
- [ ] Import `useState` dan `useEffect`
- [ ] Add debounce logic:
  - Create debounced value state
  - Use `setTimeout` untuk delay
  - Clear timeout on cleanup
  - Delay: 300ms (configurable)
- [ ] Call `onChange` dengan debounced value

### Step 4.2.3: Create SearchBar Component - Clear Button
- [ ] Add clear button jika value exists:
  - Show X icon button
  - Clear input on click
  - Style dengan Tailwind
- [ ] Add to component

### Step 4.2.4: Integrate SearchBar in ShowcasePage
- [ ] Add state untuk search query: `const [searchQuery, setSearchQuery] = useState('')`
- [ ] Add SearchBar component di top of page
- [ ] Connect onChange handler
- [ ] Test search input

### Step 4.2.5: Implement Search Logic
- [ ] Add `useMemo` untuk filtered items:
  - Filter items berdasarkan search query
  - Search in: name, description, owner name
  - Case insensitive search
  - Return filtered array
- [ ] Update items display dengan filtered array

### Step 4.2.6: Create FilterBar Component - Structure
- [ ] Buat file `src/components/FilterBar.jsx`
- [ ] Define props: `filters`, `onFilterChange`
- [ ] Create filter container dengan Tailwind
- [ ] Export component

### Step 4.2.7: Create FilterBar Component - Type Filter
- [ ] Add type filter:
  - Radio buttons atau dropdown
  - Options: "All", "Project", "Portfolio"
  - Default: "All"
  - Style dengan Tailwind
- [ ] Add onChange handler

### Step 4.2.8: Create FilterBar Component - Owner Filter
- [ ] Add owner filter:
  - Dropdown dengan list of owners
  - Extract unique owners dari items
  - Default: "All"
  - Style dengan Tailwind
- [ ] Add onChange handler

### Step 4.2.9: Create FilterBar Component - Sort Options
- [ ] Add sort dropdown:
  - Options: "Newest", "Oldest", "Alphabetical A-Z", "Alphabetical Z-A"
  - Default: "Newest"
  - Style dengan Tailwind
- [ ] Add onChange handler

### Step 4.2.10: Create FilterBar Component - Clear Filters
- [ ] Add clear filters button:
  - Reset all filters to default
  - Style dengan Tailwind
  - Show hanya jika any filter active
- [ ] Add onClick handler

### Step 4.2.11: Integrate FilterBar in ShowcasePage
- [ ] Add state untuk filters:
  - `typeFilter`: "all" | "project" | "portfolio"
  - `ownerFilter`: owner ID atau "all"
  - `sortBy`: sort option
- [ ] Add FilterBar component
- [ ] Connect onChange handlers
- [ ] Test filters

### Step 4.2.12: Implement Filter Logic - Type Filter
- [ ] Update `useMemo` untuk filter logic:
  - If typeFilter !== "all", filter by type
  - Return filtered array
- [ ] Test type filter

### Step 4.2.13: Implement Filter Logic - Owner Filter
- [ ] Update filter logic:
  - If ownerFilter !== "all", filter by owner
  - Match owner ID
  - Return filtered array
- [ ] Test owner filter

### Step 4.2.14: Implement Filter Logic - Sort
- [ ] Add sort logic:
  - If sortBy === "newest": sort by created_at desc
  - If sortBy === "oldest": sort by created_at asc
  - If sortBy === "alphabetical A-Z": sort by name asc
  - If sortBy === "alphabetical Z-A": sort by name desc
- [ ] Apply sort setelah filter
- [ ] Test sort functionality

### Step 4.2.15: Combine Search and Filters
- [ ] Update `useMemo` untuk combine:
  - Apply search filter first
  - Then apply type filter
  - Then apply owner filter
  - Finally apply sort
- [ ] Test combined functionality

### Step 4.2.16: Add URL Query Parameters (Optional)
- [ ] Sync filters dengan URL:
  - Use `useSearchParams` dari react-router-dom
  - Update URL saat filters change
  - Read from URL on mount
  - Allow share filtered view
- [ ] Implement jika diperlukan

### Step 4.2.17: Add Results Count
- [ ] Display results count:
  - Show "X results found" atau "Showing X of Y"
  - Update saat filters change
  - Style dengan Tailwind
- [ ] Add to ShowcasePage

---

## ✅ 4.3 ProjectCard Enhancements

### Step 4.3.1: Enhance ProjectCard - Tags Display
- [ ] Check jika `item.tags` exists
- [ ] Display tags:
  - Map through tags array
  - Display as badges atau chips
  - Color-coded tags (optional)
  - Style dengan Tailwind
- [ ] Add to card

### Step 4.3.2: Enhance ProjectCard - YouTube Link Indicator
- [ ] Check jika `item.youtube_link` exists
- [ ] Add YouTube icon indicator:
  - Show YouTube icon (lucide-react)
  - Tooltip: "Has YouTube video"
  - Style dengan Tailwind
- [ ] Add to card

### Step 4.3.3: Enhance ProjectCard - Team Members Count
- [ ] Check jika `item.team_members` exists
- [ ] Display team members count:
  - Show "X team members" atau avatars
  - Style dengan Tailwind
- [ ] Add to card (optional, bisa di detail page saja)

### Step 4.3.4: Enhance ProjectCard - Created Date
- [ ] Display created date:
  - Format date: "Created on MM/DD/YYYY" atau relative time
  - Use date formatting library atau native
  - Style dengan Tailwind
- [ ] Add to card

### Step 4.3.5: Enhance ProjectCard - Status Badge
- [ ] Display status badge:
  - Show "Deployed" badge (green)
  - Style dengan Tailwind
- [ ] Add to card

### Step 4.3.6: Enhance ProjectCard - Hover Card (Optional)
- [ ] Add hover card untuk show more info:
  - Show expanded description on hover
  - Show tags on hover
  - Show team members on hover
  - Use tooltip atau popover component
- [ ] Implement jika diperlukan

### Step 4.3.7: Enhance ProjectCard - Responsive Design
- [ ] Test card di mobile:
  - Ensure card fits mobile width
  - Text readable
  - Buttons accessible
- [ ] Test card di tablet
- [ ] Test card di desktop
- [ ] Fix any responsive issues

### Step 4.3.8: Enhance ProjectCard - Accessibility
- [ ] Add proper ARIA labels
- [ ] Ensure keyboard navigation works
- [ ] Ensure screen reader friendly
- [ ] Test dengan keyboard only
- [ ] Test dengan screen reader (optional)

---

## 📦 Deliverables Checklist

- [ ] ✅ ShowcasePage component created
- [ ] ✅ Loading state implemented dengan skeletons
- [ ] ✅ Error state implemented
- [ ] ✅ Empty state implemented
- [ ] ✅ Grid layout responsive
- [ ] ✅ ProjectCard component created
- [ ] ✅ Card displays all required info
- [ ] ✅ Hover effects working
- [ ] ✅ Navigation to detail page working
- [ ] ✅ SearchBar component created
- [ ] ✅ Search functionality working dengan debounce
- [ ] ✅ FilterBar component created
- [ ] ✅ All filters working (type, owner, sort)
- [ ] ✅ Filter logic combined dengan search
- [ ] ✅ ProjectCard enhancements completed
- [ ] ✅ Responsive design tested
- [ ] ✅ All features tested dan working

---

## 🎯 Next Phase
Setelah Phase 4 selesai, lanjut ke **Phase 5: Detail Page**

