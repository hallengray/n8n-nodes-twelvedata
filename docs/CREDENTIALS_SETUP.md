# Twelve Data Credentials Setup Guide

This guide walks you through getting your Twelve Data API key and setting it up in n8n.

---

## Getting Your API Key

### Step 1: Create a Twelve Data Account

1. Go to [https://twelvedata.com](https://twelvedata.com)
2. Click **"Get Free API Key"** or **"Sign Up"** (top right)
3. Create an account with your email address
4. Check your email and verify your email address
5. Log in to your Twelve Data account

### Step 2: Find Your API Key

1. After logging in, you'll be on your **Dashboard**
2. Your API key will be displayed prominently on the main dashboard
   - It looks like a long string: `a1b2c3d4e5f6g7h8i9j0...`
3. Click the **"Copy"** button to copy it to your clipboard
4. **Keep this key secure** - treat it like a password!

**Alternative:** You can also find your API key at:
- [https://twelvedata.com/account/api-keys](https://twelvedata.com/account/api-keys)

---

## Adding Credentials in n8n

### Step 1: Open Credentials Menu

1. In n8n, click your **profile icon** (top right corner)
2. Click **"Settings"**
3. Click **"Credentials"** in the left sidebar
4. Click the **"Create"** button (top right)

### Step 2: Select Twelve Data

1. In the search box, type **"twelve data"**
2. Click **"Twelve Data API"** from the list
   - You should see a financial chart icon 📊

### Step 3: Configure Your Credentials

1. **API Key** (required)
   - Paste your API key from Twelve Data
   - This field is password-protected (shows dots)

2. **Authentication Method** (required)
   - Choose how to send your API key:
     - **Header (Recommended)** - Sends API key in Authorization header
     - **Query Parameter** - Adds API key to URL

3. **Test the Connection**
   - Click the **"Test"** button
   - You should see: ✅ **"Connection tested successfully"**
   - If it fails, see [Troubleshooting](#troubleshooting) below

4. **Name Your Credential** (optional)
   - Give it a descriptive name like "My Twelve Data Account"
   - Helpful if you have multiple API keys

5. **Save**
   - Click **"Save"** button
   - Your credential is now ready to use!

---

## Authentication Methods Explained

### Header Method (Recommended) ✅

**How it works:**
```
Authorization: apikey YOUR_API_KEY
```

**Advantages:**
- ✅ More secure (not visible in URL logs)
- ✅ Better for production use
- ✅ Recommended by Twelve Data
- ✅ Won't appear in browser history

**Use when:**
- Deploying to production
- Security is a priority
- Working with sensitive data

**Example Request:**
```bash
curl -H "Authorization: apikey YOUR_API_KEY" \
  "https://api.twelvedata.com/quote?symbol=AAPL"
```

---

### Query Parameter Method

**How it works:**
```
https://api.twelvedata.com/quote?symbol=AAPL&apikey=YOUR_KEY
```

**Advantages:**
- ✅ Simpler for testing
- ✅ Works with all tools/browsers
- ✅ Good for quick debugging
- ✅ Compatible with all proxies

**Use when:**
- Testing and development
- Debugging API issues
- Using tools that don't support custom headers

**Example Request:**
```bash
curl "https://api.twelvedata.com/quote?symbol=AAPL&apikey=YOUR_API_KEY"
```

---

## Troubleshooting

### ❌ "Connection test failed"

**Possible Causes:**
- Invalid API key (typo or wrong key)
- API key expired or revoked
- Firewall blocking the request
- Twelve Data API is temporarily down
- Network connectivity issues

**Solutions:**

1. **Verify Your API Key**
   - Go to [Twelve Data Dashboard](https://twelvedata.com/account/api-keys)
   - Check if the key is active
   - Copy it again (avoid extra spaces)

2. **Generate a New API Key**
   - In your Twelve Data dashboard
   - Create a new key
   - Delete the old one if needed

3. **Check Your Internet Connection**
   - Make sure you can access https://api.twelvedata.com
   - Check if your firewall allows outbound HTTPS

4. **Check API Status**
   - Visit [Twelve Data Status Page](https://status.twelvedata.com)
   - Check if there are any ongoing incidents

---

### ⚠️ "Rate limit exceeded" (HTTP 429)

**What it means:**
- You've exceeded your plan's API call limits
- Free tier: 8 requests/minute, 800 requests/day

**Solutions:**

1. **Wait a minute** and try again
2. **Upgrade your plan** at [Twelve Data Pricing](https://twelvedata.com/pricing)
3. **Optimize your workflows** to make fewer API calls
4. **Cache results** when possible

---

### 🔍 Can't find "Twelve Data API" in credentials list

**Possible Causes:**
- Node package not installed correctly
- n8n needs to be restarted
- Build/compilation errors

**Solutions:**

1. **Restart n8n**
   - Stop the n8n server
   - Start it again
   - Wait for full startup

2. **Check Installation**
   - Go to Settings → Community Nodes
   - Verify `n8n-nodes-twelve-data` is listed

3. **Reinstall the Package** (if needed)
   ```bash
   npm install n8n-nodes-twelve-data
   ```

---

### 🚫 "Forbidden" (HTTP 403)

**What it means:**
- Your API key doesn't have permission for this endpoint
- Endpoint requires a higher subscription tier

**Solutions:**

1. **Check your plan** at [Twelve Data Pricing](https://twelvedata.com/pricing)
2. **Upgrade if needed** for premium endpoints
3. **Use trial symbols** for testing premium features
   - Some symbols are available for testing on all plans

---

## API Key Limits by Plan

| Plan      | Requests/Min | Requests/Day | Price       |
|-----------|-------------|--------------|-------------|
| **Free**  | 8           | 800          | $0/month    |
| **Basic** | 30          | 3,000        | ~$10/month  |
| **Pro**   | 60          | 10,000       | ~$30/month  |
| **Premium** | Unlimited | Unlimited    | Custom      |

**Note:** Prices are approximate. Check [Twelve Data Pricing](https://twelvedata.com/pricing) for current rates.

---

## Security Best Practices

### ✅ DO:

- **Use environment variables** for API keys in production
- **Rotate API keys regularly** (every 3-6 months)
- **Use different keys** for development and production
- **Store keys securely** (use n8n credentials, not hardcoded)
- **Monitor API usage** in your Twelve Data dashboard
- **Set up alerts** for unusual activity
- **Use Header authentication** in production environments

### ❌ DON'T:

- **Share API keys** in public repositories
- **Commit API keys** to version control (git)
- **Share your API key** with others
- **Use production keys** for testing
- **Expose keys** in client-side code
- **Log API keys** in application logs
- **Email API keys** in plain text

---

## Demo API Key

For quick testing, Twelve Data provides a demo API key:

**API Key:** `demo`

**Limitations:**
- Very limited functionality
- Restricted to specific symbols
- Low rate limits
- Not suitable for production

**Use for:**
- Initial testing
- Learning the API
- Proof of concept

**Remember:** Replace with your personal API key for real use!

---

## Multiple API Keys

You can create multiple credentials in n8n for different purposes:

**Example Setup:**
- **"Twelve Data - Development"** - Free tier key for testing
- **"Twelve Data - Production"** - Paid tier key for live workflows
- **"Twelve Data - Demo"** - Demo key for examples

**To create multiple credentials:**
1. Follow the setup steps above
2. Use different names for each credential
3. Select the appropriate credential in each workflow

---

## Getting Help

### Twelve Data Support

- **Email:** support@twelvedata.com
- **Documentation:** [https://twelvedata.com/docs](https://twelvedata.com/docs)
- **Status Page:** [https://status.twelvedata.com](https://status.twelvedata.com)

### n8n Community

- **Community Forum:** [https://community.n8n.io](https://community.n8n.io)
- **Documentation:** [https://docs.n8n.io](https://docs.n8n.io)

### This Package

- **GitHub Issues:** [Report bugs or request features](https://github.com/yourusername/n8n-nodes-twelve-data/issues)
- **Documentation:** See other docs in the `docs/` folder

---

## Next Steps

Once your credentials are set up:

1. ✅ **Create your first workflow** using Twelve Data nodes
2. ✅ **Test with simple queries** (e.g., get stock quote)
3. ✅ **Explore available endpoints** in the node documentation
4. ✅ **Monitor your API usage** in Twelve Data dashboard

**Happy automating!** 🚀

---

*Last Updated: December 2025*










