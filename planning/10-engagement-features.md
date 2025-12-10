# 🎯 PHASE 10: ENGAGEMENT & USER FEATURES

## 📋 Overview
Implementasi fitur engagement (Like/Favorite, Views & Analytics), User Profiles & Dashboard, Badges & Achievements, Mobile Features, dan UI/UX Enhancements (View Modes, Animations, Accessibility).

---

## ✅ 10.1 Like & Favorite System

### Step 10.1.1: Backend - Database Schema Extension
- [ ] Review current Project & Portfolio models
- [ ] Plan new tables/fields:
  - `likes` table: `id`, `user_id`, `likeable_type` (project/portfolio), `likeable_id`, `created_at`
  - `favorites` table: `id`, `user_id`, `favoriteable_type`, `favoriteable_id`, `created_at`
  - Or add JSONB fields: `liked_by` (array of user IDs), `favorited_by` (array of user IDs)
- [ ] Create migration script untuk likes table
- [ ] Create migration script untuk favorites table
- [ ] Add indexes untuk performance

### Step 10.1.2: Backend - API Endpoints - Like
- [ ] Create POST `/api/v1/likes` endpoint:
  - Body: `{ likeable_type: "project" | "portfolio", likeable_id: string }`
  - Return: `{ success: boolean, like_count: number }`
- [ ] Create DELETE `/api/v1/likes/:id` endpoint (unlike)
- [ ] Create GET `/api/v1/likes/check` endpoint:
  - Query: `?likeable_type=project&likeable_id=123`
  - Return: `{ is_liked: boolean, like_count: number }`
- [ ] Add authentication middleware
- [ ] Test endpoints dengan Postman

### Step 10.1.3: Backend - API Endpoints - Favorite
- [ ] Create POST `/api/v1/favorites` endpoint:
  - Body: `{ favoriteable_type: "project" | "portfolio", favoriteable_id: string }`
  - Return: `{ success: boolean }`
- [ ] Create DELETE `/api/v1/favorites/:id` endpoint (unfavorite)
- [ ] Create GET `/api/v1/favorites` endpoint (get user's favorites)
- [ ] Create GET `/api/v1/favorites/check` endpoint:
  - Query: `?favoriteable_type=project&favoriteable_id=123`
  - Return: `{ is_favorited: boolean }`
- [ ] Add authentication middleware
- [ ] Test endpoints

### Step 10.1.4: Backend - Update Project/Portfolio Response
- [ ] Update GET `/api/v1/projects/:id` untuk include:
  - `like_count: number`
  - `is_liked: boolean` (if authenticated)
  - `is_favorited: boolean` (if authenticated)
- [ ] Update GET `/api/v1/portfolios/:id` dengan same fields
- [ ] Update list endpoints untuk include `like_count`
- [ ] Test response format

### Step 10.1.5: Frontend - Create Like Service
- [ ] Buat file `src/services/likeService.js`
- [ ] Create function `likeItem(type, id)`:
  - Call POST `/api/v1/likes`
  - Return response
- [ ] Create function `unlikeItem(likeId)`:
  - Call DELETE `/api/v1/likes/:id`
- [ ] Create function `checkLikeStatus(type, id)`:
  - Call GET `/api/v1/likes/check`
  - Return `{ is_liked, like_count }`
- [ ] Export functions
- [ ] Test functions

### Step 10.1.6: Frontend - Create Favorite Service
- [ ] Buat file `src/services/favoriteService.js`
- [ ] Create function `favoriteItem(type, id)`:
  - Call POST `/api/v1/favorites`
- [ ] Create function `unfavoriteItem(favoriteId)`:
  - Call DELETE `/api/v1/favorites/:id`
- [ ] Create function `getFavorites()`:
  - Call GET `/api/v1/favorites`
  - Return favorites list
- [ ] Create function `checkFavoriteStatus(type, id)`:
  - Call GET `/api/v1/favorites/check`
- [ ] Export functions
- [ ] Test functions

### Step 10.1.7: Frontend - Create useLike Hook
- [ ] Buat file `src/hooks/useLike.js`
- [ ] Create hook:
  ```js
  function useLike(itemType, itemId) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [loading, setLoading] = useState(false);
    
    // Check initial status
    // Toggle like function
    // Return { isLiked, likeCount, toggleLike, loading }
  }
  ```
- [ ] Implement check status on mount
- [ ] Implement toggle like function
- [ ] Handle loading states
- [ ] Handle errors
- [ ] Export hook

### Step 10.1.8: Frontend - Create useFavorite Hook
- [ ] Buat file `src/hooks/useFavorite.js`
- [ ] Create hook similar to useLike:
  ```js
  function useFavorite(itemType, itemId) {
    const [isFavorited, setIsFavorited] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Check initial status
    // Toggle favorite function
    // Return { isFavorited, toggleFavorite, loading }
  }
  ```
- [ ] Implement functionality
- [ ] Export hook

### Step 10.1.9: Frontend - Create LikeButton Component
- [ ] Buat file `src/components/LikeButton.jsx`
- [ ] Props: `itemType`, `itemId`, `initialLikeCount`, `initialIsLiked`
- [ ] Use `useLike` hook
- [ ] Design button dengan:
  - Heart icon (filled if liked, outline if not)
  - Like count display
  - Hover effects
  - Loading state
  - Animation on click
- [ ] Handle click to toggle like
- [ ] Export component
- [ ] Test component

### Step 10.1.10: Frontend - Create FavoriteButton Component
- [ ] Buat file `src/components/FavoriteButton.jsx`
- [ ] Props: `itemType`, `itemId`, `initialIsFavorited`
- [ ] Use `useFavorite` hook
- [ ] Design button dengan:
  - Star/Bookmark icon (filled if favorited)
  - Hover effects
  - Loading state
  - Animation on click
- [ ] Handle click to toggle favorite
- [ ] Export component
- [ ] Test component

### Step 10.1.11: Frontend - Integrate LikeButton in ProjectCard
- [ ] Buka `src/components/ProjectCard.jsx`
- [ ] Add LikeButton component
- [ ] Position di card (top-right atau bottom)
- [ ] Pass item type and ID
- [ ] Style integration
- [ ] Test like functionality

### Step 10.1.12: Frontend - Integrate LikeButton in DetailPage
- [ ] Buka `src/pages/DetailPage.jsx`
- [ ] Add LikeButton di hero section
- [ ] Add FavoriteButton di hero section
- [ ] Style buttons
- [ ] Test functionality

### Step 10.1.13: Frontend - Add Most Liked Sort Option
- [ ] Buka `src/components/FilterBar.jsx`
- [ ] Add "Most Liked" option ke sort dropdown
- [ ] Update sort logic di ShowcasePage
- [ ] Test sort functionality

### Step 10.1.14: Frontend - Create Favorites Page
- [ ] Buat file `src/pages/FavoritesPage.jsx`
- [ ] Use `getFavorites` service
- [ ] Display favorites dalam grid layout
- [ ] Show empty state jika no favorites
- [ ] Add route: `/favorites`
- [ ] Add link di Navbar
- [ ] Test page

---

## ✅ 10.2 Views & Analytics

### Step 10.2.1: Backend - Database Schema Extension
- [ ] Plan `views` table:
  - `id`, `user_id` (nullable - for anonymous), `viewable_type`, `viewable_id`, `ip_address`, `user_agent`, `created_at`
- [ ] Or add `view_count` field ke projects/portfolios table
- [ ] Create migration script
- [ ] Add indexes

### Step 10.2.2: Backend - Track View Endpoint
- [ ] Create POST `/api/v1/views` endpoint:
  - Body: `{ viewable_type: "project" | "portfolio", viewable_id: string }`
  - Track: user_id (if authenticated), IP address, user agent
  - Return: `{ success: boolean, view_count: number }`
- [ ] Add rate limiting (prevent spam)
- [ ] Handle anonymous views
- [ ] Test endpoint

### Step 10.2.3: Backend - Get View Count
- [ ] Update GET `/api/v1/projects/:id` untuk include `view_count`
- [ ] Update GET `/api/v1/portfolios/:id` untuk include `view_count`
- [ ] Update list endpoints untuk include `view_count`
- [ ] Test response

### Step 10.2.4: Backend - Analytics Endpoint (Owner Only)
- [ ] Create GET `/api/v1/projects/:id/analytics` endpoint:
  - Return: `{ view_count, views_over_time: [], unique_views, referrers: [] }`
  - Add authentication & ownership check
- [ ] Create GET `/api/v1/portfolios/:id/analytics` endpoint
- [ ] Test endpoints

### Step 10.2.5: Frontend - Create View Service
- [ ] Buat file `src/services/viewService.js`
- [ ] Create function `trackView(type, id)`:
  - Call POST `/api/v1/views`
  - Handle rate limiting (localStorage untuk prevent spam)
- [ ] Export function
- [ ] Test function

### Step 10.2.6: Frontend - Track View on DetailPage
- [ ] Buka `src/pages/DetailPage.jsx`
- [ ] Add `useEffect` untuk track view on mount:
  ```js
  useEffect(() => {
    if (data) {
      trackView(type, id);
    }
  }, [data]);
  ```
- [ ] Prevent duplicate views (check localStorage)
- [ ] Test view tracking

### Step 10.2.7: Frontend - Display View Count
- [ ] Update `ProjectCard.jsx` untuk display view count
- [ ] Update `DetailPage.jsx` untuk display view count
- [ ] Style view count display
- [ ] Format number (1.2k, 1.5M, etc.)
- [ ] Test display

### Step 10.2.8: Frontend - Add Popular/Trending Section
- [ ] Buka `src/pages/ShowcasePage.jsx`
- [ ] Add "Popular" filter/section
- [ ] Sort by view_count
- [ ] Add "Trending" section (most views this week)
- [ ] Test sections

### Step 10.2.9: Frontend - Create Analytics Service
- [ ] Buat file `src/services/analyticsService.js`
- [ ] Create function `getProjectAnalytics(id)`:
  - Call GET `/api/v1/projects/:id/analytics`
- [ ] Create function `getPortfolioAnalytics(id)`:
  - Call GET `/api/v1/portfolios/:id/analytics`
- [ ] Export functions
- [ ] Test functions

### Step 10.2.10: Frontend - Create Analytics Component
- [ ] Buat file `src/components/AnalyticsCard.jsx`
- [ ] Display:
  - Total views
  - Views over time (chart - use recharts atau similar)
  - Unique views
  - Top referrers
- [ ] Only show untuk owners
- [ ] Style component
- [ ] Test component

### Step 10.2.11: Frontend - Add Analytics to DetailPage
- [ ] Buka `src/pages/DetailPage.jsx`
- [ ] Add AnalyticsCard component (owner only)
- [ ] Position di detail page
- [ ] Test analytics display

---

## ✅ 10.3 User Profile Pages & Dashboard

### Step 10.3.1: Backend - User Profile Endpoint
- [ ] Create GET `/api/v1/users/:id` endpoint:
  - Return: `{ id, name, email, avatar_url, bio, social_links, created_at, stats: { projects_count, portfolios_count, total_views, total_likes } }`
- [ ] Create GET `/api/v1/users/:id/projects` endpoint
- [ ] Create GET `/api/v1/users/:id/portfolios` endpoint
- [ ] Test endpoints

### Step 10.3.2: Backend - Update User Profile Endpoint
- [ ] Create PUT `/api/v1/users/:id` endpoint:
  - Body: `{ bio, social_links, avatar_url }`
  - Add authentication & ownership check
- [ ] Test endpoint

### Step 10.3.3: Frontend - Create User Service
- [ ] Buat file `src/services/userService.js`
- [ ] Create function `getUserProfile(userId)`:
  - Call GET `/api/v1/users/:id`
- [ ] Create function `getUserProjects(userId)`:
  - Call GET `/api/v1/users/:id/projects`
- [ ] Create function `getUserPortfolios(userId)`:
  - Call GET `/api/v1/users/:id/portfolios`
- [ ] Create function `updateUserProfile(userId, data)`:
  - Call PUT `/api/v1/users/:id`
- [ ] Export functions
- [ ] Test functions

### Step 10.3.4: Frontend - Create useUserProfile Hook
- [ ] Buat file `src/hooks/useUserProfile.js`
- [ ] Create hook:
  ```js
  function useUserProfile(userId) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Fetch profile
    // Return { profile, loading, error, refetch }
  }
  ```
- [ ] Implement functionality
- [ ] Export hook

### Step 10.3.5: Frontend - Create UserProfilePage
- [ ] Buat file `src/pages/UserProfilePage.jsx`
- [ ] Use `useUserProfile` hook
- [ ] Display:
  - User avatar & cover image
  - User name & bio
  - Social links
  - Stats (projects count, portfolios count, views, likes)
  - User's projects grid
  - User's portfolios grid
- [ ] Add loading & error states
- [ ] Style page
- [ ] Add route: `/user/:username` atau `/user/:id`
- [ ] Test page

### Step 10.3.6: Frontend - Create UserCard Component
- [ ] Buat file `src/components/UserCard.jsx`
- [ ] Display user info (avatar, name, stats)
- [ ] Link ke user profile page
- [ ] Use di ProjectCard untuk owner info
- [ ] Style component
- [ ] Test component

### Step 10.3.7: Frontend - Create User Dashboard Page
- [ ] Buat file `src/pages/DashboardPage.jsx`
- [ ] Protected route (require authentication)
- [ ] Display:
  - User stats overview
  - My Projects section
  - My Portfolios section
  - Recent activity
  - Analytics summary
- [ ] Add route: `/dashboard`
- [ ] Add link di Navbar (user menu)
- [ ] Style page
- [ ] Test page

### Step 10.3.8: Frontend - Create MyProjects Component
- [ ] Buat file `src/components/MyProjects.jsx`
- [ ] Fetch current user's projects
- [ ] Display dalam grid/list
- [ ] Add actions: Edit, Delete, View
- [ ] Add "Create New" button
- [ ] Style component
- [ ] Test component

### Step 10.3.9: Frontend - Create MyPortfolios Component
- [ ] Buat file `src/components/MyPortfolios.jsx`
- [ ] Similar to MyProjects
- [ ] Display user's portfolios
- [ ] Add actions
- [ ] Style component
- [ ] Test component

### Step 10.3.10: Frontend - Add Profile Link in Navbar
- [ ] Buka `src/components/Navbar.jsx`
- [ ] Add user menu dropdown:
  - Profile link
  - Dashboard link
  - Settings link (future)
  - Logout
- [ ] Style dropdown
- [ ] Test navigation

---

## ✅ 10.4 Badges & Achievements

### Step 10.4.1: Backend - Badges System
- [ ] Plan badges table:
  - `id`, `name`, `description`, `icon_url`, `category`, `criteria`
- [ ] Plan user_badges table:
  - `id`, `user_id`, `badge_id`, `earned_at`
- [ ] Create migration scripts
- [ ] Seed default badges:
  - First Project
  - 10 Views
  - 100 Views
  - 10 Likes
  - Featured Project
  - etc.

### Step 10.4.2: Backend - Badge Endpoints
- [ ] Create GET `/api/v1/badges` endpoint (all badges)
- [ ] Create GET `/api/v1/users/:id/badges` endpoint (user's badges)
- [ ] Create POST `/api/v1/badges/award` endpoint (award badge - system only)
- [ ] Test endpoints

### Step 10.4.3: Backend - Badge Award Logic
- [ ] Create badge service untuk check criteria:
  - Check on project creation
  - Check on view milestone
  - Check on like milestone
  - Check on featured status
- [ ] Auto-award badges when criteria met
- [ ] Test logic

### Step 10.4.4: Frontend - Create Badge Service
- [ ] Buat file `src/services/badgeService.js`
- [ ] Create function `getAllBadges()`
- [ ] Create function `getUserBadges(userId)`
- [ ] Export functions
- [ ] Test functions

### Step 10.4.5: Frontend - Create Badge Component
- [ ] Buat file `src/components/Badge.jsx`
- [ ] Props: `badge` object
- [ ] Display badge icon, name, description
- [ ] Add tooltip untuk description
- [ ] Style component
- [ ] Test component

### Step 10.4.6: Frontend - Create BadgeList Component
- [ ] Buat file `src/components/BadgeList.jsx`
- [ ] Display list of badges
- [ ] Show earned vs not earned
- [ ] Style component
- [ ] Test component

### Step 10.4.7: Frontend - Add Badges to User Profile
- [ ] Buka `src/pages/UserProfilePage.jsx`
- [ ] Add BadgeList component
- [ ] Display user's earned badges
- [ ] Style integration
- [ ] Test display

### Step 10.4.8: Frontend - Add Badges to Dashboard
- [ ] Buka `src/pages/DashboardPage.jsx`
- [ ] Add BadgeList component
- [ ] Show recent badges earned
- [ ] Style integration
- [ ] Test display

### Step 10.4.9: Frontend - Badge Notification
- [ ] Create notification system untuk new badges
- [ ] Show toast notification when badge earned
- [ ] Add to notification center
- [ ] Test notifications

---

## ✅ 10.5 Mobile Features

### Step 10.5.1: Mobile Navigation Improvements
- [ ] Buka `src/components/Navbar.jsx`
- [ ] Improve mobile menu:
  - Better hamburger menu
  - Smooth slide animation
  - Touch-friendly buttons
  - Better spacing
- [ ] Test di mobile devices

### Step 10.5.2: Swipe Gestures for Cards
- [ ] Install swipe library (react-swipeable atau similar)
- [ ] Add swipe gestures ke ProjectCard:
  - Swipe right: Like
  - Swipe left: View details
- [ ] Add visual feedback
- [ ] Test gestures

### Step 10.5.3: Pull to Refresh
- [ ] Add pull-to-refresh functionality ke ShowcasePage
- [ ] Use library atau custom implementation
- [ ] Add loading indicator
- [ ] Test functionality

### Step 10.5.4: Mobile-Optimized Filters
- [ ] Buka `src/components/FilterBar.jsx`
- [ ] Create mobile version:
  - Bottom sheet modal
  - Touch-friendly controls
  - Better spacing
- [ ] Toggle between desktop & mobile views
- [ ] Test di mobile

### Step 10.5.5: Touch-Friendly Interactions
- [ ] Increase touch target sizes (min 44x44px)
- [ ] Add touch feedback (ripple effects)
- [ ] Improve button spacing
- [ ] Test di mobile devices

### Step 10.5.6: Mobile Performance Optimization
- [ ] Optimize images untuk mobile
- [ ] Lazy load images
- [ ] Reduce bundle size
- [ ] Test performance

---

## ✅ 10.6 View Modes

### Step 10.6.1: Create ViewModeToggle Component
- [ ] Buat file `src/components/ViewModeToggle.jsx`
- [ ] Display toggle buttons:
  - Grid view (current)
  - List view
  - Masonry view (optional)
- [ ] Store preference di localStorage
- [ ] Style component
- [ ] Test component

### Step 10.6.2: Implement Grid View
- [ ] Current view (already implemented)
- [ ] Verify grid layout responsive
- [ ] Test grid view

### Step 10.6.3: Implement List View
- [ ] Buka `src/pages/ShowcasePage.jsx`
- [ ] Add list view layout:
  - Horizontal cards
  - More info visible
  - Different card design
- [ ] Toggle between grid & list
- [ ] Style list view
- [ ] Test list view

### Step 10.6.4: Implement Masonry View (Optional)
- [ ] Install masonry library (react-masonry-css atau similar)
- [ ] Implement masonry layout
- [ ] Toggle between views
- [ ] Style masonry view
- [ ] Test masonry view

### Step 10.6.5: Integrate ViewModeToggle
- [ ] Buka `src/pages/ShowcasePage.jsx`
- [ ] Add ViewModeToggle component
- [ ] Position di top (near filters)
- [ ] Connect to view state
- [ ] Test toggle functionality

---

## ✅ 10.7 Animations & Interactions

### Step 10.7.1: Page Transitions
- [ ] Install Framer Motion (already installed)
- [ ] Add page transitions:
  - Fade in/out
  - Slide transitions
- [ ] Apply ke all pages
- [ ] Test transitions

### Step 10.7.2: Card Animations
- [ ] Buka `src/components/ProjectCard.jsx`
- [ ] Add animations:
  - Fade in on mount
  - Stagger animation untuk grid
  - Hover scale effect
- [ ] Use Framer Motion
- [ ] Test animations

### Step 10.7.3: Loading Animations
- [ ] Improve skeleton loaders
- [ ] Add pulse animations
- [ ] Add shimmer effects
- [ ] Test loading states

### Step 10.7.4: Micro-interactions
- [ ] Add button hover effects
- [ ] Add ripple effects on click
- [ ] Add smooth scroll behavior
- [ ] Add focus states animations
- [ ] Test interactions

### Step 10.7.5: Like/Favorite Animations
- [ ] Add heart animation on like
- [ ] Add star animation on favorite
- [ ] Add confetti effect (optional)
- [ ] Test animations

---

## ✅ 10.8 Accessibility

### Step 10.8.1: Keyboard Navigation
- [ ] Add keyboard navigation untuk all interactive elements
- [ ] Add focus indicators
- [ ] Test Tab navigation
- [ ] Test Enter/Space for buttons
- [ ] Test Escape for modals

### Step 10.8.2: Screen Reader Support
- [ ] Add ARIA labels ke all buttons
- [ ] Add ARIA descriptions
- [ ] Add alt text untuk images
- [ ] Test dengan screen reader

### Step 10.8.3: High Contrast Mode
- [ ] Add high contrast CSS variables
- [ ] Add toggle untuk high contrast
- [ ] Test high contrast mode
- [ ] Store preference

### Step 10.8.4: Font Size Controls
- [ ] Add font size controls
- [ ] Small, Medium, Large options
- [ ] Store preference
- [ ] Apply to all text
- [ ] Test font sizes

### Step 10.8.5: Color Contrast
- [ ] Check color contrast ratios
- [ ] Ensure WCAG AA compliance
- [ ] Fix any contrast issues
- [ ] Test dengan contrast checker

### Step 10.8.6: Focus Management
- [ ] Manage focus on route changes
- [ ] Focus trap dalam modals
- [ ] Skip to content link
- [ ] Test focus management

---

## 📦 Deliverables Checklist

### Backend:
- [ ] Likes & Favorites tables created
- [ ] Like/Favorite API endpoints working
- [ ] Views tracking implemented
- [ ] Analytics endpoints working
- [ ] User profile endpoints working
- [ ] Badges system implemented
- [ ] All endpoints tested

### Frontend:
- [ ] LikeButton component created & integrated
- [ ] FavoriteButton component created & integrated
- [ ] View tracking working
- [ ] View count displayed
- [ ] Analytics component created
- [ ] UserProfilePage created
- [ ] DashboardPage created
- [ ] Badge components created
- [ ] Mobile features implemented
- [ ] View modes implemented
- [ ] Animations added
- [ ] Accessibility features implemented

### Testing:
- [ ] All features tested
- [ ] Mobile testing completed
- [ ] Accessibility testing completed
- [ ] Performance tested
- [ ] Browser compatibility verified

---

## 🎯 Next Phase

Setelah Phase 10 selesai, bisa lanjut ke **Phase 7: UI Enhancements** (remaining) atau **Phase 8: Deployment & Optimization**

---

## 📝 Notes

- **Incremental Implementation**: Implement fitur secara bertahap, test setiap fitur sebelum lanjut
- **Performance**: Monitor performance impact dari setiap fitur
- **User Experience**: Prioritize UX dalam setiap implementasi
- **Mobile First**: Test di mobile devices secara berkala
- **Accessibility**: Ensure semua fitur accessible

---

## 🆘 Troubleshooting

### Like/Favorite Not Working
- Check authentication token
- Check API endpoints
- Check database constraints
- Check rate limiting

### Views Not Tracking
- Check rate limiting logic
- Check localStorage for duplicate prevention
- Check API endpoint
- Check network requests

### Performance Issues
- Optimize database queries
- Add caching jika perlu
- Lazy load components
- Optimize images

### Mobile Issues
- Test di real devices
- Check touch target sizes
- Check viewport settings
- Test different screen sizes

