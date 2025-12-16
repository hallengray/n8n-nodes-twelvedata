# Archive - Development Artifacts

This folder contains development artifacts that were used during the creation of the Twelve Data n8n connector but are not needed for client-facing documentation or day-to-day use.

## Why These Files Are Archived

These files were helpful during development but are no longer needed in the main documentation:

- **Investigation files**: Research and problem-solving documents
- **Agent coordination files**: AI assistant prompts and coordination docs
- **Priority lists**: Internal planning documents for feature implementation
- **Development guides**: Step-by-step guides used during initial development
- **Configuration files**: Deprecated or no longer needed config files

## What's in This Archive

### Root Level Files

- `.npmrc` - Deprecated npm configuration (no longer needed)
- `ISSUE-LEGACY-PEER-DEPS.md` - Investigation into peer dependency issues (resolved)
- `INVESTIGATION-COMPLETE.md` - Development investigation summary
- `FIX_CREDENTIAL_STEPS.md` - Temporary credential fix guide (no longer needed)
- `README_TEMPLATE.md` - Template file (no longer needed)
- `TROUBLESHOOTING_401.md` - Troubleshooting guide (consolidated into main docs)
- `DOCUMENTATION_REVIEW_SUMMARY.md` - Development artifact

### Documentation Files

- `AGENT_COORDINATION.md` - AI agent coordination document
- `AGENT_PROMPT_MARKET_INTELLIGENCE.md` - AI prompt for market intelligence features
- `AGENT_PROMPT_TECHNICAL_INDICATORS.md` - AI prompt for technical indicators
- `PRIORITY_INDICATORS_LIST*.md` - Internal priority lists for indicator implementation
- `NEXT_TESTS_GUIDE.md` - Development testing guide
- `STEP_BY_STEP_TESTING.md` - Development testing procedures
- `TESTING_PLAN_50_PERCENT.md` - Interim testing plan
- `QUICK-REFERENCE-PEER-DEPS.md` - Quick reference for peer dependencies

## Should You Use These Files?

**For normal maintenance:** No, you don't need these files. Use the main documentation instead.

**For reference:** Yes, if you're curious about how something was developed or want to understand past decisions.

**For troubleshooting:** Maybe, if you encounter an issue that was previously solved, these files might have historical context.

## Main Documentation to Use Instead

For day-to-day work, use these files:

- `README.md` - Main project documentation
- `CLIENT_HANDOVER.md` - Complete handover guide
- `CLIENT_REGENERATION_GUIDE.md` - Regeneration system guide
- `docs/CREDENTIALS_SETUP.md` - How to set up credentials
- `docs/TESTING_LOG.md` - Complete testing results
- `docs/REGENERATION_GUIDE.md` - Technical regeneration guide
- `docs/ADDING_ENDPOINTS_QUICK_GUIDE.md` - How to add new endpoints

## Can These Be Deleted?

These files are archived (not deleted) for reference. They're safe to delete if you need to save disk space, as they're also preserved in git history.

If you want to delete them:
```bash
rm -rf docs/archive
```

But we recommend keeping them for at least 6 months after project handover, just in case.

---

*Archived: December 2024*
