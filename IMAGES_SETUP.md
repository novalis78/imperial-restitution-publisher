# Image Setup Guide

This guide explains how to add book cover images and author portrait to the website.

## Required Images

### Book Covers

Place the following images in `assets/covers/`:

| Filename | Book | Recommended Size |
|----------|------|-----------------|
| `roman-art-of-war.jpg` | The Roman Art of War | 800 x 1200 px |
| `strategemata-1.jpg` | Strategemata | 800 x 1200 px |
| `strategemata-2.jpg` | Strategemata II | 800 x 1200 px |
| `strategemata-3.jpg` | Strategemata III | 800 x 1200 px |
| `1983.jpg` | 1983 | 800 x 1200 px |
| `oumuamua.jpg` | We Do Not Come In Peace | 800 x 1200 px |

### Author Portrait

Place in `assets/`:

| Filename | Description | Recommended Size |
|----------|-------------|-----------------|
| `author-portrait.jpg` | Lennart Lopin photo | 600 x 800 px |

## Image Guidelines

### Format
- **Preferred**: JPEG (.jpg) for photographs
- **Alternative**: PNG (.png) for graphics with transparency
- **WebP**: Supported for better compression

### Quality
- Use high-quality images (300+ DPI for print-quality)
- Compress for web (aim for < 200KB per image)
- Consider using tools like:
  - [Squoosh](https://squoosh.app/)
  - [TinyPNG](https://tinypng.com/)
  - ImageOptim (Mac)

### Aspect Ratios
- Book covers: **2:3** (portrait orientation)
- Author portrait: **3:4** (portrait orientation)

## How to Get Book Cover Images

### From Amazon
1. Go to your book's Amazon product page
2. Click on the book cover image to enlarge
3. Right-click and "Save Image As"
4. Rename to match the filenames above

### From Publisher Files
If you have the original cover designs:
1. Export as JPEG at 800px width minimum
2. Maintain 2:3 aspect ratio
3. Use RGB color mode (not CMYK)

### Creating Placeholder Images
If covers aren't ready yet, you can:
1. Use the SVG placeholders already in `assets/covers/`
2. Update HTML to reference `.svg` instead of `.jpg`

## After Adding Images

Once you've added the images:

1. Verify all images load correctly:
   ```bash
   npx live-server --port=3000
   ```

2. Check file sizes aren't too large:
   ```bash
   ls -lh assets/covers/
   ```

3. Commit your changes:
   ```bash
   git add assets/
   git commit -m "Add book cover images"
   git push
   ```

## Troubleshooting

### Images Not Loading
- Check filename spelling and capitalization (Linux is case-sensitive)
- Verify file extension matches (.jpg vs .jpeg vs .png)
- Ensure images are in the correct directory

### Images Look Blurry
- Use higher resolution source images
- Don't scale up small images

### Images Load Slowly
- Compress images using tools mentioned above
- Consider lazy loading (already enabled with `loading="lazy"`)
