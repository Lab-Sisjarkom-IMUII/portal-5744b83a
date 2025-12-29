# Daftar Masalah Responsivitas Mobile - IMUII Portal

## 1. Detail Showcase (DetailPage.jsx)

### 1.1 Header Section (Line 276-355)
**Masalah:**
- Layout `flex items-start justify-between` dengan title dan action buttons bisa menyebabkan overflow di mobile
- Title dengan `text-4xl` terlalu besar untuk layar mobile kecil
- Badge badges (Project/Portfolio, Deployed, Public/Hidden) bisa wrap dengan tidak rapi di mobile
- Owner action buttons (Hide/Show, Edit) bisa terlalu kecil atau tidak cukup spacing di mobile

**Lokasi:**
```276:355:src/pages/DetailPage.jsx
<div className="flex items-start justify-between gap-4 mb-4">
  <div className="flex-1">
    <div className="flex items-center gap-3 mb-2">
      {/* Badges */}
    </div>
    <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
      {title}
    </h1>
  </div>
  {isOwner && (
    <div className="flex items-center gap-2">
      {/* Action buttons */}
    </div>
  )}
</div>
```

**Rekomendasi:**
- Ubah layout menjadi `flex-col` di mobile untuk stack vertical
- Kurangi ukuran title menjadi `text-2xl sm:text-3xl lg:text-4xl`
- Wrap badges dengan `flex-wrap` dan tambahkan spacing yang lebih baik
- Stack action buttons secara vertical di mobile atau buat lebih compact

---

### 1.2 Thumbnail Section (Line 358-366)
**Masalah:**
- Height `h-64 md:h-96` sudah baik, tapi mungkin perlu padding adjustment di mobile
- Tidak ada max-width constraint yang bisa menyebabkan gambar terlalu lebar di beberapa device

**Lokasi:**
```358:366:src/pages/DetailPage.jsx
{thumbnailUrl && (
  <div className="w-full h-64 md:h-96 bg-[var(--muted)] rounded-lg overflow-hidden mb-6">
    <img
      src={thumbnailUrl}
      alt={title}
      className="w-full h-full object-cover"
    />
  </div>
)}
```

**Rekomendasi:**
- Tambahkan max-width constraint jika diperlukan
- Pertimbangkan aspect ratio yang lebih konsisten

---

### 1.3 Description Section (Line 370-381)
**Masalah:**
- Text bisa terlalu panjang tanpa line breaks yang proper di mobile
- Padding dan spacing mungkin perlu adjustment

**Lokasi:**
```370:381:src/pages/DetailPage.jsx
{description && (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
      Description
    </h2>
    <div className="prose prose-invert max-w-none">
      <p className="text-[var(--foreground)]/80 leading-relaxed whitespace-pre-wrap">
        {description}
      </p>
    </div>
  </div>
)}
```

**Rekomendasi:**
- Pastikan text wrapping bekerja dengan baik
- Tambahkan responsive font size jika diperlukan

---

### 1.4 Info Section (Line 384-413)
**Masalah:**
- Grid `grid-cols-1 md:grid-cols-2` sudah responsive, tapi spacing mungkin perlu adjustment
- Card padding mungkin terlalu besar untuk mobile

**Lokasi:**
```384:413:src/pages/DetailPage.jsx
<div className="mb-8">
  <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
    Information
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Info cards */}
  </div>
</div>
```

**Rekomendasi:**
- Kurangi padding card di mobile (`p-3 sm:p-4`)
- Pastikan gap spacing cukup untuk touch targets

---

### 1.5 Links Section (Line 416-451)
**Masalah:**
- Buttons dengan `flex flex-wrap gap-3` sudah baik, tapi button size mungkin terlalu besar untuk mobile
- Text di dalam button bisa terpotong jika terlalu panjang

**Lokasi:**
```416:451:src/pages/DetailPage.jsx
<div className="mb-8">
  <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
    Links
  </h2>
  <div className="flex flex-wrap gap-3">
    {/* Link buttons */}
  </div>
</div>
```

**Rekomendasi:**
- Buat buttons full-width di mobile (`w-full sm:w-auto`)
- Pertimbangkan icon-only buttons untuk mobile dengan tooltip

---

### 1.6 Team Members Section (Line 454-465)
**Masalah:**
- Grid sudah responsive (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Card padding mungkin perlu adjustment untuk mobile

**Lokasi:**
```454:465:src/pages/DetailPage.jsx
{teamMembers.length > 0 && (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
      Team Members
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teamMembers.map((member, index) => (
        <TeamMemberCard key={index} member={member} />
      ))}
    </div>
  </div>
)}
```

**Rekomendasi:**
- Pastikan TeamMemberCard memiliki padding yang responsive

---

### 1.7 Tags Section (Line 468-484)
**Masalah:**
- Tags dengan `flex flex-wrap gap-2` sudah baik
- Mungkin perlu font size adjustment untuk mobile

**Lokasi:**
```468:484:src/pages/DetailPage.jsx
{tags.length > 0 && (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
      Tags
    </h2>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-[var(--primary)]/20 text-[var(--primary)] rounded-full text-sm font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
)}
```

**Rekomendasi:**
- Pertimbangkan ukuran font yang lebih kecil untuk mobile jika tag terlalu banyak

---

### 1.8 Joined Events Section (Line 487-574)
**Masalah:**
- Grid `grid-cols-1 md:grid-cols-2` sudah responsive
- Card layout dengan buttons di dalam bisa terlalu padat di mobile
- Action buttons (View Event, Leave) bisa terlalu kecil untuk touch targets

**Lokasi:**
```522:571:src/pages/DetailPage.jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {joinedEvents.map((evt) => (
    <Card key={evt.id} className="p-4 space-y-2">
      {/* Event content */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
        <Button variant="secondary" size="sm" onClick={...}>
          View Event
        </Button>
        {isOwner && (
          <Button variant="secondary" size="sm" onClick={...}>
            Leave
          </Button>
        )}
      </div>
    </Card>
  ))}
</div>
```

**Rekomendasi:**
- Stack buttons vertically di mobile atau buat full-width
- Pastikan touch targets minimal 44x44px

---

### 1.9 Manage Events Modal (Line 577-703)
**Masalah:**
- Card dengan `flex flex-col md:flex-row` sudah responsive
- Layout bisa terlalu padat di mobile
- Buttons di dalam card bisa terlalu kecil

**Lokasi:**
```627:696:src/pages/DetailPage.jsx
<Card
  key={evt.id}
  className="p-3 flex flex-col md:flex-row md:items-center justify-between gap-3"
>
  <div className="min-w-0">
    {/* Event info */}
  </div>
  <div className="flex items-center gap-2 flex-shrink-0">
    {/* Action buttons */}
  </div>
</Card>
```

**Rekomendasi:**
- Pastikan spacing yang cukup antara content dan buttons
- Buat buttons lebih besar untuk mobile atau stack vertically

---

### 1.10 Share Buttons Section (Line 706-711)
**Masalah:**
- Buttons dengan `flex flex-wrap gap-3` sudah baik
- Button size mungkin perlu adjustment untuk mobile

**Lokasi:**
```706:711:src/pages/DetailPage.jsx
<div className="mb-8">
  <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">
    Share
  </h2>
  <ShareButtons url={currentUrl} title={title} description={description} />
</div>
```

**Rekomendasi:**
- Pastikan ShareButtons component memiliki responsive button sizes

---

## 2. Dashboard (DashboardPage.jsx)

### 2.1 Header Section (Line 43-50)
**Masalah:**
- Title `text-3xl` mungkin terlalu besar untuk mobile
- Description text bisa terlalu panjang tanpa proper wrapping

**Lokasi:**
```43:50:src/pages/DashboardPage.jsx
<div className="mb-8">
  <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
    My Dashboard
  </h1>
  <p className="text-[var(--foreground)]/60">
    Welcome back, {user?.name || user?.email || "User"}! Manage your projects and portfolios here.
  </p>
</div>
```

**Rekomendasi:**
- Kurangi ukuran title menjadi `text-2xl sm:text-3xl`
- Pastikan description text wrapping dengan baik

---

### 2.2 StatsOverview Component
**Masalah:**
- Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` sudah responsive
- Card padding `p-6` mungkin terlalu besar untuk mobile
- Icon size dan text size mungkin perlu adjustment

**Lokasi:**
```69:90:src/components/StatsOverview.jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  {statCards.map((stat) => {
    return (
      <Card key={stat.label} className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-[var(--foreground)]/60 mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-[var(--foreground)]">
              {stat.value}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </Card>
    );
  })}
</div>
```

**Rekomendasi:**
- Kurangi padding menjadi `p-4 sm:p-6`
- Kurangi text size menjadi `text-2xl sm:text-3xl`
- Kurangi icon size menjadi `h-5 w-5 sm:h-6 w-6`

---

### 2.3 MyProjects Component Header (Line 80-94)
**Masalah:**
- Header dengan `flex items-center justify-between` bisa menyebabkan overflow di mobile
- Button "Create New" bisa terlalu kecil atau terpotong di mobile
- Title dengan count bisa terlalu panjang

**Lokasi:**
```80:94:src/components/MyProjects.jsx
<div className="flex items-center justify-between">
  <h2 className="text-2xl font-bold text-[var(--foreground)]">
    My Projects ({projects.length})
  </h2>
  <Button
    variant="primary"
    size="sm"
    onClick={...}
  >
    <Plus className="h-4 w-4 mr-1" />
    Create New
  </Button>
</div>
```

**Rekomendasi:**
- Stack header dan button vertically di mobile (`flex-col sm:flex-row`)
- Buat button full-width di mobile atau icon-only dengan label di bawah
- Kurangi font size title menjadi `text-xl sm:text-2xl`

---

### 2.4 MyProjects Grid (Line 113)
**Masalah:**
- Grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` sudah responsive
- Card padding dan spacing mungkin perlu adjustment

**Lokasi:**
```113:199:src/components/MyProjects.jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {projects.map((project) => (
    <Card className="overflow-hidden cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-200">
      {/* Project card content */}
    </Card>
  ))}
</div>
```

**Rekomendasi:**
- Pastikan gap spacing cukup untuk touch targets
- Kurangi padding card di mobile

---

### 2.5 MyProjects Action Buttons (Line 171-195)
**Masalah:**
- Buttons dengan `flex items-center gap-2` bisa terlalu kecil untuk touch targets di mobile
- Delete button (icon only) mungkin terlalu kecil

**Lokasi:**
```171:195:src/components/MyProjects.jsx
<div className="flex items-center gap-2 pt-3 border-t border-[var(--border)]">
  <Button
    variant="secondary"
    size="sm"
    onClick={...}
    className="flex-1"
  >
    <Edit className="h-4 w-4 mr-1" />
    Edit
  </Button>
  <Button
    variant="secondary"
    size="sm"
    onClick={...}
    className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
  >
    <Trash2 className="h-4 w-4" />
  </Button>
</div>
```

**Rekomendasi:**
- Pastikan button height minimal 44px untuk touch targets
- Pertimbangkan membuat delete button lebih besar atau dengan label di mobile

---

### 2.6 MyPortfolios Component
**Masalah:**
- Sama seperti MyProjects, header dan grid layout perlu adjustment yang sama

**Lokasi:**
- `src/components/MyPortfolios.jsx` - Line 80-94 (Header)
- `src/components/MyPortfolios.jsx` - Line 113 (Grid)
- `src/components/MyPortfolios.jsx` - Line 171-195 (Action Buttons)

**Rekomendasi:**
- Terapkan fix yang sama seperti MyProjects

---

### 2.7 MyEvents Component
**Masalah:**
- Grid `grid-cols-1 md:grid-cols-2` sudah responsive
- Card layout mungkin perlu spacing adjustment

**Lokasi:**
```99:158:src/components/MyEvents.jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {events.map((event) => (
    <Card key={event.id} className="p-4 space-y-3">
      {/* Event content */}
    </Card>
  ))}
</div>
```

**Rekomendasi:**
- Pastikan padding dan spacing cukup untuk readability

---

## 3. Komponen Pendukung

### 3.1 FilterBar Component
**Masalah:**
- Layout dengan `flex flex-wrap items-center gap-4` bisa menyebabkan wrapping yang tidak rapi di mobile
- Label dan controls bisa terlalu kecil
- Select dropdowns bisa sulit digunakan di mobile

**Lokasi:**
```20:91:src/components/FilterBar.jsx
<div className="flex flex-wrap items-center gap-4 p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg">
  {/* Type Filter */}
  <div className="flex items-center gap-2">
    <label className="text-sm font-medium text-[var(--foreground)]/70">
      Type:
    </label>
    {/* Buttons */}
  </div>
  {/* Owner Filter */}
  {/* Sort Filter */}
  {/* Clear Filters Button */}
</div>
```

**Rekomendasi:**
- Stack filter groups vertically di mobile
- Buat select dropdowns lebih besar untuk touch targets
- Pertimbangkan menggunakan mobile-friendly filter UI (drawer/modal)

---

### 3.2 SearchBar Component
**Masalah:**
- Sudah cukup responsive, tapi mungkin perlu padding adjustment

**Lokasi:**
```46:68:src/components/SearchBar.jsx
<div className="relative">
  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
    <Search className="h-5 w-5 text-[var(--foreground)]/40" />
  </div>
  <input
    type="text"
    className="w-full pl-10 pr-10 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg..."
  />
</div>
```

**Rekomendasi:**
- Pastikan input height minimal 44px untuk touch targets
- Pertimbangkan font size yang lebih besar untuk mobile

---

### 3.3 ProjectCard Component
**Masalah:**
- Card sudah cukup responsive
- Thumbnail height `h-48` mungkin perlu adjustment untuk mobile
- Footer dengan icons dan date bisa terlalu padat

**Lokasi:**
```138:160:src/components/ProjectCard.jsx
<div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
  <div className="flex items-center gap-2">
    {/* Icons */}
  </div>
  {createdDate && (
    <div className="flex items-center gap-1 text-xs text-[var(--foreground)]/50">
      <Calendar className="h-3 w-3" />
      <span>{formatDate(createdDate)}</span>
    </div>
  )}
</div>
```

**Rekomendasi:**
- Pastikan spacing cukup untuk touch targets
- Pertimbangkan font size yang lebih besar untuk date

---

## 4. Layout & Container Issues

### 4.1 Layout Component
**Masalah:**
- Container padding `px-4 py-8` mungkin perlu adjustment untuk mobile
- Max-width `max-w-7xl` sudah baik

**Lokasi:**
```13:15:src/components/Layout.jsx
<div className="container mx-auto px-4 py-8 max-w-7xl">
  {children}
</div>
```

**Rekomendasi:**
- Pertimbangkan padding yang lebih kecil di mobile (`px-3 sm:px-4`)
- Pastikan tidak ada horizontal overflow

---

### 4.2 DetailPage Container
**Masalah:**
- Tidak ada container wrapper, langsung menggunakan `py-8`
- Padding mungkin tidak konsisten dengan halaman lain

**Lokasi:**
```262:262:src/pages/DetailPage.jsx
<div className="py-8">
```

**Rekomendasi:**
- Tambahkan container wrapper yang konsisten dengan halaman lain
- Pastikan padding horizontal ada

---

## 5. Summary Prioritas Perbaikan

### Prioritas Tinggi:
1. **DetailPage Header Section** - Layout bisa overflow di mobile
2. **FilterBar Component** - Sulit digunakan di mobile
3. **MyProjects/MyPortfolios Header** - Button bisa terpotong
4. **Action Buttons** - Touch targets terlalu kecil

### Prioritas Sedang:
1. **StatsOverview Cards** - Padding dan text size
2. **DetailPage Info Section** - Card padding
3. **Links Section** - Button sizing
4. **Team Members Section** - Card padding

### Prioritas Rendah:
1. **Text Sizing** - Font size adjustments
2. **Spacing** - Gap dan padding refinements
3. **Thumbnail Sizing** - Height adjustments

---

## 6. Rekomendasi Umum

1. **Touch Targets**: Pastikan semua interactive elements minimal 44x44px
2. **Font Sizing**: Gunakan responsive font sizes (`text-sm sm:text-base`)
3. **Spacing**: Gunakan responsive spacing (`p-3 sm:p-4`, `gap-2 sm:gap-4`)
4. **Layout**: Stack vertically di mobile, horizontal di desktop
5. **Buttons**: Full-width di mobile untuk primary actions, atau minimal 44px height
6. **Cards**: Kurangi padding di mobile untuk lebih banyak content space
7. **Grids**: Pastikan grid breakpoints sesuai dengan content density

