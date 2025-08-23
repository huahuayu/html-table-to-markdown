# Chrome Web Store Submission Checklist

## Pre-Submission Requirements

### ✅ Extension Package

- [ ] Generate all PNG icons (16, 32, 48, 128)
- [ ] Run `./build.sh` to create `table-to-markdown.zip`
- [ ] Verify ZIP file is under 10MB
- [ ] Test extension locally one final time

### ✅ Store Listing Assets

#### Screenshots (Required: at least 1, max 5)

- [ ] Screenshot 1: Extension in action (1280x800 or 640x400)
- [ ] Screenshot 2: Hover state with copy button
- [ ] Screenshot 3: Markdown output example
- [ ] Screenshot 4: Dark mode (optional)
- [ ] Screenshot 5: Complex table example (optional)

#### Promotional Images

- [ ] Small tile: 440x280 (optional but recommended)
- [ ] Large tile: 920x680 (optional)
- [ ] Marquee: 1400x560 (optional)

### ✅ Store Listing Information

#### Basic Information

- **Name**: Table to Markdown - Copy as Markdown
- **Short Description** (132 chars max):
  > Convert HTML tables to Markdown instantly. Hover over any table and click to copy as Markdown. Perfect for developers & writers.

#### Detailed Description

```
🚀 Convert HTML Tables to Markdown with One Click!

Table to Markdown is the fastest way to copy tables from any website in Markdown format. Perfect for developers, technical writers, and anyone working with documentation.

✨ KEY FEATURES:
• Auto-detection of all HTML tables on any webpage
• Non-intrusive copy button appears on hover
• Instant conversion to clean Markdown format
• Works with complex, nested tables
• Supports dynamically loaded content
• Dark mode support
• Zero configuration required

📋 HOW IT WORKS:
1. Navigate to any webpage with tables
2. Hover over a table
3. Click the copy button
4. Paste perfect Markdown anywhere

🎯 PERFECT FOR:
• GitHub README files
• Technical documentation
• Notion, Obsidian, and other Markdown editors
• Stack Overflow answers
• Blog posts and articles
• Academic writing

🔒 PRIVACY FIRST:
• No data collection or tracking
• Works entirely offline
• No external API calls
• Minimal permissions
• Open source

⚡ FEATURES:
• Lightning fast performance
• Smart header detection
• Special character escaping
• Handles complex table structures
• Preserves formatting
• Cross-browser compatible

🆓 FREE & OPEN SOURCE:
This extension is completely free and open source. View the code and contribute on GitHub.

💡 TIPS:
• Works on any website with HTML tables
• Automatically handles table headers
• Preserves links and formatting
• Escapes special Markdown characters

🐛 SUPPORT:
Found a bug or have a suggestion? Please visit our GitHub page to report issues or contribute.

⭐ If you find this extension helpful, please leave a review!
```

#### Category

- **Primary**: Developer Tools
- **Secondary**: Productivity

#### Language

- English (United States)

### ✅ Privacy & Permissions

#### Privacy Policy

- [ ] Include link to PRIVACY.md or host it online
- [ ] Single Purpose: Convert HTML tables to Markdown
- [ ] Justification for permissions:
  - `clipboardWrite`: Required to copy converted Markdown to clipboard
  - `<all_urls>`: Required to detect tables on any website

#### Host Permissions

- None required (content scripts use matches)

### ✅ Pricing & Distribution

- [ ] Free
- [ ] All regions/countries
- [ ] No in-app purchases
- [ ] No ads

### ✅ Developer Account Setup

- [ ] Register as Chrome Web Store Developer ($5 one-time fee)
- [ ] Verify account email
- [ ] Complete tax information (if monetizing)
- [ ] Set up developer profile

### ✅ Testing Requirements

- [ ] Test on Chrome stable version
- [ ] Test on different websites
- [ ] Test with various table types
- [ ] Verify clipboard functionality
- [ ] Check dark mode
- [ ] Test on different screen sizes

## Submission Process

1. **Login** to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)

2. **Click** "New Item"

3. **Upload** `table-to-markdown.zip`

4. **Fill in** all store listing details

5. **Add** screenshots and promotional images

6. **Set** pricing (Free) and regions (All)

7. **Add** privacy policy URL

8. **Review** all information

9. **Submit** for review

## Post-Submission

- Review time: 1-3 business days typically
- Check email for approval/rejection
- If rejected, address feedback and resubmit
- Once approved, share the Chrome Web Store link

## Marketing Materials

### Social Media Post Template

```
🎉 Just launched Table to Markdown for Chrome!

Convert any HTML table to Markdown with one click. Perfect for:
📝 Documentation
💻 GitHub READMEs
📚 Technical writing

100% free & open source!

Install: [Chrome Web Store Link]
GitHub: [Repository Link]

#ChromeExtension #Markdown #DeveloperTools #OpenSource
```

### Product Hunt Launch

- Title: Table to Markdown - Convert HTML tables to Markdown instantly
- Tagline: Copy any web table as clean Markdown with one click
- Topics: Developer Tools, Productivity, Chrome Extensions

## Important URLs

- Chrome Web Store Dashboard: https://chrome.google.com/webstore/developer/dashboard
- Extension Documentation: https://developer.chrome.com/docs/extensions/
- Manifest V3 Migration: https://developer.chrome.com/docs/extensions/mv3/
- Program Policies: https://developer.chrome.com/docs/webstore/program_policies/

## Notes

- Keep version numbers synchronized between manifest.json and package.json
- Update CHANGELOG.md for each release
- Tag releases in Git repository
- Monitor user reviews and respond promptly
- Consider creating a simple landing page for the extension
