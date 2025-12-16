# Fix n8n Credential Configuration - Step by Step

## ✅ Confirmed: Your API Key Works!

Your curl test returned HTTP 200, which means:
- API Key: `b0d7b14f6652413b9dc80cb41e498568` is **VALID**
- Twelve Data API is accessible
- The problem is in n8n's credential configuration

---

## 🔧 Fix Steps

### Step 1: Open n8n
1. Go to your browser where n8n is running
2. Usually: http://localhost:5678

### Step 2: Delete Old Credential
1. Click **Settings** (gear icon, top right)
2. Click **Credentials** in the left sidebar
3. Find **"Twelve Data API"** credential
4. Click the **3 dots** (⋮) on the right
5. Click **Delete**
6. Confirm deletion

### Step 3: Create New Credential
1. Still in Credentials page, click **"Add Credential"** (top right)
2. Search for **"Twelve Data"**
3. Click **"Twelve Data API"**

### Step 4: Configure Credential
1. **API Key field:**
   - Paste: `b0d7b14f6652413b9dc80cb41e498568`
   - Make sure there are NO extra spaces before or after
   - The field should show dots/asterisks after pasting

2. **Authentication Method:**
   - Select: **"Query Parameter"**
   - (Not "Header (Recommended)")

3. **Click "Test"** button (bottom of form)
   - You should see: ✅ "Connection tested successfully" (green checkmark)
   - If you see ❌ red error, the credential setup has a bug

4. **Give it a name** (optional):
   - Name: "Twelve Data Account" (or leave default)

5. **Click "Save"**

### Step 5: Update Your Workflow Node
1. Go back to your workflow
2. Click on the **"Twelve Data"** node
3. At the top, find **"Credential to connect with"**
4. From the dropdown, select **"Twelve Data Account"** (or whatever you named it)
5. Make sure it's not blank!

### Step 6: Test the Workflow
1. Keep the parameters:
   - Resource: **Core Data**
   - Operation: **Get Quote**
   - Symbol: **AAPL**
2. Click **"Execute Node"** (or "Test step")
3. You should see: ✅ Success with Apple stock data

---

## 🐛 If Still Getting 401 After These Steps

Then there's a bug in the credential code. We'll need to debug the `authenticate` function.

**Possible issues:**
1. The `routing.send` configuration isn't working
2. The credential's `authenticate` function isn't being called
3. n8n isn't passing credentials to declarative routing

**Next debugging step:**
Add console.log statements to the credential file to see what's happening.

---

## 📸 What Success Looks Like

After executing the node, you should see:

```json
{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "exchange": "NASDAQ",
  "mic_code": "XNGS",
  "currency": "USD",
  "datetime": "2025-12-01",
  "timestamp": 1764599400,
  "open": "278.010010",
  "high": "283.42...",
  ...
}
```

---

## 🆘 Report Back

After following these steps, let me know:
1. ✅ Did the credential **Test** pass (green checkmark)?
2. ✅ Did the workflow node execution succeed?
3. ❌ If still failing, what's the exact error message?

If it still fails after re-creating the credential, we'll need to add debug logging to the code.





