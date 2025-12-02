# n8n-nodes-twelve-data

![Twelve Data Banner](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

This is an n8n community node for the [Twelve Data API](https://twelvedata.com). It provides access to comprehensive financial market data including stocks, forex, cryptocurrencies, ETFs, and more.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
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

### Quick Setup

1. **Sign up** at [twelvedata.com](https://twelvedata.com)
2. **Get your free API key** from the dashboard
3. In n8n: **Settings → Credentials → Create → "Twelve Data API"**
4. **Paste your key** and click **Test**
5. **Save** your credential

### Authentication Methods

Choose between two authentication methods:

- **Header (Recommended)** - Sends API key in Authorization header
  - More secure, not visible in URLs
  - Best for production use

- **Query Parameter** - Adds API key to URL
  - Simpler for testing
  - Good for debugging

### Detailed Instructions

For step-by-step instructions with screenshots, see:
- **[Credentials Setup Guide](docs/CREDENTIALS_SETUP.md)** - Complete walkthrough
- **[Credentials Documentation](docs/CREDENTIALS.md)** - Technical details

### Demo API Key

For quick testing, use the demo API key: `demo`
- Limited functionality
- Not suitable for production
- Replace with your personal key for real use

## Compatibility

- **Minimum n8n version:** 1.0.0
- **Tested up to:** Latest version

## Usage

### Available Operations

The Twelve Data node provides access to 184+ API endpoints organized into 4 main resource categories:

#### Core Data (Market Data)
- **Get Quote** - Real-time price quotes with bid, ask, open, high, low, close, volume
- **Get Price** - Lightweight current price lookup
- **Get Time Series** - Historical OHLCV data with customizable intervals (1min to 1month)
- **Get End of Day Price** - Daily closing prices for specific dates
- **Get Exchange Rate** - Real-time currency conversion rates
- **Currency Conversion** - Convert amounts between currencies

#### Reference Data
- **List Stocks** - Browse and filter available stock symbols
- **List Forex Pairs** - Available currency pairs
- **List Cryptocurrencies** - Supported crypto assets
- **List ETFs** - Exchange-traded funds
- **List Indices** - Market indices (S&P 500, NASDAQ, etc.)
- **List Exchanges** - Trading venues and their details
- **Symbol Search** - Search for symbols by name or ticker
- **Get Market State** - Check if markets are open or closed

#### Analysis
- **Get Technical Indicator** - Calculate technical indicators (SMA, EMA, RSI, MACD, etc.)
  - *Note: Full indicator implementation coming in future releases*

#### Fundamentals
- **Get Profile** - Company information (sector, industry, employees, description)
- **Get Dividends** - Historical dividend payment records
- **Get Earnings** - Historical and upcoming earnings data
- **Get Statistics** - Key financial statistics and metrics

#### Analysis
- **Analyst ratings** - Consensus recommendations
- **Price targets** - Analyst price predictions
- **Earnings estimates** - Forward-looking estimates

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

- **Start with the demo key** for testing
- **Use caching** to reduce API calls
- **Monitor rate limits** in your Twelve Data dashboard
- **Batch requests** when possible
- **See [OpenAPI Analysis](docs/OPENAPI_ANALYSIS.md)** for endpoint details

## Resources

### Documentation

- **[Credentials Setup Guide](docs/CREDENTIALS_SETUP.md)** - How to get and configure API keys
- **[Credentials Technical Docs](docs/CREDENTIALS.md)** - Authentication details
- **[OpenAPI Analysis](docs/OPENAPI_ANALYSIS.md)** - Complete API endpoint reference

### External Links

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

### 0.1.0 (Current)
- ✅ Initial release with full node implementation
- ✅ Twelve Data API credential support with automatic authentication
- ✅ Header and query parameter authentication (both methods supported)
- ✅ Credential testing functionality with automatic validation
- ✅ 4 resource categories: Core Data, Fundamentals, Reference Data, Analysis
- ✅ 20+ operations including:
  - Core Data: Get Quote, Get Price, Get Time Series, Get EOD, Exchange Rate, Currency Conversion
  - Fundamentals: Get Profile, Get Dividends, Get Earnings, Get Statistics
  - Reference Data: List Stocks/Forex/Crypto/ETFs/Indices/Exchanges, Symbol Search, Market State
  - Analysis: Technical Indicators (placeholder for future expansion)
- ✅ Comprehensive documentation with setup guides
- ✅ Declarative routing implementation for easy maintenance
- ✅ TypeScript strict mode with full type safety
- ✅ Light and dark theme icon support

## Development

### Prerequisites

- Node.js v18 or higher (tested with v22)
- npm v10.x (npm 11.x has known issues with lock files)
- n8n (included in dev dependencies via `n8n-node dev`)

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/n8n-nodes-twelve-data.git
cd n8n-nodes-twelve-data

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start n8n with your node and watch for changes
- `npm run build` - Build for production
- `npm run lint` - Check code quality
- `npm run lint:fix` - Auto-fix linting issues

### Project Structure

```
n8n-nodes-twelve-data/
├── credentials/
│   └── TwelveDataApi.credentials.ts    # API authentication with dual auth methods
├── nodes/
│   └── TwelveData/
│       ├── TwelveData.node.ts          # Main node implementation (1,170+ lines)
│       └── TwelveData.node.json       # Node metadata and search aliases
├── icons/
│   ├── twelvedata.svg                  # Light theme icon
│   └── twelvedata.dark.svg             # Dark theme icon
├── docs/
│   ├── CREDENTIALS_SETUP.md            # Step-by-step setup guide
│   ├── CREDENTIALS.md                  # Technical authentication details
│   └── OPENAPI_ANALYSIS.md             # Complete API endpoint reference
├── openapi-spec.json                    # Twelve Data OpenAPI specification
├── .npmrc                               # npm configuration (legacy-peer-deps)
├── .cursorrules                        # Development guidelines
└── package.json                         # Project configuration
```

### Implementation Details

- **Declarative Style**: Uses n8n's declarative routing approach for maintainability
- **Type Safety**: Full TypeScript with strict mode enabled
- **Authentication**: Automatic API key injection via query parameter (required by Twelve Data API)
- **Error Handling**: Comprehensive credential testing and validation
- **Documentation**: Extensive inline comments for beginners

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[MIT](LICENSE.md)

## Disclaimer

This is a community-maintained node and is not officially affiliated with Twelve Data or n8n. Use at your own risk.

---

**Made with ❤️ for the n8n community**
