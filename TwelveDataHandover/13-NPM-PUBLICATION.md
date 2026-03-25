# npm Publication Guide

This guide walks you through publishing the Twelve Data n8n connector to npm.

---

## Pre-Publication Checklist

Before publishing, verify these items are complete:

- [x] Build successful (`npm run build` ✓)
- [x] Linting passed (`npm run lint` ✓)
- [x] Package verified (`npm pack --dry-run` ✓)
- [x] Documentation complete ✓
- [x] Git repository finalized ✓
- [x] v0.1.0 tag created ✓
- [x] All changes pushed to GitHub ✓
- [ ] npm login completed (see Step 1 below)

**Package Details:**
- **Name:** `n8n-nodes-twelve-data`
- **Version:** 0.1.0
- **Size:** 47.1 kB (compressed)
- **Files:** 49 files in dist/ folder
- **Author:** Femi (hallengray@gmail.com)

---

## Step 1: Login to npm

**Check if already logged in:**
```bash
npm whoami
```

**If not logged in, login now:**
```bash
npm login
```

You'll be prompted for:
- **Username:** Your npm username
- **Password:** Your npm password
- **Email:** 
- **One-time password:** If 2FA is enabled

**Verify login:**
```bash
npm whoami
```

Should display your npm username.

---

## Step 2: Verify Package Contents

**Run dry-run to see what will be published:**
```bash
npm pack --dry-run
```

**Expected output:**
```
npm notice package size: 47.1 kB
npm notice unpacked size: 261.4 kB
npm notice total files: 49
```

**Verify the package includes:**
- dist/ folder with compiled JavaScript
- dist/credentials/ with TwelveDataApi.credentials.js
- dist/nodes/ with TwelveData.node.js
- package.json
- README.md (automatically included)
- LICENSE.md (automatically included)

**Verify the package DOES NOT include:**
- node_modules/
- .git/
- Source .ts files (only compiled .js files)
- Development artifacts
- Test files

---

## Step 3: Check Package Name Availability

**Verify the package name is available:**
```bash
npm view n8n-nodes-twelve-data
```

**Expected result:**
- If available: `npm error code E404` (good - means name is available)
- If taken: Shows existing package details (need to choose different name)

**Package name is:** `n8n-nodes-twelve-data` ✓

---

## Step 4: Publish to npm

**Publish the package:**
```bash
npm publish --access public
```

**What happens:**
1. npm runs `prepublishOnly` script (builds the package)
2. Creates tarball of dist/ folder
3. Uploads to npm registry
4. Package becomes publicly available

**Expected output:**
```
+ n8n-nodes-twelve-data@0.1.0
```

**Time required:** 1-2 minutes

---

## Step 5: Verify Publication

**Check the package on npm:**
```bash
npm view n8n-nodes-twelve-data
```

**Should show:**
- Package name: n8n-nodes-twelve-data
- Version: 0.1.0
- Description: n8n community node for Twelve Data API...
- Author: Femi <hallengray@gmail.com>
- License: MIT
- Repository: https://github.com/hallengray/n8n-nodes-twelvedata

**Visit npm package page:**
https://www.npmjs.com/package/n8n-nodes-twelve-data

**Verify:**
- README displays correctly
- Package information is accurate
- Install command is shown
- Links work

---

## Step 6: Test Installation

**Create test directory:**
```bash
mkdir test-install
cd test-install
npm init -y
```

**Install the package:**
```bash
npm install n8n-nodes-twelve-data
```

**Verify installation:**
```bash
ls node_modules/n8n-nodes-twelve-data/dist
```

Should show:
- credentials/
- nodes/
- package.json
- Other compiled files

**Test in n8n:**
1. Start n8n: `npx n8n`
2. Create new workflow
3. Add Twelve Data node
4. Verify all operations appear
5. Test a basic operation (Get Quote)

---

## Step 7: Create GitHub Release

**Go to GitHub repository:**
https://github.com/hallengray/n8n-nodes-twelvedata/releases

**Create new release:**
1. Click "Draft a new release"
2. Choose tag: v0.1.0
3. Release title: "v0.1.0 - Initial Release"
4. Description: Copy from CHANGELOG.md
5. Click "Publish release"

**Release description template:**
```markdown
# v0.1.0 - Initial Production-Ready Release

This is the first production-ready release of the Twelve Data n8n community node.

## Features

- 142 operations across 6 categories
- Thorough testing completed on all free-tier endpoints
- Zero runtime dependencies
- Comprehensive documentation including regeneration system guide
- 5 ready-to-use example workflows

## Installation

```bash
npm install n8n-nodes-twelve-data
```

Or install via n8n UI: Settings → Community Nodes → Install → `n8n-nodes-twelve-data`

## Documentation

- [README](https://github.com/hallengray/n8n-nodes-twelvedata#readme)
- [Client Handover Guide](CLIENT_HANDOVER.md)
- [Regeneration System Guide](CLIENT_REGENERATION_GUIDE.md)
- [Transfer Instructions](TRANSFER_INSTRUCTIONS.md)

## What's Next

- Package will be transferred to client after handover meeting
- n8n community submission pending
- 30-day support period included

See [CHANGELOG.md](CHANGELOG.md) for complete release notes.
```

---

## Troubleshooting

### "npm login" fails

**Problem:** Can't login to npm

**Solutions:**
1. Verify you have an npm account
2. Check username and password
3. If 2FA enabled, use one-time password
4. Try: `npm logout` then `npm login` again

---

### "Package name already taken"

**Problem:** `n8n-nodes-twelve-data` is already published

**Solutions:**
1. Check if it's your package: `npm view n8n-nodes-twelve-data`
2. If it's yours, you can publish updates
3. If it's someone else's, choose a different name:
   - `n8n-nodes-twelvedata` (no hyphen)
   - `n8n-nodes-twelve-data-api`
   - `n8n-nodes-twelvedata-connector`

---

### "prepublishOnly script failed"

**Problem:** Build fails during publish

**Solutions:**
1. Run build manually: `npm run build`
2. Fix any errors shown
3. Try publishing again

---

### "403 Forbidden" during publish

**Problem:** Don't have permission to publish

**Solutions:**
1. Verify you're logged in: `npm whoami`
2. Check package name isn't taken
3. Verify `publishConfig.access` is set to "public" in package.json

---

### Package published but README doesn't show

**Problem:** README not displaying on npm

**Solutions:**
1. Wait 5-10 minutes (npm caches)
2. Refresh the page
3. Verify README.md is in root directory
4. Check README.md has valid markdown

---

## Post-Publication Tasks

### 1. Announce the Release

**Where to announce:**
- GitHub repository (via release)
- n8n Community Forum
- Social media (if applicable)
- Email to interested users

**Announcement template:**
```
🎉 Twelve Data n8n Connector v0.1.0 Released!

Access financial market data directly in your n8n workflows:
- 142 operations for stocks, forex, crypto, and more
- Real-time quotes and historical data
- Company fundamentals and market intelligence
- Technical indicators

Install: npm install n8n-nodes-twelve-data

Docs: https://github.com/hallengray/n8n-nodes-twelvedata
```

### 2. Update Repository

**Add npm badge to README.md:**
```markdown
[![npm version](https://img.shields.io/npm/v/n8n-nodes-twelve-data.svg)](https://www.npmjs.com/package/n8n-nodes-twelve-data)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-twelve-data.svg)](https://www.npmjs.com/package/n8n-nodes-twelve-data)
```

### 3. Monitor Initial Usage

**Check npm stats:**
```bash
npm view n8n-nodes-twelve-data
```

**Monitor for issues:**
- GitHub Issues
- npm package page comments
- n8n Community Forum mentions

---

## Next Steps

After publication:

1. **Submit to n8n Community** (see N8N_SUBMISSION_GUIDE.md)
2. **Prepare for handover meeting** (see CLIENT_HANDOVER.md)
3. **Transfer ownership to client** (see TRANSFER_INSTRUCTIONS.md)

---

## Package Transfer Note

**Important:** This package will be published to the developer's npm account first, then transferred to the client after the handover meeting.

**Timeline:**
1. Developer publishes v0.1.0
2. Handover meeting conducted
3. Client reviews and approves
4. Ownership transferred to client
5. Client publishes v0.1.1 with updated author info

See [TRANSFER_INSTRUCTIONS.md](TRANSFER_INSTRUCTIONS.md) for complete transfer process.

---

**Ready to publish? Run: `npm publish --access public`**

---

*Last updated: December 2025*
*Version: 1.0*


