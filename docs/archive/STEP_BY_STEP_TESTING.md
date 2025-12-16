# Step-by-Step Integration Testing Guide

**Purpose:** Work through integration tests one at a time, sharing results for detailed documentation updates.

**How to Use:**
1. Start with the first test in the list
2. Follow the detailed instructions
3. Share your results (screenshots, observations, pass/fail status)
4. I'll update both `INTEGRATION_TESTING.md` and `INTEGRATION_TESTING_CHECKLIST.md` with your findings
5. Move to the next test

---

## Testing Progress Tracker

| Test ID | Test Name | Status | Date Tested | Notes |
|---------|-----------|--------|-------------|-------|
| UI-001 | Node Search and Discovery | ✅ COMPLETE | 2025-12-03 | All search terms tested in TESTING_LOG.md |
| UI-002 | Icon Display (Light/Dark Themes) | ✅ COMPLETE | 2025-12-03 | Tested in TESTING_LOG.md |
| UI-003 | Field Labels and Help Text | ✅ COMPLETE | 2025-12-03 | All labels clear, no issues found |
| UI-004 | Required Fields Marked Properly | ✅ COMPLETE | 2025-12-03 | Visual test confirms proper marking |
| UI-005 | Options Alphabetization | ✅ COMPLETE | 2025-12-03 | All in order, well arranged, easy to read |
| UI-006 | Tooltip Functionality | ✅ COMPLETE | 2025-12-03 | Well displayed, very well explained for ease of use |
| UI-007 | Error Message Clarity | ✅ COMPLETE | 2025-12-03 | Clear and self-explanatory |
| INT-001 | Google Sheets Integration | ⏳ PENDING | - | - |
| INT-002 | Webhook Integration | ⏳ PENDING | - | - |
| INT-003 | IF Node Conditional Logic | ✅ COMPLETE | 2025-12-04 | IF integration working as expected |
| INT-004 | Set Node Data Transformation | ✅ COMPLETE | 2025-12-04 | Set node working as expected |
| INT-005 | Multiple Twelve Data Nodes | ✅ COMPLETE | 2025-12-04 | Merged 2 nodes and worked as expected |
| INT-006 | Loop Processing | ⏳ PENDING | - | - |
| PERF-001 | Response Time Measurement | ⏸️ N/A | 2025-12-04 | Tests API/platform performance, not node code |
| PERF-002 | Large Dataset Handling | ⏸️ N/A | 2025-12-04 | n8n platform handles this (validated in TESTING_LOG.md) |
| PERF-003 | Memory Usage | ⏸️ N/A | 2025-12-04 | Tests platform/system memory, not node code |
| PERF-004 | Concurrent Requests | ⏸️ N/A | 2025-12-04 | Tests n8n platform capabilities, already validated in INT-005 |
| DOC-001 | README Completeness | ⏳ PENDING | - | - |
| DOC-002 | CREDENTIALS_SETUP Usability | ⏳ PENDING | - | - |
| DOC-003 | Operation Descriptions | ⏳ PENDING | - | - |
| DOC-004 | Example Workflows | ⏳ PENDING | - | - |

---

## Test Instructions

### 🔍 UI-001: Node Search and Discovery

**Priority:** High  
**Estimated Time:** 5 minutes  
**Dependencies:** n8n running, node installed

#### What to Test:
1. Open n8n workflow editor
2. Click "+" to add a new node
3. Test these searches (one at a time):
   - Search for "Twelve Data"
   - Search for "stock"
   - Search for "forex"
   - Search for "crypto"
   - Search for "financial"

#### What to Share:
- **Screenshots:** 
  - One screenshot showing search results for "Twelve Data"
  - One screenshot showing search results for at least one related term
- **Observations:**
  - Does the node appear for "Twelve Data"? (Yes/No)
  - Does it appear for "stock"? (Yes/No)
  - Does it appear for "forex"? (Yes/No)
  - Does it appear for "crypto"? (Yes/No)
  - Is the node icon visible in search results? (Yes/No)
  - Is the node description visible and helpful? (Yes/No, and what does it say?)
- **Result:** PASS / FAIL
- **Notes:** Any additional observations (e.g., node appears in unexpected searches, description could be clearer, etc.)

---

### 🎨 UI-002: Icon Display (Light/Dark Themes)

**Priority:** Medium  
**Estimated Time:** 3 minutes  
**Dependencies:** n8n running, node installed

#### What to Test:
1. Open n8n in **light theme**
2. Add Twelve Data node to a workflow
3. Take a screenshot of the node icon in light theme
4. Switch n8n to **dark theme**
5. Take a screenshot of the same node icon in dark theme
6. Compare both screenshots

#### What to Share:
- **Screenshots:**
  - `screenshots/ui-002-icon-light.png` (or describe where you saved it)
  - `screenshots/ui-002-icon-dark.png` (or describe where you saved it)
- **Observations:**
  - Light theme icon displays correctly? (Yes/No)
  - Dark theme icon displays correctly? (Yes/No)
  - Icon has good contrast in light theme? (Yes/No)
  - Icon has good contrast in dark theme? (Yes/No)
  - Does the icon match Twelve Data branding? (Yes/No/Not sure)
- **Result:** PASS / FAIL
- **Notes:** Any issues with visibility, contrast, or branding

---

### 📝 UI-003: Field Labels and Help Text

**Priority:** High  
**Estimated Time:** 15-20 minutes  
**Dependencies:** n8n running, node installed

#### What to Look For - Detailed Guidance

**1. Field Labels - What Makes a Good Label:**
- ✅ **Clear and descriptive:** "Symbol" is better than "Sym" or "Ticker"
- ✅ **Uses standard terminology:** "Symbol" or "Ticker Symbol" (not "Stock Code" or "ID")
- ✅ **No abbreviations unless standard:** "Symbol" not "Sym", "Operation" not "Op"
- ✅ **Capitalized properly:** Title Case or Sentence case
- ✅ **Consistent style:** All labels use same capitalization style
- ❌ **Bad examples:** "Sym", "Op", "Ticker Code", "Stock ID", "Symbol Code"

**2. Help Text - What Makes Good Help Text:**
- ✅ **Explains purpose:** "The stock symbol, forex pair, or cryptocurrency pair to query"
- ✅ **Provides examples:** "Examples: AAPL, EUR/USD, BTC/USD"
- ✅ **Explains technical terms:** "Interval: The time period between data points (e.g., 1min, 1hour, 1day)"
- ✅ **Mentions format requirements:** "Format: YYYY-MM-DD" or "Use ticker symbol format"
- ✅ **Warns about limitations:** "Free tier supports intervals: 5min, 1hour, 1day (1min requires paid plan)"
- ✅ **Visible and accessible:** Help text appears below label, in tooltip, or as description
- ❌ **Bad examples:** Too technical, missing examples, no format guidance

**3. Placeholder Text - What Makes Good Placeholders:**
- ✅ **Shows example format:** "AAPL" or "EUR/USD" or "BTC/USD"
- ✅ **Indicates what's expected:** "Enter symbol..." or "Select interval..."
- ✅ **Uses realistic examples:** "AAPL" not "ABC123"
- ✅ **Multiple examples if applicable:** "e.g., AAPL, MSFT, GOOGL"
- ❌ **Bad examples:** "Enter value", "Type here", generic placeholders

**4. Dropdown Options - What Makes Good Options:**
- ✅ **Clear option names:** "Get Quote" not "quote" or "Quote"
- ✅ **Consistent naming:** All options use same style (Title Case, etc.)
- ✅ **Logical grouping:** Related operations grouped together
- ✅ **Descriptive:** "Get End of Day Price" not "EOD" or "EndOfDay"
- ❌ **Bad examples:** Abbreviations, inconsistent naming, unclear purpose

#### What to Test:
1. Open Twelve Data node configuration
2. Review each field systematically using the checklist below
3. Test different Resource/Operation combinations to see if fields change appropriately
4. Check if help text appears in different ways (tooltips, descriptions, info icons)

#### Detailed Field-by-Field Checklist:

**Resource Dropdown:**
- [ ] Label is clear (e.g., "Resource" or "Resource Type")
- [ ] Help text explains what Resource means (if present)
- [ ] Options are clear and descriptive (e.g., "Core Data", "Fundamentals", "Reference Data")
- [ ] Options are not abbreviated unnecessarily
- [ ] Technical terms explained (if any)

**Operation Dropdown:**
- [ ] Label is clear (e.g., "Operation" or "Operation Type")
- [ ] Help text explains what Operation means (if present)
- [ ] Options clearly describe what each operation does
- [ ] Examples: "Get Quote" (clear) vs "Quote" (unclear)
- [ ] Operations are grouped logically (if applicable)

**Symbol Field:**
- [ ] Label is clear (e.g., "Symbol" or "Ticker Symbol")
- [ ] Help text explains:
  - [ ] What a symbol is
  - [ ] Format examples (AAPL, EUR/USD, BTC/USD)
  - [ ] Where to find symbols
- [ ] Placeholder shows example (e.g., "AAPL" or "EUR/USD")
- [ ] Help text mentions different asset types (stocks, forex, crypto)

**Interval Field (when visible):**
- [ ] Label is clear (e.g., "Interval" or "Time Interval")
- [ ] Help text explains:
  - [ ] What interval means
  - [ ] Available options (1min, 5min, 1hour, 1day, etc.)
  - [ ] Format examples
  - [ ] Any plan limitations (if applicable)
- [ ] Dropdown options are clear and understandable
- [ ] Options show duration clearly (e.g., "1 minute" or "1min" with explanation)

**Date Fields (if present):**
- [ ] Label is clear (e.g., "Start Date" or "End Date")
- [ ] Help text shows format (e.g., "Format: YYYY-MM-DD")
- [ ] Placeholder shows example (e.g., "2024-01-01")
- [ ] Help text explains date range limitations (if any)

**Additional Options Section:**
- [ ] Section label is clear (e.g., "Additional Options" or "Advanced Options")
- [ ] Each option has clear label
- [ ] Each option has help text explaining:
  - [ ] What it does
  - [ ] When to use it
  - [ ] Format/type expected
- [ ] Technical terms explained (e.g., "Output Size", "Exchange Filter")

**Dynamic Fields (fields that appear based on Resource/Operation):**
- [ ] Fields appear/disappear appropriately when Resource changes
- [ ] Fields appear/disappear appropriately when Operation changes
- [ ] New fields have clear labels and help text
- [ ] No orphaned fields (fields that shouldn't be visible)

#### What to Share:
- **Screenshot:** One screenshot showing the node configuration with all fields visible
- **Field-by-Field Assessment:**

| Field | Label Text | Label Clear? | Help Text Present? | Help Text Content | Placeholder/Example | Notes |
|-------|-----------|--------------|-------------------|-------------------|---------------------|-------|
| Resource | [exact text] | Yes/No | Yes/No/Partial | [copy help text] | [copy placeholder] | [observations] |
| Operation | [exact text] | Yes/No | Yes/No/Partial | [copy help text] | [copy placeholder] | [observations] |
| Symbol | [exact text] | Yes/No | Yes/No/Partial | [copy help text] | [copy placeholder] | [observations] |
| Interval | [exact text] | Yes/No | Yes/No/Partial | [copy help text] | [copy placeholder] | [observations] |
| [Other fields] | [exact text] | Yes/No | Yes/No/Partial | [copy help text] | [copy placeholder] | [observations] |

- **Specific Examples to Document:**
  - Copy exact label text for each field
  - Copy exact help text (if present)
  - Copy exact placeholder text (if present)
  - Note where help text appears (tooltip, description below field, info icon, etc.)

- **Overall Assessment:**
  - Are all field labels clear and descriptive? (Yes/No)
  - Is help text present where needed? (Yes/No/Partial)
  - Are placeholders helpful? (Yes/No)
  - Are technical terms explained? (Yes/No)
  - Are examples provided? (Yes/No)
  - Is formatting guidance provided? (Yes/No)
- **Result:** PASS / FAIL
- **Notes:** 
  - Specific suggestions for improvement
  - Fields that need better labels
  - Fields that need help text
  - Technical terms that need explanation
  - Placeholders that could be improved

---

### ⚠️ UI-004: Required Fields Marked Properly

**Priority:** High  
**Estimated Time:** 8 minutes  
**Dependencies:** n8n running, node installed

#### What to Test:
1. Open Twelve Data node configuration
2. Identify all required fields (look for asterisks * or other indicators)
3. List which fields are marked as required
4. Try to execute the node **without** filling in a required field
5. Observe the error message
6. Try with different Resource/Operation combinations to see if required fields change

#### What to Share:
- **Screenshot 1:** Node configuration showing required field indicators (asterisks)
- **Screenshot 2:** Error message when trying to execute without required field
- **Observations:**
  - Which fields are marked as required? (List them)
  - Are required fields clearly marked with asterisk (*)? (Yes/No)
  - When you try to execute without required field, does it show an error? (Yes/No)
  - Is the error message clear? (Yes/No)
  - Does the error identify which field is missing? (Yes/No)
  - What does the error message say? (Copy exact text)
- **Result:** PASS / FAIL
- **Notes:** Any confusion about which fields are required, or suggestions for clearer error messages

---

### 📋 UI-005: Options Alphabetization

**Priority:** Low  
**Estimated Time:** 10-15 minutes  
**Dependencies:** n8n running, node installed

#### What to Look For - Detailed Guidance

**1. Ordering Types - What to Check:**

**Alphabetical Ordering:**
- ✅ Options sorted A-Z (or Z-A if reverse alphabetical)
- ✅ Consistent across all similar dropdowns
- ✅ Easy to find items when you know the name
- ✅ Example: "Core Data", "Fundamentals", "Reference Data" (alphabetical)

**Logical Ordering:**
- ✅ Options grouped by category or function
- ✅ Most common/important options first
- ✅ Related options grouped together
- ✅ Example: Intervals ordered by duration (1min, 5min, 15min, 1hour, 1day)
- ✅ Example: Operations grouped by resource type

**Random/No Order:**
- ❌ No apparent pattern
- ❌ Hard to find specific options
- ❌ Inconsistent with other dropdowns
- ❌ Should be improved

**2. What Makes Good Ordering:**

**For Resource/Operation Dropdowns:**
- ✅ Alphabetical: Easy to scan and find
- ✅ Logical grouping: Related items together
- ✅ Most common first: Frequently used options at top
- ✅ Consistent: Same ordering style across all dropdowns

**For Interval Dropdowns:**
- ✅ Duration-based: Shortest to longest (1min → 1month)
- ✅ Or longest to shortest: 1month → 1min
- ✅ Grouped: Minutes together, hours together, days together
- ❌ Random: No pattern makes it hard to find

**3. Consistency Check:**
- ✅ All dropdowns use same ordering style
- ✅ If one is alphabetical, others should be too
- ✅ If one is logical, others should follow logical patterns
- ❌ Mixed styles: Some alphabetical, some random

#### What to Test:
1. Open Twelve Data node configuration
2. Open the **Resource** dropdown - note the order of ALL options
3. Open the **Operation** dropdown - note the order of ALL options
4. Change Resource to different values and check if Operation options change
5. Open the **Interval** dropdown (if available) - note the order of ALL options
6. Check any other dropdowns in the node
7. Compare ordering style across all dropdowns

#### Detailed Checklist:

**Resource Dropdown:**
- [ ] Open Resource dropdown
- [ ] Count total number of options: _____
- [ ] List ALL options in order (copy exactly):
  1. _____
  2. _____
  3. _____
  4. _____
  5. _____
  [Continue for all options]
- [ ] Ordering type: Alphabetical / Logical / Random
- [ ] If logical, what's the grouping pattern? _____
- [ ] Is ordering helpful? (Yes/No)
- [ ] Screenshot: [ ] Captured

**Operation Dropdown (for each Resource):**
- [ ] Select Resource: _____
- [ ] Open Operation dropdown
- [ ] Count total number of options: _____
- [ ] List ALL options in order (copy exactly):
  1. _____
  2. _____
  3. _____
  4. _____
  5. _____
  [Continue for all options]
- [ ] Ordering type: Alphabetical / Logical / Random
- [ ] If logical, what's the grouping pattern? _____
- [ ] Is ordering helpful? (Yes/No)
- [ ] Screenshot: [ ] Captured

**Test Multiple Resource/Operation Combinations:**
- [ ] Resource: Core Data → Operations: [list order]
- [ ] Resource: Fundamentals → Operations: [list order]
- [ ] Resource: Reference Data → Operations: [list order]
- [ ] Do Operation options change when Resource changes? (Yes/No)
- [ ] Is ordering consistent across different Resources? (Yes/No)

**Interval Dropdown (when visible):**
- [ ] Open Interval dropdown
- [ ] Count total number of options: _____
- [ ] List ALL options in order (copy exactly):
  1. _____
  2. _____
  3. _____
  4. _____
  [Continue for all options]
- [ ] Ordering type: Alphabetical / Logical (by duration) / Random
- [ ] If logical, is it ordered by duration? (Yes/No)
- [ ] Duration order: Shortest to longest / Longest to shortest / Grouped
- [ ] Is ordering helpful? (Yes/No)
- [ ] Screenshot: [ ] Captured

**Other Dropdowns:**
- [ ] List any other dropdowns found: _____
- [ ] For each, note ordering: _____
- [ ] Screenshot: [ ] Captured

**Consistency Check:**
- [ ] Are all dropdowns using same ordering style? (Yes/No)
- [ ] If mixed, which use which style? _____
- [ ] Is consistency important for this node? (Yes/No)

#### What to Share:
- **Screenshots:** Screenshots of each dropdown showing all options in order
- **Detailed Option Lists:**

**Resource Options (Complete List):**
1. _____
2. _____
3. _____
[Continue for all options]
- **Ordering Type:** Alphabetical / Logical / Random
- **Total Count:** _____

**Operation Options (for each Resource):**
- **Resource: Core Data**
  1. _____
  2. _____
  3. _____
  [Continue for all options]
- **Ordering Type:** Alphabetical / Logical / Random
- **Total Count:** _____

- **Resource: Fundamentals**
  1. _____
  2. _____
  [Continue for all options]
- **Ordering Type:** Alphabetical / Logical / Random
- **Total Count:** _____

[Repeat for all Resources]

**Interval Options (Complete List):**
1. _____
2. _____
3. _____
[Continue for all options]
- **Ordering Type:** Alphabetical / Logical (by duration) / Random
- **Duration Pattern:** Shortest to longest / Longest to shortest / Grouped
- **Total Count:** _____

- **Overall Assessment:**
  - Is ordering consistent across dropdowns? (Yes/No)
  - Is ordering helpful for users? (Yes/No)
  - Are options easy to find? (Yes/No)
  - Would alphabetical ordering be better? (Yes/No/Not applicable)
  - Would logical ordering be better? (Yes/No/Not applicable)
- **Result:** PASS / FAIL / N/A (if ordering is acceptable but not alphabetized)
- **Notes:** 
  - Specific suggestions for better ordering
  - Which dropdowns need improvement
  - What ordering pattern would be most helpful
  - Any inconsistencies found

---

### 💡 UI-006: Tooltip Functionality

**Priority:** Low  
**Estimated Time:** 10-15 minutes  
**Dependencies:** n8n running, node installed

#### What to Look For - Detailed Guidance

**1. Tooltip Indicators - Where to Look:**
- **Info icons:** (?) or (i) icons next to field labels
- **Question marks:** Small question mark icons
- **Help icons:** Help/assistance icons
- **Hover areas:** Fields that show tooltips on hover (even without icons)
- **Info buttons:** Clickable info buttons

**2. What Makes Good Tooltips:**

**Content Quality:**
- ✅ **Explains purpose:** Clearly states what the field is for
- ✅ **Provides examples:** Shows real-world examples
- ✅ **Explains technical terms:** Defines jargon or technical concepts
- ✅ **Format guidance:** Specifies expected format
- ✅ **Limitations mentioned:** Notes any restrictions or limitations
- ✅ **Concise:** Not too long, easy to read quickly
- ❌ **Bad examples:** Too technical, too vague, missing examples

**Display Quality:**
- ✅ **Appears on hover:** Tooltip shows when hovering over indicator
- ✅ **Visible and readable:** Text is clear, good contrast
- ✅ **Positioned well:** Doesn't block other UI elements
- ✅ **Dismisses properly:** Disappears when mouse moves away
- ✅ **Stays visible:** Doesn't flicker or disappear too quickly
- ❌ **Bad examples:** Blocks other fields, hard to read, flickers

**3. Tooltip Types to Check:**

**Field Label Tooltips:**
- Hover over field labels (Resource, Operation, Symbol, etc.)
- Check if tooltips appear
- Verify content is helpful

**Help Icon Tooltips:**
- Look for (?) or (i) icons
- Hover over each icon
- Check if tooltip appears
- Verify content explains the field

**Section Tooltips:**
- Check section headers (e.g., "Additional Options")
- Hover over section labels
- Check if tooltips explain the section

**Option Tooltips (in dropdowns):**
- Hover over dropdown options
- Check if tooltips appear for complex options
- Verify tooltips explain what each option does

#### What to Test:
1. Open Twelve Data node configuration
2. Systematically check each field for tooltip indicators:
   - Look for (?) icons, (i) icons, or help indicators
   - Hover over field labels (even without icons)
   - Hover over any help icons found
3. For each tooltip found:
   - Note which field it's for
   - Copy the exact tooltip text
   - Check if content is helpful
   - Verify it doesn't block other elements
   - Check if it dismisses properly
4. Test tooltip behavior:
   - Hover and wait - does it appear?
   - Move mouse away - does it dismiss?
   - Try to interact with other fields while tooltip is visible
   - Check if tooltip blocks clicks on other elements

#### Detailed Checklist:

**Tooltip Detection:**
- [ ] Are there any tooltip indicators visible? (Yes/No)
- [ ] If yes, list all fields with tooltip indicators:
  1. _____
  2. _____
  3. _____
  [Continue for all]
- [ ] If no, are there hover tooltips (without icons)? (Yes/No)

**Field-by-Field Tooltip Check:**

**Resource Field:**
- [ ] Has tooltip indicator? (Yes/No)
- [ ] Tooltip appears on hover? (Yes/No)
- [ ] Tooltip text: [copy exact text]
- [ ] Content is helpful? (Yes/No)
- [ ] Explains what Resource means? (Yes/No)
- [ ] Provides examples? (Yes/No)
- [ ] Screenshot: [ ] Captured

**Operation Field:**
- [ ] Has tooltip indicator? (Yes/No)
- [ ] Tooltip appears on hover? (Yes/No)
- [ ] Tooltip text: [copy exact text]
- [ ] Content is helpful? (Yes/No)
- [ ] Explains what Operation means? (Yes/No)
- [ ] Provides examples? (Yes/No)
- [ ] Screenshot: [ ] Captured

**Symbol Field:**
- [ ] Has tooltip indicator? (Yes/No)
- [ ] Tooltip appears on hover? (Yes/No)
- [ ] Tooltip text: [copy exact text]
- [ ] Content is helpful? (Yes/No)
- [ ] Explains symbol format? (Yes/No)
- [ ] Provides examples? (Yes/No)
- [ ] Screenshot: [ ] Captured

**Interval Field (when visible):**
- [ ] Has tooltip indicator? (Yes/No)
- [ ] Tooltip appears on hover? (Yes/No)
- [ ] Tooltip text: [copy exact text]
- [ ] Content is helpful? (Yes/No)
- [ ] Explains interval options? (Yes/No)
- [ ] Mentions limitations? (Yes/No)
- [ ] Screenshot: [ ] Captured

**Additional Options Section:**
- [ ] Has tooltip indicator? (Yes/No)
- [ ] Tooltip appears on hover? (Yes/No)
- [ ] Tooltip text: [copy exact text]
- [ ] Content is helpful? (Yes/No)
- [ ] Screenshot: [ ] Captured

**Other Fields:**
- [ ] List any other fields with tooltips: _____
- [ ] For each, note tooltip content: _____
- [ ] Screenshot: [ ] Captured

**Tooltip Behavior:**
- [ ] Tooltips appear on hover? (Yes/No)
- [ ] Tooltips dismiss when mouse moves away? (Yes/No)
- [ ] Tooltips stay visible long enough to read? (Yes/No)
- [ ] Tooltips don't flicker? (Yes/No)
- [ ] Tooltips don't block other UI elements? (Yes/No)
- [ ] Tooltips are readable (good contrast)? (Yes/No)
- [ ] Tooltips are positioned well? (Yes/No)

**Tooltip Content Quality:**
- [ ] Tooltips explain field purpose? (Yes/No/Partial)
- [ ] Tooltips provide examples? (Yes/No/Partial)
- [ ] Tooltips explain technical terms? (Yes/No/Partial)
- [ ] Tooltips provide format guidance? (Yes/No/Partial)
- [ ] Tooltips mention limitations? (Yes/No/Partial)
- [ ] Tooltips are concise and clear? (Yes/No/Partial)

**If No Tooltips Exist:**
- [ ] Would tooltips be helpful? (Yes/No)
- [ ] Which fields would benefit from tooltips? _____
- [ ] What information should tooltips contain? _____

#### What to Share:
- **Screenshots:** Screenshots of tooltips in action (one for each tooltip found)
- **Tooltip Inventory:**

| Field | Has Tooltip? | Indicator Type | Tooltip Text | Helpful? | Notes |
|-------|--------------|----------------|--------------|----------|-------|
| Resource | Yes/No | (?) / (i) / hover / none | [copy text] | Yes/No | [observations] |
| Operation | Yes/No | (?) / (i) / hover / none | [copy text] | Yes/No | [observations] |
| Symbol | Yes/No | (?) / (i) / hover / none | [copy text] | Yes/No | [observations] |
| Interval | Yes/No | (?) / (i) / hover / none | [copy text] | Yes/No | [observations] |
| Additional Options | Yes/No | (?) / (i) / hover / none | [copy text] | Yes/No | [observations] |
| [Other fields] | Yes/No | (?) / (i) / hover / none | [copy text] | Yes/No | [observations] |

- **Tooltip Behavior Assessment:**
  - Do tooltips appear on hover? (Yes/No)
  - Do tooltips dismiss properly? (Yes/No)
  - Do tooltips block other elements? (Yes/No)
  - Are tooltips readable? (Yes/No)
  - Are tooltips positioned well? (Yes/No)

- **Tooltip Content Assessment:**
  - Are tooltips helpful? (Yes/No/Partial)
  - Do tooltips explain field purpose? (Yes/No/Partial)
  - Do tooltips provide examples? (Yes/No/Partial)
  - Do tooltips explain technical terms? (Yes/No/Partial)

- **Overall Assessment:**
  - Are tooltips present where needed? (Yes/No/Partial)
  - Is tooltip content helpful? (Yes/No/Partial)
  - Is tooltip behavior good? (Yes/No/Partial)
  - Would additional tooltips be helpful? (Yes/No)

- **Result:** PASS / FAIL / N/A (if no tooltips exist)
- **Notes:** 
  - Specific suggestions for tooltip content
  - Fields that would benefit from tooltips
  - Tooltip behavior issues (if any)
  - Tooltip positioning issues (if any)

---

### ❌ UI-007: Error Message Clarity

**Priority:** High  
**Estimated Time:** 20-25 minutes  
**Dependencies:** n8n running, node installed, API key configured

#### What to Look For - Detailed Guidance

**1. Error Message Quality Criteria:**

**Clarity:**
- ✅ **Identifies the problem:** "Symbol is invalid" not "Error occurred"
- ✅ **Specific:** "Symbol 'INVALID123' not found" not "Invalid input"
- ✅ **Uses plain language:** Avoids technical jargon when possible
- ✅ **Identifies the field:** "Symbol field is required" not "Field is missing"
- ❌ **Bad examples:** "Error", "Invalid", "Failed", too vague

**Actionability:**
- ✅ **Suggests a fix:** "Please enter a valid symbol like AAPL or EUR/USD"
- ✅ **Provides examples:** Shows correct format or valid values
- ✅ **Links to help:** Provides documentation link or help resource
- ✅ **Explains next steps:** "Check your API key in credentials settings"
- ❌ **Bad examples:** Just says "error" without guidance

**User-Friendliness:**
- ✅ **Readable:** Clear, well-formatted text
- ✅ **Not raw API errors:** Translated from technical API errors
- ✅ **Contextual:** Explains what the user was trying to do
- ✅ **Helpful tone:** Professional, not blaming
- ❌ **Bad examples:** Raw JSON errors, HTTP status codes, technical stack traces

**Security:**
- ✅ **No sensitive data:** Doesn't expose API keys, tokens, passwords
- ✅ **No internal details:** Doesn't show server paths, database errors
- ✅ **Safe error details:** Only shows what user needs to know
- ❌ **Bad examples:** Shows full API key, exposes internal errors

**2. Error Types to Test:**

**Invalid Symbol:**
- Use clearly invalid symbol: "INVALID123XYZ"
- Use malformed symbol: "AA PL" (with space)
- Use empty symbol: "" (if allowed)
- Expected: Clear message about invalid symbol, examples of valid formats

**Missing Required Field:**
- Leave Symbol empty and try to execute
- Leave Resource empty (if possible)
- Leave Operation empty (if possible)
- Expected: Clear message identifying which field is missing

**Invalid API Key:**
- Temporarily set API key to "test" or "invalid"
- Remove API key (if possible)
- Expected: Clear message about authentication, guidance on where to set API key

**Rate Limit Exceeded:**
- Make many rapid requests (if possible)
- Expected: Clear message about rate limits, when limit resets, upgrade options

**Network/Connection Errors:**
- Disconnect internet (if testing locally)
- Expected: Clear message about connection issues

**3. Where Errors Appear:**
- **n8n UI:** Error shown in node execution panel
- **Node output:** Error in JSON output tab
- **Error notification:** Toast/notification message
- **Field validation:** Inline error next to field

#### What to Test:
Test these error scenarios systematically (one at a time):

**Test 1: Invalid Symbol**
1. Configure node: Resource: Core Data, Operation: Get Quote
2. Enter symbol: "INVALID123XYZ"
3. Execute the workflow
4. Observe error message
5. Document exact error text
6. Check where error appears (UI, output, notification)

**Test 2: Missing Required Field**
1. Configure node: Resource: Core Data, Operation: Get Quote
2. Leave Symbol field empty
3. Try to execute (may be prevented by n8n validation)
4. Observe error message or validation feedback
5. Document exact error text
6. Check if it identifies which field is missing

**Test 3: Invalid API Key**
1. Temporarily change API key to "test" or "invalid_key"
2. Configure node with valid symbol: "AAPL"
3. Execute the workflow
4. Observe error message
5. Document exact error text
6. Check if it's user-friendly (not raw API error)

**Test 4: Rate Limit (if possible)**
1. Make 10+ rapid requests in quick succession
2. Observe if rate limit error appears
3. Document exact error text
4. Check if it explains rate limits and solutions

**Test 5: Malformed Input**
1. Try various malformed inputs:
   - Symbol with spaces: "AA PL"
   - Symbol with special characters: "AAPL@#$"
   - Invalid date format (if date fields exist)
2. Document error messages for each

#### Detailed Checklist:

**Error Message Assessment Table:**

| Error Type | Trigger Method | Error Message Text (Exact) | Where Shown | Clear? | Actionable? | User-Friendly? | Exposes Sensitive Info? | Notes |
|------------|---------------|---------------------------|-------------|--------|-------------|-----------------|------------------------|-------|
| Invalid symbol | Symbol: "INVALID123" | [paste exact text] | UI/Output/Notification | Yes/No | Yes/No | Yes/No | Yes/No | [observations] |
| Missing Symbol | Symbol: (empty) | [paste exact text] | UI/Output/Notification | Yes/No | Yes/No | Yes/No | Yes/No | [observations] |
| Invalid API key | API key: "test" | [paste exact text] | UI/Output/Notification | Yes/No | Yes/No | Yes/No | Yes/No | [observations] |
| Rate limit | Multiple rapid requests | [paste exact text] | UI/Output/Notification | Yes/No | Yes/No | Yes/No | Yes/No | [observations] |
| Malformed input | Various invalid formats | [paste exact text] | UI/Output/Notification | Yes/No | Yes/No | Yes/No | Yes/No | [observations] |

**For Each Error, Check:**

**Clarity:**
- [ ] Error clearly identifies the problem? (Yes/No)
- [ ] Error identifies which field is problematic? (Yes/No)
- [ ] Error uses plain language? (Yes/No)
- [ ] Error is specific (not generic)? (Yes/No)

**Actionability:**
- [ ] Error suggests how to fix? (Yes/No)
- [ ] Error provides examples of correct format? (Yes/No)
- [ ] Error provides links to help/documentation? (Yes/No)
- [ ] Error explains next steps? (Yes/No)

**User-Friendliness:**
- [ ] Error is readable and well-formatted? (Yes/No)
- [ ] Error is not raw API error? (Yes/No)
- [ ] Error provides context? (Yes/No)
- [ ] Error has helpful tone? (Yes/No)

**Security:**
- [ ] Error doesn't expose API key? (Yes/No)
- [ ] Error doesn't expose sensitive data? (Yes/No)
- [ ] Error doesn't show internal details? (Yes/No)
- [ ] Error only shows necessary information? (Yes/No)

**Error Display:**
- [ ] Error appears in appropriate location? (Yes/No)
- [ ] Error is visible and noticeable? (Yes/No)
- [ ] Error doesn't block other UI elements? (Yes/No)
- [ ] Error can be dismissed/cleared? (Yes/No)

#### What to Share:
- **Screenshots:** Screenshot of each error message (if different)
- **Complete Error Message Documentation:**

**Error 1: Invalid Symbol**
- **Trigger:** Symbol: "INVALID123"
- **Error Message (Exact Text):** [paste complete error message]
- **Where Shown:** UI / Output Tab / Notification / Field validation
- **Clarity:** Yes/No - [explain]
- **Actionability:** Yes/No - [explain]
- **User-Friendly:** Yes/No - [explain]
- **Security:** Yes/No - [explain]
- **Screenshot:** [ ] Captured

**Error 2: Missing Required Field**
- **Trigger:** Symbol field empty
- **Error Message (Exact Text):** [paste complete error message]
- **Where Shown:** UI / Output Tab / Notification / Field validation
- **Clarity:** Yes/No - [explain]
- **Actionability:** Yes/No - [explain]
- **User-Friendly:** Yes/No - [explain]
- **Security:** Yes/No - [explain]
- **Screenshot:** [ ] Captured

**Error 3: Invalid API Key**
- **Trigger:** API key set to "test"
- **Error Message (Exact Text):** [paste complete error message]
- **Where Shown:** UI / Output Tab / Notification / Field validation
- **Clarity:** Yes/No - [explain]
- **Actionability:** Yes/No - [explain]
- **User-Friendly:** Yes/No - [explain]
- **Security:** Yes/No - [explain - check if API key exposed]
- **Screenshot:** [ ] Captured

**Error 4: Rate Limit (if encountered)**
- **Trigger:** Multiple rapid requests
- **Error Message (Exact Text):** [paste complete error message]
- **Where Shown:** UI / Output Tab / Notification / Field validation
- **Clarity:** Yes/No - [explain]
- **Actionability:** Yes/No - [explain]
- **User-Friendly:** Yes/No - [explain]
- **Security:** Yes/No - [explain]
- **Screenshot:** [ ] Captured

**Error 5: Malformed Input (if tested)**
- **Trigger:** [describe]
- **Error Message (Exact Text):** [paste complete error message]
- **Where Shown:** UI / Output Tab / Notification / Field validation
- **Clarity:** Yes/No - [explain]
- **Actionability:** Yes/No - [explain]
- **User-Friendly:** Yes/No - [explain]
- **Security:** Yes/No - [explain]
- **Screenshot:** [ ] Captured

- **Overall Assessment:**
  - Do error messages clearly identify problems? (Yes/No/Partial)
  - Do error messages suggest fixes? (Yes/No/Partial)
  - Are error messages user-friendly? (Yes/No/Partial)
  - Do error messages expose sensitive information? (Yes/No)
  - Are errors displayed appropriately? (Yes/No)
  - Are there any raw API errors shown? (Yes/No)

- **Result:** PASS / FAIL
- **Notes:** 
  - Specific suggestions for improving error messages
  - Which errors need better clarity
  - Which errors need more actionable guidance
  - Any security concerns (exposed sensitive data)
  - Any user-friendliness issues (raw API errors, technical jargon)

---

### 📊 INT-001: Google Sheets Integration

**Priority:** High  
**Estimated Time:** 15 minutes  
**Dependencies:** n8n running, Google account, Google Sheets access

#### What to Test:
1. Create a new workflow in n8n
2. Add nodes in this order:
   - **Manual Trigger** (start)
   - **Twelve Data** (Get Quote, Symbol: AAPL)
   - **Google Sheets** (Append to sheet)
3. Configure Twelve Data node:
   - Resource: Core Data
   - Operation: Get Quote
   - Symbol: AAPL
4. Configure Google Sheets node:
   - Operation: Append
   - Map these fields from Twelve Data output:
     - `symbol` → Column A
     - `close` (price) → Column B
     - `datetime` → Column C
5. Execute the workflow
6. Check your Google Sheet to verify data appeared

#### What to Share:
- **Screenshots:**
  - Workflow diagram showing all 3 nodes connected
  - Twelve Data node configuration
  - Google Sheets node configuration (showing field mappings)
  - Google Sheet showing the appended data
- **Observations:**
  - Did the workflow execute without errors? (Yes/No)
  - Did data flow from Twelve Data to Google Sheets? (Yes/No)
  - Were all mapped fields correctly populated? (Yes/No)
  - Were data types preserved (numbers as numbers, not text)? (Yes/No)
  - What data appeared in the sheet? (List the values)
- **Result:** PASS / FAIL
- **Notes:** Any issues with field mapping, data types, or execution

---

### 🔗 INT-002: Webhook Integration

**Priority:** High  
**Estimated Time:** 10 minutes  
**Dependencies:** n8n running, webhook.site account (or similar)

#### What to Test:
1. Go to webhook.site (or similar service) and get a test webhook URL
2. Create a new workflow in n8n:
   - **Manual Trigger** (start)
   - **Twelve Data** (Get Quote, Symbol: BTC/USD)
   - **HTTP Request** (POST to webhook)
3. Configure Twelve Data node:
   - Resource: Core Data
   - Operation: Get Quote
   - Symbol: BTC/USD
4. Configure HTTP Request node:
   - Method: POST
   - URL: [your webhook.site URL]
   - Body: JSON
   - Body content: Use n8n expressions to send price data, e.g.:
     ```json
     {
       "symbol": "{{ $json.symbol }}",
       "price": {{ $json.close }},
       "timestamp": "{{ $json.datetime }}"
     }
     ```
5. Execute the workflow
6. Check webhook.site to see if the request was received

#### What to Share:
- **Screenshots:**
  - Workflow diagram
  - HTTP Request node configuration
  - webhook.site showing the received request
- **Observations:**
  - Did the workflow execute without errors? (Yes/No)
  - Did the webhook receive the POST request? (Yes/No)
  - Was the JSON body correctly formatted? (Yes/No)
  - What data was received? (Paste the JSON from webhook.site)
  - Were all fields properly formatted? (Yes/No)
- **Result:** PASS / FAIL
- **Notes:** Any issues with HTTP request configuration or data formatting

---

### 🔀 INT-003: IF Node Conditional Logic

**Priority:** High  
**Estimated Time:** 15 minutes  
**Dependencies:** n8n running

#### What to Test:
1. Create a new workflow:
   - **Manual Trigger** (start)
   - **Twelve Data** (Get Quote, Symbol: AAPL)
   - **IF** node
   - **Set** node (true branch)
   - **Set** node (false branch)
2. Configure Twelve Data node:
   - Resource: Core Data
   - Operation: Get Quote
   - Symbol: AAPL
3. Configure IF node:
   - Condition: `{{ $json.percent_change }} > 0` (price went up)
4. Configure Set nodes:
   - **True branch:** Set `status = "UP"`
   - **False branch:** Set `status = "DOWN"`
5. Execute the workflow multiple times (to test both branches if possible)
6. Verify which branch executed based on the actual percent_change value

#### What to Share:
- **Screenshots:**
  - Workflow diagram showing all nodes
  - IF node configuration
  - Execution result showing which branch was taken
  - Output from the Set node that executed
- **Observations:**
  - Did the IF node correctly evaluate the Twelve Data output? (Yes/No)
  - Did data flow to the correct branch based on condition? (Yes/No)
  - Did both branches work correctly? (Yes/No - test both if possible)
  - Did field references work (e.g., `{{ $json.percent_change }}`)? (Yes/No)
  - What was the actual percent_change value? (Number)
  - Which branch executed? (True/False)
- **Result:** PASS / FAIL
- **Notes:** Any issues with conditional logic or field references

---

### 🔄 INT-004: Set Node Data Transformation

**Priority:** Medium  
**Estimated Time:** 10 minutes  
**Dependencies:** n8n running

#### What to Test:
1. Create a new workflow:
   - **Manual Trigger** (start)
   - **Twelve Data** (Get Quote, Symbol: MSFT)
   - **Set** node
2. Configure Twelve Data node:
   - Resource: Core Data
   - Operation: Get Quote
   - Symbol: MSFT
3. Configure Set node to create these transformed fields:
   - `formatted_price`: `${{ $json.close }}`
   - `summary`: `{{ $json.symbol }}: {{ $json.close }} ({{ $json.percent_change }}%)`
   - `year_high`: `{{ $json.fifty_two_week.high }}`
4. Execute the workflow
5. Check the Set node output to verify transformations

#### What to Share:
- **Screenshots:**
  - Workflow diagram
  - Set node configuration showing all transformations
  - Set node output showing transformed data
- **Observations:**
  - Did field access work (`{{ $json.close }}`)? (Yes/No)
  - Did nested field access work (`{{ $json.fifty_two_week.high }}`)? (Yes/No)
  - Did string concatenation work? (Yes/No)
  - Did number formatting work? (Yes/No)
  - What were the actual transformed values? (List them)
- **Result:** PASS / FAIL
- **Notes:** Any issues with field access, nested fields, or transformations

---

### 🔁 INT-005: Multiple Twelve Data Nodes

**Priority:** Medium  
**Estimated Time:** 10 minutes  
**Dependencies:** n8n running

#### What to Test:
1. Create a new workflow:
   - **Manual Trigger** (start)
   - **Twelve Data** node 1 (EUR/USD)
   - **Twelve Data** node 2 (GBP/USD)
   - **Merge** node
2. Configure first Twelve Data node:
   - Resource: Core Data
   - Operation: Get Quote
   - Symbol: EUR/USD
3. Configure second Twelve Data node:
   - Resource: Core Data
   - Operation: Get Quote
   - Symbol: GBP/USD
4. Configure Merge node to combine results from both nodes
5. Execute the workflow
6. Verify both nodes executed and data merged correctly

#### What to Share:
- **Screenshots:**
  - Workflow diagram showing both Twelve Data nodes
  - Output from first node (EUR/USD)
  - Output from second node (GBP/USD)
  - Merged output
- **Observations:**
  - Did both Twelve Data nodes execute? (Yes/No)
  - Did each node return correct data for its symbol? (Yes/No)
  - What were the prices? EUR/USD: _____, GBP/USD: _____
  - Did the data merge correctly? (Yes/No)
  - Were there any conflicts between the two nodes? (Yes/No)
- **Result:** PASS / FAIL
- **Notes:** Any issues with multiple nodes or merging

---

### 🔂 INT-006: Loop Processing

**Priority:** Medium  
**Estimated Time:** 15 minutes  
**Dependencies:** n8n running

#### What to Test:
1. Create a new workflow:
   - **Manual Trigger** (start)
   - **Set** node (create symbol array)
   - **Loop Over Items** node
   - **Twelve Data** node
   - **Wait** node (0.5s delay - to avoid rate limiting)
   - **Aggregate** node (optional)
2. Configure Set node:
   - Create an array: `["AAPL", "MSFT", "GOOGL", "TSLA"]`
3. Configure Loop Over Items to iterate through the array
4. Configure Twelve Data node:
   - Symbol: `{{ $json.item }}` (or appropriate loop variable)
5. Execute the workflow
6. Verify all symbols were processed

#### What to Share:
- **Screenshots:**
  - Workflow diagram
  - Set node configuration
  - Loop configuration
  - Execution showing all iterations
  - Final aggregated results (if applicable)
- **Observations:**
  - Did the loop iterate through all symbols? (Yes/No)
  - How many symbols were processed? (Number: _____)
  - Did the Twelve Data node execute for each symbol? (Yes/No)
  - Were results aggregated correctly? (Yes/No)
  - Were there any rate limiting issues? (Yes/No)
  - How long did the workflow take? (Time: _____)
- **Result:** PASS / FAIL
- **Notes:** Any issues with looping, rate limiting, or aggregation

---

### ⏱️ PERF-001: Response Time Measurement

**Priority:** High  
**Estimated Time:** 10 minutes  
**Dependencies:** n8n running, stopwatch/timer

#### What to Test:
1. Create a simple workflow: Manual Trigger → Twelve Data (Get Quote, Symbol: AAPL)
2. Execute the workflow **10 times** in a row
3. For each execution, record the response time (from clicking Execute to seeing results)
4. Calculate average, min, and max response times

#### What to Share:
- **Response Time Log:**

| Execution | Response Time (ms) | Notes |
|-----------|-------------------|-------|
| 1 | _____ | |
| 2 | _____ | |
| 3 | _____ | |
| 4 | _____ | |
| 5 | _____ | |
| 6 | _____ | |
| 7 | _____ | |
| 8 | _____ | |
| 9 | _____ | |
| 10 | _____ | |

- **Calculations:**
  - Average response time: _____ ms
  - Minimum response time: _____ ms
  - Maximum response time: _____ ms
- **Observations:**
  - Is average < 1 second? (Yes/No)
  - Is max < 3 seconds? (Yes/No)
  - Are response times consistent? (Yes/No)
  - Any outliers? (Yes/No - if yes, which execution?)
- **Result:** PASS / FAIL
- **Notes:** Any performance concerns or observations

---

### 📦 PERF-002: Large Dataset Handling

**Priority:** High  
**Estimated Time:** 10 minutes  
**Dependencies:** n8n running

#### What to Test:
1. Create a workflow: Manual Trigger → Twelve Data (List Stocks)
2. Execute the workflow
3. Monitor n8n UI responsiveness while data loads
4. Check if n8n shows any warnings about large datasets
5. Repeat with List Cryptocurrencies operation

#### What to Share:
- **Screenshots:**
  - n8n UI showing large dataset (or warning message)
  - Execution result (if visible)
- **Observations:**
  - Did List Stocks load without crashing? (Yes/No)
  - Did List Cryptocurrencies load without crashing? (Yes/No)
  - How many items were returned? (Approximate count: _____)
  - Did n8n UI remain responsive? (Yes/No)
  - Did n8n show a warning about large data? (Yes/No - if yes, what did it say?)
  - Were there any memory errors? (Yes/No)
  - How long did it take to load? (Time: _____)
- **Result:** PASS / FAIL
- **Notes:** Any performance issues, crashes, or UI freezes

---

### 💾 PERF-003: Memory Usage

**Priority:** Medium  
**Estimated Time:** 15 minutes  
**Dependencies:** n8n running, system monitoring tool (optional)

#### What to Test:
1. Note initial n8n memory usage (if possible, or just note "baseline")
2. Create a workflow: Manual Trigger → Twelve Data (Get Quote)
3. Execute the workflow **20 times** consecutively
4. Check memory usage after all operations complete
5. Wait 1 minute, check memory again (to see if it's released)

#### What to Share:
- **Memory Usage Log:**

| Stage | Memory Usage | Notes |
|-------|-------------|-------|
| Initial (before operations) | _____ MB | |
| After 20 operations | _____ MB | |
| After 1 minute wait | _____ MB | |

- **Observations:**
  - Did memory usage remain reasonable? (Yes/No)
  - Was memory released after workflow completion? (Yes/No)
  - Any suspected memory leaks? (Yes/No)
  - If you couldn't measure memory, describe n8n's behavior: (Did it slow down? Any crashes?)
- **Result:** PASS / FAIL / N/A (if couldn't measure)
- **Notes:** Any memory concerns or observations

---

### 🔀 PERF-004: Concurrent Requests

**Priority:** Low  
**Estimated Time:** 10 minutes  
**Dependencies:** n8n running

#### What to Test:
1. Create a workflow with **5 parallel Twelve Data nodes**:
   - Manual Trigger → [Five Twelve Data nodes in parallel]
   - Each node: Get Quote with different symbols (AAPL, MSFT, GOOGL, TSLA, NVDA)
2. Execute the workflow (all 5 nodes should run simultaneously)
3. Monitor for rate limiting errors
4. Check if all nodes complete successfully

#### What to Share:
- **Screenshots:**
  - Workflow diagram showing 5 parallel nodes
  - Execution results showing all nodes completed
- **Observations:**
  - Did all 5 nodes execute? (Yes/No)
  - How many completed successfully? (Number: _____)
  - Were there any conflicts between concurrent requests? (Yes/No)
  - Were there any rate limiting errors? (Yes/No - if yes, how many?)
  - How long did it take for all nodes to complete? (Time: _____)
- **Result:** PASS / FAIL
- **Notes:** Any rate limiting issues or conflicts

---

### 📖 DOC-001: README Completeness

**Priority:** High  
**Estimated Time:** 15 minutes  
**Dependencies:** README.md file

#### What to Review:
Read through the README.md file and check:

#### What to Share:
- **Checklist Results:**

| Item | Status | Notes |
|------|--------|-------|
| Installation instructions clear and complete | Yes/No | [any issues] |
| Credentials setup explained | Yes/No | [any issues] |
| All operations listed | Yes/No | [missing operations?] |
| Usage examples provided | Yes/No | [sufficient examples?] |
| Compatibility information accurate | Yes/No | [any inaccuracies?] |
| Links work correctly | Yes/No | [broken links?] |
| No typos or grammatical errors | Yes/No | [list any found] |

- **Issues Found:**
  - [List any issues with installation, credentials, operations, examples, links, or typos]
- **Recommendations:**
  - [Suggestions for improvement]
- **Result:** PASS / FAIL
- **Notes:** Overall assessment of README quality

---

### 🔑 DOC-002: CREDENTIALS_SETUP Usability

**Priority:** High  
**Estimated Time:** 10 minutes  
**Dependencies:** CREDENTIALS_SETUP.md file (or equivalent)

#### What to Review:
Read through the credentials setup documentation and check:

#### What to Share:
- **Checklist Results:**

| Item | Status | Notes |
|------|--------|-------|
| Steps are clear and numbered | Yes/No | [any confusion?] |
| Screenshots/images helpful (if present) | Yes/No/N/A | [quality of images?] |
| API key location clearly explained | Yes/No | [clear instructions?] |
| n8n credential setup explained | Yes/No | [step-by-step?] |
| Troubleshooting section helpful | Yes/No/N/A | [common issues covered?] |
| Free tier limitations documented | Yes/No/N/A | [rate limits, etc.?] |

- **Issues Found:**
  - [List any issues with clarity, screenshots, instructions, or troubleshooting]
- **Recommendations:**
  - [Suggestions for improvement]
- **Result:** PASS / FAIL
- **Notes:** Overall assessment of credentials documentation

---

### 📚 DOC-003: Operation Descriptions

**Priority:** Medium  
**Estimated Time:** 20 minutes  
**Dependencies:** Documentation files describing operations

#### What to Review:
Review documentation for all Twelve Data operations and check:

#### What to Share:
- **Checklist Results:**

| Item | Status | Notes |
|------|--------|-------|
| All operations documented | Yes/No | [missing operations?] |
| Parameters explained | Yes/No | [clear parameter descriptions?] |
| Expected outputs described | Yes/No | [output structure explained?] |
| Examples provided | Yes/No | [sufficient examples?] |
| Limitations noted | Yes/No/N/A | [rate limits, data availability?] |

- **Operations Review:**
  - How many operations are documented? (Number: _____)
  - Are all operations from the node covered? (Yes/No)
  - Which operations need better documentation? (List them)
- **Issues Found:**
  - [List any issues with operation documentation]
- **Recommendations:**
  - [Suggestions for improvement]
- **Result:** PASS / FAIL
- **Notes:** Overall assessment of operation documentation

---

### 📋 DOC-004: Example Workflows

**Priority:** Medium  
**Estimated Time:** 20 minutes  
**Dependencies:** Example workflow JSON files

#### What to Review:
1. Check if example workflows exist in the `examples/` directory
2. Try importing at least one example workflow into n8n
3. Review the workflow structure
4. Check if examples are well-commented

#### What to Share:
- **Checklist Results:**

| Item | Status | Notes |
|------|--------|-------|
| Example workflows provided | Yes/No | [how many?] |
| Examples are importable | Yes/No | [any import errors?] |
| Examples work as documented | Yes/No | [tested execution?] |
| Examples cover common use cases | Yes/No | [what use cases?] |
| Examples are well-commented | Yes/No | [node descriptions?] |

- **Examples List:**
  - [List all example workflow files found]
  - [Brief description of what each example does]
- **Issues Found:**
  - [List any issues with examples (import errors, broken workflows, etc.)]
- **Recommendations:**
  - [Suggestions for additional examples or improvements]
- **Result:** PASS / FAIL
- **Notes:** Overall assessment of example workflows

---

## How to Share Results

When you complete a test, share:

1. **Test ID** (e.g., "UI-001")
2. **Result** (PASS / FAIL)
3. **Screenshots** (if applicable - describe file paths or attach)
4. **Observations** (fill in the tables/checklists from the test instructions)
5. **Notes** (any additional observations, issues, or suggestions)

**Example Format:**
```
Test ID: UI-001
Result: PASS

Screenshots:
- screenshots/ui-001-search-twelve-data.png
- screenshots/ui-001-search-stock.png

Observations:
- Node appears for "Twelve Data": Yes
- Node appears for "stock": Yes
- Node appears for "forex": Yes
- Node appears for "crypto": Yes
- Icon visible: Yes
- Description visible: Yes
- Description text: "Connect to Twelve Data API for financial data"

Notes:
- Node appears in all expected searches
- Description is clear and helpful
```

I'll then update both `INTEGRATION_TESTING.md` and `INTEGRATION_TESTING_CHECKLIST.md` with your detailed results.


