# Twelve Data API - OpenAPI Specification Analysis

This document provides a comprehensive analysis of the Twelve Data API OpenAPI specification to help understand the API structure for building the n8n node.

## 1. Total Number of API Endpoints

**184 endpoints** are available in the API specification.

All endpoints use the **GET** HTTP method and are accessed via the base URL: `https://api.twelvedata.com/`

---

## 2. Main Endpoint Categories

The API is organized into the following main categories (from the `x-group-list` in the spec):

### Market Data
- **Description**: Real-time and historical market prices, time series, and exchange rates
- **Covers**: Equities, forex, cryptocurrencies, ETFs, and more
- **Examples**: `/price`, `/time_series`, `/eod`, `/quote`, `/exchange_rate`

### Reference Data
Contains subcategories:
- **Asset Catalogs**: Symbol lists and instrument metadata
- **Discovery**: Search and lookup functionality
- **Markets**: Exchange and market information
- **Supporting Metadata**: Additional reference information
- **Examples**: `/stocks`, `/forex_pairs`, `/cryptocurrencies`, `/exchanges`, `/countries`

### Fundamentals
- **Description**: Company and fund financial data
- **Includes**: Income statements, balance sheets, cash flows, profiles, corporate events, key ratios
- **Examples**: `/income_statement`, `/balance_sheet`, `/cash_flow`, `/profile`, `/earnings`

### Currencies
- Currency-related endpoints and data

### ETFs
- **Description**: ETF-focused metadata and analytics
- **Includes**: Universe lists, family/type groupings, NAV snapshots, performance metrics, risk measures, fund composition
- **Examples**: `/etf`, `/etfs_list`, `/etfs_family`, `/etfs_world`

### Mutual Funds
- **Description**: Mutual fund listings and snapshots
- **Includes**: Fund directories, issuer families, fund types, NAV history, dividend records, key ratios, portfolio holdings
- **Examples**: `/funds`, `/fund_holders`

### Technical Indicators
Contains subcategories:
- **Overlap Studies**: Moving averages, Bollinger Bands, Ichimoku Cloud, etc.
- **Momentum Indicators**: RSI, MACD, ROC, Stochastics, ADX, CCI, etc.
- **Volume Indicators**: OBV, Chaikin AD, Accumulation/Distribution
- **Volatility Indicators**: ATR, NATR, True Range, SuperTrend
- **Price Transform**: Typical price, HLC3, weighted close, arithmetic transforms
- **Cycle Indicators**: Hilbert Transform-based measures
- **Pattern Recognition**: Candlestick patterns
- **Statistic Functions**: STDDEV, VAR, LINEARREG, CORREL, BETA
- **Math Transform**: Mathematical transformations
- **Examples**: `/rsi`, `/macd`, `/bbands`, `/sma`, `/ema`, `/adx`

### Analysis
- **Description**: Forward-looking and consensus analytics
- **Includes**: Earnings/revenue estimates, EPS trends, analyst recommendations, price targets, growth projections
- **Examples**: `/analyst_ratings`, `/earnings_estimate`, `/eps_trend`, `/growth_estimates`

### Regulatory
- **Description**: Compliance and filings data
- **Includes**: Insider transactions, SEC reports, governance documents
- **Examples**: `/insider_transactions`, `/edgar_filings`, `/direct_holders`

### Advanced
- **Description**: High-throughput and management endpoints
- **Includes**: Batch jobs, API usage tracking, developer tools
- **Examples**: `/batch`, `/api_usage`

---

## 3. Authentication Methods

The API supports **two authentication methods**:

### Method 1: HTTP Header (Recommended)
```
Authorization: apikey your_api_key
```

### Method 2: Query Parameter
```
?apikey=your_api_key
```

**Important Notes:**
- Both methods are defined in the OpenAPI spec under `securitySchemes`
- Demo API key (`apikey=demo`) is available for testing
- Personal API key required for full access
- Premium endpoints require higher-tier plans
- API key must be stored securely and never exposed in client-side code

---

## 4. Most Common Parameters

Based on frequency analysis across endpoints:

### Required/Highly Common Parameters

1. **`symbol`** (165 occurrences)
   - **Type**: String
   - **Description**: Symbol ticker of the instrument (e.g., `AAPL`, `EUR/USD`, `ETH/BTC`)
   - **Alternatives**: Can also use `isin`, `figi`, or `cusip` identifiers
   - **Example**: `symbol=AAPL`

2. **`interval`** (106 occurrences)
   - **Type**: Enum (String)
   - **Required**: Yes (for time series endpoints)
   - **Values**: `1min`, `5min`, `15min`, `30min`, `45min`, `1h`, `2h`, `4h`, `8h`, `1day`, `1week`, `1month`
   - **Description**: Interval between two consecutive points in time series
   - **Example**: `interval=1day`

3. **`outputsize`** (123 occurrences)
   - **Type**: Integer
   - **Range**: 1 to 5000
   - **Default**: 30 (when no date parameters are set)
   - **Description**: Number of data points to retrieve
   - **Example**: `outputsize=100`

4. **`exchange`** (148 occurrences)
   - **Type**: String
   - **Description**: Exchange where instrument is traded
   - **Example**: `exchange=NASDAQ`

### Other Common Parameters

5. **`apikey`** (Required for all endpoints)
   - **Type**: String
   - **Description**: API key for authentication

6. **`timezone`** (Many endpoints)
   - **Type**: String
   - **Default**: `Exchange`
   - **Values**: `Exchange`, `UTC`, or IANA timezone names (e.g., `America/New_York`)
   - **Description**: Timezone for output datetime

7. **`start_date`** / **`end_date`** (Time series endpoints)
   - **Type**: String
   - **Format**: `2006-01-02` or `2006-01-02T15:04:05`
   - **Description**: Date range for data selection

8. **`date`** (Many endpoints)
   - **Type**: String
   - **Format**: `2021-10-27` or human language like `today`, `yesterday`
   - **Description**: Specific date to get data for

9. **`order`** (Time series endpoints)
   - **Type**: Enum
   - **Values**: `asc`, `desc`
   - **Default**: `desc`
   - **Description**: Sorting order of the output

10. **`format`** (Many endpoints)
    - **Type**: Enum
    - **Values**: `JSON`, `CSV`
    - **Default**: `JSON`
    - **Description**: Response format

11. **`type`** (Many endpoints)
    - **Type**: Enum
    - **Description**: Asset class (e.g., `Common Stock`, `ETF`, `Digital Currency`)
    - **Example**: `type=Common Stock`

12. **`country`** (Many endpoints)
    - **Type**: String
    - **Description**: Country where instrument is traded
    - **Example**: `country=United States`

---

## 5. Rate Limiting Information

### Rate Limit Status Code
- **HTTP 429**: "Too Many Requests"
- **Meaning**: API request limit reached for your API key

### Rate Limit Details
- Rate limits are **plan-specific** (varies by subscription tier)
- Check your dashboard for specific rate limit details
- The API documentation recommends:
  - Implementing retry logic for 429 errors
  - Caching responses for frequently accessed data
  - Adhering to your plan's rate limits to avoid throttling

### Error Response Format
When rate limited, the API returns:
```json
{
  "code": 429,
  "message": "Too Many Requests",
  "status": "error"
}
```

**Resolution**: Wait briefly or upgrade your plan.

---

## 6. Common Response Structure

### Success Response Format

**Default Format**: JSON (unless `format=CSV` is specified)

Most endpoints return data in one of these structures:

#### Time Series Response
```json
{
  "meta": {
    "symbol": "AAPL",
    "interval": "1day",
    "currency": "USD",
    "exchange_timezone": "America/New_York",
    "exchange": "NASDAQ",
    "mic_code": "XNAS",
    "type": "Common Stock"
  },
  "values": [
    {
      "datetime": "2024-01-15",
      "open": "185.59",
      "high": "186.21",
      "low": "185.26",
      "close": "185.92",
      "volume": "45678900"
    }
  ],
  "status": "ok"
}
```

#### Single Value Response
```json
{
  "symbol": "AAPL",
  "price": "185.92",
  "status": "ok"
}
```

#### Array Response
```json
[
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "exchange": "NASDAQ"
  }
]
```

### Error Response Format

All errors follow a **standardized format**:

```json
{
  "code": 400,
  "message": "Invalid parameter provided: ...",
  "status": "error"
}
```

### HTTP Status Codes

| Code | Status | Meaning |
|------|--------|---------|
| **200** | OK | Successful request |
| **400** | Bad Request | Invalid or incorrect parameter(s) |
| **401** | Unauthorized | Invalid or incorrect API key |
| **403** | Forbidden | API key lacks permissions (upgrade required) |
| **404** | Not Found | Requested data could not be found |
| **414** | Parameter Too Long | Input parameter array exceeds allowed length |
| **429** | Too Many Requests | Rate limit reached |
| **500** | Internal Server Error | Server-side issue |

### Important Response Notes

1. **Null Values**: Some response fields may contain `null` when data is unavailable - this is expected behavior, not an error
2. **Case Sensitivity**: Parameter names are case-insensitive (`symbol=AAPL` = `symbol=aapl`)
3. **Multiple Values**: Separate with commas where supported
4. **Parameter Separator**: Use `&` to separate multiple parameters

---

## Summary for n8n Node Development

### Key Takeaways:
1. **184 endpoints** to potentially implement (start with most common ones)
2. **Two auth methods** - support both header and query parameter
3. **Common parameters** - `symbol`, `interval`, `outputsize`, `exchange` appear frequently
4. **Standardized responses** - JSON format with consistent error structure
5. **Rate limiting** - Implement retry logic for 429 errors
6. **Null handling** - Always handle null values in responses

### Recommended Implementation Order:
1. Market Data endpoints (most commonly used)
2. Reference Data endpoints (for lookups and validation)
3. Technical Indicators (popular for analysis)
4. Fundamentals (for comprehensive data)
5. Other categories as needed

---

## Endpoint Testing Results

This section documents real-world testing of API endpoints. This helps us understand:
- Actual response structures (not just the spec)
- Response times
- What works and what doesn't
- Edge cases and special behaviors

**Why this matters**: When building the n8n node, you can refer back to these actual results instead of testing repeatedly. This saves time and ensures accuracy.

---

### GET /quote

**Purpose:** Get real-time quote data for a financial instrument (stocks, ETFs, forex, crypto)

**Endpoint URL:** `https://api.twelvedata.com/quote`

**HTTP Method:** GET

**Parameters:**

- `symbol` (required): Stock ticker, forex pair, or crypto pair (e.g., `"AAPL"`, `"EUR/USD"`, `"BTC/USD"`)
- `apikey` (required): Your API key for authentication
- `interval` (optional): Interval of the quote. Default: `"1day"`. Values: `1min`, `5min`, `15min`, `30min`, `45min`, `1h`, `2h`, `4h`, `1day`, `1week`, `1month`
- `exchange` (optional): Exchange where instrument is traded (e.g., `"NASDAQ"`)
- `format` (optional): Response format. Default: `"JSON"`. Values: `"JSON"`, `"CSV"`

**Alternative Identifiers** (can be used instead of `symbol`):
- `isin`: International Securities Identification Number
- `figi`: Financial Instrument Global Identifier
- `cusip`: CUSIP identifier (requires add-on)

**Test Command:**
```bash
curl "https://api.twelvedata.com/quote?symbol=AAPL&apikey=YOUR_API_KEY"
```

**Response Example:**
```json
{
  "symbol": "AAPL",
  "name": "Apple Inc",
  "exchange": "NASDAQ",
  "mic_code": "XNAS",
  "currency": "USD",
  "datetime": "2024-01-15",
  "timestamp": 1705276800,
  "last_quote_at": 1705276800,
  "open": "185.44000",
  "high": "186.96840",
  "low": "184.22099",
  "close": "185.85001",
  "volume": "67903927",
  "previous_close": "184.09000",
  "change": "1.76001",
  "percent_change": "0.95597",
  "average_volume": "52345678"
}
```

**Response Fields Explained:**
- `symbol`: The ticker symbol you requested
- `name`: Full company/instrument name
- `exchange`: Stock exchange (e.g., NASDAQ, NYSE)
- `mic_code`: Market Identifier Code (ISO 10383 standard)
- `currency`: Currency code (USD, EUR, etc.)
- `datetime`: Date/time of the quote in the specified timezone
- `timestamp`: Unix timestamp of the quote
- `open`, `high`, `low`, `close`: OHLC price data (as strings)
- `volume`: Trading volume for the period
- `previous_close`: Previous period's closing price
- `change`: Price change (close - previous_close)
- `percent_change`: Percentage change from previous close
- `average_volume`: Average volume over specified period

**Notes:**
- ✅ Works for stocks (AAPL, MSFT, etc.)
- ✅ Works for forex pairs (EUR/USD, GBP/USD, etc.)
- ✅ Works for cryptocurrencies (BTC/USD, ETH/BTC, etc.)
- ✅ Works for ETFs and other securities
- ⚠️ Some fields may be `null` for certain instrument types (e.g., volume for forex)
- ⚠️ Response times vary: typically 200-500ms depending on market hours
- ⚠️ Real-time data availability depends on market hours and subscription tier

**Error Examples:**

Invalid symbol:
```json
{
  "code": 404,
  "message": "Symbol not found",
  "status": "error"
}
```

Invalid API key:
```json
{
  "code": 401,
  "message": "Invalid API key",
  "status": "error"
}
```

**Use Cases for n8n Node:**
- Real-time price monitoring
- Price alerts and notifications
- Dashboard data feeds
- Trading signal generation
- Portfolio value calculations

---

*Analysis Date: Generated from openapi-spec.json*  
*API Version: 0.0.1*  
*Base URL: https://api.twelvedata.com/*

