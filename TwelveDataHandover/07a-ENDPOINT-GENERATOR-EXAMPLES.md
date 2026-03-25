# Endpoint Template Generator - Example Output

This document shows example output from the `generate-endpoint-template.js` script.

## Example Scenario

After running `./scripts/regenerate.sh`, the change detection found 3 new endpoints in the Twelve Data API.

## Command

```bash
node scripts/generate-endpoint-template.js
```

## Example Output

```
═══════════════════════════════════════════════════════════════
 Twelve Data n8n Connector - Endpoint Template Generator
═══════════════════════════════════════════════════════════════

📄 Reading change report: change-report-2024-12-18-10-30-45.json

🆕 Found 3 new endpoint(s)

───────────────────────────────────────────────────────────────

1. GET /macd_slope
   Category: technicalIndicators
   Operation: getMacdSlope

   📋 Copy this code to nodes/TwelveData/operations/technicalIndicators.ts:

{
  name: 'MACD Slope',
  value: 'getMacdSlope',
  action: 'Calculate MACD Slope',
  description: 'Moving Average Convergence Divergence Slope indicator',
  routing: {
    request: {
      method: 'GET',
      url: '/macd_slope',
    },
  },
}

   📝 Parameters to add:
   Required: symbol, interval
   Optional: series_type, fast_period, slow_period, signal_period, outputsize

───────────────────────────────────────────────────────────────

2. GET /direct_holders
   Category: fundamentals
   Operation: getDirectHolders

   📋 Copy this code to nodes/TwelveData/operations/fundamentals.ts:

{
  name: 'Get Direct Holders',
  value: 'getDirectHolders',
  action: 'Get direct shareholders',
  description: 'Get list of direct shareholders for a stock',
  routing: {
    request: {
      method: 'GET',
      url: '/direct_holders',
    },
  },
}

   📝 Parameters to add:
   Required: symbol
   Optional: exchange, country

───────────────────────────────────────────────────────────────

3. GET /market_cap/all
   Category: fundamentals
   Operation: getMarketCapAll

   📋 Copy this code to nodes/TwelveData/operations/fundamentals.ts:

{
  name: 'Get Market Cap All',
  value: 'getMarketCapAll',
  action: 'Get market cap for all stocks',
  description: 'Get market capitalization data for all available stocks',
  routing: {
    request: {
      method: 'GET',
      url: '/market_cap/all',
    },
  },
}

   📝 Parameters to add:
   Optional: exchange, country, outputsize

───────────────────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════
 Next Steps
═══════════════════════════════════════════════════════════════

1. Copy the operation code above to the suggested category file
2. Add parameters from the OpenAPI spec (see docs/ADDING_ENDPOINTS_QUICK_GUIDE.md)
3. Update displayOptions to show/hide the operation appropriately
4. Test the endpoint in n8n with your API key
5. Run: npm run build && npm run lint
6. Commit your changes

📚 Documentation:
   - docs/ADDING_ENDPOINTS_QUICK_GUIDE.md - Step-by-step guide
   - CLIENT_REGENERATION_GUIDE.md - Complete workflow
```

---

## What the Script Does

### ✅ Automated (70-80% of work):
- Reads the latest change report
- Generates operation name, value, and action
- Suggests the correct category file
- Creates properly formatted code
- Lists required and optional parameters
- Provides next steps

### ⚠️ Still Needs Human Input (20-30%):
- Adding parameter definitions (from OpenAPI spec)
- Setting up displayOptions (when to show/hide)
- Testing the endpoint
- Handling edge cases

---

## Time Savings

**Without Script:**
- 15-20 minutes per endpoint (writing code, looking up details, formatting)

**With Script:**
- 5-10 minutes per endpoint (copy/paste, add parameters, test)

**Savings: ~50% reduction in implementation time**

---

## Integration with Workflow

```bash
# 1. Check for changes
./scripts/check-openapi-changes.sh

# 2. Run regeneration (creates change report)
./scripts/regenerate.sh

# 3. Generate code templates for new endpoints
node scripts/generate-endpoint-template.js

# 4. Copy/paste code and add parameters
# (Edit operation files)

# 5. Build and test
npm run build && npm run lint

# 6. Commit
git add .
git commit -m "feat: add new endpoints from API update"
```
