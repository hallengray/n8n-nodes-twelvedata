# Twelve Data n8n Connector - Regeneration Guide

This comprehensive guide explains how to maintain and update the Twelve Data n8n connector when the API changes.

---

## Table of Contents

1. [Overview](#overview)
2. [When to Regenerate](#when-to-regenerate)
3. [Prerequisites](#prerequisites)
4. [Quick Start](#quick-start)
5. [Regeneration Workflow](#regeneration-workflow)
6. [Adding New Operations](#adding-new-operations)
7. [Handling Breaking Changes](#handling-breaking-changes)
8. [Testing After Changes](#testing-after-changes)
9. [Publishing Workflow](#publishing-workflow)
10. [Troubleshooting](#troubleshooting)
11. [Script Reference](#script-reference)

---

## Overview

The regeneration system helps you:

- **Monitor** the Twelve Data API for changes
- **Backup** your code before making changes
- **Detect** what changed between API versions
- **Plan** which new endpoints to implement
- **Track** your implementation coverage

### System Components

| Component | Purpose |
|-----------|---------|
| `scripts/regenerate.sh` | Main regeneration script |
| `scripts/check-openapi-changes.sh` | Quick change detector |
| `scripts/detect-changes.js` | Detailed change analysis |
| `scripts/validate-implementation.js` | Coverage checker |
| `scripts/manage-backups.sh` | Backup management |
| `.github/workflows/check-openapi-updates.yml` | Automated monitoring |

### Directory Structure

```
twelve-data-connector/
├── scripts/
│   ├── regenerate.sh
│   ├── check-openapi-changes.sh
│   ├── detect-changes.js
│   ├── validate-implementation.js
│   └── manage-backups.sh
├── backups/                    # Created automatically
│   └── YYYY-MM-DD-HH-MM-SS/   # Timestamped backups
├── openapi-specs/              # Created automatically
│   ├── openapi-current.json
│   └── openapi-YYYY-MM-DD.json
└── openapi-spec.json           # Current working spec
```

---

## When to Regenerate

### You Should Regenerate When:

1. **GitHub Action alerts you** - The automated workflow creates an issue when changes are detected
2. **You need new endpoints** - Want to implement functionality that's not yet available
3. **Users report issues** - An endpoint might have changed behavior
4. **Periodic maintenance** - Check monthly even without alerts

### Signs the API Has Changed:

- Endpoints returning different data structures
- New parameters available in the API docs
- Deprecation notices from Twelve Data
- 400/404 errors on previously working calls

---

## Prerequisites

### Required Tools

| Tool | Purpose | Installation |
|------|---------|--------------|
| **Node.js 18+** | Run JavaScript scripts | [nodejs.org](https://nodejs.org) |
| **curl** | Download OpenAPI spec | Usually pre-installed |
| **Git Bash** (Windows) | Run bash scripts | Included with Git for Windows |

### Optional Tools

| Tool | Purpose | Installation |
|------|---------|--------------|
| **jq** | JSON processing | `choco install jq` (Windows) / `brew install jq` (Mac) |
| **WSL** (Windows) | Better bash support | Windows Store |

### Check Your Setup

```bash
# Verify Node.js
node --version  # Should be 18.x or higher

# Verify curl
curl --version

# Verify scripts are executable (Linux/Mac)
chmod +x scripts/*.sh
```

### Windows Users

On Windows, you have several options to run the bash scripts:

1. **Git Bash** (Recommended) - Comes with Git for Windows
2. **WSL** - Windows Subsystem for Linux
3. **PowerShell** - For Node.js scripts only

```powershell
# In PowerShell, run Node.js scripts directly:
node scripts/detect-changes.js old.json new.json
node scripts/validate-implementation.js
```

---

## Quick Start

### Check for Changes (30 seconds)

```bash
./scripts/check-openapi-changes.sh
```

If changes are detected, proceed with full regeneration.

### Full Regeneration (5 minutes)

```bash
# Run the regeneration script
./scripts/regenerate.sh

# Review the output and follow the next steps
```

### Check Your Coverage

```bash
node scripts/validate-implementation.js
```

---

## Regeneration Workflow

### Step 1: Check for Changes

```bash
# Quick check (hash comparison only)
./scripts/check-openapi-changes.sh

# Or with verbose output
./scripts/check-openapi-changes.sh --verbose
```

**Exit codes:**
- `0` = No changes (you're up to date)
- `1` = Changes detected (proceed to Step 2)
- `2` = Error occurred

### Step 2: Run Full Regeneration

```bash
# Standard regeneration
./scripts/regenerate.sh

# Preview without making changes
./scripts/regenerate.sh --dry-run

# Skip confirmation prompts (for automation)
./scripts/regenerate.sh --force
```

**What happens:**
1. Downloads latest OpenAPI spec
2. Validates JSON structure
3. Creates timestamped backup
4. Archives current spec
5. Runs change detection
6. Shows implementation coverage
7. Provides next steps

### Step 3: Review Changes

After regeneration, review the change report:

```bash
# The report is saved as change-report-TIMESTAMP.json
# View it in your editor or use:
cat change-report-*.json | jq '.summary'
```

**Key things to look for:**
- Breaking changes (require immediate attention)
- New endpoints (opportunities to expand)
- Removed endpoints (check if you implemented them)
- Modified parameters (may need updates)

### Step 4: Update Implementation (if needed)

If breaking changes affect your implemented operations:

1. Open `nodes/TwelveData/TwelveData.node.ts`
2. Find the affected operation
3. Update parameters/routing as needed
4. See [Handling Breaking Changes](#handling-breaking-changes)

### Step 5: Test and Build

```bash
# Build the project
npm run build

# Run linting
npm run lint

# Fix any issues
npm run lint:fix
```

### Step 6: Commit Changes

```bash
git add .
git commit -m "chore: update OpenAPI spec (YYYY-MM-DD)"
git push
```

---

## Adding New Operations

### Overview

Adding a new operation involves:
1. Finding the endpoint in the OpenAPI spec
2. Adding the operation to the appropriate resource
3. Adding any required parameters
4. Testing the new operation

### Step-by-Step Guide

#### 1. Find the Endpoint

```bash
# Search for an endpoint in the spec
cat openapi-spec.json | jq '.paths | keys[]' | grep -i "earnings"
```

Or check `docs/OPENAPI_ANALYSIS.md` for categorized endpoints.

#### 2. Examine the Endpoint Details

```bash
# Get details for a specific endpoint
cat openapi-spec.json | jq '.paths["/earnings"]'
```

Look for:
- HTTP method (usually GET)
- Required parameters
- Optional parameters
- Response structure

#### 3. Add the Operation

Open `nodes/TwelveData/TwelveData.node.ts` and find the appropriate resource section.

**Example: Adding a new operation to Fundamentals**

```typescript
// Find the Fundamentals operations array and add:
{
    name: 'Get Income Statement',
    value: 'getIncomeStatement',
    action: 'Get income statement data',
    description: 'Get quarterly or annual income statement data for a company',
    routing: {
        request: {
            method: 'GET',
            url: '/income_statement',
        },
    },
},
```

#### 4. Add Required Parameters

If the endpoint needs parameters beyond the common ones (symbol, etc.):

```typescript
// Add to the properties array
{
    displayName: 'Period',
    name: 'period',
    type: 'options',
    required: true,
    default: 'annual',
    description: 'The reporting period',
    displayOptions: {
        show: {
            resource: ['fundamentals'],
            operation: ['getIncomeStatement'],
        },
    },
    options: [
        { name: 'Annual', value: 'annual' },
        { name: 'Quarterly', value: 'quarterly' },
    ],
    routing: {
        send: {
            type: 'query',
            property: 'period',
        },
    },
},
```

#### 5. Add Optional Parameters

For optional parameters, add them to a collection:

```typescript
{
    displayName: 'Additional Options',
    name: 'incomeStatementOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
        show: {
            resource: ['fundamentals'],
            operation: ['getIncomeStatement'],
        },
    },
    options: [
        {
            displayName: 'Start Date',
            name: 'start_date',
            type: 'string',
            default: '',
            placeholder: 'e.g., 2020-01-01',
            description: 'Start date for the data range',
            routing: {
                send: {
                    type: 'query',
                    property: 'start_date',
                },
            },
        },
    ],
},
```

### Common Parameter Types

| Type | Use Case | Example |
|------|----------|---------|
| `string` | Text input | Symbol, date, timezone |
| `number` | Numeric input | Output size, decimal places |
| `boolean` | Checkbox | Show plan, include extended |
| `options` | Dropdown | Interval, period, type |
| `collection` | Optional params group | Additional options |

### Routing Patterns

**Query Parameter:**
```typescript
routing: {
    send: {
        type: 'query',
        property: 'symbol',
    },
},
```

**Path Parameter:**
```typescript
routing: {
    request: {
        url: '=/indicator/{{ $parameter["indicator"] }}',
    },
},
```

**Conditional Value:**
```typescript
routing: {
    send: {
        type: 'query',
        property: 'show_plan',
        value: '={{$value ? "true" : undefined}}',
    },
},
```

---

## Handling Breaking Changes

### Types of Breaking Changes

| Change Type | Impact | Action Required |
|-------------|--------|-----------------|
| Endpoint removed | High | Remove operation or find alternative |
| Required param added | High | Add the parameter to the node |
| Parameter type changed | Medium | Update parameter definition |
| Response schema changed | Medium | May need to update documentation |
| Auth requirements changed | High | Update credentials handling |

### Responding to Breaking Changes

#### Endpoint Removed

1. Check if you've implemented this endpoint
2. If implemented:
   - Mark as deprecated in your node
   - Look for replacement endpoint
   - Update documentation

```typescript
// Add deprecation notice
{
    name: 'Get Old Endpoint (Deprecated)',
    value: 'getOldEndpoint',
    action: 'DEPRECATED - Use Get New Endpoint instead',
    // ...
},
```

#### Required Parameter Added

1. Add the parameter as required
2. Provide a sensible default if possible
3. Update the description to explain the parameter

```typescript
{
    displayName: 'New Required Param',
    name: 'newParam',
    type: 'string',
    required: true,  // Mark as required
    default: '',     // Or provide default
    description: 'This parameter is now required by the API',
    // ...
},
```

#### Parameter Type Changed

1. Update the type definition
2. Update any validation
3. Check if existing workflows might break

```typescript
// Before: string
name: 'outputsize',
type: 'string',

// After: number
name: 'outputsize',
type: 'number',
default: 30,
```

---

## Testing After Changes

### Build and Lint

```bash
# Build the project
npm run build

# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Manual Testing Checklist

After adding or modifying operations:

- [ ] Build completes without errors
- [ ] Linting passes
- [ ] New operation appears in n8n
- [ ] Required parameters are shown
- [ ] Optional parameters work correctly
- [ ] API calls return expected data
- [ ] Error messages are clear

### Testing in n8n

1. Link your local package:
   ```bash
   npm link
   cd ~/.n8n/custom
   npm link n8n-nodes-twelve-data
   ```

2. Restart n8n

3. Test the new operation:
   - Add a Twelve Data node
   - Select your new operation
   - Configure parameters
   - Execute and verify results

---

## Publishing Workflow

### Before Publishing

1. **Update version** in `package.json`
2. **Update CHANGELOG.md** with changes
3. **Run full test suite**
4. **Build production version**

```bash
# Update version (patch/minor/major)
npm version patch

# Build
npm run build

# Verify package contents
npm pack --dry-run
```

### Publishing to npm

```bash
# Login to npm (if not already)
npm login

# Publish
npm publish
```

### After Publishing

1. Create a GitHub release
2. Update any documentation
3. Notify users of breaking changes (if any)

---

## Troubleshooting

### Common Issues

#### "Permission denied" when running scripts

**Linux/Mac:**
```bash
chmod +x scripts/*.sh
```

**Windows (Git Bash):**
```bash
# Scripts should work directly in Git Bash
# If not, run with bash explicitly:
bash scripts/regenerate.sh
```

#### "curl: command not found"

**Windows:**
- Use Git Bash (includes curl)
- Or install curl via chocolatey: `choco install curl`

**Mac:**
```bash
brew install curl
```

#### "jq: command not found"

jq is optional. The scripts will fall back to Node.js for JSON processing.

To install:
```bash
# Windows (chocolatey)
choco install jq

# Mac
brew install jq

# Linux
sudo apt-get install jq
```

#### "JSON validation failed"

The downloaded OpenAPI spec might be corrupted:

1. Check your internet connection
2. Try downloading manually:
   ```bash
   curl -o test.json "https://api.twelvedata.com/doc/swagger/openapi.json"
   ```
3. Validate the JSON:
   ```bash
   node -e "JSON.parse(require('fs').readFileSync('test.json'))"
   ```

#### Build errors after regeneration

1. Check for syntax errors in `TwelveData.node.ts`
2. Ensure all imports are correct
3. Run `npm run lint` to find issues

#### Node doesn't appear in n8n

1. Rebuild: `npm run build`
2. Restart n8n
3. Check n8n logs for errors
4. Verify the node is properly linked

### Getting Help

- Check the [n8n community forum](https://community.n8n.io/)
- Review [n8n node development docs](https://docs.n8n.io/integrations/creating-nodes/)
- Open an issue on GitHub

---

## Script Reference

### regenerate.sh

```bash
./scripts/regenerate.sh [OPTIONS]

Options:
  -h, --help      Show help message
  -d, --dry-run   Preview changes without modifying files
  -f, --force     Skip confirmation prompts
  -v, --verbose   Enable verbose output
```

### check-openapi-changes.sh

```bash
./scripts/check-openapi-changes.sh [OPTIONS]

Options:
  -h, --help      Show help message
  -q, --quiet     Suppress output (exit code only)
  -v, --verbose   Show detailed output

Exit Codes:
  0 - No changes detected
  1 - Changes detected
  2 - Error occurred
```

### detect-changes.js

```bash
node scripts/detect-changes.js <old-spec> <new-spec> [OPTIONS]

Options:
  -o, --output <file>   Write report to file
  -f, --format <type>   Output format: json, text, markdown
  -h, --help            Show help message
```

### validate-implementation.js

```bash
node scripts/validate-implementation.js [OPTIONS]

Options:
  -s, --spec <file>     Path to OpenAPI spec
  -n, --node <file>     Path to node file
  -o, --output <file>   Write report to file
  -f, --format <type>   Output format: json, text, markdown
  -h, --help            Show help message
```

### manage-backups.sh

```bash
./scripts/manage-backups.sh [COMMAND] [OPTIONS]

Commands:
  list              List all backups
  restore <id>      Restore from backup
  cleanup           Remove old backups
  info <id>         Show backup details
  verify <id>       Verify backup integrity

Options:
  -h, --help        Show help message
  -f, --force       Skip confirmation prompts
  -n, --keep <num>  Backups to keep (default: 5)
  -d, --days <num>  Keep backups newer than N days (default: 30)
```

---

## Appendix: OpenAPI Spec Structure

The Twelve Data OpenAPI spec follows this structure:

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Twelve Data API",
    "version": "0.0.1"
  },
  "paths": {
    "/quote": {
      "get": {
        "operationId": "GetQuote",
        "summary": "Get quote",
        "parameters": [...],
        "responses": {...}
      }
    }
  }
}
```

### Key Fields

| Field | Description |
|-------|-------------|
| `paths` | All available endpoints |
| `paths["/endpoint"].get` | GET method details |
| `parameters` | Query/path parameters |
| `parameters[].required` | Whether param is required |
| `parameters[].schema.type` | Parameter data type |
| `parameters[].schema.enum` | Allowed values |
| `x-group` | Endpoint category |
| `deprecated` | Whether endpoint is deprecated |

---

*Last updated: December 2024*





