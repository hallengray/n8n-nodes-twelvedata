# Twelve Data n8n Connector - Regeneration System Guide

**For Client Video Walkthrough**

---

## What is the Regeneration System?

Think of the regeneration system as your **maintenance toolkit** for keeping your n8n connector up-to-date.

**Simple explanation:** Twelve Data (the company providing the financial data) regularly improves their service by adding new features, improving existing ones, or occasionally changing how things work. The regeneration system helps you:

1. **Check** if Twelve Data made any changes
2. **Backup** your code before making updates (safety first!)
3. **See exactly** what changed
4. **Decide** which new features to add to your connector

**Real-world analogy:** It's like having a smart assistant that checks if your favorite app store has updates, backs up your current apps, shows you what's new, and helps you decide what to install.

---

## Why This is Important

### Without the Regeneration System:
- You'd have to manually check Twelve Data's website for changes
- You might miss new features your users would love
- Changes could break your connector without warning
- No easy way to know what's different

### With the Regeneration System:
- Automatic weekly checks for changes
- Safe backups before any updates
- Clear reports showing what's new or different
- Recommendations on what to implement next

**Bottom line:** It saves you time and helps you provide better service to your users.

---

## The Five Scripts Explained (In Plain English)

### 1. regenerate.sh - The Main Update Script

**What it does:**
This is your primary tool. It downloads the latest information about Twelve Data's API, compares it with what you have, and creates detailed reports.

**When to use it:**
- When you receive an alert that the API changed
- Once a month as routine maintenance
- Before adding new features to your connector

**How to run it:**
```bash
./scripts/regenerate.sh
```

**What happens step-by-step:**

1. **Downloads** the latest API specification from Twelve Data
   - This is a file that describes all available features
   
2. **Validates** the download to make sure it's correct
   - Checks that the file isn't corrupted
   
3. **Creates a backup** of your current code
   - Saves everything to a timestamped folder (like "2024-12-16-10-30-00")
   - You can restore from this if something goes wrong
   
4. **Archives** your current API specification
   - Keeps a copy in the `openapi-specs/` folder for reference
   
5. **Compares** old vs new to find changes
   - Runs detailed analysis to see what's different
   
6. **Generates a report** showing:
   - New endpoints (new features you could add)
   - Removed endpoints (features that went away)
   - Modified endpoints (existing features that changed)
   - Breaking changes (things that might affect your users)
   
7. **Shows recommendations** on what to do next

**Time required:** About 5 minutes

**Example output:**
```
✓ Download completed successfully
✓ JSON validation passed
✓ Backup completed: backups/2024-12-16-10-30-00
✓ Archived current spec to: openapi-specs/openapi-2024-12-16.json
ℹ Changes detected between specs
✓ Change report generated: change-report-2024-12-16.json
```

---

### 2. check-openapi-changes.sh - Quick Change Checker

**What it does:**
This is a quick health check that tells you if anything changed (takes only 30 seconds).

**When to use it:**
- As a quick check before starting work
- When users report issues
- As part of your weekly routine

**How to run it:**
```bash
./scripts/check-openapi-changes.sh
```

**What happens:**
1. Downloads the latest API specification
2. Compares it with your current version (using a "fingerprint" called a hash)
3. Tells you either:
   - "No changes detected" - You're up to date! ✓
   - "Changes detected" - Time to run the full regenerate.sh script

**Time required:** 30 seconds

**Example output if no changes:**
```
✓ No changes detected - specs are identical
```

**Example output if changes found:**
```
⚠ Changes detected between specs
ℹ Run ./scripts/regenerate.sh for detailed analysis
```

---

### 3. detect-changes.js - Detailed Change Analyzer

**What it does:**
Creates a detailed report of exactly what changed in the API. This runs automatically as part of `regenerate.sh`, but you can also run it manually.

**When to use it:**
- Usually runs automatically (you don't need to run it manually)
- Can run manually to compare any two API specification files

**How to run it manually:**
```bash
node scripts/detect-changes.js old-spec.json new-spec.json
```

**What you get:**
A detailed JSON or text report showing:

**Summary section:**
- Number of new endpoints
- Number of removed endpoints
- Number of modified endpoints
- Number of breaking changes

**New endpoints section:**
- List of all new features available
- Organized by category (Core Data, Fundamentals, etc.)

**Breaking changes section:**
- Changes that might affect your users
- Things you need to fix immediately

**Modified endpoints section:**
- Existing features that changed
- What specifically changed (parameters, responses, etc.)

**Time required:** Runs in seconds

**Example report excerpt:**
```
SUMMARY
─────────────────────────
  New endpoints:        5
  Removed endpoints:    0
  Modified endpoints:   2
  Breaking changes:     0

✨ NEW ENDPOINTS
─────────────────────────
  • GET /insider_transactions
    Get insider buying and selling activity
  
  • GET /institutional_holders
    Get institutional ownership data
```

---

### 4. validate-implementation.js - Coverage Checker

**What it does:**
Shows you which API endpoints you've implemented versus what's available. Think of it as a progress report.

**When to use it:**
- After running regeneration to see new opportunities
- When planning which features to add next
- For reporting on project status

**How to run it:**
```bash
node scripts/validate-implementation.js
```

**What you get:**

**Coverage summary:**
- Percentage of API you've implemented
- Number of endpoints implemented vs available

**Implemented operations:**
- List of everything you've built
- Details about each operation

**Suggestions:**
- Ranked list of valuable endpoints to add next
- Reasons why each is recommended
- Difficulty estimate for implementation

**Unimplemented endpoints:**
- Organized by category
- Shows what's still available to implement

**Time required:** 1-2 minutes

**Example output:**
```
COVERAGE SUMMARY
─────────────────────────
  Implemented:  45 endpoints
  Available:    142 endpoints
  Coverage:     31.7%

  [████████████░░░░░░░░░░░░░░░░] 31.7%

💡 SUGGESTED ENDPOINTS TO IMPLEMENT
─────────────────────────────────────
  1. GET /earnings
     Category: Fundamentals
     Earnings data for companies
     Parameters: 3 (1 required)
     Score: 85 - Popular endpoint, Simple parameters
```

---

### 5. manage-backups.sh - Backup Manager

**What it does:**
Manages all the backup copies of your code that the regeneration system creates.

**When to use it:**
- To see all available backups
- To restore a previous version if something goes wrong
- To clean up old backups to save disk space

**How to run it:**

**List all backups:**
```bash
./scripts/manage-backups.sh list
```

**Restore a specific backup:**
```bash
./scripts/manage-backups.sh restore 2024-12-16-10-30-00
```

**Clean up old backups:**
```bash
./scripts/manage-backups.sh cleanup
```

**Show backup details:**
```bash
./scripts/manage-backups.sh info 2024-12-16-10-30-00
```

**Verify backup integrity:**
```bash
./scripts/manage-backups.sh verify 2024-12-16-10-30-00
```

**What each command does:**

**List:** Shows all your backups with:
- Timestamp (when it was created)
- Size (how much disk space it uses)
- Number of files

**Restore:** Copies files from a backup back to your project:
- Creates a safety backup first (just in case)
- Restores nodes, credentials, and API specification
- Tells you to rebuild the project

**Cleanup:** Removes old backups based on rules:
- Keeps the last 5 backups (most recent)
- Keeps all backups less than 30 days old
- Asks for confirmation before deleting

**Info:** Shows detailed information about a backup:
- When it was created
- What files it contains
- How to restore it

**Verify:** Checks if a backup is valid:
- Verifies all essential files are present
- Checks that JSON files aren't corrupted
- Reports any issues found

**Time required:** Seconds to minutes depending on operation

---

## Step-by-Step Workflow for Monthly Maintenance

Follow this process once a month to keep your connector up-to-date:

### Step 1: Quick Check (2 minutes)

Open your terminal and run:
```bash
cd /path/to/twelve-data-connector
./scripts/check-openapi-changes.sh
```

**If it says "No changes detected":**
- You're done! Everything is up to date.
- Come back next month.

**If it says "Changes detected":**
- Continue to Step 2.

---

### Step 2: Full Analysis (5 minutes)

Run the main regeneration script:
```bash
./scripts/regenerate.sh
```

Watch the output as it:
- Downloads the latest API information
- Creates a backup (automatic safety net)
- Generates a detailed change report

The script will create a file like `change-report-2024-12-16.json` in your project folder.

---

### Step 3: Review the Report (10 minutes)

Open the change report file. Look for these sections:

**1. Summary:**
```json
{
  "summary": {
    "newEndpoints": 5,
    "removedEndpoints": 0,
    "modifiedEndpoints": 2,
    "breakingChanges": 0
  }
}
```

**What to check:**
- **New endpoints:** Opportunities to add features
- **Removed endpoints:** Features that went away (check if you implemented them)
- **Breaking changes:** Things that might affect existing users (IMPORTANT!)

**2. Breaking Changes (if any):**
These are the most important. Breaking changes might:
- Remove an endpoint you implemented
- Add a required parameter to an existing endpoint
- Change how an endpoint works

**Action required:** If you see breaking changes, you need to update your code.

**3. New Endpoints:**
These are new features Twelve Data added. You can:
- Implement high-value ones
- Save others for later
- Ignore ones that aren't useful for your users

---

### Step 4: Decide What to Do (varies)

Based on the report, choose one of these paths:

**Option A: No Action Needed**
- No breaking changes
- New endpoints aren't high priority
- Everything working fine

**Action:** Update your `openapi-spec.json` file and commit the change.

```bash
git add openapi-spec.json
git commit -m "chore: update API spec (2024-12-16)"
git push
```

**Option B: Update Existing Features**
- Breaking changes affect what you built
- Need to fix your code

**Action:** Update the affected operations in your code, test them, then commit.

**Option C: Add New Features**
- New endpoints look valuable
- Want to expand your connector

**Action:** Implement the new operations (see "Adding New Endpoints" section below), test them, then commit.

---

### Step 5: Test and Deploy (30 minutes)

After making any changes:

**Build the project:**
```bash
npm run build
```

**Check for errors:**
```bash
npm run lint
```

**Test in development:**
```bash
npm run dev
```
Then test the affected operations in n8n.

**Commit your changes:**
```bash
git add .
git commit -m "feat: add new endpoints from API update"
git push
```

**Publish update (if needed):**
```bash
npm version patch
npm publish
```

---

## Automated Monitoring

Your project includes a GitHub Action that automatically checks for API changes.

### How It Works:

**Schedule:** Every Monday at 9:00 AM (automatic)

**What it does:**
1. Runs `check-openapi-changes.sh`
2. If changes detected, creates a GitHub Issue
3. Sends you an email notification

**What you do:**
1. Check your GitHub notifications
2. Look for issues titled "OpenAPI Specification Update Detected"
3. Follow the monthly maintenance workflow above

**Location:** `.github/workflows/check-openapi-updates.yml`

**Benefits:**
- You don't have to remember to check manually
- Get notified immediately when changes happen
- Complete audit trail in GitHub Issues

---

## Video Walkthrough Script (15-20 Minutes)

Use this script for recording your video tutorial:

### Introduction (2 minutes)

"Hi, I'm going to show you how to maintain your Twelve Data n8n connector using the regeneration system. This system helps you keep your connector up-to-date when Twelve Data makes changes to their API.

The regeneration system consists of five scripts that work together to check for changes, create backups, analyze differences, and help you decide what to implement next.

Let's start with a quick health check."

---

### Quick Check Demo (3 minutes)

"First, I'll show you the quick change checker. This is what you'd run weekly or before starting work.

[Open terminal]

```bash
cd /path/to/twelve-data-connector
./scripts/check-openapi-changes.sh
```

[Run the command and show output]

As you can see, it downloads the latest API specification and compares it with what we have. In this case, it says [no changes / changes detected].

[If changes detected:]
When changes are detected, you'd run the full regeneration script next."

---

### Full Regeneration Demo (5 minutes)

"Now let me show you the full regeneration process. This is what you'd run monthly or when changes are detected.

[Run regenerate.sh]

```bash
./scripts/regenerate.sh
```

Watch what happens:

1. First, it downloads the latest API specification from Twelve Data
2. Then it validates that the download is correct
3. Next, it creates a backup of our current code - this is automatic, so we can always restore if needed
4. It archives the current specification for reference
5. Now it's comparing the old and new specifications to find changes
6. Finally, it generates a detailed change report

[Show the change report file]

The report shows us:
- 5 new endpoints were added
- 0 endpoints were removed
- 2 endpoints were modified
- 0 breaking changes (that's good!)

Let me open this report and show you what's inside."

---

### Understanding the Report (3 minutes)

"The change report has several sections:

[Open change-report JSON file]

**Summary section:** Quick overview of what changed

**New endpoints section:** Lists all the new features Twelve Data added. For example, here we see they added an 'insider_transactions' endpoint and an 'institutional_holders' endpoint.

**Breaking changes section:** This is the most important. Breaking changes are things that might affect your existing users. Fortunately, we have none this time.

**Modified endpoints section:** Shows existing features that changed. Here we see the 'quote' endpoint had a parameter description updated - that's minor.

Based on this report, I can decide:
- Should I add these new endpoints? (Yes, they look valuable)
- Do I need to fix anything? (No breaking changes)
- When should I do this? (Can plan for next week)"

---

### Coverage Check Demo (2 minutes)

"Let me show you the coverage checker. This tells us how much of the API we've implemented.

```bash
node scripts/validate-implementation.js
```

[Show output]

We can see:
- We've implemented 45 out of 142 endpoints
- That's about 32% coverage
- The tool suggests which endpoints to implement next, ranked by value

This helps us prioritize what to build next."

---

### Backup Management Demo (3 minutes)

"Finally, let's look at backup management. The regeneration system creates automatic backups, and this script helps you manage them.

**List backups:**
```bash
./scripts/manage-backups.sh list
```

[Show list of backups]

You can see all our backups with timestamps. Each one is a complete snapshot of the code at that time.

**Show backup details:**
```bash
./scripts/manage-backups.sh info 2024-12-16-10-30-00
```

This shows exactly what's in a backup.

**Restore if needed:**
If something goes wrong, you can restore:
```bash
./scripts/manage-backups.sh restore 2024-12-16-10-30-00
```

It will ask for confirmation, create a safety backup first, then restore the files.

**Clean up old backups:**
```bash
./scripts/manage-backups.sh cleanup
```

This removes old backups to save disk space, keeping the last 5 and anything from the last 30 days."

---

### Conclusion (2 minutes)

"That's the complete regeneration workflow. Let me summarize the key points:

1. **Check weekly** using `check-openapi-changes.sh` (30 seconds)
2. **Run full regeneration monthly** or when changes detected (5 minutes)
3. **Review the change report carefully** - especially breaking changes (10 minutes)
4. **Decide what to do** - update existing code or add new features (varies)
5. **Test thoroughly** before deploying (30 minutes)

The system is designed to be safe:
- Automatic backups before changes
- Clear reports showing what changed
- Easy restoration if something goes wrong

Remember: The automated GitHub Action checks for you weekly, so you'll get notified when changes happen.

Thanks for watching! If you have questions, check the documentation or reach out for support."

---

## Troubleshooting Common Issues

### Issue: "Permission denied" when running scripts

**Problem:** Can't execute the bash scripts

**Solution for Mac/Linux:**
```bash
chmod +x scripts/*.sh
```

**Solution for Windows:**
Use Git Bash (comes with Git for Windows) or run with bash explicitly:
```bash
bash scripts/regenerate.sh
```

**Why this happens:** Script files need execute permission on Unix-like systems.

---

### Issue: "curl: command not found"

**Problem:** The curl command isn't available on your system

**Solution for Windows:**
- Use Git Bash (includes curl)
- Or install curl: `choco install curl` (using Chocolatey)

**Solution for Mac:**
```bash
brew install curl
```

**Solution for Linux:**
```bash
sudo apt-get install curl
```

**Why this happens:** curl is used to download the API specification from Twelve Data.

---

### Issue: "jq: command not found"

**Problem:** The jq tool isn't installed

**Good news:** jq is optional! The scripts will automatically use Node.js as a fallback for JSON processing.

**If you want to install jq anyway:**

**Windows (Chocolatey):**
```bash
choco install jq
```

**Mac:**
```bash
brew install jq
```

**Linux:**
```bash
sudo apt-get install jq
```

**Why this happens:** jq is a tool for processing JSON files, but it's not required.

---

### Issue: "JSON validation failed"

**Problem:** The downloaded API specification file is corrupted or invalid

**Solution:**
1. Check your internet connection
2. Try downloading manually to test:
   ```bash
   curl -o test.json "https://api.twelvedata.com/doc/swagger/openapi.json"
   ```
3. Validate the JSON:
   ```bash
   node -e "JSON.parse(require('fs').readFileSync('test.json'))"
   ```
4. If the file is valid, try running regenerate.sh again

**Why this happens:** Network issues or temporary problems with Twelve Data's server.

---

### Issue: "No changes detected" but users report issues

**Problem:** The API behavior changed without the specification being updated

**Solution:**
1. Check Twelve Data's changelog or blog for announcements
2. Test the specific endpoint manually using curl or Postman
3. Contact Twelve Data support: support@twelvedata.com
4. Check if it's a free tier vs paid tier issue

**Why this happens:** Sometimes API behavior changes without specification updates, or there are tier-specific differences.

---

### Issue: Build fails after regeneration

**Problem:** TypeScript compilation errors after updating the specification

**Solution:**
1. Check the change report for breaking changes
2. Look for endpoints you implemented that were modified
3. Update the affected operations in `TwelveData.node.ts`
4. Run `npm run lint` to find specific issues:
   ```bash
   npm run lint
   ```
5. Fix the errors shown in the output

**Why this happens:** Breaking changes in the API require code updates.

---

### Issue: Can't restore from backup

**Problem:** Restore command fails or doesn't work as expected

**Solution:**
1. Verify the backup exists:
   ```bash
   ./scripts/manage-backups.sh list
   ```
2. Check backup integrity:
   ```bash
   ./scripts/manage-backups.sh verify 2024-12-16-10-30-00
   ```
3. If verification fails, try a different backup
4. Manually copy files from backup folder if needed:
   ```bash
   cp -r backups/2024-12-16-10-30-00/nodes ./
   ```

**Why this happens:** Corrupted backup or permission issues.

---

## Best Practices

### 1. Always Backup Before Changes

**Why:** The regeneration system does this automatically, but it's worth emphasizing.

**How:** The `regenerate.sh` script creates timestamped backups automatically. Don't skip this step if running commands manually.

**Benefit:** You can always go back if something goes wrong.

---

### 2. Test in Development First

**Why:** Never deploy untested changes to production.

**How:** Use `npm run dev` to test changes in a development environment before publishing.

**Benefit:** Catch issues before they affect users.

---

### 3. Read Change Reports Carefully

**Why:** Breaking changes can affect your users.

**How:** Always review the "Breaking Changes" section first. Then review new endpoints and modifications.

**Benefit:** Avoid surprises and plan updates properly.

---

### 4. Keep Backups for 30 Days

**Why:** You might need to restore from an older backup.

**How:** Run cleanup monthly:
```bash
./scripts/manage-backups.sh cleanup
```

**Benefit:** Balance between safety and disk space.

---

### 5. Document Your Changes

**Why:** Future you (or others) will thank you.

**How:** Update `CHANGELOG.md` when you add features or fix issues.

**Benefit:** Clear history of what changed and why.

---

### 6. Communicate with Users

**Why:** Breaking changes might affect their workflows.

**How:** If you make breaking changes, announce them in:
- GitHub releases
- README.md
- Email to users (if you have a list)

**Benefit:** Users can prepare for changes.

---

## Glossary of Technical Terms

**API (Application Programming Interface):**
A way for different software programs to talk to each other. Think of it like a restaurant menu - it shows what you can order (request) and what you'll get (response).

**Endpoint:**
A specific URL that provides data or performs an action. Like `/quote` gives you stock quotes, `/time_series` gives you historical data.

**OpenAPI Specification:**
A file that describes all available API endpoints and how to use them. It's like an instruction manual for the API.

**Query Parameter:**
Extra information added to a URL. For example: `/quote?symbol=AAPL` where `symbol=AAPL` is the query parameter.

**Breaking Change:**
A change to the API that might break existing code. Like removing an endpoint or changing a required parameter.

**Hash:**
A unique "fingerprint" of a file. If the file changes, the hash changes. Used to quickly detect if something is different.

**JSON (JavaScript Object Notation):**
A format for storing and exchanging data. It's human-readable and looks like:
```json
{
  "name": "Apple",
  "symbol": "AAPL",
  "price": 150.25
}
```

**Rate Limiting:**
Maximum number of requests allowed per time period. Twelve Data's free tier allows 800 calls per day, 8 per minute.

**Backup:**
A copy of your files saved at a specific point in time. Like a save point in a video game.

**Repository:**
A storage location for your code, usually on GitHub. Contains all files and their history.

**Terminal / Command Line:**
A text-based interface for running commands on your computer. On Windows, use Git Bash or PowerShell. On Mac/Linux, use Terminal.

**npm (Node Package Manager):**
A tool for installing and managing JavaScript packages. Used to publish your connector.

**Build:**
The process of converting your TypeScript code into JavaScript that n8n can run.

**Lint / Linting:**
Checking your code for errors and style issues. Like spell-check for code.

---

## Files and Directories Reference

```
twelve-data-connector/
├── scripts/
│   ├── regenerate.sh              # Main regeneration script
│   ├── check-openapi-changes.sh   # Quick change checker
│   ├── detect-changes.js          # Detailed change analyzer
│   ├── validate-implementation.js # Coverage checker
│   └── manage-backups.sh          # Backup manager
│
├── backups/                       # Created automatically
│   ├── 2024-12-16-10-30-00/      # Timestamped backup folders
│   ├── 2024-12-15-14-20-15/
│   └── ...
│
├── openapi-specs/                 # Created automatically
│   ├── openapi-2024-12-16.json   # Archived specifications
│   ├── openapi-2024-12-15.json
│   └── ...
│
├── openapi-spec.json              # Current API specification
├── change-report-*.json           # Generated change reports
└── regeneration.log               # Log of regeneration runs
```

---

## Getting Help

### For Script Issues:
Run any script with the `--help` flag:
```bash
./scripts/regenerate.sh --help
./scripts/manage-backups.sh --help
```

### For n8n Questions:
- **n8n Community Forum:** https://community.n8n.io/
- **n8n Documentation:** https://docs.n8n.io/

### For Twelve Data API Questions:
- **Twelve Data Support:** support@twelvedata.com
- **API Documentation:** https://twelvedata.com/docs

### For Connector Issues:
- **GitHub Issues:** Report bugs or request features
- **Email Support:** hallengray@gmail.com (30-day support period)

---

## Quick Reference Card

**Weekly Check:**
```bash
./scripts/check-openapi-changes.sh
```

**Monthly Maintenance:**
```bash
./scripts/regenerate.sh
node scripts/validate-implementation.js
```

**View Backups:**
```bash
./scripts/manage-backups.sh list
```

**Restore Backup:**
```bash
./scripts/manage-backups.sh restore YYYY-MM-DD-HH-MM-SS
```

**Clean Up:**
```bash
./scripts/manage-backups.sh cleanup
```

**Build & Test:**
```bash
npm run build
npm run lint
npm run dev
```

---

**This guide is designed to be clear and beginner-friendly. If anything is confusing, please ask for clarification. Your success with this system is important!**

---

*Last updated: December 2024*
*Version: 1.0*
