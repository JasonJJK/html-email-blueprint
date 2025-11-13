# Figma MCP Workflow Guide

Complete guide to using Figma Desktop MCP integration in Cursor for automated HTML email generation.

## Overview

This blueprint uses Figma's Model Context Protocol (MCP) integration to automatically extract design data from Figma and transform it into email-safe HTML. No manual exports, no guessing at colors or spacing – just paste a Figma URL and get production-ready email HTML.

## What is MCP?

**Model Context Protocol (MCP)** is a standard that allows AI assistants like Cursor to interact with external tools and services. The Figma Desktop MCP integration specifically allows Cursor to:

- Read design data from your Figma files
- Extract colors, typography, spacing, and layout information
- Get screenshots and visual references
- Access design tokens and variables
- Pull component details

## Prerequisites

### 1. Figma Desktop App

The Figma Desktop MCP requires the **Figma desktop application** (not just web browser):

- Download from [figma.com/downloads](https://www.figma.com/downloads/)
- Sign in to your account
- Keep the app running while using Cursor

### 2. Cursor AI

This blueprint is designed for Cursor IDE:

- Download from [cursor.sh](https://cursor.sh)
- Version with MCP support (check latest)

### 3. No Additional Configuration

The Figma Desktop MCP is **built into Cursor** – no tokens, no API keys, no setup required. Just have Figma Desktop running and a file open.

## How the Workflow Works

### Step 1: Design in Figma

Create your email design in Figma:

**Best practices for email-friendly Figma designs:**

- **Keep width to 600px** (standard email max width)
- **Use Auto Layout** frames (converts well to table padding)
- **Single column or simple 2-column** layouts work best
- **Name layers clearly** (helps AI understand structure)
- **Group related elements** in frames
- **Use consistent spacing** values
- **Avoid complex overlays** (hard to replicate in email)
- **Design for simplicity** (remember: email HTML is limited)

### Step 2: Get Figma URL/Node ID

#### Option A: Full Page/Frame

1. Select the frame in Figma
2. Right-click → Copy link to selection
3. URL format: `https://figma.com/design/abc123/FileName?node-id=1-2`

#### Option B: Specific Component

1. Select the component
2. Copy link to selection
3. Extract node ID from URL: `node-id=1-2` becomes `"1:2"`

#### Option C: Currently Selected

If you have Figma Desktop open with something selected, just reference it:
```
"Use the currently selected Figma component"
```

### Step 3: Prompt in Cursor

Open Cursor chat and provide a prompt with your Figma URL:

```
Generate an email template from this Figma design:
https://figma.com/design/abc123/Newsletter?node-id=5-10
```

### Step 4: Automatic Extraction

Cursor uses MCP tools to extract design data:

**What gets extracted:**
- **Colors**: Background colors, text colors, border colors (hex values)
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Padding, margins, gaps (from Auto Layout)
- **Dimensions**: Width, height of elements
- **Images**: URLs and dimensions (references, not embedded)
- **Structure**: Hierarchy of frames, groups, and elements
- **Text content**: Actual text from text layers
- **Component info**: If using Figma components

**MCP Tools Used (automatically by Cursor):**
- `mcp_Figma_Desktop_get_design_context` - Main design data extraction
- `mcp_Figma_Desktop_get_screenshot` - Visual reference
- `mcp_Figma_Desktop_get_variable_defs` - Design tokens/variables
- `mcp_Figma_Desktop_get_code_connect_map` - Component connections

### Step 5: Transform to Email HTML

Cursor applies the `.cursorrules` to transform Figma data into email-compatible HTML:

**Transformation process:**

| Figma Element | Email HTML |
|--------------|-----------|
| Frame with Auto Layout | `<table>` with padding in `<td>` |
| Text layer | `<td>` with inline typography styles |
| Rectangle (solid) | `<td>` with bgcolor and background-color |
| Image | `<img>` with explicit dimensions and display:block |
| Button/CTA | Table-based button with `<a>` inside |
| Group/Section | Nested `<tr>`/`<td>` structure |
| Spacing (gap) | Cell padding or spacer rows |
| Multi-column | Multiple `<td>` in same `<tr>` (with stacking media query) |

**Automatic rules applied:**
- All layouts → table-based structure
- All styles → inlined on elements
- Colors → hex values on bgcolor attributes + inline styles
- Fonts → web-safe font stacks with fallbacks
- No JavaScript or forms
- 600px max width container
- Mobile-responsive media queries added

### Step 6: Review and Validate

Generated HTML is saved to `emails/templates/` or `emails/components/`:

**Validation checklist:**
```bash
# 1. Validate HTML structure
npm run validate emails/templates/[filename].html

# 2. Check in browser
open emails/templates/[filename].html

# 3. Inline CSS if needed
npm run inline emails/templates/[filename].html

# 4. Send test email
npm run test-send emails/templates/[filename].inlined.html
```

### Step 7: Visual Validation (Optional but Recommended)

**NEW:** Automatic visual validation using DevTools MCP!

Request validation to ensure 1:1 accuracy:
```
"Generate email from Figma and validate it matches 1:1"
```

Cursor will automatically:
- Capture Figma design screenshot
- Open HTML in browser
- Capture rendered screenshot
- Compare visually
- Iterate to fix differences
- Report final status

**See:** `visual-validation-workflow.md` for complete details.

### Step 8: Test in Real Email Clients

Send test emails to verify rendering:

- Gmail (web + mobile app)
- Outlook (desktop + web)
- Apple Mail (macOS + iOS)
- Android email apps

See `testing-checklist.md` for detailed testing workflow.

## Understanding Node IDs

### What is a Node ID?

Every element in Figma has a unique node ID. The format is `X:Y` where X and Y are numbers.

### Extracting Node IDs from URLs

Figma URLs include node IDs in the query string:

```
https://figma.com/design/abc123xyz/MyEmail?node-id=1-2
                                                    ^^^^
                                                    This is 1-2
```

**Convert for MCP:** `node-id=1-2` → `"1:2"` (replace hyphen with colon)

### Getting Node IDs

**Method 1: Copy link**
- Right-click element → Copy link
- URL contains `node-id=X-Y`

**Method 2: Inspect in Figma**
- Select element
- Figma API/plugins can show raw node ID

**Method 3: Let Cursor handle it**
Just paste the full URL in your prompt – Cursor extracts the node ID automatically.

## Design Tokens and Variables

### Extracting Figma Variables

If your Figma file uses variables (color palettes, typography scales):

```
Cursor prompt: "Extract design variables from this Figma file and 
document the color palette and typography system"
```

The MCP tool `get_variable_defs` pulls:
- Color variables: `{'primary': '#0066cc', 'text/default': '#333333'}`
- Typography tokens: Font sizes, weights, line heights
- Spacing variables: Consistent padding/margin values

### Using Tokens in Generated Emails

Once extracted, reference them:

```
"Generate an email using the primary brand color for CTAs and 
the text/secondary color for body text, from the Figma variables"
```

This ensures brand consistency across all generated emails.

## Advanced Techniques

### Component Libraries

If you use Figma components:

```
"Extract the header component from the Email Component Library 
Figma file and create a reusable email header HTML file"
```

Save to `emails/components/` and reuse across templates.

### Design System Documentation

```
"Analyze the Figma design system file at [URL] and create 
a comprehensive email design system guide including:
- Color usage guidelines
- Typography scale
- Spacing system
- Component inventory
- Code examples for each component"
```

### Batch Generation from Figma Pages

```
"This Figma file has 3 pages for our email campaign:
- Page 1: Announcement email
- Page 2: Follow-up email
- Page 3: Reminder email

Generate all three templates using consistent branding"
```

### Handling Multiple Variants

If Figma component has variants:

```
"The Figma component at node 10:20 has Light and Dark variants. 
Generate two email header versions:
- header-light.html
- header-dark.html"
```

### Responsive Breakpoints from Figma

```
"This Figma file shows desktop (600px) and mobile (320px) layouts.
Generate a responsive email that matches both designs using 
media queries"
```

## Common Issues and Solutions

### Issue: "Cannot access Figma file"

**Cause:** Figma Desktop not running or file not accessible

**Solution:**
1. Open Figma Desktop app
2. Ensure you're signed in
3. Open the file or have access to it
4. Try again in Cursor

### Issue: "Node ID not found"

**Cause:** Incorrect node ID format or element deleted

**Solution:**
1. Verify the URL/node ID is correct
2. Check element exists in Figma
3. Try copying link again
4. Use the currently selected element instead

### Issue: Generated HTML doesn't match design exactly

**Cause:** Email HTML has limitations Figma doesn't

**Reality check:**
- Email HTML can't replicate every Figma feature
- Complex shadows, blurs, overlays may be simplified
- Custom fonts may fall back to web-safe fonts
- Flexbox/Grid layouts converted to tables

**Solution:**
- Simplify Figma design to email-friendly patterns
- Accept some visual approximations
- Iterate: "Make the spacing tighter" or "Use a darker background"

### Issue: Colors are slightly different

**Cause:** Color space conversions or transparency handling

**Solution:**
```
"Verify the background color is exactly #f3f3f3 from the Figma design"
```

Be specific about exact hex values if critical.

### Issue: Images missing or broken

**Cause:** Figma images are references, not embedded

**Solution:**
- Replace placeholder image URLs with actual hosted images
- Use absolute URLs (https://)
- Ensure images are publicly accessible

### Issue: Layout breaks in Outlook

**Cause:** Outlook has severe HTML/CSS limitations

**Solution:**
```
"Optimize this email specifically for Outlook compatibility:
- Use only table-based layouts
- Avoid any unsupported CSS
- Test in Outlook desktop"
```

Then validate: `npm run validate [file]`

## Tips for Best Results

### 1. Design Simply

Email HTML is fundamentally limited. Design with constraints:
- Single column is safest
- Simple 2-column sections work
- Avoid 3+ columns unless mobile-stacking is ok
- Keep effects simple (solid colors, basic borders)

### 2. Use Figma Features Well

- **Auto Layout**: Perfect for email – converts to table padding
- **Components**: Create reusable email components
- **Constraints**: Help understand responsive behavior
- **Clear naming**: AI understands "Header Section" better than "Frame 427"

### 3. Iterate with Cursor

Start broad, then refine:

```
1. "Generate email from Figma [URL]"
2. "Make the CTA button larger and more prominent"
3. "Add more spacing between sections"
4. "Change font to Arial for better compatibility"
```

### 4. Validate Early and Often

After generation:
```bash
npm run validate emails/templates/[file].html
```

Catch issues before sending.

### 5. Test in Real Clients

Figma → HTML is a transformation, not a perfect replica. Always test:
- Send test emails
- Check mobile devices
- Verify Outlook rendering
- Adjust as needed

## Workflow Optimization

### Save Time with Component Library

Build once, reuse everywhere:

1. **Create Figma email component library**
   - Header variants
   - Footer variants
   - CTA buttons
   - Content blocks

2. **Generate HTML components**
   ```
   "Extract all email components from the Figma library at [URL]
   and create HTML files in emails/components/"
   ```

3. **Compose emails quickly**
   ```
   "Create a promotional email using:
   - components/header-brand.html
   - components/cta-primary.html
   - components/footer-standard.html
   With this content from Figma: [URL]"
   ```

### Template Systems

Create template families:

```
"Generate a campaign email series from Figma pages:
- templates/campaign-announce.html
- templates/campaign-features.html
- templates/campaign-reminder.html

Keep consistent branding and reuse header/footer"
```

### Automated Updates

When design changes:

```
"The email header design was updated in Figma (node 5:10).
Regenerate emails/components/header-brand.html with the new design"
```

Update the component, and it's ready to use in future emails.

## Resources

### Figma Resources
- [Figma Desktop App](https://www.figma.com/downloads/)
- [Figma Email Design Best Practices](https://www.figma.com/community/search?model_type=hub_files&q=email%20template)

### Email HTML Resources
- [Can I Email](https://www.caniemail.com/) - CSS support in email clients
- [HTML Email Guide](https://www.htmhell.dev/adventcalendar/2022/24/) - Best practices

### Testing Services
- [Litmus](https://litmus.com) - Email testing platform
- [Email on Acid](https://www.emailonacid.com) - Email testing

### This Blueprint
- `example-prompts.md` - Ready-to-use prompt templates
- `testing-checklist.md` - Email testing workflow
- `.cursorrules` - See automatic rules applied

---

**Questions?** Ask Cursor:
```
"How do I [specific Figma MCP workflow question]?"
```

