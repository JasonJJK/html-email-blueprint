# Components vs Templates - Output Format Guide

Understanding when to generate standalone email components versus full email templates.

## Overview

The blueprint automatically detects whether you're creating:
- **Component** - Reusable piece (footer, header, button) WITHOUT DOCTYPE/head
- **Full Template** - Complete, sendable email WITH DOCTYPE/head/body

## Component Output (No DOCTYPE)

### When Generated:

User mentions any of these keywords:
- `footer`, `header`, `signature`
- `button`, `CTA`, `banner`
- `divider`, `spacer`, `card`
- `component`, `section`, `block`, `module`, `part`
- "just the footer", "only the header"

### Output Structure:

```html
<!-- Email Component: Footer -->
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px;">
  <tr>
    <td bgcolor="#f3f3f3" style="background-color:#f3f3f3; padding:20px; text-align:center;">
      <p style="margin:0; font-family:Arial, sans-serif; font-size:12px; color:#999999;">
        &copy; 2025 Company Name. All rights reserved.
      </p>
    </td>
  </tr>
</table>
```

**Characteristics:**
- ✅ Starts with HTML comment describing component
- ✅ No `<!DOCTYPE html>`, `<html>`, `<head>`, or `<body>` tags
- ✅ Just the table structure
- ✅ Self-contained with all inline styles
- ✅ Can be copy/pasted into full templates
- ✅ Saved to `emails/components/`

### Use Cases:

**Reusable Parts:**
```
"Create an email footer component"
→ emails/components/footer-standard.html
```

**Insert into Templates:**
```html
<!-- In your full template -->
<body>
  <!-- Header content -->
  
  <!-- Main content -->
  
  <!-- Insert footer component here -->
  <table role="presentation">...</table>
</body>
```

**Component Library:**
Build a library of reusable pieces:
```
emails/components/
├── header-brand.html
├── header-minimal.html
├── footer-standard.html
├── footer-legal.html
├── cta-primary.html
├── cta-secondary.html
├── divider-simple.html
└── social-media-bar.html
```

## Full Template Output (With DOCTYPE)

### When Generated:

User mentions any of these keywords:
- `email`, `newsletter`, `campaign`
- `template`, `announcement`, `message`
- "complete email", "full email", "entire email"
- "sendable email", "production email"

### Output Structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Newsletter - January 2025</title>
  <style type="text/css">
    body { margin: 0; padding: 0; }
    img { border: 0; }
    table { border-collapse: collapse; }
    
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f3f3f3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0">
          <!-- Complete email content -->
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

**Characteristics:**
- ✅ Complete HTML document
- ✅ DOCTYPE declaration
- ✅ Full `<head>` with meta tags
- ✅ `<style>` block for resets and media queries
- ✅ Full `<body>` with wrapper structure
- ✅ Ready to send/test immediately
- ✅ Saved to `emails/templates/`

### Use Cases:

**Standalone Emails:**
```
"Create a newsletter email"
→ emails/templates/newsletter-2025-01.html
```

**Complete Campaigns:**
```
"Generate a promotional email"
→ emails/templates/promo-summer-sale.html
```

**Transactional:**
```
"Create a password reset email"
→ emails/templates/password-reset.html
```

## Example Prompts

### Components (No DOCTYPE):

```
✅ "Create an email footer"
✅ "Generate a header component"
✅ "Build a CTA button"
✅ "Make an email signature"
✅ "Create just the footer section"
✅ "Generate only the header part"
```

**Result:** Component HTML without DOCTYPE

### Full Templates (With DOCTYPE):

```
✅ "Create a newsletter email"
✅ "Generate a promotional email template"
✅ "Build a complete welcome email"
✅ "Make a full transactional email"
✅ "Create an entire campaign email"
```

**Result:** Full HTML document with DOCTYPE

### Explicit Requests:

```
"Create a footer as a standalone component"
→ Component

"Create a footer as part of a full email template"
→ Full template
```

## When Cursor Asks:

If your request is ambiguous:

```
YOU: "Create an email from Figma"

CURSOR: "Should this be a reusable component or a complete email template?"

YOU: "Component" → No DOCTYPE
YOU: "Full template" → With DOCTYPE
```

## Why This Matters

### Components Are:
- ✅ Lightweight (no extra markup)
- ✅ Reusable across multiple emails
- ✅ Easy to maintain in one place
- ✅ Can be tested in isolation
- ✅ Composable (mix and match)

### Full Templates Are:
- ✅ Ready to send immediately
- ✅ Include all necessary meta tags
- ✅ Have mobile-responsive media queries
- ✅ Proper document structure
- ✅ Can be opened/tested in browser directly

## Mixing Components and Templates

### Build Component Library First:

```
Step 1: Create components
"Create email header component" → header.html
"Create email footer component" → footer.html
"Create primary CTA button" → cta-primary.html
```

### Then Compose Templates:

```
Step 2: Build template using components
"Create a newsletter template using:
- components/header.html
- components/cta-primary.html  
- components/footer.html"
```

### Result:

```html
<!DOCTYPE html>
<html>
<head>...</head>
<body>
  <!-- Header component inserted -->
  <table>...</table>
  
  <!-- Content -->
  <table>...</table>
  
  <!-- CTA component inserted -->
  <table>...</table>
  
  <!-- Footer component inserted -->
  <table>...</table>
</body>
</html>
```

## Visual Validation

Both components and full templates can be validated:

**Component:**
```
"Create footer component and validate it's 1:1"
```
- Validates just the component portion
- Wraps in minimal HTML for browser rendering
- Compares component area only

**Full Template:**
```
"Create newsletter email and validate it's 1:1"
```
- Validates entire email
- Renders complete document
- Compares full page

## File Organization

```
emails/
├── components/          ← Components (no DOCTYPE)
│   ├── header-brand.html
│   ├── footer-standard.html
│   ├── cta-primary.html
│   └── divider.html
│
└── templates/           ← Full templates (with DOCTYPE)
    ├── newsletter-2025-01.html
    ├── promo-summer.html
    └── welcome-series-1.html
```

## Testing Components vs Templates

### Testing Components:

```bash
# Components need wrapping for testing
# Create a test wrapper manually:
```

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Test: Footer Component</title>
</head>
<body>
  <!-- Insert component HTML here -->
  <table role="presentation">...</table>
</body>
</html>
```

### Testing Full Templates:

```bash
# Templates are ready to test immediately
npm run validate emails/templates/newsletter.html
npm run test-send emails/templates/newsletter.html
```

## Automatic Detection Logic

The blueprint uses these signals:

| Signal | Result |
|--------|--------|
| Mentions "footer", "header", "button" | → Component |
| Saving to `emails/components/` | → Component |
| Says "just the" or "only the" | → Component |
| Mentions "email", "newsletter", "template" | → Full template |
| Saving to `emails/templates/` | → Full template |
| Says "complete" or "full" or "entire" | → Full template |
| Ambiguous | → Asks user |

## Best Practices

### For Components:

1. **Keep them focused** - One purpose per component
2. **Make them reusable** - No hardcoded content
3. **Document parameters** - What can be customized
4. **Include comment header** - Describe the component

```html
<!-- 
  Email Component: Primary CTA Button
  Usage: Insert this table into email templates
  Customize: href, button text, colors
-->
<table role="presentation">...</table>
```

### For Full Templates:

1. **Include all meta tags** - Viewport, charset, etc.
2. **Add media queries** - For mobile responsiveness
3. **Use semantic titles** - Helpful for testing
4. **Keep structure consistent** - Easier to maintain

## Common Mistakes

### ❌ Wrong:

```
YOU: "Create an email footer"
OUTPUT: Full HTML with DOCTYPE, head, body (too much!)
```

### ✅ Correct:

```
YOU: "Create an email footer"
OUTPUT: Just the footer table (component only)
```

### ❌ Wrong:

```
YOU: "Create a newsletter email"
OUTPUT: Just a table (missing DOCTYPE, can't send!)
```

### ✅ Correct:

```
YOU: "Create a newsletter email"
OUTPUT: Full HTML document (ready to send)
```

## Summary

**Component = Reusable piece WITHOUT DOCTYPE**
- Quick prompt: "Create footer"
- Output: Just the HTML table
- Use: Insert into multiple templates

**Template = Complete email WITH DOCTYPE**
- Quick prompt: "Create newsletter email"
- Output: Full HTML document
- Use: Send immediately

**The system detects automatically** - just use natural language! 🎉

---

**Questions?**

```
"Should I create a component or template?"
→ Component for reusable pieces
→ Template for complete emails

"Can I convert a component to template?"
→ Yes! Wrap it in full HTML structure

"Can I extract a component from a template?"
→ Yes! Copy the table section out
```

