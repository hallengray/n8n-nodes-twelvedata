# Agent Coordination Guide

## Overview

Three agents are working concurrently to test all 142 operations in the Twelve Data n8n Node:

1. **Agent 1 (Current):** Core Data, Fundamentals, Reference Data, Advanced operations
2. **Agent 2 (Technical Indicators):** All 91 Technical Indicators operations
3. **Agent 3 (Market Intelligence):** All 8 Market Intelligence operations

## File Access Coordination

### Files That Multiple Agents May Update

**⚠️ IMPORTANT:** These files are shared. Agents must coordinate updates:

1. **`docs/TESTING_LOG.md`**
   - Each agent updates their own section
   - All agents update the summary table at the top
   - **Strategy:** Update summary counts carefully, verify before committing

2. **`docs/TESTING_PLAN.md`**
   - Each agent updates their own section
   - All agents update the progress summary table
   - **Strategy:** Update only your category row, verify totals

3. **`docs/COMPLETE_OPERATIONS_INVENTORY.md`**
   - Each agent updates their own operations
   - **Strategy:** Update only your assigned operations

### Files That Are Agent-Specific

- **Agent 1:** `nodes/TwelveData/operations/coreData.ts`, `fundamentals.ts`, `referenceData.ts`, `advanced.ts`
- **Agent 2:** `nodes/TwelveData/operations/technicalIndicators.ts`
- **Agent 3:** `nodes/TwelveData/operations/marketIntelligence.ts`

## Update Protocol

### When Recording a Test:

1. **Update Your Section First**
   - Add test entry to your section in TESTING_LOG.md
   - Update your section in TESTING_PLAN.md

2. **Update Summary Tables**
   - Update the summary table in TESTING_LOG.md
   - Update the progress summary in TESTING_PLAN.md
   - Be careful with totals - verify math

3. **Update Code Files**
   - Remove BETA labels from your assigned operations files
   - Only modify files assigned to you

### Summary Table Update Format

In `docs/TESTING_LOG.md`:
```markdown
| Category | Total Tests | Passed | Failed | Plan Limit | Planned | Skipped | Coverage |
|----------|-------------|--------|--------|------------|---------|---------|----------|
| Technical Indicators | 91 | X | 0 | 0 | 0 | 0 | X% |
| Market Intelligence | 8 | X | 0 | 0 | 0 | 0 | X% |
| **TOTAL** | **157** | **X** | **0** | **X** | **3** | **0** | **X%** |
```

In `docs/TESTING_PLAN.md`:
```markdown
| Category | Total | ✅ Pass | ❌ Fail | ⏸️ Plan Limit | 🚧 Planned | ⚠️ Partial | ⏳ Not Tested | Progress |
|----------|-------|---------|---------|---------------|------------|-------------|---------------|----------|
| Technical Indicators | 91 | X | 0 | 0 | 0 | 0 | X | X% |
| Market Intelligence | 8 | X | 0 | 0 | 0 | 0 | X | X% |
```

## Conflict Resolution

If you encounter a conflict when updating shared files:

1. **Read the current state** of the file first
2. **Update only your section** and summary counts
3. **Verify totals** match across all categories
4. **If totals don't match**, recalculate from all sections

## Status Communication

Each agent should track:
- Number of tests completed
- Number of tests passed
- Number of plan limits encountered
- Current progress percentage

## Best Practices

1. **Read before writing** - Always read the current state of shared files
2. **Update incrementally** - Update one test at a time
3. **Verify totals** - Double-check summary counts
4. **Be specific** - Update only your assigned sections
5. **Document clearly** - Use consistent formatting

## Current Status (as of start)

- **Agent 1:** Core Data (9): 7 passed, 1 planned, 1 plan limit | Fundamentals (16): 2 passed, 3 plan limits, 2 planned, 9 pending | Reference Data (15): 1 passed, 14 pending | Advanced (3): 0 tested
- **Agent 2:** Technical Indicators (91): 0 tested
- **Agent 3:** Market Intelligence (8): 0 tested

**Total Progress:** 25/157 tests completed (16%)

---

**Last Updated:** December 15, 2025
