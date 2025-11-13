# Email Testing Checklist

Complete workflow for testing HTML emails across clients and devices. Use this checklist every time you generate a new email template.

## Pre-Send Validation

Before sending any test emails, validate locally:

### ✅ 1. HTML Validation

```bash
npm run validate emails/templates/your-email.html
```

**Check for:**
- [ ] No external stylesheets
- [ ] No JavaScript
- [ ] Proper DOCTYPE
- [ ] Required meta tags
- [ ] Table-based structure
- [ ] Max width ≤600px

**Fix any errors before proceeding.**

### ✅ 2. Visual Check in Browser

```bash
open emails/templates/your-email.html
# or
open -a "Google Chrome" emails/templates/your-email.html
```

**Look for:**
- [ ] Layout appears correct
- [ ] Images show (or placeholders clear)
- [ ] Text is readable
- [ ] Colors match design
- [ ] Spacing looks right
- [ ] Links are visible

**Note:** Browser rendering ≠ email client rendering, but catches obvious issues.

### ✅ 3. Mobile Preview

Resize browser to ~375px width:

- [ ] Layout stacks properly (single column)
- [ ] Text remains readable (not too small)
- [ ] Buttons are touch-friendly (min 44x44px)
- [ ] Images scale appropriately
- [ ] No horizontal scrolling

### ✅ 4. Inline CSS (if needed)

If your email has `<style>` blocks:

```bash
npm run inline emails/templates/your-email.html
# Creates your-email.inlined.html
```

Use the `.inlined.html` version for sending.

## Test Email Sending

### ✅ 5. Send to Test Accounts

```bash
npm run test-send emails/templates/your-email.inlined.html your@email.com
```

**Send to multiple accounts:**
- [ ] Gmail address (personal or test)
- [ ] Outlook.com address
- [ ] Yahoo or AOL (if relevant)
- [ ] Corporate email (if testing B2B emails)

**Pro tip:** Create dedicated test accounts:
- `yourname+test1@gmail.com`
- `yourname+test2@gmail.com`
- All deliver to same inbox but appear as separate addresses

### ✅ 6. Check Spam Folders

After sending, check:
- [ ] Email arrived in inbox (not spam)
- [ ] Sender name correct
- [ ] Subject line correct
- [ ] Preview text appropriate

**If in spam:** Check SPF/DKIM/DMARC on sending domain, avoid spammy words in subject.

## Email Client Testing

Test in actual email clients (not just webmail):

### ✅ Gmail Testing

**Gmail Web (Desktop):**
- [ ] Layout renders correctly
- [ ] Images load (or "Display images" prompt)
- [ ] Buttons clickable
- [ ] Links work and open in new tabs
- [ ] Colors accurate
- [ ] Fonts render (or fallback appropriately)

**Gmail Mobile App (iOS/Android):**
- [ ] Single column layout
- [ ] Touch-friendly buttons
- [ ] Images scale to screen
- [ ] Text readable without zooming
- [ ] Links tap correctly
- [ ] No horizontal scrolling

**Common Gmail issues:**
- CSS in `<style>` tags supported (but inline still recommended)
- Removes width attributes on tables sometimes
- May convert some hex colors

### ✅ Outlook Testing

**Outlook Desktop (Windows):**

Test in Outlook 2016, 2019, or 365 if possible:

- [ ] Layout intact (tables render)
- [ ] Background colors show
- [ ] Text styles correct
- [ ] Line height appropriate (Outlook has minimum)
- [ ] Spacing preserved
- [ ] Buttons work (table-based buttons)
- [ ] Images display (with explicit dimensions)

**Common Outlook issues:**
- Uses Microsoft Word rendering engine (not a browser!)
- No support for: flexbox, grid, float, position, CSS3 animations
- Background images require VML workarounds
- Ignores max-width (use width attribute)
- Adds spacing between tables (use border-collapse)

**Outlook Web (Outlook.com):**
- [ ] More forgiving than desktop
- [ ] CSS support better
- [ ] Test separately from desktop

**Quick Outlook check:**
```
If it works in Outlook desktop, it works everywhere.
```

### ✅ Apple Mail Testing

**Apple Mail (macOS):**
- [ ] Renders similarly to Safari
- [ ] Images and CSS work well
- [ ] Retina image quality
- [ ] Dark mode (if supported)

**iOS Mail (iPhone/iPad):**
- [ ] Responsive layout
- [ ] Touch-friendly interactions
- [ ] Images scale properly
- [ ] Dark mode appearance
- [ ] Swipe actions don't break layout

**Common Apple Mail issues:**
- Very standards-compliant (easy to work with)
- Auto-scales text (can use -webkit-text-size-adjust)
- Dark mode changes colors automatically

### ✅ Android Email Apps

**Gmail App (Android):**
- Similar to iOS Gmail app
- [ ] Check responsive behavior
- [ ] Touch targets sufficient

**Samsung Email / Other Native Apps:**
- [ ] Basic rendering (if relevant to audience)
- Varies by manufacturer

### ✅ Other Webmail Clients

**Yahoo Mail:**
- [ ] Basic rendering check
- [ ] Similar to Gmail in capabilities

**AOL Mail:**
- [ ] If B2B or older audience
- [ ] Conservative approach like Outlook

## Advanced Testing

### ✅ Dark Mode Testing

If email has dark mode support:

**Apple Mail (macOS/iOS):**
- [ ] Toggle system dark mode
- [ ] Colors invert appropriately
- [ ] Text readable on dark backgrounds
- [ ] Images work (or swap to dark versions)

**Gmail (iOS/Android with dark mode):**
- [ ] Colors adjusted
- [ ] Contrast maintained

**Outlook (Windows/Mac dark mode):**
- [ ] May force color changes
- [ ] Test if audience uses dark mode

### ✅ Accessibility Testing

**Screen Reader (VoiceOver or NVDA):**
- [ ] Tables announced as layout, not data
- [ ] Alt text on images descriptive
- [ ] Links have clear purpose
- [ ] Heading hierarchy logical
- [ ] Content flows in correct order

**Color Contrast:**
- Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ ] Text on background: min 4.5:1 ratio (WCAG AA)
- [ ] Large text (18px+): min 3:1 ratio

**Text Size:**
- [ ] Body text minimum 14px (16px+ recommended)
- [ ] Links clearly distinguishable
- [ ] Can read without zooming on mobile

### ✅ Professional Testing Services

For comprehensive testing across 90+ clients:

**Litmus** ([litmus.com](https://litmus.com))
- Screenshot testing across all major clients
- Spam filter testing
- Email analytics
- Code analysis

**Email on Acid** ([emailonacid.com](https://www.emailonacid.com))
- Similar to Litmus
- Client preview screenshots
- Pre-deployment testing

**Free alternatives:**
- [Mailtrap](https://mailtrap.io) - Fake SMTP for testing
- [Putsmail](https://putsmail.com) - Simple test sending

## Performance Testing

### ✅ File Size

Check email HTML file size:

```bash
ls -lh emails/templates/your-email.inlined.html
```

**Targets:**
- [ ] HTML file < 102KB (Gmail clips larger emails)
- [ ] Total with images < 1MB ideally
- [ ] Consider image optimization

**If over limit:**
- Compress images further
- Remove unnecessary inline styles
- Simplify HTML structure

### ✅ Load Time

Test with:
- [ ] Fast connection (normal)
- [ ] Slow 3G simulation (for mobile users)
- [ ] Images disabled (fallback experience)

## Link Testing

### ✅ All Links Work

Click every link in the test email:
- [ ] All links point to correct URLs
- [ ] Links open in new tab (`target="_blank"`)
- [ ] Unsubscribe link works (or placeholder clear)
- [ ] Social links point to profiles
- [ ] Tracking parameters included (if using)

### ✅ UTM Parameters

If using campaign tracking:
- [ ] UTM parameters present and correct
- [ ] Example: `?utm_source=email&utm_medium=newsletter&utm_campaign=launch`

## Final Checklist

Before sending to production list:

### Content Review
- [ ] Subject line compelling and accurate
- [ ] Preview text set (first text or explicit)
- [ ] All copy proofread (no typos)
- [ ] Personalization tokens working (if used)
- [ ] Date/time references accurate
- [ ] Legal requirements met (CAN-SPAM, GDPR)

### Technical Review
- [ ] Passed HTML validation
- [ ] CSS inlined
- [ ] Tested in Gmail, Outlook, Apple Mail minimum
- [ ] Mobile responsive verified
- [ ] All links work
- [ ] Images load (with alt text)
- [ ] File size under limits

### Brand Review
- [ ] Logo correct and linked
- [ ] Colors match brand guidelines
- [ ] Fonts consistent
- [ ] Tone and voice appropriate
- [ ] Footer has required legal info
- [ ] Unsubscribe link present and clear

### Sending Setup
- [ ] From name and email correct
- [ ] Reply-to set appropriately
- [ ] Test send successful
- [ ] List segments correct (if applicable)
- [ ] Schedule appropriate (timezone considered)

## Common Issues & Fixes

### Issue: Images not loading

**Causes:**
- Image URLs not absolute (https://)
- Images not publicly accessible
- Email client blocking images by default

**Fixes:**
- Use absolute URLs: `https://example.com/image.jpg`
- Ensure images hosted on public server
- Add descriptive alt text for when images blocked
- Test "images disabled" experience

### Issue: Layout broken in Outlook

**Causes:**
- Using divs instead of tables
- CSS not supported by Outlook
- Missing table attributes

**Fixes:**
- Convert to table-based layout
- Use inline styles only
- Add `role="presentation"` to tables
- Set explicit widths on tables/cells
- Run: `npm run validate` to check

### Issue: Text too small on mobile

**Causes:**
- Font size too small
- No viewport meta tag
- Mobile scaling off

**Fixes:**
- Minimum 14px text (16px body recommended)
- Include: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Use media queries for responsive text sizes

### Issue: Buttons not clickable

**Causes:**
- Hit area too small
- z-index issues
- Overlapping elements

**Fixes:**
- Use table-based buttons (most reliable)
- Minimum 44x44px touch target
- Add padding around button
- Test on actual mobile device

### Issue: Colors look different

**Causes:**
- Email client modifying colors
- Dark mode inverting colors
- Different color rendering

**Fixes:**
- Use specific hex values
- Test in target email clients
- Add dark mode support if needed
- Accept some variation is normal

### Issue: Email clipped in Gmail

**Cause:** HTML file size > 102KB

**Fix:**
```bash
# Check size
ls -lh emails/templates/your-email.inlined.html

# If over 102KB:
# - Simplify HTML structure
# - Remove excessive inline styles
# - Use external images (don't embed)
# - Consider splitting into multiple emails
```

## Testing Workflow Summary

**Quick Testing (Every Email):**
1. Validate locally: `npm run validate`
2. Visual check in browser
3. Inline CSS: `npm run inline`
4. Send test to Gmail + Outlook
5. Check mobile device

**Full Testing (Important Campaigns):**
1. All quick tests above
2. Send to all test accounts (Gmail, Outlook, Yahoo, etc.)
3. Test on multiple devices (iOS, Android)
4. Check dark mode (if supported)
5. Verify accessibility
6. Use Litmus/Email on Acid for comprehensive check
7. Review with stakeholders

**Production Checklist:**
1. All tests passed
2. Content approved
3. Links verified
4. Legal requirements met
5. Sending settings confirmed
6. Schedule appropriate

---

## Resources

**Testing Tools:**
- [Litmus](https://litmus.com) - Comprehensive email testing
- [Email on Acid](https://www.emailonacid.com) - Email previews
- [Can I Email](https://www.caniemail.com) - CSS/HTML support reference
- [Mailtrap](https://mailtrap.io) - Safe test environment

**Validation:**
- [W3C HTML Validator](https://validator.w3.org/)
- Built-in: `npm run validate`

**Accessibility:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Tool](https://wave.webaim.org/)

**This Blueprint:**
- `README.md` - Getting started guide
- `figma-mcp-workflow.md` - Figma integration
- `example-prompts.md` - Prompt templates

---

**Need help?** Ask Cursor:
```
"What should I check for [specific email client] compatibility?"
```

```
"My email has [specific issue], how do I fix it?"
```

