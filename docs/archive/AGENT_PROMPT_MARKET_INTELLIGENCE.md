# Agent Prompt: Market Intelligence Testing

## Project Context

You are working on the **Twelve Data n8n Node** project - a custom n8n node that provides access to 142 Twelve Data API endpoints. Your specific focus is testing **Market Intelligence operations (8 total)**.

**Project Location:** `c:\Users\halle\Downloads\twelve-data-connector`

## Your Mission

Test all **8 Market Intelligence operations** systematically, document results, and update all relevant documentation files. You are working **concurrently** with two other agents (one testing Technical Indicators, one testing other operations), so coordinate carefully.

## Market Intelligence Operations Overview

The 8 operations are:

1. **MI-001:** Get Analyst Ratings
2. **MI-002:** Get Economic Calendar
3. **MI-003:** Get Earnings Estimate
4. **MI-004:** Get EPS Trend
5. **MI-005:** Get Growth Estimates
6. **MI-006:** Get Price Target
7. **MI-007:** Get Recommendations
8. **MI-008:** Get Revenue Estimate

**Current Status:** 0/8 tested (0%)

## Testing Workflow

### For Each Test:

1. **Announce the Test**
   - Present the test ID, operation name, and parameters
   - Wait for user to run the test in n8n

2. **When User Says "Passed" or Provides Result:**
   - ✅ **IMMEDIATELY** record the test in `docs/TESTING_LOG.md`
   - ✅ Update status in `docs/TESTING_PLAN.md`
   - ✅ Remove BETA label from `nodes/TwelveData/operations/marketIntelligence.ts` if test passed
   - ✅ Update summary counts in both files
   - ✅ **IMMEDIATELY** move to the next test

3. **If Plan Limit (403 error):**
   - Record as ⏸️ PLAN LIMIT
   - Update documentation
   - Move to next test

4. **If Failed:**
   - Record as ❌ FAIL with error details
   - Update documentation
   - Move to next test

## Critical Rules

### BETA Status Updates
- **ALL** Market Intelligence operations are currently marked as "✨ BETA - Community testing needed"
- When a test **PASSES**, you MUST:
  1. Remove the BETA label from the operation description in `nodes/TwelveData/operations/marketIntelligence.ts`
  2. Add `[BETA STATUS UPDATE REQUIRED]` note in TESTING_LOG.md entry
  3. Actually update the code file to remove the BETA text

### Documentation Files to Update

1. **`docs/TESTING_LOG.md`**
   - Add detailed test entry in section "## 8. Market Intelligence Operations"
   - Include: Test ID, parameters, expected/actual results, JSON response sample, validation checks, notes
   - Update summary table at top
   - Update Quick Reference section

2. **`docs/TESTING_PLAN.md`**
   - Update the test status in section "## 6. Market Intelligence Operations"
   - Update progress summary table
   - Update completion checklist

3. **`docs/COMPLETE_OPERATIONS_INVENTORY.md`**
   - Update status for the specific test ID

4. **`nodes/TwelveData/operations/marketIntelligence.ts`**
   - Remove BETA label when test passes

## Test ID Format

Use the format: `MI-[NUMBER]`

Examples:
- `MI-001` - Get Analyst Ratings
- `MI-002` - Get Economic Calendar
- `MI-003` - Get Earnings Estimate

## Test Parameters

Most Market Intelligence operations require:
- **Symbol:** `AAPL` (primary test symbol)
- **Additional options:** Varies by operation (exchange, country, date ranges, etc.)

**Special Cases:**
- **MI-002 (Economic Calendar):** Does NOT require symbol, uses country/date filters instead

## Priority Order

Test in numerical order (MI-001 through MI-008) unless user specifies otherwise.

## Example Test Entry Format

```markdown
### Test MI-001: Get Analyst Ratings

**Operation:** Get Analyst Ratings  
**Endpoint:** `/analyst_ratings`  
**Test ID:** MI-001  
**Priority:** High  
**Date Tested:** [DATE]

**Test Parameters:**
| Parameter | Value | Type | Required |
|-----------|-------|------|----------|
| Symbol | AAPL | string | Yes |
| Exchange | (none) | string | No |
| Country | (none) | string | No |

**Expected Result:**
- HTTP Status: 200
- Response contains: Analyst ratings and recommendations
- Response time: < 1000ms

**Actual Result:**
- Status: ✅ PASS
- HTTP Status: 200
- Data Received: Yes
- Data Valid: Yes

**Sample JSON Response:**
[PASTE USER'S RESPONSE HERE]

**Response Analysis:**
- ✅ Response structure is correct
- ✅ Contains analyst ratings data
- ✅ [Add specific observations]

**Validation Checks:**
- [x] Response structure matches expected format
- [x] Contains expected data fields
- [x] No error messages in response

**Issues Found:**
None - Test passed successfully

**Notes:**
- [Add any relevant observations]

**Response Time:** ~200ms (estimated)

**Test Conclusion:** ✅ PASS - Endpoint working correctly. [BETA STATUS UPDATE REQUIRED]
```

## Files Reference

- **Operations File:** `nodes/TwelveData/operations/marketIntelligence.ts`
- **Test Log:** `docs/TESTING_LOG.md`
- **Test Plan:** `docs/TESTING_PLAN.md`
- **Operations Inventory:** `docs/COMPLETE_OPERATIONS_INVENTORY.md`
- **Parameters File:** `nodes/TwelveData/parameters/` (check for market intelligence params)

## Communication

- When you start a test, clearly announce: "## Test [TEST-ID]: [Operation Name]"
- When user confirms pass, immediately record and move to next
- If you need clarification, ask briefly
- Work efficiently - the goal is to test all 8 operations

## Starting Point

Begin with: **MI-001: Get Analyst Ratings**

Present the test details and wait for the user to run it.

---

**Remember:** Speed is important, but accuracy is critical. Update all documentation files correctly and completely for each test.


