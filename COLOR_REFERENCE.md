# 🎨 Color Reference - imuii-web

Dokumen ini berisi referensi lengkap semua warna yang digunakan di imuii-web, termasuk CSS variables, Tailwind classes, dan penggunaan spesifik.

**Last Updated**: 2025-11-17

---

## 📋 Daftar Isi

1. [CSS Variables (Theme Colors)](#css-variables-theme-colors)
2. [Primary Colors](#primary-colors)
3. [Accent Colors](#accent-colors)
4. [Status Colors](#status-colors)
5. [Section Type Colors](#section-type-colors)
6. [Background Colors](#background-colors)
7. [Text Colors](#text-colors)
8. [Border Colors](#border-colors)
9. [Gradient Colors](#gradient-colors)
10. [Dark Mode vs Light Mode](#dark-mode-vs-light-mode)

---

## CSS Variables (Theme Colors)

Warna utama yang didefinisikan sebagai CSS variables di `src/app/globals.css`:

### Dark Mode (Default)

```css
:root {
  --background: #0B0B0E;        /* Dark neutral background */
  --foreground: #E5E7EB;         /* Gray 200 - Main text color */
  --muted: #0f1014;              /* Muted background */
  --card: #0d0e12;               /* Card background */
  --border: #1c1f27;             /* Border color */
  --primary: #7C3AED;            /* Violet 600 - Primary brand color */
  --primary-foreground: #0b0b0b; /* Text on primary background */
  --accent: #0D9488;             /* Teal 600 - Accent color */
  --glass-bg: rgba(255,255,255,0.06); /* Glass morphism background */
  --glass-shadow: none;          /* Glass shadow */
}
```

### Light Mode

```css
html.light {
  --background: #ffffff;         /* White background */
  --foreground: #111827;         /* Gray 900 - Main text color */
  --muted: #f5f7fb;             /* Light muted background */
  --card: #ffffff;               /* Card background */
  --border: #e6e6ef;            /* Light border */
  --primary: #7C3AED;            /* Violet 600 - Same as dark */
  --primary-foreground: #ffffff; /* White text on primary */
  --accent: #0D9488;             /* Teal 600 - Same as dark */
  --glass-bg: rgba(0,0,0,0.02); /* Light glass background */
  --glass-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1);
  --ripple-color: rgba(0, 0, 0, 0.1);
}
```

---

## Primary Colors

### Primary (Violet/Purple)

**Hex**: `#7C3AED` (Violet 600)

**Usage**:
- Primary buttons
- Brand elements
- Links
- Focus states
- Logo accents
- Gradient overlays

**Tailwind Classes**:
- `bg-primary` - Primary background
- `text-primary` - Primary text
- `border-primary` - Primary border
- `bg-primary/20` - Primary with 20% opacity
- `bg-primary/30` - Primary with 30% opacity
- `text-primary/80` - Primary text with 80% opacity

**CSS Variable**: `var(--primary)`

**Example Usage**:
```jsx
<button className="bg-primary hover:opacity-90 text-primary-foreground">
  Click Me
</button>
```

---

### Accent (Teal)

**Hex**: `#0D9488` (Teal 600)

**Usage**:
- Accent buttons (Login, CTA)
- Secondary actions
- Highlights
- Gradient overlays

**Tailwind Classes**:
- `bg-accent` - Accent background
- `bg-accent/90` - Accent with 90% opacity
- `text-accent` - Accent text
- `border-accent` - Accent border
- `shadow-accent/20` - Accent shadow

**CSS Variable**: `var(--accent)`

**Example Usage**:
```jsx
<button className="bg-accent hover:bg-accent/90 text-white">
  Login
</button>
```

---

## Status Colors

### Success (Green)

**Hex**: `#10B981` (Green 500), `#059669` (Green 600)

**Usage**:
- Success messages
- Deployed status
- Success badges
- Positive actions

**Tailwind Classes**:
- `bg-green-500/20` - Green background with opacity
- `text-green-400` - Green text
- `border-green-500/30` - Green border
- `bg-green-600` - Solid green background
- `hover:bg-green-700` - Green hover state

**Example Usage**:
```jsx
<div className="bg-green-500/20 text-green-400 border-green-500/30">
  Deployed
</div>
```

---

### Error (Red)

**Hex**: `#EF4444` (Red 500), `#DC2626` (Red 600)

**Usage**:
- Error messages
- Failed status
- Delete actions
- Warning alerts

**Tailwind Classes**:
- `bg-red-500/10` - Red background with opacity
- `text-red-400` - Red text
- `border-red-500/30` - Red border
- `bg-red-600/20` - Red background
- `hover:bg-red-600/30` - Red hover

**Example Usage**:
```jsx
<div className="bg-red-500/30 bg-red-500/10 border-red-500/30">
  <AlertCircle className="text-red-400" />
  Error message
</div>
```

---

### Warning (Yellow/Orange)

**Hex**: `#F59E0B` (Yellow 500), `#F97316` (Orange 500)

**Usage**:
- Warning messages
- Pending status
- Caution indicators

**Tailwind Classes**:
- `bg-yellow-500` - Yellow background
- `text-yellow-400` - Yellow text
- `bg-orange-500/20` - Orange background
- `text-orange-400` - Orange text

**Example Usage**:
```jsx
<div className="bg-yellow-500/20 text-yellow-400">
  Pending
</div>
```

---

### Info (Blue)

**Hex**: `#3B82F6` (Blue 500), `#2563EB` (Blue 600)

**Usage**:
- Info messages
- Draft status
- Information badges

**Tailwind Classes**:
- `bg-blue-500/20` - Blue background
- `text-blue-400` - Blue text
- `border-blue-500/30` - Blue border

**Example Usage**:
```jsx
<div className="bg-blue-500/20 text-blue-400 border-blue-500/30">
  Draft
</div>
```

---

## Section Type Colors

Warna untuk berbagai tipe section di template validator:

| Section Type | Background | Text | Border |
|-------------|-----------|------|--------|
| **header** | `bg-blue-500/20` | `text-blue-400` | `border-blue-500/30` |
| **hero** | `bg-purple-500/20` | `text-purple-400` | `border-purple-500/30` |
| **about** | `bg-green-500/20` | `text-green-400` | `border-green-500/30` |
| **experience** | `bg-orange-500/20` | `text-orange-400` | `border-orange-500/30` |
| **education** | `bg-yellow-500/20` | `text-yellow-400` | `border-yellow-500/30` |
| **skills** | `bg-pink-500/20` | `text-pink-400` | `border-pink-500/30` |
| **projects** | `bg-cyan-500/20` | `text-cyan-400` | `border-cyan-500/30` |
| **footer** | `bg-gray-500/20` | `text-gray-400` | `border-gray-500/30` |
| **custom** | `bg-zinc-500/20` | `text-zinc-400` | `border-zinc-500/30` |

**Location**: `src/components/templates/upload/template-validator.jsx`

---

## Background Colors

### Dark Mode Backgrounds

| Class | Hex/RGBA | Usage |
|-------|----------|-------|
| `bg-[--background]` | `#0B0B0E` | Main background |
| `bg-black/40` | `rgba(0,0,0,0.4)` | Semi-transparent black |
| `bg-black/50` | `rgba(0,0,0,0.5)` | Semi-transparent black |
| `bg-black/60` | `rgba(0,0,0,0.6)` | Semi-transparent black |
| `bg-white/5` | `rgba(255,255,255,0.05)` | Subtle white overlay |
| `bg-white/10` | `rgba(255,255,255,0.1)` | White overlay |
| `bg-zinc-900` | `#18181B` | Zinc dark background |

### Light Mode Backgrounds

| Class | Hex/RGBA | Usage |
|-------|----------|-------|
| `bg-[--background]` | `#ffffff` | Main background (white) |
| `bg-[--muted]` | `#f5f7fb` | Muted background |
| `bg-white` | `#ffffff` | White background |

### Glass Morphism

**Dark Mode**:
```css
.glass {
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
  backdrop-filter: blur(8px);
}
```

**Light Mode**:
```css
.glass {
  background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.85));
  backdrop-filter: blur(12px);
}
```

---

## Text Colors

### Dark Mode Text

| Class | Hex | Usage |
|-------|-----|-------|
| `text-white` | `#FFFFFF` | Primary text |
| `text-[--foreground]` | `#E5E7EB` | Main text (Gray 200) |
| `text-zinc-200` | `#E4E4E7` | Light text |
| `text-zinc-300` | `#D4D4D8` | Secondary text |
| `text-zinc-400` | `#A1A1AA` | Muted text |
| `text-zinc-500` | `#71717A` | Very muted text |

### Light Mode Text

| Class | Hex | Usage |
|-------|-----|-------|
| `text-[--foreground]` | `#111827` | Main text (Gray 900) |
| `text-zinc-600` | `#52525B` | Secondary text |
| `text-zinc-700` | `#3F3F46` | Dark text |
| `text-zinc-800` | `#27272A` | Very dark text |

**Note**: Light mode menggunakan CSS overrides untuk meningkatkan kontras:
- `text-zinc-400` → `#4b5563` (zinc-600)
- `text-zinc-300` → `#374151` (gray-700)
- `text-zinc-200` → `#1f2937` (gray-800)

---

## Border Colors

### Dark Mode Borders

| Class | Hex/RGBA | Usage |
|-------|----------|-------|
| `border-white/10` | `rgba(255,255,255,0.1)` | Standard border |
| `border-[--border]` | `#1c1f27` | Theme border |
| `border-primary/30` | `rgba(124,58,237,0.3)` | Primary border |
| `border-accent/30` | `rgba(13,148,136,0.3)` | Accent border |

### Light Mode Borders

| Class | Hex/RGBA | Usage |
|-------|----------|-------|
| `border-[--border]` | `#e6e6ef` | Theme border |
| `border-black/10` | `rgba(0,0,0,0.1)` | Subtle border |

---

## Gradient Colors

### Background Gradients

**Dark Mode Body Background**:
```css
background: 
  radial-gradient(1000px 600px at 70% -10%, rgba(124,58,237,0.18), transparent),
  radial-gradient(900px 500px at -10% 10%, rgba(13,148,136,0.14), transparent),
  var(--background);
```

**Light Mode Body Background**:
```css
background: 
  linear-gradient(to right, rgba(0,0,0,0.015) 1px, transparent 1px),
  linear-gradient(to bottom, rgba(0,0,0,0.015) 1px, transparent 1px),
  radial-gradient(ellipse 1400px 900px at 25% 15%, rgba(124,58,237,0.06), transparent 60%),
  radial-gradient(ellipse 1200px 800px at 75% 85%, rgba(13,148,136,0.05), transparent 60%),
  var(--background);
```

### Text Gradients

**Hero Title Gradient**:
```jsx
className="bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent"
```

**Logo Gradient**:
```jsx
className="bg-gradient-to-br from-primary to-accent"
```

### Button/Element Gradients

**Primary Gradient**:
```jsx
className="bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
```

---

## Dark Mode vs Light Mode

### Key Differences

| Element | Dark Mode | Light Mode |
|---------|-----------|------------|
| **Background** | `#0B0B0E` | `#ffffff` |
| **Foreground** | `#E5E7EB` (Gray 200) | `#111827` (Gray 900) |
| **Muted** | `#0f1014` | `#f5f7fb` |
| **Border** | `#1c1f27` | `#e6e6ef` |
| **Glass BG** | `rgba(255,255,255,0.06)` | `rgba(255,255,255,0.9)` |
| **Primary** | `#7C3AED` | `#7C3AED` (same) |
| **Accent** | `#0D9488` | `#0D9488` (same) |

### Override Rules

Light mode menggunakan CSS attribute selector untuk override Tailwind classes:

```css
html.light [class*="bg-black/40"] {
  background-color: var(--muted) !important;
}

html.light [class*="text-zinc-400"] {
  color: #4b5563 !important; /* Better contrast */
}
```

---

## Color Usage Guidelines

### Primary Color (`#7C3AED`)
- ✅ Primary buttons
- ✅ Brand elements
- ✅ Links
- ✅ Focus states
- ✅ Logo accents
- ✅ Gradient overlays

### Accent Color (`#0D9488`)
- ✅ CTA buttons (Login, Sign Up)
- ✅ Secondary actions
- ✅ Highlights
- ✅ Success indicators

### Status Colors
- 🟢 **Green**: Success, Deployed, Positive actions
- 🔴 **Red**: Error, Failed, Delete actions
- 🟡 **Yellow**: Warning, Pending
- 🔵 **Blue**: Info, Draft, Neutral status

### Text Hierarchy
1. **Primary Text**: `text-white` (dark) / `text-[--foreground]` (light)
2. **Secondary Text**: `text-zinc-300` (dark) / `text-zinc-600` (light)
3. **Muted Text**: `text-zinc-400` (dark) / `text-zinc-500` (light)

---

## Animation Colors

### Glow Effects

**Primary Glow**:
```css
box-shadow: 0 0 5px rgba(124, 58, 237, 0.3);
box-shadow: 0 0 20px rgba(124, 58, 237, 0.8); /* Hover */
```

**Accent Glow**:
```css
box-shadow: 0 2px 4px rgba(13, 148, 136, 0.3);
box-shadow: 0 4px 6px rgba(13, 148, 136, 0.4); /* Hover */
```

### Neon Pulse Animation

```css
text-shadow: 
  0 0 5px rgba(124, 58, 237, 0.5),
  0 0 10px rgba(124, 58, 237, 0.3),
  0 0 15px rgba(124, 58, 237, 0.2);
```

---

## Code Block Colors

### Dark Mode Code Blocks

```css
.prose pre {
  background: #0f1014;
  border: 1px solid #1c1f27;
}
```

### Light Mode Code Blocks

```css
html.light .prose pre {
  background: #f5f7fb;
  border: 1px solid #e6e6ef;
}
```

---

## Scrollbar Colors

### Dark Mode Scrollbar

```css
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
```

### Light Mode Scrollbar

```css
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
```

---

## Quick Reference Table

| Color Name | Dark Mode | Light Mode | CSS Variable | Usage |
|------------|-----------|------------|--------------|-------|
| **Background** | `#0B0B0E` | `#ffffff` | `--background` | Main background |
| **Foreground** | `#E5E7EB` | `#111827` | `--foreground` | Main text |
| **Primary** | `#7C3AED` | `#7C3AED` | `--primary` | Brand color |
| **Accent** | `#0D9488` | `#0D9488` | `--accent` | CTA color |
| **Muted** | `#0f1014` | `#f5f7fb` | `--muted` | Muted background |
| **Border** | `#1c1f27` | `#e6e6ef` | `--border` | Border color |
| **Card** | `#0d0e12` | `#ffffff` | `--card` | Card background |

---

## Best Practices

1. **Always use CSS variables** untuk theme colors (`var(--primary)`, `var(--accent)`)
2. **Use opacity modifiers** untuk subtle effects (`bg-primary/20`, `text-zinc-400`)
3. **Maintain contrast** - Light mode menggunakan overrides untuk better contrast
4. **Consistent status colors** - Green (success), Red (error), Yellow (warning), Blue (info)
5. **Glass morphism** - Gunakan `.glass` class untuk glass effect
6. **Gradient overlays** - Gunakan radial gradients untuk depth

---

**Last Updated**: 2025-11-17  
**Maintained By**: Development Team

