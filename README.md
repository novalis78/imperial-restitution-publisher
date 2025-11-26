# Imperial Restitution Press

> Where Empires of Thought Endure

A refined, sophisticated publisher website featuring neoclassical aesthetics with futuristic undertones. Built for timeless elegance.

## Overview

Imperial Restitution Press publishes works of enduring significance—classical wisdom, strategic thought, and visions of futures yet unwritten. This website serves as the digital home for our catalog.

## Featured Titles

- **The Roman Art of War** — Julius Caesar's Strategic Wisdom
- **Strategemata Series** (I, II, III) — Learn Latin Through Military Tales
- **1983** — A Prequel to Orwell's Nineteen Eighty-Four
- **We Do Not Come In Peace** — The Oumuamua Protocol

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd imperial-restitution-publisher

# Start a local server (any of these methods work)
npx live-server --port=3000

# Or with Python
python -m http.server 3000

# Or with PHP
php -S localhost:3000
```

Visit `http://localhost:3000` in your browser.

## Project Structure

```
imperial-restitution-publisher/
├── index.html                 # Main landing page
├── book-*.html                # Individual book detail pages
├── success.html               # Purchase confirmation page
├── css/
│   ├── styles.css             # Main stylesheet
│   └── book-page.css          # Book detail page styles
├── js/
│   ├── main.js                # Core JavaScript
│   └── stripe-config.js       # Stripe configuration
├── assets/
│   ├── covers/                # Book cover images
│   └── author-portrait.jpg    # Author photo
├── .env.example               # Environment variables template
├── STRIPE_SETUP.md            # Stripe integration guide
└── README.md                  # This file
```

## Configuration

### Adding Book Cover Images

Replace the placeholder images in `assets/covers/` with your actual book covers:

- `roman-art-of-war.jpg`
- `strategemata-1.jpg`
- `strategemata-2.jpg`
- `strategemata-3.jpg`
- `1983.jpg`
- `oumuamua.jpg`
- `author-portrait.jpg`

Recommended image dimensions:
- Book covers: 800 x 1200 px (2:3 aspect ratio)
- Author portrait: 600 x 800 px (3:4 aspect ratio)

### Setting Up Stripe Payments

See [STRIPE_SETUP.md](STRIPE_SETUP.md) for detailed instructions.

Quick steps:
1. Get your Stripe API keys from the dashboard
2. Create products for each book
3. Edit `js/stripe-config.js` with your credentials
4. Include `stripe-config.js` in your pages

## Design Philosophy

The design system is built on several pillars:

### Color Palette
- **Obsidian** (#0a0a0a) — Deep blacks for gravitas
- **Gold** (#c9a227) — Imperial accent for wisdom and wealth
- **Ivory** (#f5f2e8) — Classical warmth
- **Burgundy** (#6b2d3a) — Power and sacrifice

### Typography
- **Cinzel** — Display type for monumental headings
- **Cormorant Garamond** — Elegant headings and quotes
- **Spectral** — Refined body text

### Principles
- Generous whitespace
- Dramatic typography hierarchy
- Subtle shadows and depth
- No cheesy gradients or effects
- Refined micro-interactions
- Mobile-first responsive design

## Customization

### Changing Colors
Edit the CSS custom properties in `css/styles.css`:

```css
:root {
    --gold: #c9a227;           /* Primary accent */
    --obsidian: #0a0a0a;       /* Background */
    --ivory: #f5f2e8;          /* Text color */
    /* ... */
}
```

### Adding New Books

1. Create a new `book-[slug].html` file based on existing templates
2. Add the book card to `index.html` in the catalog section
3. Add cover image to `assets/covers/`
4. Create a Stripe product and update `stripe-config.js`

## Deployment

This is a static site that can be deployed anywhere:

- **Netlify**: Drag and drop the folder
- **Vercel**: Import from Git
- **GitHub Pages**: Push to gh-pages branch
- **Any web server**: Upload files via FTP

### Recommended: Netlify

1. Create a `netlify.toml` file (already included)
2. Connect your repository
3. Deploy automatically on push

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© MMXXIV Imperial Restitution Press. All rights reserved.

---

*Sic transit gloria mundi* — Thus passes the glory of the world
