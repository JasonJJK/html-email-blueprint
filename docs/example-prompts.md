# Example Prompts for Figma → Email Generation

Ready-to-use prompt templates for common email generation workflows. Copy, customize with your Figma URLs, and paste into Cursor chat.

## Basic Email Generation

### From Figma URL

```
Generate an email template from this Figma design:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2
```

### From Currently Selected Figma Component

```
Create an email [component-type] from the currently selected Figma component
```

Replace `[component-type]` with: template, header, footer, CTA button, etc.

### With Specific Requirements

```
Generate a responsive email template from this Figma design:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2

Requirements:
- Maximum 600px width
- Optimized for Outlook and Gmail
- Single column layout that's mobile-friendly
- Include fallback fonts
- Save to emails/templates/
```

## Email Types

### Newsletter

```
Create a newsletter email template from this Figma design:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2

Include:
- Header with logo and optional navigation/view-in-browser link
- Hero section with main image and headline
- 3-4 content sections with images, headlines, and descriptions
- Featured CTA button
- Footer with address, social links, and unsubscribe
- Mobile-responsive (sections stack on small screens)
```

### Promotional Email

```
Generate a promotional email from Figma design:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2

Structure:
- Eye-catching header with brand logo
- Large hero image or banner
- Bold headline with promotional message
- 2-3 featured products/offers (with images)
- Prominent CTA button ("Shop Now" / "Get Offer")
- Urgency text (limited time, countdown, etc.)
- Standard footer
```

### Transactional Email (Order Confirmation)

```
Create an order confirmation email template based on this Figma design:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2

Include:
- Simple header with logo
- "Thank you for your order" headline
- Order number and date
- Table of ordered items (product, quantity, price)
- Subtotal, shipping, tax, and total
- Shipping address block
- Track order CTA button
- Help/support information in footer
- Must work in all major email clients
```

### Transactional Email (Password Reset)

```
Generate a password reset email template from Figma node [X:Y]

Include:
- Centered logo
- Clear headline "Reset Your Password"
- Brief explanation text
- Large, prominent "Reset Password" CTA button (make it table-based)
- Expiration notice (e.g., "Link expires in 24 hours")
- Alternative action ("If you didn't request this, ignore this email")
- Minimal footer with support contact
- Keep design clean and simple
```

### Welcome Email

```
Create a welcome email series - first email template from:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2

Include:
- Friendly header with full logo
- Warm welcome headline ("Welcome to [Company]!")
- Personal message from founder/team
- 2-3 key benefits or features highlighted
- "Get Started" CTA
- Optional: Tips or next steps section
- Social proof (customer count, awards, etc.)
- Footer with social links
```

### Event Invitation

```
Generate an event invitation email from this Figma design:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2

Structure:
- Header with event branding
- Hero image of venue or event graphic
- Event name (large, prominent)
- Date, time, and location details (formatted clearly)
- Brief description or agenda
- "Register Now" / "RSVP" CTA button
- Calendar add button/link
- Location map image (optional)
- Contact for questions
```

## Component Generation

### Email Header

```
Create a reusable email header component from Figma design:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2

Include:
- Company logo (linked to homepage)
- Optional navigation links or categories
- Optional "View in browser" link (right-aligned)
- Background color from design
- 600px max width
- Save to emails/components/header-[variant].html
```

### Email Footer

```
Generate a standard email footer component from this Figma:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2

Include:
- Company name and physical address
- Social media icon links (use placeholder image URLs)
- Unsubscribe link (required)
- Privacy policy and terms links
- Copyright notice
- Optional: preference center link
- Gray background, small text
- Save to emails/components/footer-standard.html
```

### CTA Button (Primary)

```
Create a primary CTA button component from Figma design node [X:Y]

Requirements:
- Table-based button structure (most reliable)
- Extract colors from Figma (background, text, hover state if applicable)
- Rounded corners if shown in design
- Padding for touch-friendly size (min 44x44px)
- Centered alignment
- Use placeholder href="#"
- Save to emails/components/cta-primary.html
```

### CTA Button (Secondary/Outline)

```
Create a secondary/outline CTA button from Figma node [X:Y]

Style:
- Table-based structure
- Border style from Figma
- Transparent/white background
- Colored border and text
- Same padding as primary button
- Save to emails/components/cta-secondary.html
```

### Content Block / Card

```
Generate a reusable content card component from this Figma design:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2

Structure:
- Image at top (with placeholder src)
- Headline (h2 or h3 styling)
- Body text (2-3 lines)
- Optional CTA link or button
- Should work in 1, 2, or 3 column layouts
- Save to emails/components/content-card.html
```

### Social Media Bar

```
Create a social media icon bar from Figma design node [X:Y]

Include icons for:
- Facebook, Twitter/X, Instagram, LinkedIn (common set)
- Use placeholder image URLs for icons
- Each icon linked (with # placeholder)
- Horizontal layout with spacing
- Works in light or dark backgrounds
- Save to emails/components/social-media-bar.html
```

## Advanced Workflows

### Extract Design System from Figma

```
Analyze this Figma design file and extract the email design system:
https://figma.com/design/[fileKey]/[fileName]

Create a documented design system with:
- Color palette (all colors used, with hex codes and usage notes)
- Typography scale (font sizes, line heights, weights)
- Spacing system (padding/margin values used)
- Button styles (primary, secondary, text)
- Common components identified

Save as docs/email-design-system.md
```

### Generate Multiple Variations

```
Create 3 email variations from this Figma design:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2

Variations:
1. Short version (hero + single CTA) - for mobile-focused campaigns
2. Medium version (hero + 2 features + CTA) - balanced
3. Long version (full content with multiple sections) - desktop-focused

Save to:
- emails/templates/campaign-short.html
- emails/templates/campaign-medium.html
- emails/templates/campaign-long.html
```

### Responsive Email with Complex Layout

```
Generate a responsive email from this Figma design:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2

Desktop layout:
- 2-column section (60/40 split)
- 3-column feature grid
- 4-column footer links

Mobile behavior:
- All columns stack vertically
- Images resize to full width
- Touch-friendly button sizes
- Increased padding on small screens

Use media queries and responsive classes.
```

### Dark Mode Email

```
Create an email template with dark mode support from Figma:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2

Requirements:
- Use light mode colors from Figma by default
- Add media query for prefers-color-scheme: dark
- Define dark mode color palette
- Ensure readable contrast in both modes
- Test images work in both modes (or swap them)
- Works in Apple Mail (dark mode leader)
```

### Accessibility-Focused Email

```
Generate an accessible email template from this Figma design:
https://figma.com/design/[fileKey]/[fileName]?node-id=1-2

Accessibility requirements:
- Semantic HTML table structure with role="presentation"
- All images have descriptive alt text
- Sufficient color contrast (WCAG AA)
- Text is at least 14px, body text 16px+
- Links have clear purpose
- Focus on screen reader compatibility
- Include text version recommendation
```

## Testing & Validation Prompts

### Validate Generated Email

After generation:

```
Validate the email I just generated for:
- Outlook compatibility issues
- Missing inline styles
- Broken table structures
- Images without alt text
- Links opening in same tab (should be _blank)
- Width exceeding 600px

Then run: npm run validate emails/templates/[filename].html
```

### Optimize for Outlook

```
Review emails/templates/[filename].html and optimize specifically for Outlook:
- Ensure all layouts use tables, not divs
- Check for any CSS that Outlook doesn't support
- Verify VML code if needed (for background images)
- Add mso-specific styles if helpful
- Check button structure is table-based
```

### Inline CSS

```
The email at emails/templates/[filename].html has <style> blocks.
Run the inline CSS tool to create a production-ready version:

npm run inline emails/templates/[filename].html
```

## Pro Tips for Better Results

### Be Specific About Structure

Bad:
```
Make an email from this Figma
```

Good:
```
Generate a promotional email with hero section, 3 product cards,
and CTA from Figma design [URL]. Optimize for Gmail and Outlook.
```

### Reference Existing Components

```
Create a newsletter using the header from emails/components/header-brand.html
and footer from emails/components/footer-standard.html, with content
from this Figma design: [URL]
```

### Iterate and Refine

Initial generation:
```
Generate email from Figma [URL]
```

Refinement:
```
Make the CTA button larger and more prominent, increase spacing 
around it to 30px top and bottom
```

```
Change the background color to match our brand color #0066cc
```

```
Stack the 3-column section on mobile devices
```

### Ask for Explanations

```
Generate email from Figma [URL] and explain:
- Why you structured the layout this way
- Any Outlook-specific workarounds used
- What media queries were added and why
```

## Workflow Integration

### After Generation Checklist

```
I just generated an email at emails/templates/[filename].html

Walk me through:
1. Validation steps
2. CSS inlining (if needed)
3. Sending a test email
4. What to check in different email clients
5. Any issues you notice that should be fixed
```

### Batch Processing

```
Generate email templates for our campaign from these Figma designs:

1. Announcement: [URL-1]
2. Follow-up: [URL-2]  
3. Reminder: [URL-3]

Keep consistent branding and reuse header/footer components.
```

---

## Template Variables

When using these prompts, replace:
- `[fileKey]` - Your Figma file key from URL
- `[fileName]` - Your Figma file name
- `[X:Y]` - Node ID (e.g., "1:2", "45:789")
- `[filename]` - Your email HTML filename
- `[component-type]` - Type of component (header, footer, button, etc.)
- `[variant]` - Component variant name (brand, simple, minimal, etc.)

## Need More Help?

Ask Cursor:
```
"Show me more examples of prompts for [specific email type or use case]"
```

```
"What's the best way to prompt for [specific requirement or feature]?"
```

