# HTML Email Blueprint from Figma

An automated workflow for generating production-ready HTML email templates directly from Figma designs using Cursor AI and Figma MCP integration.

## Overview

This blueprint provides:
- **Automated HTML email generation** from Figma designs via MCP OR image files (PNG/JPG)
- **Visual validation with DevTools MCP** - automatic screenshot comparison to ensure 1:1 design accuracy
- **Built-in email compatibility rules** that automatically enforce Outlook/Gmail/iOS Mail best practices
- **Build tools** for CSS inlining, validation, and test email sending
- **Zero configuration** - just open in Cursor and start working

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url> html-email-blueprint
cd html-email-blueprint
npm install
```

### 2. Configure Environment (Optional)

For test email sending, copy `.env.example` to `.env` and add your SMTP credentials:

```bash
cp .env.example .env
# Edit .env with your SMTP settings
```

### 3. Open in Cursor

Open this directory in Cursor AI. The `.cursorrules` file will automatically activate email-specific generation rules.

### 4. Generate Your First Email

In Cursor chat, try one of these prompts:

**From Figma URL:**
```
Generate an email template from this Figma design: 
https://figma.com/design/abc123/Email?node-id=1-2
```

**From selected Figma component:**
```
Create an email footer from the currently selected Figma component
```

**From image file (PNG/JPG/screenshot):**
```
Create email footer from this design: emails/designs/footer.png
```

**From attached image:**
```
[Attach image in chat]
Generate HTML email matching this design
```

**Build a specific component:**
```
Create a responsive email header with logo and navigation links
based on the Figma design at node 1:2
```

That's it! Cursor will:
1. Extract/analyze design (from Figma OR image file)
2. **Detect if you want a component or full template** (automatic)
3. Apply email-safe HTML generation rules automatically
4. Create table-based, inline-styled HTML
5. Save to `emails/templates/` (full emails) or `emails/components/` (reusable parts)
6. **AUTOMATICALLY check if DevTools MCP is available**
7. **AUTOMATICALLY compare design vs HTML screenshots and iterate until 1:1** (if DevTools available)
8. Report validation results with both screenshots

## How It Works

### Design Input Methods

The blueprint supports **two ways** to provide designs:

#### 1. Figma MCP (Structured Design Data)
```
"Create email from this Figma design: [URL]"
"Generate footer from selected Figma component"
```
- ✅ Extracts exact colors, typography, spacing
- ✅ Structured component data
- ✅ Highest accuracy
- ⚠️  Requires Figma Desktop app running

#### 2. Image Files (Visual Analysis)
```
"Create email from this design: emails/designs/footer.png"
[Attach image] "Generate email matching this"
```
- ✅ Works with PNG, JPG, screenshots
- ✅ No Figma needed
- ✅ Analyzes visually (colors, layout, typography)
- ✅ Great for replicating existing emails
- ⚠️  May need refinement for exact brand colors/fonts

**See:** `docs/image-based-generation.md` for complete image workflow guide

### Automatic Rule Activation

The `.cursorrules` file automatically applies email-specific constraints when you:
- Provide a Figma URL or node ID OR image file
- Ask to "create/generate email template"
- Mention email components (footer, header, newsletter, etc.)
- Edit files in the `emails/` directory

### Component vs Template Detection

The blueprint **automatically detects** what you're creating:

**Component** (no DOCTYPE, just the HTML table):
```
"Create an email footer" → emails/components/footer.html
"Build a CTA button" → emails/components/cta-primary.html
```
Output: Just the table structure, ready to insert into templates

**Full Template** (complete HTML document):
```
"Create a newsletter email" → emails/templates/newsletter.html
"Generate a promotional email" → emails/templates/promo.html
```
Output: Complete HTML with DOCTYPE, head, body - ready to send

See `docs/components-vs-templates.md` for details.

### Figma MCP Integration

When you provide a Figma design URL or node ID:

1. **Design data is extracted automatically:**
   - Colors and typography
   - Spacing and layout dimensions
   - Component hierarchy
   - Visual references

2. **Transformed to email-safe HTML:**
   - Figma frames → HTML tables
   - Text layers → `<td>` elements with inline styles
   - Buttons → Table-based button structures
   - Auto-layout → Table cell padding

3. **Email compatibility enforced:**
   - Table-based layout (no divs/flexbox/grid)
   - All styles inlined
   - No JavaScript
   - 600px max width
   - Outlook/Gmail compatible

### Figma URL Format

Extract node IDs from Figma URLs:

```
URL: https://figma.com/design/abc123/MyFile?node-id=1-2
Node ID for MCP: "1:2"
```

Just paste the URL in your prompt - Cursor handles the conversion automatically.

### Visual Validation (AUTOMATIC!)

**Pixel-perfect accuracy with automatic visual validation:**

After every Figma → HTML generation, Cursor **automatically**:
1. ✅ Checks if DevTools MCP is available
2. 📸 Captures Figma design screenshot  
3. 🌐 Opens generated HTML in browser
4. 📸 Captures rendered HTML screenshot
5. 🔍 Compares both visually for differences
6. 🔄 Iterates and fixes issues automatically (until 1:1 match)
7. ✅ Reports final status with both screenshots

**No special prompt needed** - validation runs automatically!

**Example output:**
```
✅ Visual Validation Complete
──────────────────────────────────────
Figma Design:     [Screenshot shown]
Rendered HTML:    [Screenshot shown]
──────────────────────────────────────
Comparison:       PERFECT MATCH ✓
Issues Found:     0
Iterations:       1
Status:           Ready for production
```

**To skip validation:** Say "generate email without validation"

See `docs/visual-validation-workflow.md` for complete details.

## Build Tools

### Inline CSS

Convert `<style>` blocks to inline styles for maximum compatibility:

```bash
npm run inline emails/templates/newsletter.html
# Creates newsletter.inlined.html
```

### Validate Email HTML

Check for email-specific issues:

```bash
npm run validate emails/templates/newsletter.html
```

Validates:
- No external stylesheets or JavaScript
- Proper DOCTYPE and meta tags
- Table-based structure
- Recommended 600px max width
- HTML syntax correctness

### Send Test Email

Send to real inboxes for testing:

```bash
npm run test-send emails/templates/newsletter.html your@email.com
```

Requires SMTP configuration in `.env` file.

## Project Structure

```
html-email-blueprint/
├── .cursorrules              # Automatic email generation rules
├── emails/
│   ├── templates/            # Complete email templates
│   └── components/           # Reusable parts (headers, footers, CTAs)
├── tools/                    # Build and validation scripts
│   ├── inline-css.js         # CSS inliner
│   ├── validate-email.js     # Email validator
│   └── send-test.js          # Test email sender
├── docs/                     # Documentation
│   ├── example-prompts.md    # Ready-to-use prompt templates
│   ├── figma-mcp-workflow.md # Detailed Figma integration guide
│   └── testing-checklist.md  # Email client testing guide
└── package.json              # Dependencies and scripts
```

## Example Workflows

### Newsletter from Figma

```
Cursor chat: "Generate a responsive email newsletter from this Figma design:
https://figma.com/design/abc123/Newsletter?node-id=5-10

Include:
- Header with logo
- Hero image section
- 3-column feature grid (stacks on mobile)
- CTA button
- Footer with social links and unsubscribe
"
```

Result: Complete HTML email saved to `emails/templates/newsletter-[date].html`

### Reusable Email Footer

```
Cursor chat: "Create a reusable email footer component from Figma node 12:34
with company address, social links, and unsubscribe link"
```

Result: Saved to `emails/components/footer-standard.html`

### Transactional Email

```
Cursor chat: "Generate a password reset email template with:
- Centered logo
- Heading 'Reset Your Password'
- Explanation text
- Large CTA button 'Reset Password'
- Help text and support link
- Footer
"
```

Result: Clean, functional transactional email

## Email Client Compatibility

Generated emails are compatible with:
- ✅ Outlook (desktop: 2007, 2010, 2013, 2016, 2019, 365)
- ✅ Outlook (web: Outlook.com)
- ✅ Gmail (web + mobile apps)
- ✅ Apple Mail (macOS + iOS)
- ✅ Android native mail clients
- ✅ Yahoo Mail, AOL Mail
- ✅ Legacy clients

## Testing Your Emails

### 1. Validate First

```bash
npm run validate emails/templates/your-email.html
```

### 2. Inline CSS

```bash
npm run inline emails/templates/your-email.html
```

### 3. Send Test

```bash
npm run test-send emails/templates/your-email.inlined.html
```

### 4. Test in Real Clients

Send test emails to:
- Your Gmail account (desktop + mobile)
- Outlook.com account
- iOS Mail app
- Android mail app

### 5. Use Testing Services

For comprehensive testing across 90+ clients:
- [Litmus](https://litmus.com)
- [Email on Acid](https://www.emailonacid.com)

See `docs/testing-checklist.md` for detailed testing workflow.

## Advanced Usage

### Custom Component Library

Build reusable components:

```
emails/components/
├── header-brand.html
├── header-simple.html
├── footer-standard.html
├── footer-minimal.html
├── cta-primary.html
└── cta-secondary.html
```

Reference in prompts:
```
"Create a promotional email using components/header-brand.html
and components/footer-standard.html with this Figma design: [URL]"
```

### Design System Integration

Extract design tokens from Figma:

```
Cursor chat: "Extract color palette and typography scale from 
this Figma file and create a documented email design system"
```

Use tokens consistently across all emails.

### Batch Generation

Generate multiple email variations:

```
"Create 3 variations of this promotional email from the Figma design:
1. Short version (single CTA)
2. Medium version (features + CTA)  
3. Long version (full content + multiple CTAs)"
```

## Tips for Best Results

### Structuring Figma Designs

For optimal email generation:
- Use **Auto Layout** frames (converts well to table padding)
- Keep layouts **single-column** or simple 2-column
- Limit **max width to 600px**
- Use **clear component naming**
- Group related elements in frames
- Use consistent spacing values

### Prompt Best Practices

Be specific about:
- Target email clients if special considerations needed
- Mobile responsiveness requirements
- CTA hierarchy and styling
- Content structure preferences
- Any special Outlook compatibility needs

### Common Patterns

**Good prompt:**
```
"Generate a promotional email from Figma design [URL] with:
- Hero image at top
- Centered headline and subtext
- Two-column feature section (stacks on mobile)
- Primary CTA button
- Footer with address and social links
Target: Outlook + Gmail compatibility"
```

**Vague prompt:**
```
"Make an email from this Figma"
```

## Troubleshooting

### Generated email looks broken in Outlook

- Run validation: `npm run validate [file]`
- Check for divs instead of tables
- Ensure all styles are inline
- Verify no flexbox/grid CSS

### Images not displaying

- Use absolute URLs (https://)
- Set explicit width/height attributes
- Add `display:block; border:0;` inline styles
- Check alt text is present

### Layout breaks on mobile

- Verify media queries in `<style>` block
- Check table has `max-width:600px;`
- Ensure responsive classes applied
- Test actual mobile devices, not just browser resize

### Test email not sending

- Verify .env configuration
- Check SMTP credentials
- Try different SMTP port (587 or 465)
- Enable "less secure apps" if using Gmail

## Contributing

This is a blueprint workspace - customize it for your team's needs!

Suggestions:
- Add your company's email header/footer components
- Create prompt templates for common email types
- Document your design system integration
- Share Figma best practices for email designs

See `CONTRIBUTING.md` for details.

## Resources

- **Documentation:** See `docs/` directory
- **Example Prompts:** `docs/example-prompts.md`
- **Image-Based Generation:** `docs/image-based-generation.md` ⭐ NEW
- **Components vs Templates:** `docs/components-vs-templates.md` ⭐ NEW
- **Figma MCP Guide:** `docs/figma-mcp-workflow.md`
- **Visual Validation:** `docs/visual-validation-workflow.md` ⭐ NEW
- **Testing Checklist:** `docs/testing-checklist.md`
- **Email Best Practices:** `docs/email-best-practices.md`

## License

MIT - Use this blueprint however you want!

---

**Need help?** Check the docs or ask Cursor:
```
"How do I [specific question about email generation]?"
```

