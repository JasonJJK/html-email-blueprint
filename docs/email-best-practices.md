# HTML Email Best Practices

Comprehensive guide to building bulletproof HTML emails that work across all email clients.

## The Golden Rules

### 1. **Tables for Layout**
Email HTML is not web HTML. Use `<table>` elements for all layout structure, not `<div>`.

**Why:** Outlook uses Microsoft Word's rendering engine, which has terrible CSS support. Tables are the only reliable layout method.

### 2. **Inline All Styles**
Put styles directly on each element with `style=""` attributes.

**Why:** Many email clients strip `<style>` blocks or `<link>` stylesheets. Inline styles are the most reliable.

### 3. **No JavaScript**
Never use JavaScript in email HTML. It won't work.

**Why:** Every major email client blocks JavaScript for security reasons.

### 4. **Keep It Simple**
Single column layouts are safest. Avoid complex designs.

**Why:** Email clients have wildly varying capabilities. Simpler designs = fewer compatibility issues.

### 5. **Test Everywhere**
Always test in Gmail, Outlook, and Apple Mail at minimum.

**Why:** Email clients render differently. What works in Chrome won't necessarily work in Outlook 2019.

## HTML Structure

### Required Document Structure

Every email must follow this pattern:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Your Email Subject</title>
  <style type="text/css">
    /* Optional: Resets and media queries */
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f3f3f3;">
  <!-- Full-width wrapper table -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <!-- 600px content table -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0">
          <!-- Content goes here -->
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

### Essential Meta Tags

```html
<meta charset="utf-8">
<!-- Ensures proper character encoding -->

<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Mobile responsiveness -->

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- Best IE rendering mode -->
```

## Table Best Practices

### Table Attributes

Every table should have:

```html
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
```

**Explained:**
- `role="presentation"` - Tells screen readers this is layout, not data
- `width="600"` - Explicit width (600px is email standard)
- `cellpadding="0" cellspacing="0" border="0"` - Reset default spacing
- `style="border-collapse:collapse;"` - Prevent gaps between cells

### Table Cell Attributes

```html
<td align="left" valign="top" style="padding:20px; font-family:Arial, sans-serif; font-size:16px; line-height:24px; color:#333333;">
  Content
</td>
```

**Explained:**
- `align="left"` - Horizontal alignment (use attribute, not CSS)
- `valign="top"` - Vertical alignment
- `style="..."` - All visual styling inline

### Nested Tables

For complex layouts, nest tables:

```html
<table>
  <tr>
    <td>
      <!-- Nested table for inner section -->
      <table>
        <tr>
          <td>Inner content</td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```

**Avoid deep nesting** (more than 3-4 levels) as it's hard to maintain and debug.

## Styling

### Inline Styles

All styles must be inline:

```html
<td style="font-family:Arial, sans-serif; font-size:16px; line-height:24px; color:#333333; padding:20px; background-color:#ffffff;">
```

### Supported CSS Properties

**Safe to use (inline):**
- `font-family`, `font-size`, `font-weight`, `font-style`
- `color`, `background-color`
- `padding` (avoid `margin` - unreliable in email)
- `border`, `border-radius` (with fallbacks)
- `text-align`, `vertical-align`
- `width`, `height`
- `line-height`
- `text-decoration`
- `display:block;` (for images)

**Avoid or use carefully:**
- `margin` - Use table cell padding instead
- `float` - Outlook doesn't support
- `position` - Not supported
- `flexbox`, `grid` - Not supported in email
- `CSS3 animations` - Limited support
- `background-image` - Outlook requires VML workaround

### Media Queries

Use `<style>` block for responsive behavior:

```html
<style type="text/css">
  @media only screen and (max-width: 600px) {
    .container {
      width: 100% !important;
    }
    .mobile-padding {
      padding: 10px !important;
    }
    .hide-mobile {
      display: none !important;
    }
    .stack {
      display: block !important;
      width: 100% !important;
    }
  }
</style>
```

Apply classes to tables/cells:

```html
<table class="container" width="600">
  <tr>
    <td class="mobile-padding" style="padding:20px;">
```

**Note:** Outlook desktop ignores media queries but other clients support them.

## Typography

### Web-Safe Fonts

Stick to fonts available on all systems:

```css
font-family: Arial, Helvetica, sans-serif;
font-family: Georgia, Times, 'Times New Roman', serif;
font-family: 'Courier New', Courier, monospace;
```

**Avoid custom fonts** unless you're okay with fallbacks. Email clients don't reliably support `@font-face` or web fonts.

### Text Sizing

```css
font-size: 16px;        /* Body text - minimum 14px */
font-size: 24px;        /* Headlines */
font-size: 12px;        /* Footer text - minimum */
line-height: 24px;      /* 1.5x font size generally */
line-height: 150%;      /* Or percentage */
```

**Outlook adds minimum line-height** - you can't make text too compact.

### Text Colors

```css
color: #333333;         /* Dark gray for body (better than #000)  */
color: #666666;         /* Medium gray for secondary text */
color: #999999;         /* Light gray for footer */
color: #0066cc;         /* Blue for links */
```

Use hex codes, not RGB or named colors (except basic ones).

## Images

### Image Attributes

Every `<img>` must have:

```html
<img 
  src="https://example.com/image.jpg" 
  alt="Descriptive alternative text" 
  width="600" 
  height="300" 
  style="display:block; width:100%; max-width:600px; height:auto; border:0;"
>
```

**Explained:**
- `src` - Absolute URL (https://)
- `alt` - Required for accessibility and when images blocked
- `width` and `height` - Explicit dimensions prevent layout shifts
- `style="display:block;"` - Prevents extra spacing
- `border:0;` - Removes default border in some clients

### Image Best Practices

**File formats:**
- JPG - Photos and complex images
- PNG - Graphics, logos, images with transparency
- GIF - Animations (use sparingly)

**Optimization:**
- Compress images (TinyPNG, ImageOptim)
- Use 2x resolution for retina displays
- Keep total email + images under 1MB

**Hosting:**
- Use CDN or reliable image host
- Absolute URLs only (https://)
- Ensure images publicly accessible
- Test loading speed

### Background Images

Outlook requires VML workaround for background images:

```html
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
  <v:fill type="tile" src="https://example.com/bg.jpg" />
  <v:textbox inset="0,0,0,0">
<![endif]-->
  <div style="background-image:url('https://example.com/bg.jpg');">
    Content with background
  </div>
<!--[if mso]>
  </v:textbox>
</v:roundrect>
<![endif]-->
```

**Simpler approach:** Use solid background colors and skip background images for email.

## Buttons / CTAs

### Table-Based Buttons (Most Reliable)

```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td align="center" bgcolor="#0066cc" style="border-radius:4px; background-color:#0066cc;">
      <a href="https://example.com" target="_blank" style="display:inline-block; padding:12px 24px; font-family:Arial, sans-serif; font-size:16px; font-weight:bold; color:#ffffff; text-decoration:none;">
        Click Here
      </a>
    </td>
  </tr>
</table>
```

**Key points:**
- Background color on `<td>` (both `bgcolor` attribute and inline style)
- Link `<a>` inside with `display:inline-block;`
- Padding on the link for click area
- `text-decoration:none;` to remove underline
- `target="_blank"` to open in new tab
- Use `border-radius` for rounded corners (graceful degradation in Outlook)

### Button Sizing

**Minimum touch target:** 44x44px for mobile

```css
padding: 12px 24px;  /* Vertical x Horizontal */
```

Adjust padding to achieve desired size.

### Multiple Buttons

Stack vertically on mobile:

```html
<table role="presentation">
  <tr>
    <td class="button-container" style="padding:10px;">
      <!-- Button 1 -->
    </td>
    <td class="button-container" style="padding:10px;">
      <!-- Button 2 -->
    </td>
  </tr>
</table>
```

```css
@media only screen and (max-width: 600px) {
  .button-container {
    display: block !important;
    width: 100% !important;
  }
}
```

## Responsive Design

### Mobile-First Mindset

Design for mobile first, enhance for desktop:
- Single column layouts
- Large tap targets (44x44px min)
- Readable text (16px+ body)
- Stack complex sections on mobile

### Responsive Patterns

**Fluid tables:**

```html
<table class="container" width="600" style="width:600px; max-width:600px;">
```

```css
@media only screen and (max-width: 600px) {
  .container {
    width: 100% !important;
  }
}
```

**Column stacking:**

```html
<table>
  <tr>
    <td class="stack" width="300" style="width:300px; display:inline-block;">
      Column 1
    </td>
    <td class="stack" width="300" style="width:300px; display:inline-block;">
      Column 2
    </td>
  </tr>
</table>
```

```css
@media only screen and (max-width: 600px) {
  .stack {
    display: block !important;
    width: 100% !important;
  }
}
```

**Hide on mobile:**

```html
<td class="hide-mobile">Desktop-only content</td>
```

```css
@media only screen and (max-width: 600px) {
  .hide-mobile {
    display: none !important;
  }
}
```

## Email Client Specific

### Outlook Compatibility

Outlook (especially 2007-2019) uses Word's rendering engine:

**Do:**
- Use table-based layouts
- Use inline styles
- Set explicit widths and heights
- Use `border-collapse:collapse;` on tables
- Test in actual Outlook (not just web)

**Don't:**
- Use floats, flexbox, grid
- Use background images (without VML)
- Use position, transforms
- Rely on `max-width` (use `width` attribute)
- Use CSS3 features

**Conditional comments for Outlook:**

```html
<!--[if mso]>
  Outlook-specific code
<![endif]-->

<!--[if !mso]><!-->
  Non-Outlook code
<!--<![endif]-->
```

### Gmail

Gmail is generally good but:
- Clips emails > 102KB (shows "View entire message")
- May remove some `<style>` blocks in older apps
- Supports most CSS but inline is safest
- Mobile app is standards-compliant

**Best practices:**
- Keep HTML under 102KB
- Inline styles
- Test in both web and mobile app

### Apple Mail

Apple Mail is the most standards-compliant:
- Excellent CSS support
- Dark mode support
- Renders like Safari

**Best practices:**
- Use modern CSS with fallbacks
- Test dark mode if you support it
- Generally "just works"

### Dark Mode

Some clients (Apple Mail, Outlook, Gmail) support dark mode:

**Basic approach:**

```html
<style>
  @media (prefers-color-scheme: dark) {
    .dark-bg { background-color: #1a1a1a !important; }
    .dark-text { color: #ffffff !important; }
  }
</style>
```

**Or:** Design with dark mode in mind from start (dark backgrounds, light text).

**Warning:** Some clients force color changes you can't control.

## Accessibility

### Semantic HTML

Use semantic structure:
- `<h1>`, `<h2>` for headings (with inline styles)
- `<p>` for paragraphs
- `<a>` for links (not `<span onclick>`)
- `role="presentation"` on layout tables

### Alt Text

Every image needs descriptive alt text:

```html
<img src="logo.png" alt="Company Name Logo" width="150" height="50">
<img src="product.jpg" alt="Blue cotton t-shirt on white background" width="300" height="300">
```

**Not:** `alt="image"` or `alt=""` (unless decorative)

### Color Contrast

Text must be readable:
- Normal text: 4.5:1 contrast ratio (WCAG AA)
- Large text (18px+): 3:1 ratio
- Don't rely on color alone to convey information

Check with: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Link Purpose

Links should be clear:

**Good:**
```html
<a href="...">Read the full article about email design</a>
<a href="...">Download the 2025 report (PDF, 2MB)</a>
```

**Bad:**
```html
<a href="...">Click here</a>
<a href="...">Read more</a>
```

### Screen Readers

- Use `role="presentation"` on layout tables
- Ensure logical content order
- Don't use images for important text
- Provide text alternatives

## Performance

### File Size

**Keep HTML file under 102KB** to avoid Gmail clipping.

Check size:
```bash
ls -lh emails/templates/your-email.html
```

Reduce size:
- Remove excessive whitespace
- Inline only necessary styles
- Optimize HTML structure
- Don't embed images as base64

### Image Optimization

- Compress images (TinyPNG, ImageOptim)
- Use appropriate dimensions (don't rely on CSS scaling)
- Lazy loading not available in email
- Consider total email + images weight

### Loading Speed

- Host images on fast CDN
- Use absolute URLs
- Optimize image file sizes
- Consider users on slow connections

## Legal Requirements

### CAN-SPAM (US)

Required elements:
- [ ] Physical mailing address
- [ ] Clear "From" information
- [ ] Honest subject line
- [ ] Unsubscribe link (must work for 30 days)

### GDPR (EU)

For EU recipients:
- [ ] Consent to send emails
- [ ] Clear privacy policy link
- [ ] Easy unsubscribe process
- [ ] Data handling transparency

### Other Best Practices

- Include preference center link
- Honor unsubscribes immediately
- Provide plain text version
- Include company/organization info

## Common Pitfalls

### ❌ Using Divs for Layout

```html
<!-- DON'T -->
<div style="display:flex;">
  <div style="width:50%;">Column 1</div>
  <div style="width:50%;">Column 2</div>
</div>
```

```html
<!-- DO -->
<table>
  <tr>
    <td width="300">Column 1</td>
    <td width="300">Column 2</td>
  </tr>
</table>
```

### ❌ External Stylesheets

```html
<!-- DON'T -->
<link rel="stylesheet" href="styles.css">
```

```html
<!-- DO -->
<style type="text/css">
  /* Reset and media queries only */
</style>

<td style="font-family:Arial; font-size:16px; color:#333;">
  Content with inline styles
</td>
```

### ❌ Forgetting Mobile

Test on actual mobile devices, not just browser resize.

### ❌ Assuming Browser Behavior

Email clients ≠ browsers. Always test in actual email clients.

### ❌ Not Testing in Outlook

If it works in Outlook, it works everywhere. Test there first.

## Quality Checklist

Before sending any email:

- [ ] Tested in Gmail (web + mobile)
- [ ] Tested in Outlook (desktop if possible)
- [ ] Tested in Apple Mail
- [ ] Responsive on mobile
- [ ] All images have alt text
- [ ] All links work and open in new tabs
- [ ] Unsubscribe link present
- [ ] Legal requirements met
- [ ] HTML validated
- [ ] CSS inlined
- [ ] File size under 102KB
- [ ] Proofread for typos
- [ ] Preview text set

## Resources

**Testing:**
- [Litmus](https://litmus.com) - Email testing platform
- [Email on Acid](https://www.emailonacid.com) - Email testing
- [Can I Email](https://www.caniemail.com) - CSS/HTML support reference

**Tools:**
- This blueprint: `npm run validate` and `npm run inline`
- [HTML Email Check](https://www.htmlemailcheck.com/check/) - Free validation

**References:**
- [Campaign Monitor CSS Guide](https://www.campaignmonitor.com/css/) - CSS support across clients
- [Email Client Market Share](https://emailclientmarketshare.com/) - Which clients to prioritize

**Learning:**
- [Really Good Emails](https://reallygoodemails.com/) - Email design inspiration
- [Litmus Community](https://litmus.com/community) - Email developer community

---

**Questions?** Ask Cursor:
```
"What's the best way to [specific email HTML technique]?"
```

```
"How do I make [specific element] work in Outlook?"
```

