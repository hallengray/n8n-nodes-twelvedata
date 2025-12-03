# Testing Quick Reference Guide

**For:** Reference Data Operations (RD-002 through RD-008)  
**Date:** December 3, 2025

---

## Quick Test Checklist

### Test RD-002: List Cryptocurrencies
**n8n Configuration:**
- Resource: `Reference Data`
- Operation: `List Cryptocurrencies`
- Parameters: None (no additional fields needed)

**What to Check:**
- [ ] Response is an array
- [ ] Contains crypto pairs (BTC/USD, ETH/USD, etc.)
- [ ] Each item has `symbol`, `currency_base`, `currency_quote`
- [ ] Look for `available_exchanges` field
- [ ] Count should be 100+ pairs

**Screenshot:** `screenshots/test-rd-002-list-crypto.png`

---

### Test RD-003: List ETFs
**n8n Configuration:**
- Resource: `Reference Data`
- Operation: `List ETFs`
- Parameters: None

**What to Check:**
- [ ] Response is an array
- [ ] Contains popular ETFs (SPY, QQQ, VTI, etc.)
- [ ] Each item has `symbol`, `name`, `exchange`
- [ ] Count should be 100+ ETFs

**Screenshot:** `screenshots/test-rd-003-list-etfs.png`

---

### Test RD-004: List Exchanges
**n8n Configuration:**
- Resource: `Reference Data`
- Operation: `List Exchanges`
- Parameters: None

**What to Check:**
- [ ] Response is an array
- [ ] Contains major exchanges (NYSE, NASDAQ, LSE, etc.)
- [ ] Each item has `name`, `code`, `country`
- [ ] Count should be 50+ exchanges

**Screenshot:** `screenshots/test-rd-004-list-exchanges.png`

---

### Test RD-005: List Forex Pairs
**n8n Configuration:**
- Resource: `Reference Data`
- Operation: `List Forex Pairs`
- Parameters: None

**What to Check:**
- [ ] Response is an array
- [ ] Contains major pairs (EUR/USD, GBP/USD, USD/JPY, etc.)
- [ ] Each item has `symbol`, `currency_base`, `currency_quote`
- [ ] Count should be 100+ pairs

**Screenshot:** `screenshots/test-rd-005-list-forex.png`

---

### Test RD-006: List Indices
**n8n Configuration:**
- Resource: `Reference Data`
- Operation: `List Indices`
- Parameters: None

**What to Check:**
- [ ] Response is an array
- [ ] Contains major indices (S&P 500, NASDAQ, DJIA, etc.)
- [ ] Each item has `symbol`, `name`, `country`
- [ ] Count should be 50+ indices

**Screenshot:** `screenshots/test-rd-006-list-indices.png`

---

### Test RD-007: List Stocks
**n8n Configuration:**
- Resource: `Reference Data`
- Operation: `List Stocks`
- Parameters: None

**What to Check:**
- [ ] Response is an array (may be very large)
- [ ] Contains major stocks (AAPL, MSFT, GOOGL, etc.)
- [ ] Each item has `symbol`, `name`, `currency`, `exchange`
- [ ] Count should be 1000+ stocks
- [ ] **Note:** This may be a large response - check if truncation is needed

**Screenshot:** `screenshots/test-rd-007-list-stocks.png`

---

### Test RD-008: Search Symbol
**n8n Configuration:**
- Resource: `Reference Data`
- Operation: `Search Symbol`
- Parameters:
  - Search Query: `Apple`

**What to Check:**
- [ ] Response is an array
- [ ] Results include AAPL (Apple Inc.)
- [ ] Each result has `symbol`, `instrument_name`, `exchange`
- [ ] Results are relevant to "Apple" query
- [ ] Multiple results may be returned (not just AAPL)

**Screenshot:** `screenshots/test-rd-008-search-symbol.png`

---

## Testing Workflow for Each Test

1. **Open n8n** and create a new workflow
2. **Add Twelve Data node**
3. **Configure:**
   - Select Resource: `Reference Data`
   - Select Operation: [Operation name from above]
   - Fill in any required parameters
4. **Execute** the node
5. **Copy JSON response** from the output
6. **Take screenshot** showing:
   - Node configuration panel
   - Execution result (success/failure)
   - JSON output preview
7. **Save screenshot** with the filename specified above
8. **Document results** in `TESTING_LOG.md`
9. **Update status** in `TESTING_PLAN.md`

---

## Response Truncation Guidelines

If a response has **50 or more items**, truncate it in the documentation:

**Format:**
```json
[
  { "symbol": "BTC/USD", ... },
  { "symbol": "ETH/USD", ... },
  // ... first 10 items ...
  // [... X additional records omitted (showing 20 of Y total) ...]
  // ... last 10 items ...
  { "symbol": "DOGE/USD", ... }
]
```

**Rules:**
- Show first 10 items
- Add truncation marker with count
- Show last 10 items
- Always include total count in marker

---

## Common Issues to Watch For

1. **Empty Response:** If response is empty array `[]`, document it but note it may be expected
2. **Large Responses:** List Stocks (RD-007) may return thousands of items - truncate appropriately
3. **Response Structure:** Some endpoints may wrap data in a `data` object - document the actual structure
4. **Rate Limits:** If you hit rate limits, note the time and wait before continuing
5. **API Errors:** If you get 403/401 errors, document them (may be plan limitations)

---

## After Testing Each Operation

1. ✅ Update `TESTING_LOG.md` with full test results
2. ✅ Update `TESTING_PLAN.md` status column
3. ✅ Save screenshot to `docs/screenshots/`
4. ✅ Check validation checklist items
5. ✅ Note any issues or observations

---

**Good luck with testing!** 🚀



