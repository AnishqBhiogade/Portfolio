# 🎮 Portfolio — Pixel Adventure Theme

A pixel-art themed personal portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 📁 Project Structure

```
src/
  components/
    PixelCursor.tsx     # Custom pixel cursor
    Nav.tsx             # Sticky navigation
  sections/
    Hero.tsx            # Landing section with crab eyes effect
    About.tsx           # Character sheet with pixel photo hover
    Projects.tsx        # Project cards
    Connect.tsx         # Contact links
  App.tsx
  main.tsx
  index.css
```

## 🖼️ Adding Your Photos

Place two images in the `public/` folder:
1. `photo-real.jpg` — Your actual photo (used as base in About section)
2. `photo-pixel.png` — The pixel art version (revealed on cursor hover)

These correspond to the two pixel art images you provided.

## ✏️ Customizing Content

### Hero Section (`src/sections/Hero.tsx`)
- Replace `"Your"` and `"Name"` with your actual name (in two `<span>` elements)

### About Section (`src/sections/About.tsx`)
- Update the bio text paragraph
- Change `"Your Name"` in the photo card
- Update `"BITS Pilani 2021–2025"` dates
- Edit the `skills` array

### Projects Section (`src/sections/Projects.tsx`)
- Edit the `projects` array with your actual projects
- Add real `link` and `demo` URLs
- Update icons (emoji), `level` (1–5), descriptions

### Connect Section (`src/sections/Connect.tsx`)
- Update `href` values with your real social links and email

## 🎨 Effects

| Effect | Description |
|--------|-------------|
| Crab Eyes | Hover left/right edges of Hero — pixel crabs emerge with stalked eyes |
| Pixel Reveal | Hover your photo in About — cursor reveals pixel art version underneath |
| Custom Cursor | Pixel-shaped cursor follows mouse with trailing ghost |
| Starfield | Twinkling pixel stars in hero background |

## 📦 Tech Stack

- **React 18** + **TypeScript**
- **Vite** for bundling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Press Start 2P** (pixel font) + **Syne** + **DM Sans** via Google Fonts

## 🌐 Deployment

```bash
npm run build
# Deploy the `dist/` folder to Vercel, Netlify, or GitHub Pages
```
