# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-12-16

### Initial Release

This is the first production-ready release of the Twelve Data n8n community node.

#### Features

**142 Operations Across 6 Categories:**

- **Core Data (9 operations)**: Real-time quotes, historical time series, exchange rates, currency conversion, end-of-day prices, earliest timestamps, market movers
- **Fundamentals (16 operations)**: Company profiles, balance sheets, income statements, cash flow, earnings, dividends, statistics, fund holders, insider transactions, institutional holders, key executives, earnings calendar, IPO calendar, stock splits, options chain, options expiration
- **Reference Data (15 operations)**: List stocks, forex pairs, cryptocurrencies, ETFs, indices, exchanges, bonds, commodities, funds, cryptocurrency exchanges, symbol search, market state, cross listings, exchange schedules, instrument types
- **Technical Indicators (91 operations)**: Moving averages (SMA, EMA, WMA, DEMA, TEMA, TRIMA, KAMA, MAMA, T3), momentum indicators (RSI, MACD, STOCH, ADX, CCI, MFI, ROC, WILLR, MOM, PPO, APO, CMO, DX, TRIX, ULTOSC, STOCHRSI), volatility indicators (BBANDS, ATR, NATR, TRANGE, SUPERTREND), volume indicators (OBV, AD, ADOSC, VWAP), trend indicators (AROON, AROONOSC, BOP, SAR, PLUS_DI, MINUS_DI, PLUS_DM, MINUS_DM, ADXR, HT_TRENDMODE), statistical functions (STDDEV, VAR, LINEARREG, LINEARREG_SLOPE, LINEARREG_INTERCEPT, LINEARREG_ANGLE, TSF, CORREL, BETA), overlap studies (MIDPOINT, MIDPRICE, HT_TRENDLINE, HT_SINE, HT_DCPERIOD, HT_DCPHASE, HT_PHASOR, ICHIMOKU, PIVOT_POINTS_HL, PERCENT_B, AVGPRICE, MEDPRICE, TYPPRICE, WCLPRICE), math transforms (CEIL, FLOOR, ROUND, EXP, SQRT, LN, LOG10, SIN, COS, TAN, ASIN, ACOS, ATAN, SINH, COSH, TANH, ADD, SUB, MULT, DIV, MAX, MIN, SUM, MINMAX, MINMAXINDEX)
- **Market Intelligence (8 operations)**: Analyst ratings, price targets, recommendations, earnings estimates, revenue estimates, EPS trends, growth estimates, economic calendar
- **Advanced (3 operations)**: API usage tracking, batch requests, company logos

#### Testing Status

**Production-Ready with Thorough Testing:**

All operations that can be tested with the free Twelve Data API tier have been thoroughly tested and verified working. This represents comprehensive coverage of the core functionality.

**What's Been Tested:**
- Core Data: 8/9 operations (1 planned endpoint not yet available in REST API)
- Fundamentals: 10/16 operations (6 require paid API tier for testing)
- Reference Data: 15/15 operations (100% coverage)
- Market Intelligence: 7/8 operations
- Advanced: 3/3 operations (100% coverage)
- Technical Indicators: 91 operations (marked BETA - functional, pending comprehensive testing with paid tier)

**Testing Highlights:**
- 100% success rate on all testable free-tier endpoints
- Comprehensive error handling validated (400, 401, 404, 422 status codes)
- Parameter variations tested across stocks, forex, and crypto
- Date range filtering confirmed working
- Country and exchange filters validated
- Output size limiting verified
- Integration testing completed with other n8n nodes
- UI/UX validation passed

#### API Tier Requirements

**Free Tier (Fully Tested):**
- Core data operations (quotes, time series, exchange rates)
- Reference data (lists of stocks, forex, crypto, ETFs, indices, exchanges)
- Company profiles
- Market intelligence data
- API usage tracking
- Batch requests

**Paid Tier Required (grow/pro/ultra/enterprise):**
- Advanced fundamental data (earnings, dividends, statistics)
- Earnings and IPO calendars
- Some historical data ranges
- Real-time data (free tier has 15-minute delay)
- Higher rate limits (free tier: 800/day, 8/minute)

**Planned Endpoints (Not Yet Available in REST API):**
- Options Chain
- Options Expiration  
- Complex Data (multi-symbol, multi-endpoint requests)

These endpoints are defined in the Twelve Data Google Sheets Add-on but not yet available in the REST API. The operations remain in the node for future compatibility.

#### Technical Details

- **Zero runtime dependencies** - Compliant with n8n verification guidelines
- **TypeScript strict mode** - Full type safety throughout
- **Declarative routing** - Easy to maintain and extend
- **Dual authentication** - Header (recommended) and query parameter methods
- **Comprehensive documentation** - 25+ documentation files including regeneration system guide
- **Example workflows** - 5 ready-to-use examples
- **Automated monitoring** - GitHub Action checks for API updates weekly
- **Backup system** - Automatic backups during regeneration
- **Change detection** - Detailed reports of API changes

#### Documentation

**Client-Facing:**
- README.md - Main project documentation
- CLIENT_HANDOVER.md - Complete handover guide
- CLIENT_REGENERATION_GUIDE.md - Regeneration system guide for video walkthrough
- CREDENTIALS_SETUP.md - Step-by-step credential setup
- TESTING_LOG.md - Complete testing results
- INTEGRATION_TESTING.md - Integration test procedures
- OPENAPI_ANALYSIS.md - API endpoint reference
- 5 example workflows with instructions

**Technical:**
- REGENERATION_GUIDE.md - Technical regeneration guide
- ADDING_ENDPOINTS_QUICK_GUIDE.md - How to add new endpoints
- ADR-001-LEGACY-PEER-DEPS.md - Architecture decision records
- N8N_VERIFICATION_COMPLIANCE.md - n8n compliance documentation

#### Known Limitations

**Free Tier Restrictions:**
- **API Calls:** 800 per day, 8 per minute
- **Historical Data:** Limited range
- **Fundamentals:** Profile only (advanced metrics require paid plan)
- **Real-time Data:** 15-minute delay
- **Rate Limiting:** May need delays between requests in loops

**Endpoint Limitations:**

Based on testing, these endpoints require a paid Twelve Data plan:
- Get Dividends (FD-002) - Returns 403 on free tier
- Get Earnings (FD-003) - Returns 403 on free tier
- Get Statistics (FD-004) - Returns 403 on free tier
- Earnings Calendar (FD-007) - Returns 403 on free tier
- IPO Calendar (FD-012) - Returns 403 on free tier

**Planned Endpoints (Not Yet in REST API):**
- Get Options Chain (FD-014) - Returns 404 "options unavailable"
- Get Options Expiration (FD-015) - Returns 404 "options unavailable"
- Get Complex Data (CD-007) - Returns 404 "resource not found"

**Workarounds:**
- For options data: Use Twelve Data Google Sheets Add-on
- For complex data: Make separate API calls using n8n loops
- For paid-tier endpoints: Upgrade Twelve Data subscription

**Interval Limitations:**
- 1-minute interval may return 5-minute data on free tier
- Hourly and daily intervals work correctly on free tier

#### Breaking Changes

None (initial release)

#### Migration Guide

Not applicable (initial release)

---

## Future Releases

### Planned for 0.2.0
- Comprehensive testing of technical indicators with paid tier
- Additional example workflows (trading bots, portfolio tracking)
- Video tutorials for common use cases
- Enhanced error messages with troubleshooting tips
- Performance optimizations for batch operations
- Caching layer for rate limit optimization

### Under Consideration
- Webhook support for real-time data streaming
- Additional output format options (CSV, Excel)
- Advanced filtering and data transformation options
- Integration with other financial data providers
- Custom indicator builder
- Backtesting capabilities

---

## Support and Maintenance

**30-Day Support Period:**
- Bug fixes for critical issues
- Documentation clarifications
- Installation support
- Basic customization guidance

**Community Support:**
- GitHub Issues for bug reports and feature requests
- n8n Community Forum for usage questions
- Twelve Data Support for API-related questions

**Contact:**
- Developer: hallengray@gmail.com
- Repository: https://github.com/hallengray/n8n-nodes-twelvedata
- npm Package: https://www.npmjs.com/package/n8n-nodes-twelve-data

---

*For detailed testing results, see [docs/TESTING_LOG.md](docs/TESTING_LOG.md)*  
*For complete operations list, see [docs/COMPLETE_OPERATIONS_INVENTORY.md](docs/COMPLETE_OPERATIONS_INVENTORY.md)*  
*For regeneration system guide, see [CLIENT_REGENERATION_GUIDE.md](CLIENT_REGENERATION_GUIDE.md)*
