# Visual Validation Workflow with DevTools MCP

**AUTOMATIC** visual comparison between Figma designs and generated HTML emails to ensure pixel-perfect accuracy.

## Overview

This blueprint includes **MANDATORY automatic visual validation** using DevTools MCP integration. After generating HTML from Figma, the system **ALWAYS automatically**:

1. Checks if DevTools MCP is available
2. Captures a screenshot of the Figma design
3. Opens the generated HTML in a browser
4. Captures a screenshot of the rendered HTML
5. Compares both visually
6. Iterates and improves until they match 1:1

**No special prompt needed** - this happens automatically on every Figma → HTML generation!

## How It Works

### Automatic Workflow

When you request email generation with validation, Cursor automatically:

```mermaid
Figma Design → Extract Data → Generate HTML → Open in Browser → 
Screenshot Both → Compare → Iterate if Needed → Final HTML
```

### Step-by-Step Process

#### 1. Generate from Figma
```
YOU: "Create an email footer from this Figma design and validate it's 1:1"
```

Cursor extracts design data via Figma MCP and generates email-safe HTML.

#### 2. Capture Figma Reference
Automatically takes a screenshot of the Figma design using:
```
mcp_Figma_Desktop_get_screenshot()
```

**This is your "source of truth"** - the target design.

#### 3. Open HTML in Browser
Automatically navigates to the generated HTML file:
```
mcp_brave-devtools_navigate_page(
  type: "url",
  url: "file:///Users/.../emails/components/footer.html"
)
```

#### 4. Capture Rendered HTML
Takes a full-page screenshot of the rendered email:
```
mcp_brave-devtools_take_screenshot(
  fullPage: true
)
```

#### 5. Visual Comparison
Cursor analyzes both screenshots for differences:

**Checks:**
- ✅ Layout (spacing, alignment, positioning)
- ✅ Colors (backgrounds, text, borders)
- ✅ Typography (sizes, weights, line heights)
- ✅ Element presence (all components rendered)
- ✅ Dimensions (widths, heights, padding)

**Identifies issues like:**
- "Footer padding should be 32px, currently 20px"
- "Background color #f8f6f0 rendered as #f7f7f7"
- "Social icons missing border-radius"
- "Text alignment should be center, currently left"

#### 6. Iterate if Needed
If differences found:
- Analyzes the HTML code
- Updates specific values (padding, colors, etc.)
- Re-captures screenshot
- Compares again
- Repeats up to 3 times

#### 7. Validation Complete
Provides final report with both screenshots and status.

## Triggering Validation

### AUTOMATIC BY DEFAULT

**Validation now runs automatically on EVERY Figma → HTML generation!**

No special keywords needed. Just request:
```
"Create email footer from Figma"
"Generate newsletter from Figma"
"Build email header from Figma design"
```

And validation automatically runs after generation.

### How Automatic Validation Works

**Step 1:** Cursor generates the HTML email from Figma

**Step 2:** Cursor automatically checks if DevTools MCP is available

**Step 3a (DevTools available):** 
- Automatically captures Figma screenshot
- Automatically opens HTML in browser
- Automatically captures HTML screenshot
- Automatically compares and iterates until 1:1

**Step 3b (DevTools NOT available):**
- Skips validation with message: "⚠️  DevTools MCP not available - skipping visual validation"
- Continues with HTML generation only

### Skipping Validation (Optional)

If you want FASTER generation without validation:

```
"Create email footer from Figma without validation"
"Generate newsletter and skip validation"
"Quick generation from Figma"
```

Keywords that skip validation:
- "without validation"
- "skip validation"  
- "quick generation"
- "no validation"

## Example Workflow

### Standard Request (Automatic Validation)

```
YOU: "Create an email footer from Figma node 224:613"

CURSOR (automatically runs validation):
1. Extracting Figma design data...
   - Colors: #f8f6f0, #192d60, #1a1a1a, #626262
   - Typography: Helvetica Bold 16px, Tahoma 12px
   - Spacing: 31px padding, 16px gaps
   - Layout: Profile card with overlapping images

2. Generating email-safe HTML...
   ✓ Table-based layout created
   ✓ Inline styles applied
   ✓ Saved to emails/components/footer-wijsvanoostveen.html

3. Capturing Figma screenshot...
   ✓ Reference screenshot captured

4. Opening HTML in browser...
   ✓ Loaded: file:///Users/.../footer-wijsvanoostveen.html

5. Capturing rendered HTML screenshot...
   ✓ HTML screenshot captured

6. Analyzing visual comparison...
   ⚠️  Found 2 differences:
   - Profile image border-radius: should be 36px, currently 32px
   - Bottom section padding: should be 32px, currently 30px

7. Iterating to fix issues...
   ✓ Updated border-radius: 36px
   ✓ Updated padding: 32px
   ✓ Re-generated HTML

8. Re-validating...
   ✓ HTML re-rendered
   ✓ Screenshot captured
   ✓ Comparison: MATCH ✅

✅ Visual Validation Complete
- Figma design: [screenshot shown]
- HTML render: [screenshot shown]
- Comparison: PERFECT MATCH
- Issues found: 2 (fixed in iteration 1)
- Final status: Ready for production
```

## Using DevTools MCP Manually

If you want to manually validate or debug:

### Navigate to Your HTML

```
mcp_brave-devtools_navigate_page(
  type: "url",
  url: "file:///Users/jason.krom/Documents/Test Projects/html-email-blueprint/emails/components/footer.html"
)
```

### Take Screenshot

```
mcp_brave-devtools_take_screenshot(
  fullPage: true,
  format: "png"
)
```

### Get Page Snapshot (for debugging layout issues)

```
mcp_brave-devtools_take_snapshot()
```

Shows the DOM structure and helps identify layout problems.

### Resize for Testing

```
mcp_brave-devtools_resize_page(
  width: 375,
  height: 667
)
```

Test mobile rendering.

## Common Validation Scenarios

### Scenario 1: Perfect Match First Try

```
✅ Visual Validation Complete
- Comparison: PERFECT MATCH
- Issues found: None
- Iterations: 0
- Status: Ready for production
```

Design was simple or extraction was highly accurate. You're done! 🎉

### Scenario 2: Minor Adjustments Needed

```
⚠️  Visual Validation - Iteration 1
- Found 3 minor differences
- Fixing: spacing (2), color (1)
- Re-validating...

✅ Visual Validation Complete
- Comparison: MATCH
- Issues found: 3 (fixed)
- Iterations: 1
- Status: Ready for production
```

Common for detailed designs. Fixed automatically.

### Scenario 3: Email Client Limitations

```
⚠️  Visual Validation Complete
- Comparison: MINOR DIFFERENCES
- Issues found: 2 (intentional)
- Iterations: 2
- Status: Ready (with email client limitations)

Notes:
- Border-radius may render differently in Outlook
- Custom font fallback to Arial (expected)
```

Some Figma features can't be replicated in email HTML. These are noted and acceptable.

### Scenario 4: Complex Design Needs Review

```
⚠️  Visual Validation - Max Iterations Reached
- Comparison: NEEDS ADJUSTMENT
- Issues found: 5 remaining
- Iterations: 3 (max reached)
- Status: Needs user review

Remaining issues:
1. Multi-column layout stacking differently
2. Background image not rendering (email limitation)
3. Shadow effect not supported in email
4. Custom spacing needs manual fine-tuning
5. Icon alignment slightly off

Recommendation: Review HTML and adjust manually, or simplify Figma design.
```

Very complex designs may need human intervention after auto-validation.

## Best Practices

### Design in Figma for Email Validation

**Do:**
- Use consistent spacing values
- Stick to standard font sizes
- Keep layouts simple (tables, not complex grids)
- Use solid colors (not gradients/shadows)
- Design within 600px width

**Avoid:**
- Complex overlays
- Absolute positioning
- CSS transforms
- Background images (use placeholders)
- Too many nested frames

### Prompt for Best Results

**Good prompts:**
```
"Create email footer from Figma and validate 1:1"
"Generate newsletter, ensure design matches exactly"
"Build promotional email and verify all colors are correct"
```

**More specific:**
```
"Create email from Figma node 123:456, validate it matches,
pay special attention to spacing and typography"
```

### Iterate Effectively

If validation finds issues:
- Trust the automatic iterations (usually fixes them)
- Review the comparison screenshots
- Check for intentional email limitations
- Manually adjust if after 3 iterations

## Validation Report Format

After validation, you'll see:

```
✅ Visual Validation Complete
──────────────────────────────────────
Figma Design:     [Screenshot displayed]
Rendered HTML:    [Screenshot displayed]
──────────────────────────────────────
Comparison:       MATCH / MINOR DIFFERENCES / NEEDS ADJUSTMENT
Issues Found:     [number] ([fixed/remaining])
Iterations:       [N attempts]
Final Status:     [Ready for use / Needs review / Email limitations noted]
──────────────────────────────────────
Details:
- Layout: ✓ Match
- Colors: ✓ Match
- Typography: ✓ Match (Arial fallback)
- Spacing: ✓ Match
- Images: ⚠️  Placeholders used
──────────────────────────────────────
```

## Troubleshooting

### "DevTools MCP not responding"

**Check:**
- Browser instance is running
- File path is correct (absolute path)
- File has been saved to disk

**Fix:**
```
"Close browser and try again"
```

### "Screenshots don't match but HTML looks correct"

**Possible causes:**
- Font rendering differences (browser vs Figma)
- Anti-aliasing differences
- Image placeholders vs actual images
- Browser default styles

**These are usually acceptable** - focus on layout, colors, spacing.

### "Validation taking too long"

**If validation is slow:**
- Complex designs take longer to validate
- Multiple iterations add time
- Skip validation for quick iterations: "Generate without validation"

## Integration with Other Tools

### After Validation

```bash
# HTML is validated and ready, now:
npm run validate emails/components/footer.html   # Check email rules
npm run inline emails/components/footer.html     # Inline CSS
npm run test-send emails/components/footer.html  # Send test
```

### Validation in CI/CD

You can script visual validation:
1. Generate HTML from Figma via Cursor API
2. Run automated screenshot comparison
3. Deploy only if validation passes

(Advanced setup - contact for details)

## FAQ

### Do I always need validation?

**Validation runs automatically by default!** This ensures every email matches your Figma design perfectly.

You can skip it only if you want faster iteration:
```
"Generate email footer without validation"
"Quick email generation from Figma"
```

Automatic validation is **especially valuable** for:
- Production emails (always use validation)
- Complex designs (catches layout issues)
- Brand-critical layouts (ensures accuracy)
- Final deliverables (1:1 match guaranteed)

### Does validation work for partial designs?

**Yes!** Validation works for:
- Full email templates
- Individual components (headers, footers)
- Buttons, cards, sections
- Any Figma selection

### Can I validate existing HTML?

**Yes!** 
```
"Validate emails/components/footer.html against Figma node 224:613"
```

Cursor will compare existing HTML with Figma design.

### What if Figma design changes?

Re-generate and re-validate:
```
"Regenerate footer from updated Figma design and validate"
```

The system will use the latest Figma state.

## Summary

**Automatic visual validation ensures:**
- ✅ Pixel-perfect accuracy
- ✅ Faster iteration cycles
- ✅ Fewer manual corrections
- ✅ Confidence in output quality
- ✅ Production-ready emails

**Use it when:**
- Quality matters
- Design fidelity is critical
- You want assurance before sending
- Learning email HTML generation

**Skip it when:**
- Quick iteration needed
- Simple changes
- Drafts/experiments
- You'll manually review anyway

---

**Try it now:**
```
"Create an email component from my Figma selection and validate it's 1:1"
```

The system will handle the rest automatically! ✨

