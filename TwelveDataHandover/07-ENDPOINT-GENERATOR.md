# How to Use the Endpoint Generator - Complete Beginner's Guide

**For non-technical users who want to add new endpoints to the connector**

---

## What is This Tool?

Imagine you have a LEGO instruction manual that writes itself! The endpoint generator is like a smart assistant that writes most of the code for you when the Twelve Data API adds new features. Instead of typing everything from scratch, it gives you ready-to-use code that you just need to copy and paste.

**Time saved:** About 10-15 minutes per new endpoint!

---

## When Do You Use This?

You'll use this tool after running the regeneration script when it tells you there are new endpoints available. Think of it like this:

1. **Check for updates** → "Hey, are there any new features?"
2. **Regeneration finds changes** → "Yes! There are 3 new features!"
3. **Endpoint generator** → "Here's the code for those 3 features, ready to copy!"
4. **You paste the code** → Done! (mostly)

---

## Step-by-Step Instructions

### **Step 1: Run the Regeneration Script First**

Before using the endpoint generator, you need to check if there are any changes:

```bash
./scripts/regenerate.sh
```

**What happens:**
- The script downloads the latest API information
- Creates a file called `change-report-YYYY-MM-DD-HH-MM-SS.json`
- Tells you if there are new endpoints

**Look for this message:**
```
✓ Change report generated: change-report-2024-12-18-10-30-45.json
```

**Write down that filename!** You'll need it in the next step.

---

### **Step 2: Run the Endpoint Generator**

Now let's generate the code templates:

```bash
node scripts/generate-endpoint-template.js
```

**What you'll see:**
The script will show you something like this for each new endpoint:

```
1. GET /macd_slope
   Category: technicalIndicators
   Operation: getMacdSlope

   📋 Copy this code to nodes/TwelveData/operations/technicalIndicators.ts:

{
  name: 'MACD Slope',
  value: 'getMacdSlope',
  action: 'Calculate MACD Slope',
  description: 'Moving Average Convergence Divergence Slope indicator',
  routing: {
    request: {
      method: 'GET',
      url: '/macd_slope',
    },
  },
}

   📝 Parameters to add:
   Required: symbol, interval
   Optional: series_type, fast_period, slow_period
```

---

### **Step 3: Understanding What You See**

Let's break down what each part means:

#### **The Header:**
```
1. GET /macd_slope
   Category: technicalIndicators
   Operation: getMacdSlope
```

- **`1.`** = This is the first new endpoint (if there are more, you'll see 2., 3., etc.)
- **`GET /macd_slope`** = This is the API endpoint path (like a web address)
- **`Category: technicalIndicators`** = This tells you which file to edit
- **`Operation: getMacdSlope`** = This is the internal name for this feature

#### **The Code Block:**
```javascript
{
  name: 'MACD Slope',
  value: 'getMacdSlope',
  action: 'Calculate MACD Slope',
  description: 'Moving Average Convergence Divergence Slope indicator',
  routing: {
    request: {
      method: 'GET',
      url: '/macd_slope',
    },
  },
}
```

This is the code you'll copy and paste. **Don't change anything in this code yet!**

#### **The Parameters Section:**
```
📝 Parameters to add:
Required: symbol, interval
Optional: series_type, fast_period, slow_period
```

This tells you what extra information this endpoint needs. We'll handle this in Step 5.

---

### **Step 4: Copy and Paste the Code**

Now comes the fun part - adding the code to your project!

#### **4.1: Find the Right File**

The generator tells you which file to edit. Look for this line:
```
📋 Copy this code to nodes/TwelveData/operations/technicalIndicators.ts:
```

In this example, you need to open:
```
nodes/TwelveData/operations/technicalIndicators.ts
```

**How to find it:**
1. Open your code editor (like VS Code)
2. Look in the left sidebar for the `nodes` folder
3. Click to expand it
4. Find `TwelveData` folder and expand it
5. Find `operations` folder and expand it
6. Click on `technicalIndicators.ts` to open it

**Visual guide:**
```
📁 nodes
  └─ 📁 TwelveData
      └─ 📁 operations
          ├─ 📄 advanced.ts
          ├─ 📄 coreData.ts
          ├─ 📄 fundamentals.ts
          ├─ 📄 marketIntelligence.ts
          ├─ 📄 referenceData.ts
          └─ 📄 technicalIndicators.ts  ← Open this one!
```

#### **4.2: Find the Right Spot to Paste**

Once the file is open, scroll down until you see a section that looks like this:

```typescript
export const technicalIndicatorsOperations: INodePropertyOptions[] = [
	{
		name: 'ADX - Average Directional Index',
		value: 'adx',
		action: 'Calculate ADX indicator',
		// ... more code ...
	},
	{
		name: 'MACD - Moving Average Convergence Divergence',
		value: 'macd',
		action: 'Calculate MACD indicator',
		// ... more code ...
	},
	// ← You'll paste your new code somewhere around here
];
```

**Where exactly to paste?**

Look for the **closing bracket and comma** pattern: `},`

Each operation ends with `},` and then the next one starts. You want to paste your new code:
- **After** an existing operation's closing `},`
- **Before** the final `];` at the end of the array

**Good spot example:**
```typescript
	{
		name: 'MACD - Moving Average Convergence Divergence',
		value: 'macd',
		action: 'Calculate MACD indicator',
		routing: {
			request: {
				method: 'GET',
				url: '/macd',
			},
		},
	},  ← After this comma
	// ← PASTE YOUR NEW CODE HERE
	{
		name: 'RSI - Relative Strength Index',
		// ... next operation ...
	},
```

#### **4.3: Paste the Code**

1. **Copy the code** from the terminal (the part between the `{` and `}` including the brackets)
2. **Click** in the file where you want to paste
3. **Paste** the code (Ctrl+V on Windows, Cmd+V on Mac)
4. **Make sure** it has a comma after the closing `}`

**Your pasted code should look like this:**
```typescript
	{
		name: 'MACD Slope',
		value: 'getMacdSlope',
		action: 'Calculate MACD Slope',
		description: 'Moving Average Convergence Divergence Slope indicator',
		routing: {
			request: {
				method: 'GET',
				url: '/macd_slope',
			},
		},
	},  ← Don't forget this comma!
```

**⚠️ Common Mistakes to Avoid:**

❌ **Missing comma:**
```typescript
	}  ← Missing comma here!
	{
		name: 'Next Operation',
```

✅ **Correct:**
```typescript
	},  ← Comma is here!
	{
		name: 'Next Operation',
```

❌ **Wrong indentation:**
```typescript
{
name: 'MACD Slope',  ← Not indented properly
value: 'getMacdSlope',
```

✅ **Correct:**
```typescript
	{
		name: 'MACD Slope',  ← Properly indented with tabs
		value: 'getMacdSlope',
```

#### **4.4: Save the File**

Press `Ctrl+S` (Windows) or `Cmd+S` (Mac) to save the file.

---

### **Step 5: Add Parameters (The Tricky Part)**

Remember those parameters the generator listed? Now we need to add them properly.

**What the generator showed you:**
```
📝 Parameters to add:
Required: symbol, interval
Optional: series_type, fast_period, slow_period
```

**What this means:**
- **Required** = Users MUST provide this information
- **Optional** = Users CAN provide this, but don't have to

#### **5.1: Understanding Parameters**

Think of parameters like filling out a form:
- **Symbol** = Which stock? (like "AAPL" for Apple)
- **Interval** = What time period? (like "1day" or "1hour")
- **Series_type** = What kind of data? (like "close" price or "open" price)

#### **5.2: Where to Find Parameter Code**

This is where you need to look at the OpenAPI specification file or existing examples in the same file.

**Easy method - Copy from similar operations:**

1. Look for an operation in the same file that uses similar parameters
2. Scroll down past the operations array
3. Find the parameters section
4. Copy the parameter definitions you need

**Example - Finding the symbol parameter:**

Scroll down in the same file until you see something like:
```typescript
export const technicalIndicatorsSymbolParameter: INodeProperties = {
	displayName: 'Symbol',
	name: 'symbol',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'e.g., AAPL, MSFT, GOOGL',
	description: 'Stock symbol',
	// ... more code
};
```

**Good news!** Most parameters are already defined in the file. You just need to make sure they show up for your new operation.

#### **5.3: Making Parameters Show Up**

Parameters use something called `displayOptions` to control when they appear. This tells n8n: "Only show this parameter when the user selects this specific operation."

**Find the parameter definition** and look for this section:
```typescript
displayOptions: {
	show: {
		resource: ['technicalIndicators'],
		operation: ['adx', 'macd', 'rsi'],  ← List of operations
	},
},
```

**Add your operation to the list:**
```typescript
displayOptions: {
	show: {
		resource: ['technicalIndicators'],
		operation: ['adx', 'macd', 'rsi', 'getMacdSlope'],  ← Added here!
	},
},
```

**Do this for each parameter** your new operation needs.

---

### **Step 6: Update the Operation Count**

At the top of the file, you'll see a comment that looks like this:

```typescript
/**
 * Technical Indicators Operations
 * 
 * TOTAL: 67 operations
 */
```

**Update the number:**
- If there were 67 operations before
- And you added 1 new operation
- Change it to 68 operations

```typescript
/**
 * Technical Indicators Operations
 * 
 * TOTAL: 68 operations  ← Updated!
 */
```

---

### **Step 7: Test Your Changes**

Now let's make sure everything works!

#### **7.1: Build the Project**

Open your terminal and run:
```bash
npm run build
```

**What to look for:**
- ✅ If it says "Build successful" or similar → Great!
- ❌ If you see errors → Go to Step 7.3

#### **7.2: Check for Code Style Issues**

Run the linter:
```bash
npm run lint
```

**What to look for:**
- ✅ If it says "No errors found" → Perfect!
- ❌ If you see warnings about alphabetical order → The operations need to be sorted alphabetically by name

**Common linter error:**
```
Error: Operations must be in alphabetical order
Expected: 'MACD' before 'MACD Slope'
```

**How to fix:** Move your new operation to the correct alphabetical position in the array.

#### **7.3: Common Errors and How to Fix Them**

**Error: "Unexpected token"**
```
SyntaxError: Unexpected token
```
**Fix:** You probably forgot a comma somewhere. Check that every operation ends with `},`

**Error: "Cannot find name"**
```
Error: Cannot find name 'getMacdSlope'
```
**Fix:** Make sure the operation value matches exactly in both the operation definition and the displayOptions.

**Error: "Duplicate identifier"**
```
Error: Duplicate identifier 'getMacdSlope'
```
**Fix:** You might have pasted the code twice. Search for `getMacdSlope` and remove the duplicate.

---

### **Step 8: Test in n8n (Optional but Recommended)**

If you have n8n running locally, test your new endpoint:

1. Open n8n in your browser
2. Create a new workflow
3. Add the Twelve Data node
4. Select your new operation from the dropdown
5. Fill in the required parameters
6. Click "Execute Node"
7. Check if you get data back

**If it works:** Congratulations! 🎉

**If it doesn't work:**
- Check the error message
- Make sure your API key is valid
- Verify the parameters are correct

---

### **Step 9: Commit Your Changes**

Once everything works, save your changes to Git:

```bash
git add .
git commit -m "feat: add MACD Slope endpoint"
git push
```

**What this does:**
- `git add .` = Stages all your changes
- `git commit -m "..."` = Saves your changes with a message
- `git push` = Uploads your changes to GitHub

---

## Quick Reference Checklist

Use this checklist when adding a new endpoint:

- [ ] Run `./scripts/regenerate.sh`
- [ ] Run `node scripts/generate-endpoint-template.js`
- [ ] Open the correct file (check the "Copy this code to" line)
- [ ] Find the right spot in the operations array
- [ ] Paste the generated code
- [ ] Add a comma after the closing `}`
- [ ] Save the file
- [ ] Add parameters to displayOptions
- [ ] Update the operation count at the top
- [ ] Run `npm run build`
- [ ] Run `npm run lint`
- [ ] Fix any errors
- [ ] Test in n8n (optional)
- [ ] Commit your changes

---

## Visual Guide: Before and After

### **Before (Original File):**
```typescript
export const technicalIndicatorsOperations: INodePropertyOptions[] = [
	{
		name: 'MACD - Moving Average Convergence Divergence',
		value: 'macd',
		action: 'Calculate MACD indicator',
		description: 'MACD indicator',
		routing: {
			request: {
				method: 'GET',
				url: '/macd',
			},
		},
	},
	{
		name: 'RSI - Relative Strength Index',
		value: 'rsi',
		action: 'Calculate RSI indicator',
		description: 'RSI indicator',
		routing: {
			request: {
				method: 'GET',
				url: '/rsi',
			},
		},
	},
];
```

### **After (With New Endpoint):**
```typescript
export const technicalIndicatorsOperations: INodePropertyOptions[] = [
	{
		name: 'MACD - Moving Average Convergence Divergence',
		value: 'macd',
		action: 'Calculate MACD indicator',
		description: 'MACD indicator',
		routing: {
			request: {
				method: 'GET',
				url: '/macd',
			},
		},
	},
	{
		name: 'MACD Slope',  ← NEW!
		value: 'getMacdSlope',
		action: 'Calculate MACD Slope',
		description: 'Moving Average Convergence Divergence Slope indicator',
		routing: {
			request: {
				method: 'GET',
				url: '/macd_slope',
			},
		},
	},  ← Don't forget this comma!
	{
		name: 'RSI - Relative Strength Index',
		value: 'rsi',
		action: 'Calculate RSI indicator',
		description: 'RSI indicator',
		routing: {
			request: {
				method: 'GET',
				url: '/rsi',
			},
		},
	},
];
```

---

## Getting Help

**If you get stuck:**

1. **Check the error message** - It usually tells you what's wrong
2. **Look at existing operations** - Copy their pattern
3. **Run the linter** - It will point out formatting issues
4. **Check the documentation** - See `docs/ADDING_ENDPOINTS_QUICK_GUIDE.md`

**Common questions:**

**Q: Which file do I edit?**
A: The generator tells you! Look for the line that says "Copy this code to..."

**Q: Where exactly do I paste the code?**
A: After any existing operation's `},` and before the final `];`

**Q: Do I need to add parameters?**
A: Yes, but most are already defined. You just need to add your operation name to their displayOptions.

**Q: How do I know if it worked?**
A: Run `npm run build` and `npm run lint`. If both pass with no errors, you're good!

**Q: What if I make a mistake?**
A: Don't worry! Git saves your old code. You can always undo with `git checkout .`

---

## Summary

**What the endpoint generator does:**
- ✅ Writes 70-80% of the code for you
- ✅ Suggests which file to edit
- ✅ Lists the parameters you need
- ✅ Saves you 10-15 minutes per endpoint

**What you still need to do:**
- ⚠️ Copy and paste the code (2 minutes)
- ⚠️ Add parameters to displayOptions (5 minutes)
- ⚠️ Test that it works (5 minutes)

**Total time:** ~12 minutes instead of 25 minutes!

---

**Remember:** The endpoint generator is like a helpful assistant that does the boring typing for you. You're still the boss who decides where things go and makes sure everything works! 🚀

---

*Last updated: December 2024*
