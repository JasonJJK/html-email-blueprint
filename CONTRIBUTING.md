# Contributing to HTML Email Blueprint

This blueprint is designed to be customized and extended for your team's needs. Here's how to make the most of it.

## Philosophy

This is a **workflow blueprint**, not a rigid framework. The goal is to:
- Automate HTML email generation from Figma designs
- Enforce email client compatibility automatically
- Provide tools for validation and testing
- Make it easy to onboard new team members

**Feel free to modify anything** to fit your workflow!

## Customizing for Your Team

### 1. Add Your Brand Components

Create reusable email components specific to your brand:

**Headers:**
```bash
emails/components/
├── header-corporate.html       # Primary brand header
├── header-promotional.html     # Marketing campaign header
└── header-transactional.html   # Plain transactional header
```

**Footers:**
```bash
emails/components/
├── footer-full.html            # Complete footer with all links
├── footer-minimal.html         # Simple footer for transactional
└── footer-legal.html           # Footer with extensive legal text
```

**Other components:**
- CTA buttons (primary, secondary, tertiary)
- Content cards
- Social media bars
- Dividers and spacers

### 2. Document Your Design System

Create `docs/design-system.md` with:

**Color Palette:**
```
Primary:   #0066cc
Secondary: #00cc66
Text:      #333333
Links:     #0066cc
Background:#f3f3f3
```

**Typography:**
```
Headings: Arial Bold, 24px, line-height 30px
Body:     Arial Regular, 16px, line-height 24px
Links:    Arial Regular, 16px, underline
Footer:   Arial Regular, 12px, line-height 18px
```

**Spacing:**
```
Section padding: 30px
Inner padding:   20px
Mobile padding:  15px
Vertical gap:    20px
```

Reference in prompts:
```
"Generate an email using our design system (see docs/design-system.md)"
```

### 3. Create Prompt Templates

Add team-specific prompts to `docs/example-prompts.md`:

```markdown
### Our Weekly Newsletter

Generate our standard weekly newsletter from Figma design: [URL]

Use:
- components/header-corporate.html
- components/footer-full.html
- Design system colors and typography
- 3-column feature section (stacks on mobile)
- Primary CTA at bottom
```

### 4. Customize .cursorrules

Edit `.cursorrules` to add:

**Your SMTP defaults:**
```
When generating emails, use these defaults:
- From: newsletter@yourcompany.com
- From Name: Your Company
- Colors: [your brand colors]
- Fonts: [your approved fonts]
```

**Your specific constraints:**
```
Additional requirements for this company:
- All emails must include disclaimer text
- Footer must have physical address: [your address]
- Use specific unsubscribe link format
- Include view-in-browser link at top
```

### 5. Add Your Testing Accounts

Document in `docs/testing-checklist.md`:

```markdown
## Company Test Accounts

Send all emails to these test accounts before production:

- team-test-gmail@yourcompany.com (Gmail)
- team-test-outlook@yourcompany.com (Outlook)
- team-test-apple@yourcompany.com (Apple Mail)
- [team-lead-email] (approval)
```

### 6. Extend Build Tools

Add custom scripts to `tools/`:

**Example: Brand validator**
```javascript
// tools/validate-brand.js
// Checks if email uses approved brand colors and fonts
```

**Example: Template generator**
```javascript
// tools/generate-template.js
// Scaffolds new email templates with your defaults
```

Add to `package.json`:
```json
{
  "scripts": {
    "validate:brand": "node tools/validate-brand.js",
    "generate": "node tools/generate-template.js"
  }
}
```

## Workflow Improvements

### Integrate with Your Process

**Option A: Git workflow**
```bash
# Feature branch for each campaign
git checkout -b campaign/summer-sale-2025

# Generate email
# [work in Cursor]

# Commit
git add emails/templates/summer-sale.html
git commit -m "Add summer sale email template"

# PR for review
git push origin campaign/summer-sale-2025
```

**Option B: Campaign folders**
```bash
emails/
├── campaigns/
│   ├── 2025-q1-launch/
│   ├── 2025-summer-sale/
│   └── 2025-holiday/
└── transactional/
    ├── order-confirmation.html
    ├── password-reset.html
    └── welcome-series/
```

### Add Deployment Scripts

Create `tools/deploy.js` to:
- Upload to your ESP (Mailchimp, SendGrid, etc.)
- Create campaign
- Upload images to CDN
- Set up tracking

### Automate Testing

Create `tools/test-all.js`:
```javascript
// Automatically:
// 1. Validate HTML
// 2. Inline CSS
// 3. Send to all test accounts
// 4. Check for common issues
```

## Sharing with Your Team

### Onboarding New Team Members

1. **Share this repo**
   ```bash
   git clone [your-repo-url]
   cd html-email-blueprint
   npm install
   ```

2. **Provide quick start guide**
   - How to access Figma designs
   - Standard prompt templates to use
   - Where to save generated emails
   - How to request approval

3. **Demo the workflow**
   - Show live Figma → Cursor → Email generation
   - Walk through validation and testing
   - Review a recent campaign email

### Team Best Practices

**Code reviews:**
- Check generated HTML follows `.cursorrules`
- Verify responsive behavior
- Test in key email clients
- Review for brand consistency

**Documentation:**
- Document any new components created
- Update prompt templates with learnings
- Share tips in team wiki/Slack

**Iteration:**
- Weekly: Review what's working, what's not
- Monthly: Update `.cursorrules` with new learnings
- Quarterly: Refresh component library

## Maintaining the Blueprint

### Keep It Updated

**Dependencies:**
```bash
npm update
npm audit fix
```

**Rules:**
- Update `.cursorrules` as email client support changes
- Add new email client workarounds as discovered
- Remove outdated techniques

**Documentation:**
- Keep `docs/` current with team process
- Update `example-prompts.md` with new patterns
- Archive old/deprecated approaches

### Testing New Approaches

Before changing `.cursorrules` or tools:

1. Test in separate branch
2. Generate test emails
3. Validate against checklist
4. Review with team
5. Merge if approved

### Versioning

Consider tagging stable versions:

```bash
git tag -a v1.0 -m "Initial team blueprint"
git tag -a v1.1 -m "Added dark mode support"
git push --tags
```

Team members can use specific versions:
```bash
git checkout v1.0
```

## Reporting Issues

### Found a Bug?

**In generated emails:**
1. Note the prompt used
2. Identify the issue (screenshot helpful)
3. Check which email client(s) affected
4. Propose fix or workaround

**In build tools:**
1. Note the command run
2. Include error message
3. Specify node version
4. Propose fix if known

### Suggesting Improvements

**New features:**
- Describe the use case
- Show example of desired output
- Explain how it fits workflow

**Rule changes:**
- Explain why current rule is problematic
- Show better approach
- Demonstrate compatibility

## License

This blueprint is MIT licensed - use it however you want!

## Getting Help

**For HTML email questions:**
- Check `docs/email-best-practices.md`
- Ask in [email-dev Slack channel]
- Reference [Can I Email](https://www.caniemail.com)

**For Figma MCP questions:**
- See `docs/figma-mcp-workflow.md`
- Check Cursor MCP documentation
- Ask Cursor directly

**For build tool questions:**
- Check tool script comments
- Review `package.json` scripts
- Read relevant npm package docs

**For workflow questions:**
- Ask your team lead
- Check team wiki/docs
- Experiment and iterate!

---

## Quick Contribution Checklist

Adding new content:

- [ ] Follows existing code style (.editorconfig)
- [ ] Uses `.cursorrules` patterns
- [ ] Tested in Gmail, Outlook, Apple Mail
- [ ] Validated with `npm run validate`
- [ ] Documentation updated if needed
- [ ] Committed with clear message

Adding new tools:

- [ ] Script documented (comments)
- [ ] Added to `package.json` scripts
- [ ] README updated with usage
- [ ] Error handling included
- [ ] Tested on multiple files

Modifying rules:

- [ ] Backwards compatible (or noted)
- [ ] Tested with existing templates
- [ ] Team review completed
- [ ] `.cursorrules` updated
- [ ] Changelog/commit message clear

---

**Remember:** This is YOUR blueprint. Make it work for your team! 🚀

