# Image-Based Email Generation

Generate HTML emails from PNG, JPG, or screenshot images instead of Figma designs.

## Overview

This blueprint supports **two design input methods**:
1. **Figma MCP** - Extract structured design data from Figma
2. **Image Files** - Analyze PNG/JPG/screenshots visually

Use image-based generation when:
- ✅ You have a screenshot of an existing email
- ✅ You have a mockup as PNG/JPG
- ✅ Figma Desktop is not available
- ✅ Design is provided as an image file
- ✅ You want to replicate an email you've seen

## How It Works

### Visual Analysis Process

When you provide an image, Cursor:
1. **Analyzes the image visually**
   - Identifies layout structure (sections, columns)
   - Detects colors from visible elements
   - Estimates typography (sizes, weights, hierarchy)
   - Measures spacing and alignment proportionally
   - Identifies components (buttons, images, text)

2. **Generates email-safe HTML**
   - Creates table-based structure matching layout
   - Applies detected colors as hex values
   - Uses web-safe fonts with appropriate sizes
   - Implements proportional spacing
   - Builds email-compatible components

3. **Validates against image**
   - Uses your image as the reference design
   - Compares generated HTML screenshot vs image
   - Iterates until visual match is achieved

## Usage

### Method 1: Provide File Path

```
"Create email footer from this design: emails/designs/footer.png"
```

```
"Generate newsletter based on this screenshot: /path/to/email-design.jpg"
```

```
"Build email template matching: ~/Downloads/email-mockup.png"
```

### Method 2: Attach Image in Chat

```
[Attach or drag image into Cursor chat]

"Create an email footer matching this design"
```

```
[Attach screenshot]

"Generate HTML email template from this image"
```

### Method 3: Reference Existing Image

```
"Create email matching the design in emails/designs/newsletter.png"
```

## Supported Formats

- ✅ PNG (recommended for mockups)
- ✅ JPG/JPEG (good for photos/screenshots)
- ✅ WebP (modern format)
- ✅ Screenshots from any tool

**Recommended:**
- High resolution for better analysis
- Clear visibility of text and elements
- 600px width for standard email dimensions
- Good contrast for color detection

## Example Workflows

### Workflow 1: Screenshot of Existing Email

```
1. Take screenshot of email you like
2. Save as: emails/designs/inspiration.png
3. Prompt: "Create email footer similar to emails/designs/inspiration.png"
4. Cursor analyzes image and generates HTML
5. Automatic validation compares result to image
6. Iterates until match
```

### Workflow 2: Designer Provides Mockup

```
1. Designer sends you: newsletter-mockup.jpg
2. Save to: emails/designs/
3. Prompt: "Generate newsletter from emails/designs/newsletter-mockup.jpg"
4. Cursor analyzes mockup
5. Generates HTML email
6. Validates against mockup
7. You get production-ready HTML
```

### Workflow 3: Quick Iteration

```
1. Have rough mockup image
2. Prompt: "Create email header from this" [attach image]
3. Review generated HTML
4. Adjust: "Make the button larger and more prominent"
5. Iterate until perfect
```

## What Gets Detected

### Colors

Cursor detects:
- Background colors
- Text colors
- Border colors
- Button colors

**Converts to hex values:**
```
Image shows blue button → #0066cc
Image shows gray background → #f3f3f3
```

### Layout

Cursor identifies:
- Header, content, footer sections
- Single vs multi-column layouts
- Vertical stacking order
- Element alignment (left, center, right)
- Relative sizing and proportions

**Converts to tables:**
```
Image shows 2-column layout → Two <td> in one <tr>
Image shows stacked sections → Multiple <tr> elements
```

### Typography

Cursor estimates:
- Heading sizes (large text → h1, h2)
- Body text sizes
- Font weights (bold, normal)
- Text hierarchy
- Line spacing

**Uses web-safe fonts:**
```
Image shows large bold text → font-size:24px; font-weight:bold;
Image shows body text → font-size:16px; line-height:24px;
```

### Spacing

Cursor measures proportionally:
- Padding around elements
- Gaps between sections
- Margins and spacing
- Button padding

**Translates to CSS:**
```
Image shows generous padding → padding:30px;
Image shows tight spacing → padding:15px;
```

### Components

Cursor identifies:
- Buttons (shape, size, style)
- Images (placeholders if needed)
- Links
- Social media icons
- Dividers

**Creates email-safe versions:**
```
Image shows rounded button → Table-based button with border-radius
Image shows icon → <img> with proper dimensions
```

## Limitations & Considerations

### Text Content

**Limitation:** Text in images may not be perfectly readable

**Solution:**
- Provide text separately: "Use this text: [content]"
- Cursor will use visible text as guide
- You can edit HTML after generation

**Example:**
```
"Create footer from emails/designs/footer.png

Use this text:
- Phone: 020 12 34 555
- Email: info@example.com
- Address: Fiction Street 12, 1234 AB Haarlem"
```

### Font Families

**Limitation:** Exact fonts can't be determined from image

**Solution:**
- Uses web-safe font alternatives (Arial, Helvetica, Georgia)
- Matches weight and size proportionally
- You can specify fonts: "Use Georgia for body text"

**Example:**
```
"Generate email from image, use Arial for headers and Georgia for body"
```

### Brand Colors

**Limitation:** Colors estimated from image (may vary slightly)

**Solution:**
- Provide exact hex values if critical
- Cursor uses best estimates
- You can refine: "Change background to #f8f6f0"

**Example:**
```
"Create email from this image

Brand colors:
- Primary: #0066cc
- Background: #f8f6f0
- Text: #333333"
```

### Complex Layouts

**Limitation:** Very complex designs may need simplification

**Solution:**
- Email HTML is inherently limited
- Cursor simplifies to email-safe structure
- Focus on key elements and hierarchy

### Image Quality

**Best results with:**
- High resolution images (not blurry)
- Clear element boundaries
- Good contrast
- Clean design (not cluttered)

**Lower quality images:**
- May need manual refinement
- Cursor does best effort analysis
- You can iterate with adjustments

## Combining with Validation

### Automatic Visual Validation

After generating from image:
1. ✅ Generated HTML opens in browser
2. ✅ Screenshot captured
3. ✅ Compared against your original image
4. ✅ Differences identified
5. ✅ HTML updated automatically
6. ✅ Process repeats until match

**Result:** HTML that looks like your image!

### Validation Output

```
✅ Visual Validation Complete
──────────────────────────────────────
Original Design:  [Your image shown]
Rendered HTML:    [Screenshot shown]
──────────────────────────────────────
Comparison:       MATCH ✓
Issues Found:     2 (fixed)
Iterations:       1
Status:           Ready for use
──────────────────────────────────────
Details:
- Layout:       ✓ Match
- Colors:       ✓ Match (estimated from image)
- Typography:   ✓ Match (using web-safe fonts)
- Spacing:      ✓ Match
- Elements:     ✓ All present
──────────────────────────────────────
```

## Best Practices

### Preparing Images

1. **Use clear, high-resolution images**
   - Not blurry or pixelated
   - Elements clearly visible

2. **Standard email width**
   - 600px wide is ideal
   - Helps with sizing accuracy

3. **Organize design files**
   ```
   emails/designs/
   ├── newsletter-header.png
   ├── footer-v1.png
   ├── footer-v2.png
   └── promo-banner.jpg
   ```

4. **Name files descriptively**
   - `footer-standard.png` not `image1.png`
   - `newsletter-2025-01.png` not `email.png`

### Prompting Tips

**Good prompts:**
```
✅ "Create email footer from emails/designs/footer.png"
✅ "Generate newsletter matching this screenshot" [attach]
✅ "Build email template from this mockup: ~/Desktop/design.jpg"
```

**Add context when helpful:**
```
✅ "Create footer from image, use these colors: [hex values]"
✅ "Generate email from screenshot, text content: [paste text]"
✅ "Build template from mockup, optimize for Outlook"
```

### Refining Results

After generation, iterate:
```
"Make the header taller"
"Change button color to #0066cc"
"Add more padding around text"
"Use Georgia font for body text"
```

## Comparison: Figma vs Image

| Aspect | Figma MCP | Image Input |
|--------|-----------|-------------|
| **Design Data** | Structured, exact | Visual analysis, estimated |
| **Colors** | Exact hex values | Detected from pixels |
| **Typography** | Exact fonts/sizes | Proportional, web-safe |
| **Spacing** | Exact pixels | Proportional |
| **Text Content** | Extracted directly | May need separate input |
| **Accuracy** | Highest | Very good with refinement |
| **Speed** | Fast | Fast |
| **Setup** | Needs Figma Desktop | No setup required |
| **Use Case** | Design files | Screenshots, mockups |

## Example: Complete Workflow

### Starting with Screenshot

```
YOU: "I have a screenshot of an email footer I like. 
     Can you create HTML for it?"

     [Attach: competitor-footer.png]

CURSOR: [Analyzes image]
        - Detected layout: 2-column footer
        - Colors: #f3f3f3 background, #333 text
        - Components: Logo, contact info, social icons
        - Generating HTML...

        [HTML generated: emails/components/footer-inspired.html]

        [Automatic validation]
        ✓ Opening HTML in browser
        ✓ Comparing to your image
        ⚠️  Found 3 differences: spacing, icon size, text alignment
        ✓ Fixing automatically...
        ✓ Re-validating...
        ✓ Perfect match achieved!

        ✅ Visual Validation Complete
        Result: footer-inspired.html (1:1 match with image)
```

### Refining

```
YOU: "Make the social icons larger and add more spacing"

CURSOR: [Updates HTML]
        [Re-validates]
        ✓ Icons now 32x32px (was 24x24px)
        ✓ Spacing increased to 20px
        ✓ Updated file saved

YOU: "Perfect! Now inline the CSS"

CURSOR: [Runs inline tool]
        ✓ Created: footer-inspired.inlined.html
        Ready to use!
```

## Common Use Cases

### 1. Replicating Competitor Emails

```
"Analyze this competitor email and create similar:
emails/designs/competitor-newsletter.png

Keep our brand colors: #0066cc (primary), #f8f6f0 (bg)"
```

### 2. Converting Designer Mockups

```
"Convert this Photoshop export to HTML email:
~/Documents/mockups/newsletter-final.jpg"
```

### 3. Updating Existing Emails

```
"Recreate this email footer with modern styling:
emails/designs/old-footer-screenshot.png"
```

### 4. Quick Prototyping

```
"Build email template from this sketch" [attach hand-drawn mockup photo]
```

### 5. Learning from Examples

```
"Study this well-designed email and create a similar footer:
emails/designs/inspiration.png"
```

## Tips for Best Results

### 1. Multiple Images for Complex Emails

```
"Create newsletter with:
- Header from: emails/designs/header.png
- Content section from: emails/designs/content.png
- Footer from: emails/designs/footer.png"
```

### 2. Provide Specifications

```
"Generate email from image

Specifications:
- Max width: 600px
- Primary color: #0066cc
- Font: Arial
- Mobile responsive
- Outlook compatible"
```

### 3. Iterate in Steps

```
Step 1: "Create basic layout from image"
Step 2: "Refine spacing and colors"
Step 3: "Adjust typography"
Step 4: "Perfect button styling"
```

### 4. Reference Multiple Images

```
"Create email footer combining elements from:
- Layout: emails/designs/layout-ref.png
- Colors: emails/designs/colors-ref.png
- Style: emails/designs/style-ref.png"
```

## Troubleshooting

### "Colors don't match exactly"

**Cause:** Color detection from image is approximate

**Fix:**
```
"Update background color to #f8f6f0 exactly"
"Change button color to match brand: #0066cc"
```

### "Text is incorrect"

**Cause:** OCR/text detection from image may be imperfect

**Fix:**
```
"Use this exact text: [paste correct text]"
```

### "Layout structure off"

**Cause:** Complex image may be interpreted differently

**Fix:**
```
"The layout should be: [describe structure]"
"Make it 2 columns, not 3"
```

### "Need exact dimensions"

**Cause:** Proportional analysis may vary

**Fix:**
```
"Set button height to exactly 44px"
"Make padding exactly 32px all around"
```

## Summary

**Image-based generation is perfect for:**
- ✅ Screenshots of existing emails
- ✅ Designer mockups (PNG/JPG)
- ✅ When Figma isn't available
- ✅ Quick replications
- ✅ Learning from examples

**Workflow:**
1. Provide image (file path or attach)
2. Cursor analyzes visually
3. Generates email-safe HTML
4. Automatically validates against image
5. Iterates until match
6. You get production-ready HTML

**Best with:**
- Clear, high-resolution images
- Standard email dimensions (600px)
- Additional context (colors, text, specs)
- Iteration for refinement

**Try it now:**
```
"Create email footer from this design: emails/designs/footer.png"
```

Or attach any email screenshot and say: "Generate HTML matching this"! 🎨

