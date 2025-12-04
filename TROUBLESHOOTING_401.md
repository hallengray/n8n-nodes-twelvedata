# Troubleshooting 401 Error - Twelve Data n8n Node

## Current Status
- ❌ Getting 401 error: "**apikey** parameter is incorrect or not specified"
- ❌ Switching to Query Parameter authentication did NOT fix it
- ⚠️ Need to verify if API key is valid

---

## Diagnostic Checklist

### 1. Verify API Key is Valid

**Test your API key directly:**

```bash
# Windows PowerShell
curl "https://api.twelvedata.com/quote?symbol=AAPL&apikey=YOUR_API_KEY"

# Expected SUCCESS response (HTTP 200):
{
  "symbol": "AAPL",
  "name": "Apple Inc",
  "exchange": "NASDAQ",
  ...
}

# If you get 401 error here, your API key is invalid/expired
```

**Where to get your API key:**
1. Go to https://twelvedata.com/account/api-keys
2. Copy the API key (should be a long alphanumeric string)
3. Make sure you copy the ENTIRE key (no spaces, no truncation)

---

### 2. Check n8n Credential Configuration

**In n8n UI:**

1. **Go to:** Settings (top right) → Credentials
2. **Find:** "Twelve Data API" credential
3. **Click:** Edit
4. **Verify:**
   - ✅ API Key field is filled in (should show dots/asterisks)
   - ✅ Authentication Method is set to "Query Parameter"
5. **Click:** "Test" button
6. **Expected:** Green checkmark with "Connection tested successfully"

**If the test FAILS:**
- Your API key is invalid, expired, or incorrectly copied
- Go back to Twelve Data dashboard and regenerate a new API key

**If the test PASSES but workflow still fails:**
- There's a bug in how the node is using the credentials
- Continue to Step 3

---

### 3. Check if Credential is Selected in Node

**In your workflow:**

1. **Click** on the "Twelve Data" node
2. **Look at** the "Credential to connect with" field at the top
3. **Verify:** "Twelve Data account" is selected (not blank)
4. **If blank:** Select your credential from the dropdown

---

### 4. Verify Node Configuration

**In the node parameters:**

- ✅ Resource: "Core Data"
- ✅ Operation: "Get Quote"
- ✅ Symbol: "AAPL" (or any valid symbol)
- ✅ No additional options that might interfere

---

### 5. Check n8n Logs for More Details

**To see detailed error logs:**

1. **In your terminal** where n8n is running (Terminal 5)
2. **Look for** error messages when you execute the node
3. **Check for:**
   - "Credential not found"
   - "API key is undefined"
   - "Authentication failed"
   - Any stack traces

**Share the full error message** if you see anything beyond just "401"

---

### 6. Common Issues with Free Accounts

**Twelve Data Free Plan Limitations:**
- ✅ 800 API calls per day
- ✅ Real-time data with 15-minute delay
- ✅ Most endpoints work fine
- ❌ Some premium endpoints are restricted

**The `/quote` endpoint SHOULD work on free plan!**

If you're hitting rate limits:
- Error would be HTTP 429 (Too Many Requests), not 401
- Error message would mention "rate limit exceeded"

---

## Possible Root Causes

### Most Likely (90% probability):
1. **API key not copied correctly** - Extra spaces, truncated, wrong key
2. **Credential not selected in node** - Node isn't using any credential
3. **API key expired** - Twelve Data keys can expire

### Less Likely (10% probability):
4. **Bug in credential authentication logic** - Code issue
5. **n8n not passing credentials** - n8n configuration issue
6. **Twelve Data API changed** - API endpoint requirements changed

---

## Next Steps

### Step A: Test API Key Manually
Run the curl command above with your actual API key.

**If curl returns 401:**
→ Your API key is invalid. Get a new one from Twelve Data dashboard.

**If curl returns 200 (success):**
→ Your API key works! The problem is in n8n configuration. Continue to Step B.

### Step B: Re-create Credential in n8n
1. Delete the existing "Twelve Data API" credential
2. Create a NEW credential
3. Paste your API key (carefully, no extra spaces)
4. Set Authentication Method to "Query Parameter"
5. Click "Test" - must show green checkmark
6. Save
7. Go to your workflow node and select the new credential
8. Execute the workflow

### Step C: Enable Debug Mode
If still failing, we need to see what's actually being sent to the API.

**Add this to your n8n startup:**
```bash
# Stop n8n (press 'q' in terminal 5)
# Then restart with debug logging:
N8N_LOG_LEVEL=debug npm run dev
```

This will show the actual HTTP requests being made.

---

## Report Back

Please share:
1. ✅ Result of curl test (did it work with your API key?)
2. ✅ Result of credential test in n8n (green checkmark or error?)
3. ✅ Screenshot or text of any error messages in n8n logs
4. ✅ Confirmation that credential is selected in the node

This will help me pinpoint the exact issue!





