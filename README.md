# n8n-nodes-twelve-data

![Twelve Data Banner](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

This is an n8n community node for the [Twelve Data API](https://twelvedata.com). It provides access to comprehensive financial market data including stocks, forex, cryptocurrencies, ETFs, and more.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Example Workflows](#example-workflows)
- [Known Limitations](#known-limitations)
- [Resources](#resources)
- [Version History](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### For n8n Cloud

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-twelve-data` in the **Enter npm package name** field
4. Select **Install**

### For Self-Hosted n8n

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-twelve-data` in the **Enter npm package name** field
4. Select **Install**

Alternatively, install via npm in your n8n installation directory:

```bash
npm install n8n-nodes-twelve-data
```

Then restart n8n.

## Credentials

To use this node, you need a Twelve Data API key.

### Setup

1. Sign up at [twelvedata.com](https://twelvedata.com)
2. Get your free API key from the dashboard
3. In n8n, go to **Settings → Credentials → Create → "Twelve Data API"**
4. Paste your API key and save

### Authentication

The node supports two authentication methods:

- **Header Authentication (Recommended)** - API key sent in request header
- **Query Parameter** - API key added to URL

Choose the method that works best for your setup. Header authentication is more secure for production use.

### Demo Key

For quick testing, you can use the demo API key: `demo`

**Note:** The demo key has limited functionality. Get your own free API key for full access.

## Compatibility

- **Minimum n8n version:** 1.0.0
- **Tested up to:** Latest version

## Usage

### Available Operations

The Twelve Data node provides access to **164 API endpoints** organized into 6 main resource categories:

#### Core Data (Market Data)
- **Get Quote** - Real-time price quotes with bid, ask, open, high, low, close, volume
- **Get Price** - Lightweight current price lookup
- **Get Time Series** - Historical OHLCV data with customizable intervals (1min to 1month)
- **Get End of Day Price** - Daily closing prices for specific dates
- **Get Exchange Rate** - Real-time currency conversion rates
- **Currency Conversion** - Convert amounts between currencies
- **Get Market Movers (All Markets)** - Top gainers, losers, and most active stocks
- **Get Time Series Cross** - Cross-currency pair time series data

#### Reference Data
- **List Stocks** - Browse and filter available stock symbols
- **List Forex Pairs** - Available currency pairs
- **List Cryptocurrencies** - Supported crypto assets
- **List ETFs** - Exchange-traded funds
- **List ETFs (Extended)** - Extended ETF information
- **List ETF Families** - ETF family classifications
- **List ETF Types** - ETF type categories
- **List Indices** - Market indices (S&P 500, NASDAQ, etc.)
- **List Exchanges** - Trading venues and their details
- **List Countries** - Available countries for market data
- **List Intervals** - Supported time intervals
- **List Mutual Fund Families** - Mutual fund family classifications
- **List Mutual Fund Types** - Mutual fund type categories
- **List Technical Indicators** - Available technical indicators
- **List Fundamentals** - Available fundamental data types
- **List Market Data** - Available market data types
- **List Analysis** - Available analysis types
- **Symbol Search** - Search for symbols by name or ticker
- **Get Market State** - Check if markets are open or closed

#### Technical Indicators (91 operations)
- **Moving Averages** (9): SMA, EMA, DEMA, TEMA, WMA, TRIMA, KAMA, MAMA, T3
- **Momentum Indicators** (16): RSI, MACD, ADX, CCI, MOM, ROC, STOCH, TRIX, etc.
- **Volatility Indicators** (5): ATR, BBANDS, NATR, SUPERTREND, TRANGE
- **Volume Indicators** (4): AD, ADOSC, OBV, VWAP
- **Trend Indicators** (10): AROON, SAR, ICHIMOKU, HT_TRENDMODE, etc.
- **Statistical Functions** (9): BETA, CORREL, LINEARREG, STDDEV, VAR, etc.
- **Overlap Studies** (14): AVGPRICE, MEDPRICE, MIDPOINT, TYPPRICE, etc.
- **Math Transform** (25): ACOS, ADD, ASIN, ATAN, COS, EXP, LN, LOG10, MAX, MIN, etc.

#### Fundamentals (22 operations)
- **Get Profile** - Company information (sector, industry, employees, description)
- **Get Dividends** - Historical dividend payment records
- **Get Dividends Calendar** - Upcoming dividend announcements
- **Get Earnings** - Historical and upcoming earnings data
- **Get Statistics** - Key financial statistics and metrics
- **Get Balance Sheet** - Company balance sheet data
- **Get Balance Sheet Consolidated** - Consolidated balance sheet data
- **Get Cash Flow** - Cash flow statement data
- **Get Cash Flow Consolidated** - Consolidated cash flow data
- **Get Income Statement** - Income statement data
- **Get Income Statement Consolidated** - Consolidated income statement
- **Get Market Cap** - Market capitalization data
- **Get Fund Holders** - Mutual fund ownership data
- **Get Insider Transactions** - Insider buying and selling activity
- **Get Institutional Holders** - Institutional ownership data
- **Get Key Executives** - Company executive information
- **Get Earnings Calendar** - Upcoming earnings announcements
- **Get IPO Calendar** - Upcoming IPO listings
- **Get Stock Splits** - Historical stock split data
- **Get Splits Calendar** - Upcoming stock split announcements
- **Get Options Chain** - 🚧 Planned API endpoint
- **Get Options Expiration** - 🚧 Planned API endpoint

#### Market Intelligence (10 operations)
- **Get Analyst Ratings** - Consensus recommendations
- **Get Analyst Ratings (Light)** - Lightweight analyst ratings
- **Get Price Target** - Analyst price predictions
- **Get Recommendations** - Recommendation trends
- **Get Earnings Estimate** - Forward-looking earnings estimates
- **Get Revenue Estimate** - Revenue estimates
- **Get EPS Trend** - Earnings per share trend data
- **Get EPS Revisions** - EPS estimate revisions
- **Get Growth Estimates** - Growth estimates
- **Get EDGAR Filings** - SEC filing information
- **Get Economic Calendar** - Upcoming economic events

#### Advanced (3 operations)
- **API Usage** - Get API usage statistics and remaining credits
- **Batch Request** - Get multiple data types for multiple symbols in one request
- **Get Logo** - Get company logo URL

### Example Workflows

#### 1. Get Stock Quote
```
Trigger → Twelve Data (Quote) → Process Data
```
Get real-time price for AAPL, MSFT, or any stock.

#### 2. Monitor Crypto Prices
```
Schedule → Twelve Data (Quote) → If Price > X → Send Alert
```
Set up price alerts for Bitcoin, Ethereum, etc.

#### 3. Technical Analysis
```
Twelve Data (Time Series) → Twelve Data (RSI) → Make Decision
```
Calculate RSI indicator and trigger trades.

#### 4. Currency Conversion
```
Twelve Data (Exchange Rate) → Calculate → Store Result
```
Convert between any currency pairs.

### Tips

- Start with the demo key for testing
- Monitor rate limits in your Twelve Data dashboard
- Use batch requests when possible to reduce API calls

## Example Workflows

Ready-to-import workflow examples are available in the [`examples/`](examples/) directory:

| Workflow | Description | Nodes Used |
|----------|-------------|------------|
| [Stock Price to Sheets](examples/stock-price-to-sheets.json) | Fetch stock quotes and save to Google Sheets | Twelve Data, Google Sheets |
| [Crypto Alert Webhook](examples/crypto-alert-webhook.json) | Send webhook alerts on price changes | Twelve Data, IF, HTTP Request |
| [Market Data Conditional](examples/market-data-conditional.json) | Route data based on market direction | Twelve Data, IF, Set |
| [Multi-Symbol Loop](examples/multi-symbol-loop.json) | Process multiple symbols in a loop | Twelve Data, Split, Aggregate |
| [Forex Rate Comparison](examples/forex-rate-comparison.json) | Compare multiple forex pairs | Twelve Data, Merge, Set |

See [examples/README.md](examples/README.md) for import instructions and customization tips.

## Known Limitations

### Free Tier Restrictions

The Twelve Data free tier has some limitations:

| Feature | Free Tier | Paid Plans |
|---------|-----------|------------|
| API Calls | 800/day | Higher limits |
| Rate Limit | 8 calls/minute | Higher limits |
| Historical Data | Limited | Extended |
| Fundamentals | Profile only | Full access |
| Real-time Data | 15-min delay | Real-time |

### API Tier Requirements

**Understanding API Tiers:**

Twelve Data offers different subscription tiers. The connector works with all tiers - it's the API access that varies.

**Free Tier (Fully Supported):**
- Core data operations (quotes, time series, exchange rates)
- Reference data (lists of stocks, forex, crypto, ETFs, indices)
- Company profiles
- Market intelligence data
- 800 API calls per day, 8 per minute

**Paid Tier Required (grow/pro/ultra/enterprise):**
- Advanced fundamentals: Get Dividends, Get Earnings, Get Statistics
- Calendars: Earnings Calendar, IPO Calendar
- Real-time data (free tier has 15-minute delay)
- Higher rate limits
- Extended historical data

### Planned Endpoints (Not Yet in REST API)

The following endpoints are defined in the node but not yet available in the Twelve Data REST API. They're included for future compatibility:

- **Get Options Chain** - Options contract data (available in Google Sheets Add-on)
- **Get Options Expiration** - Options expiration dates (available in Google Sheets Add-on)
- **Get Complex Data** - Multi-symbol, multi-endpoint requests

**Status:** These endpoints are expected to be added to the REST API in a future release. The operations are ready in the connector and will work automatically when Twelve Data makes them available.

**Current Workarounds:**
- For options data: Use the [Twelve Data Google Sheets Add-on](https://support.twelvedata.com/en/articles/5702399-google-sheets-add-on-documentation)
- For complex data: Make separate API calls using n8n loops (works well for most use cases)

### Interval Limitations

- **1-minute interval** may return 5-minute data on free tier
- **Hourly and daily intervals** work correctly on free tier

### Performance Notes

- Average response time: < 1 second
- Large datasets (1000+ items) may show n8n UI warning but load successfully
- Recommended: Add 0.5-1 second delay between requests in loops to avoid rate limiting

## Resources

- **[Twelve Data Website](https://twelvedata.com)** - Sign up and get API key
- **[Twelve Data API Docs](https://twelvedata.com/docs)** - Official API documentation
- **[Twelve Data Pricing](https://twelvedata.com/pricing)** - Plan comparison
- **[n8n Community Forum](https://community.n8n.io/)** - Get help from the community
- **[n8n Documentation](https://docs.n8n.io/)** - Learn more about n8n

### Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/n8n-nodes-twelve-data/issues)
- **Twelve Data Support:** support@twelvedata.com
- **n8n Community:** [community.n8n.io](https://community.n8n.io)

## Version History

### 0.2.0 (Current)
- Added 22 new operations across multiple categories
- **Fundamentals:** Balance Sheet Consolidated, Cash Flow Consolidated, Dividends Calendar, Income Statement Consolidated, Market Cap, Splits Calendar
- **Core Data:** Market Movers (All Markets), Time Series Cross
- **Reference Data:** List Countries, ETFs (Extended), ETF Families, ETF Types, Intervals, Mutual Fund Families, Mutual Fund Types, Technical Indicators, Fundamentals, Market Data, Analysis
- **Market Intelligence:** Analyst Ratings (Light), EDGAR Filings, EPS Revisions
- Enhanced script reliability with improved JSON validation
- Total operations: 164 (up from 142)

### 0.1.0
- Initial release with 142+ operations across 6 resource categories
- Support for stocks, forex, cryptocurrencies, ETFs, and indices
- 91 technical indicators for market analysis
- Comprehensive fundamentals and market intelligence data
- Header and query parameter authentication
- Zero runtime dependencies

## License

[MIT](LICENSE.md)

## Disclaimer

This is a community-maintained node and is not officially affiliated with Twelve Data or n8n. Use at your own risk.

---

**Made with ❤️ for the n8n community**
