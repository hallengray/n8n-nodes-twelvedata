# Next Tests Guide - Twelve Data n8n Node

**Current Status:** 30/33 tests completed (91%)  
**Remaining:** 3 tests (0 executable + 3 plan-limited already documented)  
**🎉 ALL EXECUTABLE TESTS COMPLETE! 🎉**

---

## Testing Order (Priority Sequence)

### Phase 1: Reference Data Operations (3 tests remaining)
**Estimated Time:** 1-2 hours

#### Test RD-003: List ETFs
**Operation:** List ETFs  
**Endpoint:** `/etf`  
**n8n Node:** Reference Data → List ETFs  
**Parameters:** None required  
**Expected:** Array of ETF symbols with metadata

**Quick Test:**
1. Open n8n workflow
2. Add Twelve Data node
3. Select "Reference Data" → "List ETFs"
4. Execute (no parameters needed)
5. Capture JSON response and screenshot

---

#### Test RD-004: List Exchanges
**Operation:** List Exchanges  
**Endpoint:** `/exchanges`  
**n8n Node:** Reference Data → List Exchanges  
**Parameters:** None required  
**Expected:** Array of exchange information

**Quick Test:**
1. Select "Reference Data" → "List Exchanges"
2. Execute
3. Capture response

---

#### Test RD-005: List Forex Pairs
**Operation:** List Forex Pairs  
**Endpoint:** `/forex_pairs`  
**n8n Node:** Reference Data → List Forex Pairs  
**Parameters:** None required  
**Expected:** Array of forex pairs

**Quick Test:**
1. Select "Reference Data" → "List Forex Pairs"
2. Execute
3. Capture response

---

#### Test RD-006: List Indices
**Operation:** List Indices  
**Endpoint:** `/indices`  
**n8n Node:** Reference Data → List Indices  
**Parameters:** None required  
**Expected:** Array of market indices

**Quick Test:**
1. Select "Reference Data" → "List Indices"
2. Execute
3. Capture response

---

#### Test RD-007: List Stocks
**Operation:** List Stocks  
**Endpoint:** `/stocks`  
**n8n Node:** Reference Data → List Stocks  
**Parameters:** None required (optional: country filter)  
**Expected:** Large array of stock symbols

**Quick Test:**
1. Select "Reference Data" → "List Stocks"
2. Execute
3. Capture response (will be large - truncate appropriately)

---

#### Test RD-008: Search Symbol
**Operation:** Search Symbol  
**Endpoint:** `/symbol_search`  
**n8n Node:** Reference Data → Search Symbol  
**Parameters:** 
- Search Query: "Apple" (required)
- Optional: outputsize, exchange, type, country

**Expected:** Array of matching symbols (should include AAPL)

**Quick Test:**
1. Select "Reference Data" → "Search Symbol"
2. Set Search Query: "Apple"
3. Execute
4. Verify AAPL appears in results
5. Capture response

---

### Phase 2: Error Handling Tests (5 tests)
**Estimated Time:** 1 hour

#### Test ER-001: Invalid Symbol
**Operation:** Get Quote  
**Parameters:** Symbol: "INVALID123XYZ"  
**Expected:** HTTP 400 or 404 with error message

**Quick Test:**
1. Select "Core Data" → "Get Quote"
2. Set Symbol: "INVALID123XYZ"
3. Execute
4. Verify error response is returned
5. Check error message is clear

---

#### Test ER-002: Missing Required Parameter
**Operation:** Get Quote  
**Parameters:** Symbol: (empty/blank)  
**Expected:** n8n validation error OR API 400 error

**Quick Test:**
1. Select "Core Data" → "Get Quote"
2. Leave Symbol field empty
3. Try to execute
4. Note if n8n prevents execution or if API returns error

---

#### Test ER-003: Invalid Date Format
**Operation:** Get End of Day Price  
**Parameters:** 
- Symbol: "AAPL"
- Date: "2024-13-45" (invalid date)

**Expected:** HTTP 400 with date format error

**Quick Test:**
1. Select "Core Data" → "Get End of Day Price"
2. Set Symbol: "AAPL"
3. Set Date: "2024-13-45"
4. Execute
5. Verify error response

---

#### Test ER-004: Invalid Interval
**Operation:** Get Time Series  
**Parameters:**
- Symbol: "AAPL"
- Interval: (try to set invalid value - may need to test via API directly if n8n dropdown prevents)

**Expected:** HTTP 400 with interval error

**Note:** This may be difficult to test in n8n if dropdown prevents invalid values. May need to test via curl or document that n8n prevents this error.

---

#### Test ER-005: Invalid Credential
**Operation:** Get Quote  
**Parameters:**
- Symbol: "AAPL"
- API Key: "invalid_key_12345"

**Expected:** HTTP 401 Unauthorized

**Quick Test:**
1. Temporarily change API key in credentials to invalid value
2. Select "Core Data" → "Get Quote"
3. Set Symbol: "AAPL"
4. Execute
5. Verify 401 error
6. **IMPORTANT:** Restore correct API key after test!

---

### Phase 3: Parameter Variations (10 tests)
**Estimated Time:** 2 hours

#### Test PV-001: Get Quote - Stock
**Already tested in CD-005** - Can mark as duplicate or test with different stock (MSFT)

---

#### Test PV-002: Get Quote - Forex
**Operation:** Get Quote  
**Parameters:** Symbol: "EUR/USD"  
**Expected:** Forex quote data

**Quick Test:**
1. Select "Core Data" → "Get Quote"
2. Set Symbol: "EUR/USD"
3. Execute
4. Verify forex-specific fields

---

#### Test PV-003: Get Quote - Crypto
**Operation:** Get Quote  
**Parameters:** Symbol: "BTC/USD"  
**Expected:** Crypto quote data

**Quick Test:**
1. Select "Core Data" → "Get Quote"
2. Set Symbol: "BTC/USD"
3. Execute
4. Verify crypto-specific fields

---

#### Test PV-004: Time Series - 1min
**Operation:** Get Time Series  
**Parameters:**
- Symbol: "AAPL"
- Interval: "1min"
- Output Size: 10

**Expected:** Minute-level OHLCV data  
**Note:** May require paid plan - document if 403 error

---

#### Test PV-005: Time Series - 1hour
**Operation:** Get Time Series  
**Parameters:**
- Symbol: "MSFT"
- Interval: "1h"
- Output Size: 10

**Expected:** Hourly OHLCV data

---

#### Test PV-006: Time Series - 1day
**Already tested in CD-006** - Can mark as duplicate

---

#### Test PV-007: Time Series - Date Range
**Operation:** Get Time Series  
**Parameters:**
- Symbol: "TSLA"
- Interval: "1day"
- Start Date: "2024-01-01"
- End Date: "2024-01-31"
- Output Size: (leave default or set to 50)

**Expected:** Data only within Jan 1-31, 2024

---

#### Test PV-008: Quote with Exchange Filter
**Operation:** Get Quote  
**Parameters:**
- Symbol: "AAPL"
- Exchange: "NASDAQ"

**Expected:** Quote from NASDAQ exchange

---

#### Test PV-009: Stocks with Country Filter
**Operation:** List Stocks  
**Parameters:**
- Country: "United States"

**Expected:** Only US stocks in results

---

#### Test PV-010: Symbol Search with Size
**Operation:** Search Symbol  
**Parameters:**
- Search Query: "tech"
- Output Size: 5

**Expected:** Maximum 5 results

---

## Testing Workflow for Each Test

1. **Open n8n workflow**
2. **Add/Configure Twelve Data node**
   - Select appropriate operation
   - Set required parameters
   - Set optional parameters (if testing variations)
3. **Execute node**
4. **Capture evidence:**
   - Copy JSON response (full response)
   - Take screenshot showing:
     - Node configuration
     - Execution result
     - Response preview
5. **Record metrics:**
   - Response time (if measurable)
   - HTTP status code
   - Data received: Yes/No
6. **Document in TESTING_LOG.md:**
   - Update test section with results
   - Add JSON response (truncate if >50 items)
   - Fill validation checks
   - Add notes and observations
7. **Update summary table** in TESTING_LOG.md
8. **Save screenshot** as `screenshots/test-[TEST-ID]-[operation-name].png`

---

## Quick Reference: Test Status Updates

After each test, update these locations in TESTING_LOG.md:

1. **Summary Table** (line ~14-21)
2. **Quick Reference Table** (line ~46-78)
3. **Test Section** (detailed documentation)
4. **Test Execution Log** (line ~2132)
5. **Completion Status** (bottom of file)

---

## Notes

- **Large Responses:** If response has >50 items, truncate showing first 10, marker, last 10
- **Plan Limits:** If you get 403 error, mark as ⏸️ PLAN LIMIT (not failure)
- **Screenshots:** Take for every test - helps with debugging later
- **JSON Responses:** Always include full response (or truncated properly)
- **Response Times:** Note if measurable (n8n may not show this)

---

**Last Updated:** December 3, 2025  
**Status:** ✅ **ALL EXECUTABLE TESTS COMPLETE!**  
**Remaining:** Only 3 plan-limited tests (FD-002, FD-003, FD-004) already documented



