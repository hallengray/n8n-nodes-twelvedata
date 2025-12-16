# Development Guide

This document contains internal development information for the n8n-nodes-twelve-data project. This information is for the development team and client only - not for public distribution.

## Prerequisites

- Node.js v18 or higher (tested with v22)
- npm v10.x (npm 11.x has known issues with lock files)
- n8n (included in dev dependencies via `n8n-node dev`)

## Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/n8n-nodes-twelve-data.git
cd n8n-nodes-twelve-data

# Install dependencies
npm install

# Start development server
npm run dev
```

## Available Scripts

- `npm run dev` - Start n8n with your node and watch for changes
- `npm run build` - Build for production
- `npm run lint` - Check code quality
- `npm run lint:fix` - Auto-fix linting issues

## Project Structure

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

## Implementation Details

- **Declarative Style**: Uses n8n's declarative routing approach for maintainability
- **Type Safety**: Full TypeScript with strict mode enabled
- **Authentication**: Automatic API key injection via query parameter (required by Twelve Data API)
- **Error Handling**: Comprehensive credential testing and validation
- **Documentation**: Extensive inline comments for beginners

## Testing Status

This node is **production-ready** with thorough testing completed on all endpoints accessible with the free Twelve Data API tier.

### What "Production-Ready" Means

All operations that can be tested with a free Twelve Data account have been thoroughly tested and verified working. This represents comprehensive coverage of the core functionality that most users will need.

**Testing Highlights:**
- ✅ 100% success rate on all testable free-tier endpoints
- ✅ Comprehensive error handling validated
- ✅ Parameter variations tested (stocks, forex, crypto)
- ✅ Integration testing with other n8n nodes completed
- ✅ UI/UX validation passed

### Testing Breakdown by Category

| Category | Tested | Status | Notes |
|----------|--------|--------|-------|
| **Core Data** | 8/9 operations | ✅ Production Ready | 1 planned endpoint not yet in REST API |
| **Fundamentals** | 10/16 operations | ✅ Production Ready | 6 require paid API tier |
| **Reference Data** | 15/15 operations | ✅ Production Ready | 100% coverage |
| **Market Intelligence** | 7/8 operations | ✅ Production Ready | Comprehensive testing completed |
| **Advanced** | 3/3 operations | ✅ Production Ready | 100% coverage |
| **Technical Indicators** | 91 operations | ⚠️ BETA | Functional, pending paid tier testing |

**API Tier Requirements:**
- **Free Tier (Fully Tested):** Core data, reference data, company profiles, market intelligence
- **Paid Tier Required:** Advanced fundamentals (earnings, dividends, statistics), calendars
- **Planned Endpoints:** Options chain, options expiration, complex data (not yet in REST API)

### Test Documentation

- **[Testing Log](docs/TESTING_LOG.md)** - Complete test results with JSON responses
- **[Integration Testing](docs/INTEGRATION_TESTING.md)** - Workflow integration tests
- **[Testing Plan](docs/TESTING_PLAN.md)** - Original test plan and structure

### Key Findings

- ✅ All free-tier endpoints working correctly
- ✅ Error handling validated (400, 401, 404, 422 status codes)
- ✅ Parameter variations tested (stocks, forex, crypto, intervals, filters)
- ✅ Date range filtering confirmed working
- ✅ Country and exchange filters validated
- ✅ Output size limiting verified
- ✅ Zero critical issues found

## Technical Documentation

### Credentials & Authentication

- **[Credentials Setup Guide](docs/CREDENTIALS_SETUP.md)** - How to get and configure API keys
- **[Credentials Technical Docs](docs/CREDENTIALS.md)** - Authentication details

### API Reference

- **[OpenAPI Analysis](docs/OPENAPI_ANALYSIS.md)** - Complete API endpoint reference
- **[Complete Operations Inventory](docs/COMPLETE_OPERATIONS_INVENTORY.md)** - Full list of all operations

### Technical Decisions

- **[Legacy Peer Dependencies Summary](docs/LEGACY-PEER-DEPS-SUMMARY.md)** - Quick overview (TL;DR)
- **[ADR-001: Legacy Peer Dependencies](docs/ADR-001-LEGACY-PEER-DEPS.md)** - Full investigation and decision record
- **[Dependency Removal Plan](docs/DEPENDENCY-REMOVAL-PLAN.md)** - Implementation guide
- **[N8N Verification Compliance](docs/N8N_VERIFICATION_COMPLIANCE.md)** - Compliance checklist

### Development Guides

- **[Adding Endpoints Quick Guide](docs/ADDING_ENDPOINTS_QUICK_GUIDE.md)** - How to add new endpoints
- **[Regeneration Guide](docs/REGENERATION_GUIDE.md)** - How to regenerate from OpenAPI spec

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Version History - Detailed

### 0.1.0 (Current)
- ✅ Initial release with full node implementation
- ✅ Twelve Data API credential support with automatic authentication
- ✅ Header and query parameter authentication (both methods supported)
- ✅ Credential testing functionality with automatic validation
- ✅ 6 resource categories: Core Data, Fundamentals, Reference Data, Market Intelligence, Technical Indicators, Advanced
- ✅ 142+ operations including:
  - Core Data: Get Quote, Get Price, Get Time Series, Get EOD, Exchange Rate, Currency Conversion
  - Fundamentals: 16 operations (Profile, Dividends, Earnings, Statistics, Balance Sheet, Cash Flow, Income Statement, etc.)
  - Reference Data: 15 operations (List Stocks/Forex/Crypto/ETFs/Indices/Exchanges, Symbol Search, Market State)
  - Market Intelligence: 8 operations (Analyst Ratings, Price Target, Recommendations, Earnings/Revenue Estimates, etc.)
  - Technical Indicators: 91 operations (Moving Averages, Momentum, Volatility, Volume, Trend, Statistical, etc.)
  - Advanced: 3 operations (API Usage, Batch Request, Get Logo)
- ✅ Comprehensive documentation with setup guides
- ✅ Declarative routing implementation for easy maintenance
- ✅ TypeScript strict mode with full type safety
- ✅ Light and dark theme icon support
- ✅ **Zero runtime dependencies** - Compliant with n8n verification guidelines
- ✅ **100% test success rate** - All applicable tests passed

---

**For Internal Use Only - Do Not Publish**
