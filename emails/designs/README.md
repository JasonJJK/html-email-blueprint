# Design Images Folder

Store design reference images (PNG, JPG, screenshots) here for email generation.

## Purpose

This folder is for design mockups, screenshots, and reference images that you want to convert to HTML emails.

## Usage

### 1. Add Your Design Images

```bash
# Save your design images here
emails/designs/
├── footer-design.png
├── newsletter-mockup.jpg
├── header-concept.png
└── promo-banner.jpg
```

### 2. Reference in Prompts

```
"Create email footer from emails/designs/footer-design.png"
"Generate newsletter from emails/designs/newsletter-mockup.jpg"
"Build header matching emails/designs/header-concept.png"
```

### 3. Organize by Project/Campaign

```
emails/designs/
├── 2025-q1-campaign/
│   ├── header.png
│   ├── content.png
│   └── footer.png
├── newsletter/
│   ├── template-v1.jpg
│   └── template-v2.jpg
└── transactional/
    ├── welcome-email.png
    └── password-reset.png
```

## Supported Formats

- ✅ PNG (recommended for mockups)
- ✅ JPG/JPEG (good for screenshots)
- ✅ WebP (modern format)
- ✅ Any image format Cursor can read

## Best Practices

### Image Quality
- Use high-resolution images (not blurry)
- Clear visibility of all elements
- Good contrast for color detection

### Dimensions
- **Ideal:** 600px wide (standard email width)
- **Minimum:** 300px wide for basic analysis
- **Maximum:** Any size works, but 1200px+ may be overkill

### File Naming
```
✅ Good:
- footer-standard.png
- newsletter-2025-01.png
- header-brand-v2.png

❌ Avoid:
- image1.png
- screen-shot-123.png
- untitled.jpg
```

### Organization
```
By Type:
emails/designs/
├── headers/
├── footers/
├── buttons/
└── full-templates/

By Date:
emails/designs/
├── 2025-01/
├── 2025-02/
└── 2025-03/

By Campaign:
emails/designs/
├── summer-sale/
├── product-launch/
└── weekly-newsletter/
```

## Example Workflows

### Screenshot → HTML Email

1. Take screenshot of email you like
2. Save as: `emails/designs/inspiration.png`
3. Prompt: `"Create email footer similar to emails/designs/inspiration.png"`
4. Get generated HTML with automatic validation

### Designer Mockup → Production Email

1. Designer sends: `newsletter-mockup.jpg`
2. Save to: `emails/designs/`
3. Prompt: `"Generate newsletter from emails/designs/newsletter-mockup.jpg"`
4. Receive production-ready HTML

### Multiple Variations

1. Save: `footer-v1.png`, `footer-v2.png`, `footer-v3.png`
2. Generate all: 
   ```
   "Create footer from emails/designs/footer-v1.png"
   "Create footer from emails/designs/footer-v2.png"
   "Create footer from emails/designs/footer-v3.png"
   ```
3. Compare results

## Tips

### For Best Results

**Include in image:**
- Clear layout structure
- Visible text content
- Color scheme
- Component boundaries
- Spacing/alignment

**Provide separately (if needed):**
- Exact text content
- Brand color hex codes
- Specific font requirements
- Interaction states (hover, active)

### Quick Reference

**Basic prompt:**
```
"Create email from emails/designs/[filename]"
```

**With specifications:**
```
"Generate email from emails/designs/[filename]
Use these colors: #0066cc (primary), #f8f6f0 (bg)
Text: [paste content]"
```

**Multiple images:**
```
"Create email with:
- Header from: emails/designs/header.png
- Content from: emails/designs/content.png
- Footer from: emails/designs/footer.png"
```

## Gitignore

By default, this folder's contents are **NOT** gitignored, so:

**If you want to commit designs:**
```
# Designs are tracked by default
git add emails/designs/footer.png
git commit -m "Add footer design reference"
```

**If you want to ignore designs:**

Add to `.gitignore`:
```
# Ignore design images
emails/designs/*.png
emails/designs/*.jpg
emails/designs/*.jpeg
```

## Documentation

For complete guide on image-based generation:
- **See:** `docs/image-based-generation.md`

For comparison with Figma workflow:
- **See:** `docs/figma-mcp-workflow.md`

## Examples

Want to try it out? Here are some ways to get started:

1. **Find an email you like** → Screenshot it → Save here → Generate HTML
2. **Have a mockup?** → Save it here → Generate HTML
3. **Designer provided images?** → Drop them here → Generate HTML

That's it! 🎨

