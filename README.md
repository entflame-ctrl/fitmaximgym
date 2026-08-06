# Fitmaxim

Marketing site for Fitmaxim, a strength and conditioning club in Tokha-03, Kathmandu.

## Stack

- **Next.js 14** (App Router, React Server Components)
- **Tailwind CSS** with a custom maroon token system
- **Framer Motion** for scroll parallax and reveal animations
- **TypeScript**

## Running locally

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Lint with ESLint |

## Structure

```
app/
  layout.tsx      Root layout, fonts, metadata, LocalBusiness schema
  page.tsx        Habits, Why us, Pricing, CTA, Footer
  globals.css     Tailwind layers and design primitives
components/
  Hero.tsx        Above-the-fold section with ambient video
  Testimonials.tsx
  Contact.tsx     Map embed and contact details
  ParallaxSection.tsx  Scroll engine (ParallaxSection / ParallaxLayer / Reveal)
  AmbientVideo.tsx     Lazy, poster-first video player
  VideoModal.tsx
public/
  media/          Encoded MP4/WebM renditions and poster frames
  brand/          Logo and app icons
scripts/
  build-media.sh  Re-encodes source footage into web renditions
```

## Media pipeline

Source footage is encoded to 720p and 1280p in both MP4 (H.264) and WebM (VP9),
each with a matching poster JPEG. `AmbientVideo` loads the poster first and only
fetches video once the element is near the viewport, so the hero is interactive
before any video bytes arrive.

Regenerate the renditions with:

```bash
bash scripts/build-media.sh
```

Requires `ffmpeg` on your PATH.

## Notes

- Testimonial copy is placeholder text pending real member reviews.
- Reduced-motion preferences are respected throughout: parallax, reveals, and
  the pulsing play button all disable under `prefers-reduced-motion`.
