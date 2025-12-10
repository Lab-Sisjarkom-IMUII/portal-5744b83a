# 📝 PHASE 5: DETAIL PAGE

## 📋 Overview
Membuat halaman detail untuk project/portfolio dan form edit metadata.

---

## ✅ 5.1 Project/Portfolio Detail Page

### Step 5.1.1: Create DetailPage Component - Structure
- [ ] Buat file `src/pages/DetailPage.jsx`
- [ ] Import React hooks
- [ ] Import `useParams` dari react-router-dom
- [ ] Import `useProject` dan `usePortfolio` hooks
- [ ] Create basic component structure
- [ ] Export component

### Step 5.1.2: Create DetailPage Component - Get Route Params
- [ ] Use `useParams()` untuk get:
  - `id` - project atau portfolio ID
  - Determine type dari route path (akan dihandle di routing)
- [ ] Add state untuk determine type: `project` atau `portfolio`

### Step 5.1.3: Create DetailPage Component - Conditional Hook Usage
- [ ] Check type:
  - If type === "project", use `useProject(id)`
  - If type === "portfolio", use `usePortfolio(id)`
- [ ] Get data, loading, error dari hook

### Step 5.1.4: Create DetailPage Component - Loading State
- [ ] Check jika `loading === true`
- [ ] Show loading UI:
  - Import DetailSkeleton component (akan dibuat)
  - Or show spinner
- [ ] Return early jika loading

### Step 5.1.5: Create DetailPage Component - Error State
- [ ] Check jika `error` exists
- [ ] Show error UI:
  - Error message
  - Back button ke showcase
  - Retry button
- [ ] Return early jika error

### Step 5.1.6: Create DetailPage Component - Not Found State
- [ ] Check jika data is null setelah loading selesai
- [ ] Show 404 UI:
  - "Project/Portfolio not found" message
  - Back button ke showcase
- [ ] Return early jika not found

### Step 5.1.7: Create DetailPage Layout - Hero Section
- [ ] Create hero section:
  - Container dengan background (optional gradient)
  - Thumbnail image (large size)
  - Title (ShowcaseTitle atau Name)
  - Type badge (Project/Portfolio)
  - Status badge
- [ ] Style dengan Tailwind

### Step 5.1.8: Create DetailPage Layout - Description Section
- [ ] Create description section:
  - Container dengan max-width
  - Display description (ShowcaseDescription atau Description)
  - Support markdown jika diperlukan (optional)
  - Style dengan Tailwind
- [ ] Add to page

### Step 5.1.9: Create DetailPage Layout - Info Section
- [ ] Create info section:
  - Grid layout untuk info items
  - Owner info dengan avatar
  - Created date
  - Updated date (optional)
  - Status
- [ ] Style dengan Tailwind

### Step 5.1.10: Create DetailPage Layout - Links Section
- [ ] Create links section:
  - Deploy URL button (external link)
  - YouTube link button (jika ada)
  - GitHub link (jika ada, dari repo_url)
- [ ] Style buttons dengan Tailwind
- [ ] Add icons (lucide-react)

### Step 5.1.11: Create DetailPage Layout - Team Members Section
- [ ] Check jika `team_members` exists dan not empty
- [ ] Create team members section:
  - Section title: "Team Members"
  - Grid layout untuk members
  - Display each member:
    - Avatar (jika ada)
    - Name
    - Role (jika ada)
    - Email (jika ada, optional)
- [ ] Style dengan Tailwind

### Step 5.1.12: Create DetailPage Layout - Tags Section
- [ ] Check jika `tags` exists dan not empty
- [ ] Create tags section:
  - Section title: "Tags"
  - Display tags as badges
  - Color-coded tags (optional)
- [ ] Style dengan Tailwind

### Step 5.1.13: Create DetailSkeleton Component
- [ ] Buat file `src/components/DetailSkeleton.jsx`
- [ ] Create skeleton structure:
  - Hero skeleton (image, title)
  - Description skeleton (multiple lines)
  - Info skeleton (grid items)
  - Links skeleton (buttons)
- [ ] Add pulse animation
- [ ] Export component

### Step 5.1.14: Add Social Share Buttons
- [ ] Create ShareButtons component:
  - Twitter share button
  - Facebook share button
  - LinkedIn share button
  - Copy link button
- [ ] Generate share URLs dengan current page URL
- [ ] Add to detail page

### Step 5.1.15: Create ShareButtons Component - Structure
- [ ] Buat file `src/components/ShareButtons.jsx`
- [ ] Define props: `url`, `title`, `description`
- [ ] Create button container
- [ ] Export component

### Step 5.1.16: Create ShareButtons Component - Twitter Share
- [ ] Add Twitter share button:
  - Construct Twitter share URL
  - Format: `https://twitter.com/intent/tweet?url=${url}&text=${title}`
  - Open in new window
  - Add Twitter icon
- [ ] Add to component

### Step 5.1.17: Create ShareButtons Component - Facebook Share
- [ ] Add Facebook share button:
  - Construct Facebook share URL
  - Format: `https://www.facebook.com/sharer/sharer.php?u=${url}`
  - Open in new window
  - Add Facebook icon
- [ ] Add to component

### Step 5.1.18: Create ShareButtons Component - LinkedIn Share
- [ ] Add LinkedIn share button:
  - Construct LinkedIn share URL
  - Format: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
  - Open in new window
  - Add LinkedIn icon
- [ ] Add to component

### Step 5.1.19: Create ShareButtons Component - Copy Link
- [ ] Add copy link button:
  - Use `navigator.clipboard.writeText(url)`
  - Show toast notification setelah copy
  - Add copy icon
  - Change icon to check setelah copy
- [ ] Add to component

### Step 5.1.20: Add Embed Preview (Optional)
- [ ] Create embed section:
  - Iframe untuk preview website
  - Use `deploy_url` sebagai src
  - Add loading state
  - Handle iframe errors
  - Responsive sizing
- [ ] Add to detail page (optional feature)

### Step 5.1.21: Add Back Button
- [ ] Add back button:
  - Link atau button ke showcase page
  - Use `useNavigate` dengan `-1` atau specific path
  - Add back icon
  - Style dengan Tailwind
- [ ] Add to page

### Step 5.1.22: Update Route Configuration
- [ ] Buka route configuration
- [ ] Add routes:
  - `/project/:id` → DetailPage (with type="project")
  - `/portfolio/:id` → DetailPage (with type="portfolio")
- [ ] Pass type prop atau determine dari route
- [ ] Test routing

---

## ✅ 5.2 Edit Metadata Modal/Form

### Step 5.2.1: Check Owner Permission
- [ ] In DetailPage, check jika current user is owner:
  - Get current user dari `useAuth`
  - Compare `user.id` dengan `item.owner_id` atau `item.user_id`
  - Show edit button hanya jika match
- [ ] Add state untuk track isOwner

### Step 5.2.2: Create Edit Button
- [ ] Add edit button di detail page:
  - Show hanya jika `isOwner === true`
  - Icon: Edit (lucide-react)
  - Style dengan Tailwind
  - Add onClick handler untuk open modal
- [ ] Add to page

### Step 5.2.3: Create EditModal Component - Structure
- [ ] Buat file `src/components/EditModal.jsx`
- [ ] Define props: `isOpen`, `onClose`, `item`, `type`, `onSave`
- [ ] Use Modal component yang sudah dibuat
- [ ] Create basic structure
- [ ] Export component

### Step 5.2.4: Create EditModal Component - Title
- [ ] Add modal title:
  - "Edit Project" atau "Edit Portfolio"
  - Style dengan Tailwind
- [ ] Add to modal

### Step 5.2.5: Create EditForm Component - Structure
- [ ] Buat file `src/components/EditForm.jsx`
- [ ] Define props: `item`, `type`, `onSubmit`, `onCancel`
- [ ] Create form structure
- [ ] Export component

### Step 5.2.6: Create EditForm Component - Title Field
- [ ] Add title input field:
  - Label: "Title"
  - Use Input component
  - Default value: `item.showcase_title || item.name`
  - Required validation
  - Max length: 100 (configurable)
- [ ] Add state untuk title value
- [ ] Add to form

### Step 5.2.7: Create EditForm Component - Description Field
- [ ] Add description textarea:
  - Label: "Description"
  - Use textarea element
  - Default value: `item.showcase_description || item.description`
  - Required validation
  - Max length: 1000 (configurable)
  - Rows: 5-6
- [ ] Add state untuk description value
- [ ] Add to form

### Step 5.2.8: Create EditForm Component - Team Members Field
- [ ] Add team members input:
  - Label: "Team Members"
  - Array input: add/remove members
  - Default value: `item.team_members || []`
  - Each member: { name, email?, role? }
- [ ] Add state untuk team members array
- [ ] Create add member function
- [ ] Create remove member function
- [ ] Add to form

### Step 5.2.9: Create TeamMemberInput Component
- [ ] Buat file `src/components/TeamMemberInput.jsx`
- [ ] Define props: `members`, `onChange`
- [ ] Create input untuk add new member
- [ ] Display list of added members
- [ ] Add remove button untuk each member
- [ ] Export component

### Step 5.2.10: Create EditForm Component - YouTube Link Field
- [ ] Add YouTube link input:
  - Label: "YouTube Link (Optional)"
  - Use Input component
  - Default value: `item.youtube_link || ''`
  - URL validation
  - Placeholder: "https://youtube.com/watch?v=..."
- [ ] Add state untuk YouTube link value
- [ ] Add to form

### Step 5.2.11: Create EditForm Component - Tags Field
- [ ] Add tags input:
  - Label: "Tags (Optional)"
  - Array input: add/remove tags
  - Default value: `item.tags || []`
  - Each tag: string
- [ ] Add state untuk tags array
- [ ] Create add tag function
- [ ] Create remove tag function
- [ ] Add to form

### Step 5.2.12: Create TagsInput Component
- [ ] Buat file `src/components/TagsInput.jsx`
- [ ] Define props: `tags`, `onChange`
- [ ] Create input untuk add new tag
  - Enter key untuk add tag
  - Comma untuk separate tags (optional)
- [ ] Display tags as chips dengan remove button
- [ ] Export component

### Step 5.2.13: Create EditForm Component - Thumbnail URL Field
- [ ] Add thumbnail URL input:
  - Label: "Thumbnail URL (Optional)"
  - Use Input component
  - Default value: `item.thumbnail_url || ''`
  - URL validation
  - Placeholder: "https://example.com/image.jpg"
- [ ] Add state untuk thumbnail URL value
- [ ] Add preview image jika URL valid (optional)
- [ ] Add to form

### Step 5.2.14: Create EditForm Component - Form Validation
- [ ] Add validation logic:
  - Title: required, min 3 chars, max 100 chars
  - Description: required, min 10 chars, max 1000 chars
  - YouTube URL: valid URL format (jika filled)
  - Thumbnail URL: valid URL format (jika filled)
  - Team members: min 1 member
- [ ] Show validation errors
- [ ] Disable submit jika validation fails

### Step 5.2.15: Create EditForm Component - Submit Handler
- [ ] Add onSubmit handler:
  - Prevent default
  - Validate form
  - If valid, prepare data object:
    - showcase_title
    - showcase_description
    - team_members
    - youtube_link
    - tags
    - thumbnail_url
  - Call `onSubmit` prop dengan data
- [ ] Add loading state selama submit

### Step 5.2.16: Create EditForm Component - Cancel Handler
- [ ] Add cancel button:
  - Call `onCancel` prop
  - Reset form to original values
- [ ] Add to form

### Step 5.2.17: Integrate EditModal in DetailPage
- [ ] Add state untuk modal: `const [isEditModalOpen, setIsEditModalOpen] = useState(false)`
- [ ] Add EditModal component
- [ ] Pass props: isOpen, onClose, item, type, onSave
- [ ] Handle onSave:
  - Call update API (projectService atau portfolioService)
  - Show loading state
  - On success: close modal, refresh data, show success toast
  - On error: show error toast

### Step 5.2.18: Add Form Pre-fill Logic
- [ ] In EditForm, pre-fill form dengan existing data:
  - Load current values on mount
  - Populate all fields
  - Handle null/undefined values
- [ ] Test pre-fill working

### Step 5.2.19: Add Success Toast
- [ ] After successful update:
  - Show success toast: "Project/Portfolio updated successfully"
  - Close modal
  - Refresh detail page data
- [ ] Test success flow

### Step 5.2.20: Add Error Handling
- [ ] Handle update errors:
  - Show error toast dengan message
  - Keep modal open
  - Allow user to retry
- [ ] Test error handling

---

## ✅ 5.3 Team Members Display & Management

### Step 5.3.1: Display Team Members in Detail Page
- [ ] In DetailPage, check jika `item.team_members` exists
- [ ] Display team members:
  - Section title
  - Grid layout
  - Each member card dengan:
    - Avatar (jika ada, atau default avatar)
    - Name
    - Role (jika ada)
    - Email (jika ada, optional)
- [ ] Style dengan Tailwind

### Step 5.3.2: Create TeamMemberCard Component
- [ ] Buat file `src/components/TeamMemberCard.jsx`
- [ ] Define props: `member` (object dengan name, email?, role?, avatar?)
- [ ] Create card structure:
  - Avatar image atau initial letter
  - Name
  - Role (jika ada)
  - Email (jika ada, as link)
- [ ] Style dengan Tailwind
- [ ] Export component

### Step 5.3.3: Team Members Input in Form - Add Member
- [ ] In TeamMemberInput component:
  - Add input fields untuk new member:
    - Name input (required)
    - Email input (optional)
    - Role input (optional)
  - Add "Add Member" button
  - Validate: name required
  - Add to members array on click
- [ ] Test add member

### Step 5.3.4: Team Members Input in Form - Remove Member
- [ ] In TeamMemberInput component:
  - Display list of members
  - Add remove button untuk each member
  - Remove dari array on click
  - Validation: min 1 member (owner)
- [ ] Test remove member

### Step 5.3.5: Team Members Input in Form - Edit Member
- [ ] Add edit functionality (optional):
  - Click member untuk edit
  - Show edit form
  - Update member data
  - Save changes
- [ ] Implement jika diperlukan

### Step 5.3.6: Format Team Members Data
- [ ] Ensure data format consistent:
  - Array of objects: `[{ name, email?, role?, avatar? }]`
  - Validate format sebelum submit
  - Handle empty values
- [ ] Test data format

---

## 📦 Deliverables Checklist

- [ ] ✅ DetailPage component created
- [ ] ✅ Loading state dengan DetailSkeleton
- [ ] ✅ Error state handled
- [ ] ✅ Not found state handled
- [ ] ✅ All information displayed (hero, description, info, links, team, tags)
- [ ] ✅ Social share buttons working
- [ ] ✅ Back button working
- [ ] ✅ Routes configured untuk /project/:id dan /portfolio/:id
- [ ] ✅ Owner permission check working
- [ ] ✅ Edit button shown hanya untuk owner
- [ ] ✅ EditModal component created
- [ ] ✅ EditForm component created dengan semua fields
- [ ] ✅ Form validation working
- [ ] ✅ Team members input working
- [ ] ✅ Tags input working
- [ ] ✅ Form submission working
- [ ] ✅ Success/error handling working
- [ ] ✅ Team members display working
- [ ] ✅ All features tested

---

## 🎯 Next Phase
Setelah Phase 5 selesai, lanjut ke **Phase 6: Backend Extensions**

