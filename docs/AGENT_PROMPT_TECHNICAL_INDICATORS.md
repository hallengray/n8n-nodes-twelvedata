# Agent Prompt: Technical Indicators Testing

## Project Context

You are working on the **Twelve Data n8n Node** project - a custom n8n node that provides access to 142 Twelve Data API endpoints. Your specific focus is testing **Technical Indicators operations (91 total)**.

**Project Location:** `c:\Users\halle\Downloads\twelve-data-connector`

## Your Mission

Test all **91 Technical Indicators operations** systematically, document results, and update all relevant documentation files. You are working **concurrently** with two other agents (one testing Market Intelligence, one testing other operations), so coordinate carefully.

## Technical Indicators Overview

The 91 technical indicators are organized into 8 categories:

1. **Moving Averages (9 operations)** - TI-MA-001 through TI-MA-009
2. **Momentum Indicators (17 operations)** - TI-MO-001 through TI-MO-017  
3. **Volatility Indicators (5 operations)** - TI-VO-001 through TI-VO-005
4. **Volume Indicators (4 operations)** - TI-VL-001 through TI-VL-004
5. **Trend Indicators (10 operations)** - TI-TR-001 through TI-TR-010
6. **Statistical Functions (9 operations)** - TI-ST-001 through TI-ST-009
7. **Overlap Studies (14 operations)** - TI-OV-001 through TI-OV-014
8. **Math Transform (25 operations)** - TI-MT-001 through TI-MT-025

**Current Status:** 0/91 tested (0%)

## Testing Workflow

### For Each Test:

1. **Announce the Test**
   - Present the test ID, operation name, and parameters
   - Wait for user to run the test in n8n

2. **When User Says "Passed" or Provides Result:**
   - ✅ **IMMEDIATELY** record the test in `docs/TESTING_LOG.md`
   - ✅ Update status in `docs/TESTING_PLAN.md`
   - ✅ Remove BETA label from `nodes/TwelveData/operations/technicalIndicators.ts` if test passed
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
- **ALL** technical indicator operations are currently marked as "✨ BETA - Community testing needed"
- When a test **PASSES**, you MUST:
  1. Remove the BETA label from the operation description in `nodes/TwelveData/operations/technicalIndicators.ts`
  2. Add `[BETA STATUS UPDATE REQUIRED]` note in TESTING_LOG.md entry
  3. Actually update the code file to remove the BETA text

### Documentation Files to Update

1. **`docs/TESTING_LOG.md`**
   - Add detailed test entry in section "## 10. Technical Indicators Operations"
   - Include: Test ID, parameters, expected/actual results, JSON response sample, validation checks, notes
   - Update summary table at top
   - Update Quick Reference section

2. **`docs/TESTING_PLAN.md`**
   - Update the test status in section "## 8. Technical Indicators Operations"
   - Update progress summary table
   - Update completion checklist

3. **`docs/COMPLETE_OPERATIONS_INVENTORY.md`**
   - Update status for the specific test ID

4. **`nodes/TwelveData/operations/technicalIndicators.ts`**
   - Remove BETA label when test passes

## Test ID Format

Use the format: `TI-[CATEGORY]-[NUMBER]`

Examples:
- `TI-MA-001` - DEMA (Moving Average #1)
- `TI-MO-012` - RSI (Momentum Indicator #12)
- `TI-VO-002` - BBANDS (Volatility Indicator #2)
- `TI-VL-003` - OBV (Volume Indicator #3)
- `TI-TR-009` - SAR (Trend Indicator #9)
- `TI-ST-007` - STDDEV (Statistical Function #7)
- `TI-OV-001` - AVGPRICE (Overlap Study #1)
- `TI-MT-013` - MAX (Math Transform #13)

## Test Parameters

Most technical indicators require:
- **Symbol:** `AAPL` (primary test symbol)
- **Interval:** `1day` (or appropriate interval)
- **Period:** `14` (common default, varies by indicator)
- **Additional parameters:** Varies by indicator (check OpenAPI spec or operation file)

## Priority Order

**Start with popular indicators first:**
1. TI-MO-012: RSI (Relative Strength Index)
2. TI-MO-007: MACD (Moving Average Convergence Divergence)
3. TI-MA-005: SMA (Simple Moving Average)
4. TI-MA-002: EMA (Exponential Moving Average)
5. TI-VO-002: BBANDS (Bollinger Bands)

Then proceed systematically through each category.

## Example Test Entry Format

```markdown
### Test TI-MO-012: RSI - Relative Strength Index

**Operation:** RSI - Relative Strength Index  
**Endpoint:** `/rsi`  
**Test ID:** TI-MO-012  
**Priority:** High (popular indicator)  
**Date Tested:** [DATE]

**Test Parameters:**
| Parameter | Value | Type | Required |
|-----------|-------|------|----------|
| Symbol | AAPL | string | Yes |
| Interval | 1day | string | Yes |
| Period | 14 | number | Yes |

**Expected Result:**
- HTTP Status: 200
- Response contains: RSI values array
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
- ✅ Contains RSI values
- ✅ Values are in expected range (0-100)

**Validation Checks:**
- [x] Response structure matches expected format
- [x] Contains RSI values
- [x] Values are reasonable (0-100 range)
- [x] No error messages in response

**Issues Found:**
None - Test passed successfully

**Notes:**
- [Add any relevant observations]

**Response Time:** ~200ms (estimated)

**Test Conclusion:** ✅ PASS - Endpoint working correctly. [BETA STATUS UPDATE REQUIRED]
```

## Files Reference

- **Operations File:** `nodes/TwelveData/operations/technicalIndicators.ts`
- **Test Log:** `docs/TESTING_LOG.md`
- **Test Plan:** `docs/TESTING_PLAN.md`
- **Operations Inventory:** `docs/COMPLETE_OPERATIONS_INVENTORY.md`
- **Parameters File:** `nodes/TwelveData/parameters/indicatorParams.ts` (for reference)

## Communication

- When you start a test, clearly announce: "## Test [TEST-ID]: [Operation Name]"
- When user confirms pass, immediately record and move to next
- If you need clarification, ask briefly
- Work efficiently - the goal is to test all 91 indicators

## Starting Point

Begin with: **TI-MO-012: RSI - Relative Strength Index**

Present the test details and wait for the user to run it.

---

**Remember:** Speed is important, but accuracy is critical. Update all documentation files correctly and completely for each test.
