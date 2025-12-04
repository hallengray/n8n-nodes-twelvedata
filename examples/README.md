# Example Workflows for Twelve Data n8n Node

This directory contains example n8n workflows demonstrating how to use the Twelve Data node with other n8n nodes.

## How to Import

1. Open n8n
2. Go to **Workflows** → **Import from File**
3. Select the JSON file you want to import
4. Update credentials:
   - Replace `YOUR_CREDENTIAL_ID` with your Twelve Data credential ID
   - Replace `YOUR_GOOGLE_CREDENTIAL_ID` with your Google Sheets credential ID (if applicable)
   - Replace `YOUR_SPREADSHEET_ID` with your Google Sheet ID (if applicable)
   - Replace `YOUR_WEBHOOK_ID` with your webhook.site ID (if applicable)

## Available Examples

### 1. Stock Price to Google Sheets
**File:** `stock-price-to-sheets.json`

Fetches a stock quote and appends it to a Google Sheet.

**Workflow:**
```
Manual Trigger → Twelve Data (Get Quote) → Google Sheets (Append)
```

**Use Cases:**
- Track stock prices over time
- Build a price history spreadsheet
- Create automated price logging

**Requirements:**
- Twelve Data API credentials
- Google Sheets API credentials
- A Google Sheet to write to

---

### 2. Crypto Alert Webhook
**File:** `crypto-alert-webhook.json`

Monitors crypto prices and sends a webhook alert when price change exceeds a threshold.

**Workflow:**
```
Manual Trigger → Twelve Data (Get Quote) → IF (Check Change) → HTTP Request (Webhook)
```

**Use Cases:**
- Price movement alerts
- Trading signals
- Integration with messaging platforms (Slack, Discord, etc.)

**Requirements:**
- Twelve Data API credentials
- Webhook endpoint (e.g., webhook.site, Slack webhook, etc.)

---

### 3. Market Data Conditional Logic
**File:** `market-data-conditional.json`

Uses IF node to route data based on whether a stock is up or down.

**Workflow:**
```
Manual Trigger → Twelve Data (Get Quote) → IF (Up/Down?) → Set (Format Data)
```

**Use Cases:**
- Different actions based on market direction
- Conditional notifications
- Data transformation based on conditions

**Requirements:**
- Twelve Data API credentials

---

### 4. Multi-Symbol Loop
**File:** `multi-symbol-loop.json`

Loops through a list of stock symbols and fetches quotes for each.

**Workflow:**
```
Manual Trigger → Set (Symbol List) → Loop → Twelve Data (Get Quote) → Wait → Aggregate
```

**Use Cases:**
- Portfolio monitoring
- Batch price fetching
- Multi-stock analysis

**Requirements:**
- Twelve Data API credentials

**Notes:**
- Includes a delay between requests to respect rate limits
- Aggregates all results at the end

---

### 5. Forex Rate Comparison
**File:** `forex-rate-comparison.json`

Fetches multiple forex pairs in parallel and compares their performance.

**Workflow:**
```
Manual Trigger → [EUR/USD Quote, GBP/USD Quote] → Format → Merge → Compare
```

**Use Cases:**
- Currency comparison
- Forex trading analysis
- Multi-pair monitoring

**Requirements:**
- Twelve Data API credentials

---

## Customization Tips

### Changing Symbols
In any workflow, you can change the symbol by editing the Twelve Data node:
- For stocks: `AAPL`, `MSFT`, `GOOGL`, etc.
- For forex: `EUR/USD`, `GBP/USD`, `USD/JPY`, etc.
- For crypto: `BTC/USD`, `ETH/USD`, `XRP/USD`, etc.

### Adding More Operations
You can change the operation in the Twelve Data node:
- **Get Quote** - Real-time price data
- **Get Time Series** - Historical price data
- **Get Exchange Rate** - Currency conversion rates
- **List Stocks/Forex/Crypto** - Reference data

### Rate Limiting
The free tier of Twelve Data has rate limits. If you're making multiple requests:
- Add a **Wait** node between requests (0.5-1 second delay)
- Use the **Split in Batches** node for large lists
- Monitor for 429 (rate limit) errors

## Troubleshooting

### "Invalid API Key" Error
- Check that your Twelve Data credentials are correctly configured
- Verify your API key at [twelvedata.com](https://twelvedata.com)

### "Symbol Not Found" Error
- Verify the symbol format (e.g., `AAPL` for stocks, `EUR/USD` for forex)
- Check if the symbol is supported by Twelve Data

### Rate Limit Errors
- Add delays between requests
- Reduce the number of concurrent requests
- Consider upgrading your Twelve Data plan

## Contributing

Feel free to contribute additional example workflows by submitting a pull request!

