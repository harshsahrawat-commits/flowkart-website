# OpenArt Prompts — Flowkart Website

Generated images go into `public/images/`. Export as PNG from OpenArt, then convert to WebP for production.

---

## 1. Workflow Section Background (REQUIRED)

**Status:** ✅ Generated

**Prompt:**
```
Abstract dark background, deep navy blue (#001524), luminous teal (#15616D) and orange (#FF7D00) energy streams flowing through space, subtle interconnected geometric nodes, soft volumetric lighting, bokeh particles, cinematic depth of field, 8k resolution, no text, no characters, dark moody atmosphere, digital art, futuristic data visualization aesthetic
```

**Negative prompt:**
```
text, words, letters, numbers, people, faces, characters, bright background, white background, cartoon, illustration, low quality, blurry
```

**Settings:** Aspect 1:1 or 4:3 | Style: Digital Art / 3D Render | Resolution: Highest available
**File:** `public/images/workflow-bg.webp`
**Usage:** Right side of Agent Workflow section, behind code rain overlay. `opacity: 0.4-0.6`

---

## 2. Hero Ambient Texture (OPTIONAL)

**Prompt:**
```
Abstract warm gradient background, cream (#FFECD1) base color, very subtle teal (#15616D) and soft orange (#FF7D00) light wisps, minimal noise texture, ethereal soft glow, almost invisible geometric grid lines fading into background, clean and spacious, elegant ambient atmosphere, 8k resolution, no text, no objects, purely abstract texture
```

**Negative prompt:**
```
text, words, letters, people, objects, dark background, busy, cluttered, high contrast, cartoon, illustration, low quality
```

**Settings:** Aspect 16:9 | Style: Digital Art | Resolution: Highest | Pick the subtlest variation
**File:** `public/images/hero-texture.webp`
**Usage:** Full-bleed background behind hero section. `opacity: 0.15-0.25`. Must be extremely subtle.

---

## 3. Process Section Background Glow (OPTIONAL)

**Prompt:**
```
Abstract dark background, deep navy (#001524), three soft circular glowing orbs spaced horizontally, left orb teal (#15616D), center orb warm orange (#FF7D00), right orb cream white (#FFECD1), each orb has soft radial gradient falloff, subtle connecting light trail between orbs, volumetric fog, minimal and spacious, 8k resolution, no text, no objects, purely abstract light study
```

**Negative prompt:**
```
text, words, letters, people, objects, bright background, busy, cluttered, cartoon, illustration, low quality, circles with outlines, sharp edges
```

**Settings:** Aspect 21:9 (ultrawide) | Style: Digital Art / 3D Render | Resolution: Highest | Pick cleanest
**File:** `public/images/process-glow.webp`
**Usage:** Background behind Process section (three counter numbers). `opacity: 0.3-0.5`. Orbs align roughly behind 01, 02, 03.

---

## 4. CTA Section Accent Texture (OPTIONAL)

**Prompt:**
```
Abstract background, teal (#15616D) dominant color, subtle warm orange (#FF7D00) accent light from bottom right corner, flowing light streaks, premium luxury atmosphere, soft grain texture, volumetric light rays, minimal and clean, wide composition, 8k resolution, no text, no objects, purely abstract ambient light, suitable as website call-to-action background
```

**Negative prompt:**
```
text, words, letters, people, objects, dark background, navy, black, busy, cluttered, cartoon, illustration, low quality
```

**Settings:** Aspect 16:9 | Style: Digital Art | Resolution: Highest | Pick warmest variation
**File:** `public/images/cta-accent.webp`
**Usage:** Background in CTA section's teal area. `opacity: 0.2-0.4`, `mix-blend-mode: soft-light`.

---

## Tips

- Generate 4 variations per prompt, pick the winner, iterate 2-3 times if needed
- Use "Enhance" or "Upscale" on your chosen image for max resolution
- If teal comes out too blue or orange too red, the hex codes are in the prompts
- Test at low opacity first — these are background textures, not hero images
- Estimated total credits: ~40-60 (well within 11,000 budget)
- Export as WebP for web, keep PNG masters as backup
- Target: < 200KB per image after WebP compression
