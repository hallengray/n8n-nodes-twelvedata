# Complete Operations Inventory - Twelve Data n8n Node

**Project:** n8n-nodes-twelve-data  
**Version:** 0.1.0  
**Created:** December 15, 2025  
**Last Updated:** December 15, 2025  
**Total Operations:** 142

---

## Overview

This document provides a complete inventory of all 142 operations available in the Twelve Data n8n node, organized by resource category. Each operation is assigned a unique test ID for tracking in the testing plan and log.

---

## Operation Counts by Category

| Category | Count | Tested | Plan Limits | Planned | Not Tested |
|----------|-------|--------|-------------|---------|------------|
| **Core Data** | 9 | 8 | 0 | 1 | 0 |
| **Fundamentals** | 16 | 9 | 6 | 2 | 0 |
| **Reference Data** | 15 | 1 | 0 | 0 | 14 |
| **Market Intelligence** | 8 | 4 | 0 | 0 | 4 |
| **Advanced** | 3 | 0 | 0 | 0 | 3 |
| **Technical Indicators** | 91 | 0 | 0 | 0 | 91 |
| **TOTAL** | **142** | **37** | **0** | **3** | **102** |

---

## 1. Core Data Operations (9 operations)

| Test ID | Operation Name | Value | Endpoint | Status | Test Date |
|---------|----------------|-------|----------|--------|-----------|
| CD-001 | Convert Currency | `currencyConversion` | `/currency_conversion` | ✅ | 2025-12-03 |
| CD-002 | Get End of Day Price | `getEod` | `/eod` | ✅ | 2025-12-03 |
| CD-003 | Get Exchange Rate | `getExchangeRate` | `/exchange_rate` | ✅ | 2025-12-03 |
| CD-004 | Get Price | `getPrice` | `/price` | ✅ | 2025-12-03 |
| CD-005 | Get Quote | `getQuote` | `/quote` | ✅ | 2025-12-03 |
| CD-006 | Get Time Series | `getTimeSeries` | `/time_series` | ✅ | 2025-12-03 |
| CD-007 | Get Complex Data | `getComplexData` | `/complex_data` | 🚧 | - |
| CD-008 | Get Earliest Timestamp | `getEarliestTimestamp` | `/earliest_timestamp` | ✅ | 2025-12-15 |
| CD-009 | Get Market Movers | `getMarketMovers` | `/market_movers/stocks` | ✅ | 2025-12-15 |

**Status:** 8/9 tested (100% of testable), 1 planned endpoint, 0 pending

---

## 2. Fundamentals Operations (16 operations)

| Test ID | Operation Name | Value | Endpoint | Status | Test Date |
|---------|----------------|-------|----------|--------|-----------|
| FD-001 | Get Profile | `getProfile` | `/profile` | ✅ | 2025-12-03 |
| FD-002 | Get Dividends | `getDividends` | `/dividends` | ⏸️ | 2025-12-03 |
| FD-003 | Get Earnings | `getEarnings` | `/earnings` | ⏸️ | 2025-12-03 |
| FD-004 | Get Statistics | `getStatistics` | `/statistics` | ⏸️ | 2025-12-03 |
| FD-005 | Get Balance Sheet | `getBalanceSheet` | `/balance_sheet` | ✅ | 2025-12-15 |
| FD-006 | Get Cash Flow | `getCashFlow` | `/cash_flow` | ✅ | 2025-12-15 |
| FD-007 | Get Earnings Calendar | `getEarningsCalendar` | `/earnings_calendar` | ⏸️ | 2025-12-15 |
| FD-008 | Get Fund Holders | `getFundHolders` | `/fund_holders` | ✅ | 2025-12-15 |
| FD-009 | Get Income Statement | `getIncomeStatement` | `/income_statement` | ✅ | 2025-12-15 |
| FD-010 | Get Insider Transactions | `getInsiderTransactions` | `/insider_transactions` | ✅ | 2025-12-15 |
| FD-011 | Get Institutional Holders | `getInstitutionalHolders` | `/institutional_holders` | ✅ | 2025-12-15 |
| FD-012 | Get IPO Calendar | `getIpoCalendar` | `/ipo_calendar` | ⏸️ | 2025-12-15 |
| FD-013 | Get Key Executives | `getKeyExecutives` | `/key_executives` | ✅ | 2025-12-15 |
| FD-014 | Get Options Chain | `getOptionsChain` | `/options/chain` | 🚧 | - |
| FD-015 | Get Options Expiration | `getOptionsExpiration` | `/options/expiration` | 🚧 | - |
| FD-016 | Get Stock Splits | `getStockSplits` | `/splits` | ✅ | 2025-12-15 |

**Status:** 14/14 testable tested (100%), 2 planned endpoints, 0 pending

---

## 3. Reference Data Operations (15 operations)

| Test ID | Operation Name | Value | Endpoint | Status | Test Date |
|---------|----------------|-------|----------|--------|-----------|
| RD-001 | Get Market State | `getMarketState` | `/market_state` | ✅ | 2025-12-03 |
| RD-002 | List Cryptocurrencies | `listCryptocurrencies` | `/cryptocurrencies` | ⏳ | - |
| RD-003 | List ETFs | `listEtfs` | `/etf` | ⏳ | - |
| RD-004 | List Exchanges | `listExchanges` | `/exchanges` | ⏳ | - |
| RD-005 | List Forex Pairs | `listForexPairs` | `/forex_pairs` | ⏳ | - |
| RD-006 | List Indices | `listIndices` | `/indices` | ⏳ | - |
| RD-007 | List Stocks | `listStocks` | `/stocks` | ⏳ | - |
| RD-008 | Search Symbol | `symbolSearch` | `/symbol_search` | ⏳ | - |
| RD-009 | Get Cross Listings | `getCrossListings` | `/cross_listings` | ⏳ | - |
| RD-010 | Get Exchanges Schedule | `getExchangesSchedule` | `/exchanges_schedule` | ⏳ | - |
| RD-011 | Get Instrument Type | `getInstrumentType` | `/instrument_type` | ⏳ | - |
| RD-012 | List Bonds | `listBonds` | `/bonds` | ⏳ | - |
| RD-013 | List Commodities | `listCommodities` | `/commodities` | ⏳ | - |
| RD-014 | List Cryptocurrency Exchanges | `listCryptoExchanges` | `/cryptocurrency_exchanges` | ⏳ | - |
| RD-015 | List Funds | `listFunds` | `/funds` | ⏳ | - |

**Status:** 1/15 tested (7%), 14 pending

---

## 4. Market Intelligence Operations (8 operations)

| Test ID | Operation Name | Value | Endpoint | Status | Test Date |
|---------|----------------|-------|----------|--------|-----------|
| MI-001 | Get Analyst Ratings | `getAnalystRatings` | `/analyst_ratings` | ✅ | 2025-12-15 |
| MI-003 | Get Earnings Estimate | `getEarningsEstimate` | `/earnings_estimate` | ✅ | 2025-12-15 |
| MI-004 | Get EPS Trend | `getEpsTrend` | `/eps_trend` | ✅ | 2025-12-15 |
| MI-005 | Get Growth Estimates | `getGrowthEstimates` | `/growth_estimates` | ✅ | 2025-12-15 |
| MI-006 | Get Price Target | `getPriceTarget` | `/price_target` | ✅ | 2025-12-15 |
| MI-007 | Get Recommendations | `getRecommendations` | `/recommendations` | ✅ | 2025-12-15 |
| MI-008 | Get Revenue Estimate | `getRevenueEstimate` | `/revenue_estimate` | ✅ | 2025-12-15 |

**Status:** 7/7 tested (100%), 0 pending ✅

**Note:** MI-002 (Get Economic Calendar) was removed from the codebase as the endpoint does not exist in Twelve Data API.

---

## 5. Advanced Operations (3 operations)

| Test ID | Operation Name | Value | Endpoint | Status | Test Date |
|---------|----------------|-------|----------|--------|-----------|
| AD-001 | API Usage | `getApiUsage` | `/api_usage` | ⏳ | - |
| AD-002 | Batch Request | `batchRequest` | `/batch` | ⏳ | - |
| AD-003 | Get Logo | `getLogo` | `/logo` | ⏳ | - |

**Status:** 0/3 tested (0%), 3 pending

---

## 6. Technical Indicators Operations (91 operations)

### 6.1 Moving Averages (9 operations)

| Test ID | Operation Name | Value | Endpoint | Status |
|---------|----------------|-------|----------|--------|
| TI-MA-001 | DEMA - Double Exponential Moving Average | `dema` | `/dema` | ⏳ |
| TI-MA-002 | EMA - Exponential Moving Average | `ema` | `/ema` | ⏳ |
| TI-MA-003 | KAMA - Kaufman Adaptive Moving Average | `kama` | `/kama` | ⏳ |
| TI-MA-004 | MAMA - MESA Adaptive Moving Average | `mama` | `/mama` | ⏳ |
| TI-MA-005 | SMA - Simple Moving Average | `sma` | `/sma` | ⏳ |
| TI-MA-006 | T3 - Triple Exponential Moving Average | `t3` | `/t3` | ⏳ |
| TI-MA-007 | TEMA - Triple Exponential Moving Average | `tema` | `/tema` | ⏳ |
| TI-MA-008 | TRIMA - Triangular Moving Average | `trima` | `/trima` | ⏳ |
| TI-MA-009 | WMA - Weighted Moving Average | `wma` | `/wma` | ⏳ |

### 6.2 Momentum Indicators (16 operations)

| Test ID | Operation Name | Value | Endpoint | Status |
|---------|----------------|-------|----------|--------|
| TI-MO-001 | ADX - Average Directional Index | `adx` | `/adx` | ⏳ |
| TI-MO-002 | ADXR - Average Directional Movement Index Rating | `adxr` | `/adxr` | ⏳ |
| TI-MO-003 | APO - Absolute Price Oscillator | `apo` | `/apo` | ⏳ |
| TI-MO-004 | CCI - Commodity Channel Index | `cci` | `/cci` | ⏳ |
| TI-MO-005 | CMO - Chande Momentum Oscillator | `cmo` | `/cmo` | ⏳ |
| TI-MO-006 | DX - Directional Movement Index | `dx` | `/dx` | ⏳ |
| TI-MO-007 | MACD - Moving Average Convergence Divergence | `macd` | `/macd` | ⏳ |
| TI-MO-008 | MFI - Money Flow Index | `mfi` | `/mfi` | ⏳ |
| TI-MO-009 | MOM - Momentum | `mom` | `/mom` | ⏳ |
| TI-MO-010 | PPO - Percentage Price Oscillator | `ppo` | `/ppo` | ⏳ |
| TI-MO-011 | ROC - Rate of Change | `roc` | `/roc` | ⏳ |
| TI-MO-012 | RSI - Relative Strength Index | `rsi` | `/rsi` | ⏳ |
| TI-MO-013 | STOCH - Stochastic Oscillator | `stoch` | `/stoch` | ⏳ |
| TI-MO-014 | STOCHRSI - Stochastic RSI | `stochrsi` | `/stochrsi` | ⏳ |
| TI-MO-015 | TRIX - Triple Exponential Average | `trix` | `/trix` | ⏳ |
| TI-MO-016 | ULTOSC - Ultimate Oscillator | `ultosc` | `/ultosc` | ⏳ |
| TI-MO-017 | WILLR - Williams %R | `willr` | `/willr` | ⏳ |

### 6.3 Volatility Indicators (5 operations)

| Test ID | Operation Name | Value | Endpoint | Status |
|---------|----------------|-------|----------|--------|
| TI-VO-001 | ATR - Average True Range | `atr` | `/atr` | ⏳ |
| TI-VO-002 | BBANDS - Bollinger Bands | `bbands` | `/bbands` | ⏳ |
| TI-VO-003 | NATR - Normalized Average True Range | `natr` | `/natr` | ⏳ |
| TI-VO-004 | SUPERTREND - SuperTrend | `supertrend` | `/supertrend` | ⏳ |
| TI-VO-005 | TRANGE - True Range | `trange` | `/trange` | ⏳ |

### 6.4 Volume Indicators (4 operations)

| Test ID | Operation Name | Value | Endpoint | Status |
|---------|----------------|-------|----------|--------|
| TI-VL-001 | AD - Accumulation/Distribution | `ad` | `/ad` | ⏳ |
| TI-VL-002 | ADOSC - Chaikin A/D Oscillator | `adosc` | `/adosc` | ⏳ |
| TI-VL-003 | OBV - On Balance Volume | `obv` | `/obv` | ⏳ |
| TI-VL-004 | VWAP - Volume Weighted Average Price | `vwap` | `/vwap` | ⏳ |

### 6.5 Trend Indicators (10 operations)

| Test ID | Operation Name | Value | Endpoint | Status |
|---------|----------------|-------|----------|--------|
| TI-TR-001 | AROON - Aroon Indicator | `aroon` | `/aroon` | ⏳ |
| TI-TR-002 | AROONOSC - Aroon Oscillator | `aroonosc` | `/aroonosc` | ⏳ |
| TI-TR-003 | BOP - Balance of Power | `bop` | `/bop` | ⏳ |
| TI-TR-004 | HT_TRENDMODE - Hilbert Transform Trend Mode | `ht_trendmode` | `/ht_trendmode` | ⏳ |
| TI-TR-005 | MINUS_DI - Minus Directional Indicator | `minus_di` | `/minus_di` | ⏳ |
| TI-TR-006 | MINUS_DM - Minus Directional Movement | `minus_dm` | `/minus_dm` | ⏳ |
| TI-TR-007 | PLUS_DI - Plus Directional Indicator | `plus_di` | `/plus_di` | ⏳ |
| TI-TR-008 | PLUS_DM - Plus Directional Movement | `plus_dm` | `/plus_dm` | ⏳ |
| TI-TR-009 | SAR - Parabolic SAR | `sar` | `/sar` | ⏳ |
| TI-TR-010 | ICHIMOKU - Ichimoku Cloud | `ichimoku` | `/ichimoku` | ⏳ |

### 6.6 Statistical Functions (9 operations)

| Test ID | Operation Name | Value | Endpoint | Status |
|---------|----------------|-------|----------|--------|
| TI-ST-001 | BETA - Beta Coefficient | `beta` | `/beta` | ⏳ |
| TI-ST-002 | CORREL - Pearson Correlation Coefficient | `correl` | `/correl` | ⏳ |
| TI-ST-003 | LINEARREG - Linear Regression | `linearreg` | `/linearreg` | ⏳ |
| TI-ST-004 | LINEARREG_ANGLE - Linear Regression Angle | `linearreg_angle` | `/linearreg_angle` | ⏳ |
| TI-ST-005 | LINEARREG_INTERCEPT - Linear Regression Intercept | `linearreg_intercept` | `/linearreg_intercept` | ⏳ |
| TI-ST-006 | LINEARREG_SLOPE - Linear Regression Slope | `linearreg_slope` | `/linearreg_slope` | ⏳ |
| TI-ST-007 | STDDEV - Standard Deviation | `stddev` | `/stddev` | ⏳ |
| TI-ST-008 | TSF - Time Series Forecast | `tsf` | `/tsf` | ⏳ |
| TI-ST-009 | VAR - Variance | `var` | `/var` | ⏳ |

### 6.7 Overlap Studies (14 operations)

| Test ID | Operation Name | Value | Endpoint | Status |
|---------|----------------|-------|----------|--------|
| TI-OV-001 | AVGPRICE - Average Price | `avgprice` | `/avgprice` | ⏳ |
| TI-OV-002 | HT_DCPERIOD - Hilbert Transform Dominant Cycle Period | `ht_dcperiod` | `/ht_dcperiod` | ⏳ |
| TI-OV-003 | HT_DCPHASE - Hilbert Transform Dominant Cycle Phase | `ht_dcphase` | `/ht_dcphase` | ⏳ |
| TI-OV-004 | HT_PHASOR - Hilbert Transform Phasor Components | `ht_phasor` | `/ht_phasor` | ⏳ |
| TI-OV-005 | HT_SINE - Hilbert Transform SineWave | `ht_sine` | `/ht_sine` | ⏳ |
| TI-OV-006 | HT_TRENDLINE - Hilbert Transform Instantaneous Trendline | `ht_trendline` | `/ht_trendline` | ⏳ |
| TI-OV-007 | MEDPRICE - Median Price | `medprice` | `/medprice` | ⏳ |
| TI-OV-008 | MIDPOINT - Midpoint | `midpoint` | `/midpoint` | ⏳ |
| TI-OV-009 | MIDPRICE - Midpoint Price | `midprice` | `/midprice` | ⏳ |
| TI-OV-010 | PERCENT_B - Bollinger Bands %B | `percent_b` | `/percent_b` | ⏳ |
| TI-OV-011 | PIVOT_POINTS_HL - Pivot Points High/Low | `pivot_points_hl` | `/pivot_points_hl` | ⏳ |
| TI-OV-012 | TYPPRICE - Typical Price | `typprice` | `/typprice` | ⏳ |
| TI-OV-013 | WCLPRICE - Weighted Close Price | `wclprice` | `/wclprice` | ⏳ |
| TI-OV-014 | [Additional Overlap Study] | - | - | ⏳ |

### 6.8 Math Transform (25 operations)

| Test ID | Operation Name | Value | Endpoint | Status |
|---------|----------------|-------|----------|--------|
| TI-MT-001 | ACOS - Arc Cosine | `acos` | `/acos` | ⏳ |
| TI-MT-002 | ADD - Arithmetic Add | `add` | `/add` | ⏳ |
| TI-MT-003 | ASIN - Arc Sine | `asin` | `/asin` | ⏳ |
| TI-MT-004 | ATAN - Arc Tangent | `atan` | `/atan` | ⏳ |
| TI-MT-005 | CEIL - Ceiling | `ceil` | `/ceil` | ⏳ |
| TI-MT-006 | COS - Cosine | `cos` | `/cos` | ⏳ |
| TI-MT-007 | COSH - Hyperbolic Cosine | `cosh` | `/cosh` | ⏳ |
| TI-MT-008 | DIV - Arithmetic Division | `div` | `/div` | ⏳ |
| TI-MT-009 | EXP - Exponential | `exp` | `/exp` | ⏳ |
| TI-MT-010 | FLOOR - Floor | `floor` | `/floor` | ⏳ |
| TI-MT-011 | LN - Natural Logarithm | `ln` | `/ln` | ⏳ |
| TI-MT-012 | LOG10 - Logarithm Base 10 | `log10` | `/log10` | ⏳ |
| TI-MT-013 | MAX - Maximum Value | `max` | `/max` | ⏳ |
| TI-MT-014 | MIN - Minimum Value | `min` | `/min` | ⏳ |
| TI-MT-015 | MINMAX - Min/Max Values | `minmax` | `/minmax` | ⏳ |
| TI-MT-016 | MINMAXINDEX - Min/Max Index | `minmaxindex` | `/minmaxindex` | ⏳ |
| TI-MT-017 | MULT - Arithmetic Multiplication | `mult` | `/mult` | ⏳ |
| TI-MT-018 | ROUND - Round | `round` | `/round` | ⏳ |
| TI-MT-019 | SIN - Sine | `sin` | `/sin` | ⏳ |
| TI-MT-020 | SINH - Hyperbolic Sine | `sinh` | `/sinh` | ⏳ |
| TI-MT-021 | SQRT - Square Root | `sqrt` | `/sqrt` | ⏳ |
| TI-MT-022 | SUB - Arithmetic Subtraction | `sub` | `/sub` | ⏳ |
| TI-MT-023 | SUM - Summation | `sum` | `/sum` | ⏳ |
| TI-MT-024 | TAN - Tangent | `tan` | `/tan` | ⏳ |
| TI-MT-025 | TANH - Hyperbolic Tangent | `tanh` | `/tanh` | ⏳ |

**Technical Indicators Status:** 0/91 tested (0%), 91 pending

---

## Summary

**Total Operations:** 142
- **Tested:** 8 (6%)
- **Plan Limits:** 3 (2%)
- **Planned Endpoints:** 3 (2%)
- **Not Tested:** 128 (90%)

**Next Priority:** Continue testing remaining Core Data, Fundamentals, and Reference Data operations before moving to Technical Indicators.

---

**Last Updated:** December 15, 2025
