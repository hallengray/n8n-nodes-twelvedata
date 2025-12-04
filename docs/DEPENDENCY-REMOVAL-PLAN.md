# Legacy Peer Dependencies Removal Plan

**Status:** Ready for Removal  
**Priority:** Low (Non-Breaking)  
**Created:** December 2, 2024

## Executive Summary

Investigation confirms that `legacy-peer-deps=true` in `.npmrc` is **not required**. All dependencies resolve correctly without it. This document outlines the safe removal process.

## Quick Facts

✅ **No peer dependency conflicts exist**  
✅ **Build succeeds without the flag** (`npm run build` - passed)  
✅ **All packages install correctly** (tested with `--legacy-peer-deps=false`)  
✅ **No ERESOLVE errors detected**

## Current Status

### Files Modified
1. **`.npmrc`** - Added deprecation notice with investigation details
2. **`docs/ADR-001-LEGACY-PEER-DEPS.md`** - Complete investigation documentation
3. **`README.md`** - Added reference to ADR
4. **`docs/DEPENDENCY-REMOVAL-PLAN.md`** - This file

### Testing Completed ✅

| Test | Command | Result |
|------|---------|--------|
| Dependency Resolution | `npm install --dry-run --legacy-peer-deps=false` | ✅ PASS |
| Build | `npm run build` (without flag) | ✅ PASS |
| Dependency Tree | `npm ls --depth=0` | ✅ PASS |
| Conflict Search | grep for ERESOLVE errors | ✅ No conflicts |

### Testing Pending ⏳

| Test | Command | Status |
|------|---------|--------|
| Lint | `npm run lint` | ⚠️ Has unrelated style errors (not dependency issues) |
| Dev Mode | `npm run dev` | ⏳ Pending |
| Clean Install | Fresh clone + install | ⏳ Pending |
| CI/CD | Pipeline test | ⏳ Pending (if applicable) |

## Removal Steps

### Step 1: Fix Linting Issues (Optional but Recommended)

The project has 7 linting errors unrelated to dependencies:
```bash
npm run lint:fix
```

These are code style issues (alphabetization, sentence case) and should be fixed separately.

### Step 2: Remove Legacy Peer Deps Setting

**Option A: Remove the line (Recommended)**
```bash
# Edit .npmrc and remove the legacy-peer-deps=true line
# Keep the file if other configs exist, or delete the file entirely
```

**Option B: Keep commented for reference**
```npmrc
# legacy-peer-deps=true  # Removed Dec 2024 - not needed (see ADR-001)
```

### Step 3: Test Clean Install

```bash
# Remove node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules, package-lock.json

# Fresh install
npm install

# Verify build
npm run build
```

### Step 4: Commit Changes

```bash
git add .npmrc docs/
git commit -m "chore: remove unnecessary legacy-peer-deps setting

- Investigation confirmed no peer dependency conflicts exist
- All dependencies resolve correctly with npm v7+ default behavior
- Build and installation tested successfully without the flag
- See docs/ADR-001-LEGACY-PEER-DEPS.md for full analysis

Refs: ADR-001"
```

### Step 5: Monitor

After merging:
- Watch for any peer dependency warnings in CI/CD
- Monitor issue reports from users
- Document any new dependencies that require special handling

## Rollback Procedure

If issues arise after removal:

### Immediate Rollback
```bash
git revert HEAD
npm install
```

### Investigation
1. Capture full error output
2. Identify specific conflicting packages
3. Check if new dependencies were added
4. Update ADR-001 with findings

### Permanent Fix
- Update dependency versions to resolve conflicts
- Use `overrides` in package.json (npm 8.3+) if needed
- Only re-enable legacy-peer-deps as last resort

## Why This Matters

### Benefits of Removal

1. **Better Dependency Management**
   - Catches version conflicts early
   - Prevents hidden compatibility issues
   - Follows npm best practices

2. **Security**
   - Ensures peer dependencies are properly validated
   - Reduces risk of version mismatch vulnerabilities

3. **Maintainability**
   - Cleaner configuration
   - Easier for contributors to understand
   - Aligns with modern npm standards

4. **CI/CD Reliability**
   - More predictable builds
   - Catches issues in development, not production
   - Better compatibility with strict environments

### Risks (Minimal)

- ⚠️ **Low Risk**: Future dependency updates might introduce conflicts
- 🛡️ **Mitigation**: Regular dependency audits and testing
- 🔄 **Fallback**: Can always re-enable if truly needed (with documentation)

## Dependencies Analysis

### Current Dependency Tree

```
n8n-nodes-twelve-data@0.1.0
├── @devlikeapro/n8n-openapi-node@0.1.4 (no peer deps)
├── @n8n/node-cli@0.17.0 (requires eslint >= 9) ✅
├── eslint@9.39.1 ✅
├── form-data@4.0.5 (no peer deps)
├── n8n-workflow@1.120.0 (peer dep of this package) ✅
├── prettier@3.7.3 (no peer deps)
├── release-it@19.0.6 (no peer deps)
└── typescript@5.9.3 ✅
```

### Peer Dependency Requirements

| Package | Requires | Installed | Status |
|---------|----------|-----------|--------|
| @n8n/node-cli | eslint >= 9 | 9.39.1 | ✅ Satisfied |
| @typescript-eslint/* | typescript >= 4.8.4 < 6.0.0 | 5.9.3 | ✅ Satisfied |
| This package | n8n-workflow * | 1.120.0 | ✅ Satisfied |

**Conclusion:** All peer dependencies are properly satisfied.

## Future Recommendations

### 1. Regular Dependency Updates
```bash
# Check for updates
npm outdated

# Update non-breaking changes
npm update

# Test thoroughly after updates
npm run build && npm run lint
```

### 2. Dependency Audit
```bash
# Security audit
npm audit

# Fix vulnerabilities
npm audit fix
```

### 3. Lock File Maintenance
- Keep `package-lock.json` in version control
- Regenerate after major updates
- Review changes in pull requests

### 4. Documentation
- Update ADR-001 if dependency landscape changes
- Document any new peer dependency requirements
- Keep removal plan updated

## Related Documentation

- **[ADR-001: Legacy Peer Dependencies](ADR-001-LEGACY-PEER-DEPS.md)** - Full investigation and decision record
- **[package.json](../package.json)** - Project dependencies
- **[.npmrc](../.npmrc)** - npm configuration (to be updated)

## Contact

- **Questions:** Open an issue on GitHub
- **Problems after removal:** Create a bug report with full error output
- **Dependency conflicts:** Tag @maintainers in issue

---

**Last Updated:** December 2, 2024  
**Next Action:** Remove legacy-peer-deps setting after linting fixes (optional) or immediately






