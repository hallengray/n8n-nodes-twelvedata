# Twelve Data API Credentials

This document explains how to set up and use the Twelve Data API credentials in your n8n node.

## Getting Your API Key

1. Go to [Twelve Data](https://twelvedata.com/register) and create an account
2. Navigate to your [API Keys dashboard](https://twelvedata.com/account/api-keys)
3. Copy your API key

## Setting Up Credentials in n8n

When you use the Twelve Data node in n8n, you'll need to configure the credentials:

### Fields:

1. **API Key** (required)
   - Your Twelve Data API key
   - This field is password-protected for security
   - Get it from: https://twelvedata.com/account/api-keys

2. **Authentication Method** (required)
   - Choose how to send the API key to Twelve Data
   - Options:
     - **Header (Recommended)**: Sends API key in `Authorization: apikey YOUR_KEY` header
     - **Query Parameter**: Sends API key as `?apikey=YOUR_KEY` in the URL

## Authentication Methods Explained

### Header Method (Recommended) ✅

**How it works:**
```
Authorization: apikey YOUR_API_KEY
```

**Advantages:**
- More secure (not visible in URL logs)
- Better for production use
- Recommended by Twelve Data

**Example Request:**
```bash
curl -H "Authorization: apikey YOUR_API_KEY" \
  "https://api.twelvedata.com/quote?symbol=AAPL"
```

### Query Parameter Method

**How it works:**
```
https://api.twelvedata.com/endpoint?apikey=YOUR_API_KEY
```

**Advantages:**
- Simpler for testing
- Works with all tools/browsers
- Good for quick debugging

**Example Request:**
```bash
curl "https://api.twelvedata.com/quote?symbol=AAPL&apikey=YOUR_API_KEY"
```

## Testing Your Credentials

The credential includes an automatic test that:
1. Calls the `/stocks` endpoint
2. Verifies your API key is valid
3. Confirms the authentication method works

If the test fails:
- Check your API key is correct
- Verify your account is active
- Ensure you haven't exceeded rate limits

## Demo API Key

For testing purposes, Twelve Data provides a demo API key:
- API Key: `demo`
- Limited functionality
- Good for initial testing only
- Replace with your personal key for production use

## Security Best Practices

1. **Never commit API keys to git**
   - The `.env` and `.env.local` files are already in `.gitignore`
   - Store keys in environment variables or n8n credentials

2. **Use Header authentication in production**
   - More secure than query parameters
   - Keys won't appear in server logs

3. **Rotate keys regularly**
   - Generate new keys periodically
   - Revoke old keys from your dashboard

4. **Monitor usage**
   - Check your API usage dashboard
   - Set up alerts for unusual activity

## Rate Limits

Different subscription tiers have different rate limits:
- Free tier: Limited requests per minute
- Paid tiers: Higher limits based on plan

When you exceed rate limits, you'll get:
```json
{
  "code": 429,
  "message": "Too Many Requests",
  "status": "error"
}
```

## Troubleshooting

### Error: "Invalid API key"
- Double-check your API key
- Ensure no extra spaces
- Verify account is active

### Error: "Too Many Requests"
- You've hit rate limits
- Wait a few minutes
- Consider upgrading your plan

### Error: "Forbidden"
- Endpoint requires higher tier plan
- Check [pricing page](https://twelvedata.com/pricing)
- Use trial symbols for testing premium features

## Related Documentation

- [Twelve Data API Documentation](https://twelvedata.com/docs)
- [API Key Management](https://twelvedata.com/account/api-keys)
- [Pricing & Plans](https://twelvedata.com/pricing)
- [OpenAPI Analysis](./OPENAPI_ANALYSIS.md)

---

*Last Updated: December 2025*

