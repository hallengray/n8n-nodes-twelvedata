# Documentation Organization Guide

This guide explains which documentation is public-facing vs. internal/client-only.

## Public Documentation (Include in npm package)

These files should be accessible to all users:

### Root Level
- ✅ `README.md` - Streamlined user-facing documentation
- ✅ `LICENSE.md` - License information
- ✅ `CHANGELOG.md` - Version history and changes
- ✅ `package.json` - Package metadata

### Examples Folder
- ✅ `examples/` - Ready-to-import workflow examples
- ✅ `examples/README.md` - How to use the examples

## Internal Documentation (Client/Developer Only)

These files contain internal development information and should NOT be published to npm:

### Root Level
- 🔒 `DEVELOPMENT.md` - Complete development guide with testing status
- 🔒 `NPM_PUBLICATION_GUIDE.md` - Publishing instructions
- 🔒 `HANDOVER_PACKAGE_CHECKLIST.md` - Project handover checklist

### Docs Folder
All files in `docs/` are for internal use:

#### Testing Documentation
- 🔒 `docs/TESTING_LOG.md` - Detailed test results
- 🔒 `docs/TESTING_PLAN.md` - Test planning
- 🔒 `docs/TESTING_QUICK_REFERENCE.md` - Quick test reference
- 🔒 `docs/INTEGRATION_TESTING.md` - Integration test procedures
- 🔒 `docs/INTEGRATION_TESTING_CHECKLIST.md` - Testing checklist

#### Technical Documentation
- 🔒 `docs/CREDENTIALS_SETUP.md` - Detailed credential setup (too detailed for public)
- 🔒 `docs/CREDENTIALS.md` - Technical authentication details
- 🔒 `docs/OPENAPI_ANALYSIS.md` - Complete API endpoint reference
- 🔒 `docs/COMPLETE_OPERATIONS_INVENTORY.md` - Full operations list

#### Development Guides
- 🔒 `docs/ADDING_ENDPOINTS_QUICK_GUIDE.md` - How to add endpoints
- 🔒 `docs/REGENERATION_GUIDE.md` - Code regeneration guide

#### Technical Decisions
- 🔒 `docs/ADR-001-LEGACY-PEER-DEPS.md` - Architecture decision record
- 🔒 `docs/LEGACY-PEER-DEPS-SUMMARY.md` - Dependency decisions
- 🔒 `docs/DEPENDENCY-REMOVAL-PLAN.md` - Dependency management
- 🔒 `docs/N8N_VERIFICATION_COMPLIANCE.md` - Compliance checklist

#### Monitoring & Client Communication
- 🔒 `docs/CLIENT_EMAIL_ENDPOINT_MONITORING.md` - Client communication
- 🔒 `docs/ENDPOINT_COMPARISON_N8N_VS_GOOGLE_SHEETS.md` - Endpoint comparison

#### Archive
- 🔒 `docs/archive/` - Historical development documents

## NPM Package Configuration

Update `.npmignore` to exclude internal documentation:

```
# Internal documentation
DEVELOPMENT.md
NPM_PUBLICATION_GUIDE.md
HANDOVER_PACKAGE_CHECKLIST.md
DOCUMENTATION_GUIDE.md

# All docs folder (internal only)
docs/

# Development files
.cursorrules
.vscode/
*.log
*.tgz

# Git files
.git/
.gitignore

# Testing
test/
*.test.ts
coverage/
```

## Rationale

### Why Keep Documentation Internal?

1. **Testing Status** - Users don't need to know internal test coverage details
2. **Development Processes** - Build scripts, development setup, and workflows are for developers
3. **Technical Decisions** - Architecture decision records are internal documentation
4. **Client Communication** - Email templates and monitoring guides are not for public
5. **Detailed Credentials** - The public README has simplified credential setup; detailed guides are excessive

### What Users Actually Need

Users need to know:
- ✅ How to install the package
- ✅ How to set up credentials (simplified)
- ✅ What operations are available
- ✅ Example workflows
- ✅ Known limitations
- ✅ Where to get support

They don't need:
- ❌ Internal testing procedures
- ❌ Development setup instructions
- ❌ Architecture decisions
- ❌ Detailed technical analysis
- ❌ Client communication templates

## Summary

**Public README:** Concise, user-focused, easy to understand
**DEVELOPMENT.md:** Comprehensive, technical, for developers and client
**docs/ folder:** Complete internal documentation archive

---

**Note:** This guide itself is for internal use and should not be published.
