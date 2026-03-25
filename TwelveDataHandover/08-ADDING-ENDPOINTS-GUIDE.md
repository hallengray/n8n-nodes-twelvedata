# Adding Endpoints - Quick Guide

A condensed reference for adding new endpoints to the Twelve Data n8n connector.

---

## 5-Minute Quickstart

### 1. Find the Endpoint

```bash
# Search the OpenAPI spec
cat openapi-spec.json | jq '.paths | keys[]' | grep -i "your_endpoint"

# Get endpoint details
cat openapi-spec.json | jq '.paths["/your_endpoint"]'
```

### 2. Add the Operation

Open `nodes/TwelveData/TwelveData.node.ts`, find the appropriate resource's operations array, and add:

```typescript
{
    name: 'Your Operation Name',
    value: 'yourOperationValue',
    action: 'Short action description',
    description: 'Longer description of what this does',
    routing: {
        request: {
            method: 'GET',
            url: '/your_endpoint',
        },
    },
},
```

### 3. Build and Test

```bash
npm run build
npm run lint
```

---

## Quick Templates

### Template 1: Simple Operation (No Extra Parameters)

Use when the endpoint only needs the common `symbol` parameter.

```typescript
// Add to the operations array for your resource
{
    name: 'Get Simple Data',
    value: 'getSimpleData',
    action: 'Get simple data for a symbol',
    description: 'Returns simple data for the specified symbol',
    routing: {
        request: {
            method: 'GET',
            url: '/simple_endpoint',
        },
    },
},
```

**That's it!** The common `symbol` parameter is already defined and will be used.

---

### Template 2: Operation with Required Parameter

Use when the endpoint needs additional required parameters.

```typescript
// Step 1: Add the operation
{
    name: 'Get Data with Period',
    value: 'getDataWithPeriod',
    action: 'Get data for a specific period',
    description: 'Returns data for the specified period',
    routing: {
        request: {
            method: 'GET',
            url: '/data_endpoint',
        },
    },
},

// Step 2: Add the required parameter (in properties array)
{
    displayName: 'Period',
    name: 'period',
    type: 'options',
    required: true,
    default: 'annual',
    description: 'The reporting period',
    displayOptions: {
        show: {
            resource: ['yourResource'],
            operation: ['getDataWithPeriod'],
        },
    },
    options: [
        { name: 'Annual', value: 'annual' },
        { name: 'Quarterly', value: 'quarterly' },
    ],
    routing: {
        send: {
            type: 'query',
            property: 'period',
        },
    },
},
```

---

### Template 3: Operation with Optional Parameters

Use when the endpoint has optional parameters users might want.

```typescript
// Step 1: Add the operation (same as above)
{
    name: 'Get Flexible Data',
    value: 'getFlexibleData',
    action: 'Get data with options',
    description: 'Returns data with optional filters',
    routing: {
        request: {
            method: 'GET',
            url: '/flexible_endpoint',
        },
    },
},

// Step 2: Add optional parameters collection
{
    displayName: 'Additional Options',
    name: 'flexibleDataOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
        show: {
            resource: ['yourResource'],
            operation: ['getFlexibleData'],
        },
    },
    options: [
        {
            displayName: 'Start Date',
            name: 'start_date',
            type: 'string',
            default: '',
            placeholder: 'e.g., 2024-01-01',
            description: 'Filter data from this date',
            routing: {
                send: {
                    type: 'query',
                    property: 'start_date',
                },
            },
        },
        {
            displayName: 'End Date',
            name: 'end_date',
            type: 'string',
            default: '',
            placeholder: 'e.g., 2024-12-31',
            description: 'Filter data until this date',
            routing: {
                send: {
                    type: 'query',
                    property: 'end_date',
                },
            },
        },
        {
            displayName: 'Output Size',
            name: 'outputsize',
            type: 'number',
            default: 30,
            description: 'Number of results to return',
            routing: {
                send: {
                    type: 'query',
                    property: 'outputsize',
                },
            },
        },
    ],
},
```

---

## Parameter Type Reference

### String Parameter

```typescript
{
    displayName: 'Country',
    name: 'country',
    type: 'string',
    default: '',
    placeholder: 'e.g., United States',
    description: 'Filter by country name',
    routing: {
        send: {
            type: 'query',
            property: 'country',
        },
    },
},
```

### Number Parameter

```typescript
{
    displayName: 'Output Size',
    name: 'outputsize',
    type: 'number',
    default: 30,
    description: 'Number of data points (1-5000)',
    routing: {
        send: {
            type: 'query',
            property: 'outputsize',
        },
    },
},
```

### Boolean Parameter

```typescript
{
    displayName: 'Show Plan',
    name: 'show_plan',
    type: 'boolean',
    default: false,
    description: 'Whether to show plan requirements',
    routing: {
        send: {
            type: 'query',
            property: 'show_plan',
            // Only send if true
            value: '={{$value ? "true" : undefined}}',
        },
    },
},
```

### Options (Dropdown) Parameter

```typescript
{
    displayName: 'Interval',
    name: 'interval',
    type: 'options',
    default: '1day',
    description: 'Time interval between data points',
    options: [
        { name: '1 Minute', value: '1min' },
        { name: '5 Minutes', value: '5min' },
        { name: '15 Minutes', value: '15min' },
        { name: '30 Minutes', value: '30min' },
        { name: '1 Hour', value: '1h' },
        { name: '1 Day', value: '1day' },
        { name: '1 Week', value: '1week' },
        { name: '1 Month', value: '1month' },
    ],
    routing: {
        send: {
            type: 'query',
            property: 'interval',
        },
    },
},
```

---

## Common Routing Patterns

### Standard Query Parameter

```typescript
routing: {
    send: {
        type: 'query',
        property: 'param_name',
    },
},
```

### Conditional Query Parameter

Only send if value is truthy:

```typescript
routing: {
    send: {
        type: 'query',
        property: 'optional_param',
        value: '={{$value || undefined}}',
    },
},
```

### Combined Parameters

Combine two fields into one API parameter:

```typescript
// For fromSymbol field
routing: {
    send: {
        type: 'query',
        property: 'symbol',
        value: '={{$value + "/" + $parameter["toSymbol"]}}',
    },
},
```

### Dynamic URL

Use parameter value in the URL path:

```typescript
routing: {
    request: {
        url: '=/indicator/{{ $parameter["indicatorType"] }}',
    },
},
```

---

## Display Options Reference

### Show for Specific Resource

```typescript
displayOptions: {
    show: {
        resource: ['coreData'],
    },
},
```

### Show for Specific Operation

```typescript
displayOptions: {
    show: {
        resource: ['coreData'],
        operation: ['getTimeSeries'],
    },
},
```

### Show for Multiple Operations

```typescript
displayOptions: {
    show: {
        resource: ['coreData'],
        operation: ['getTimeSeries', 'getQuote', 'getPrice'],
    },
},
```

### Hide for Specific Operations

```typescript
displayOptions: {
    show: {
        resource: ['coreData'],
    },
    hide: {
        operation: ['getExchangeRate', 'currencyConversion'],
    },
},
```

---

## Real-World Examples

### Example 1: Add Balance Sheet Endpoint

```typescript
// 1. Add to Fundamentals operations
{
    name: 'Get Balance Sheet',
    value: 'getBalanceSheet',
    action: 'Get balance sheet data',
    description: 'Get quarterly or annual balance sheet data for a company',
    routing: {
        request: {
            method: 'GET',
            url: '/balance_sheet',
        },
    },
},

// 2. Add period parameter
{
    displayName: 'Period',
    name: 'balanceSheetPeriod',
    type: 'options',
    required: true,
    default: 'annual',
    description: 'The reporting period',
    displayOptions: {
        show: {
            resource: ['fundamentals'],
            operation: ['getBalanceSheet'],
        },
    },
    options: [
        { name: 'Annual', value: 'annual' },
        { name: 'Quarterly', value: 'quarterly' },
    ],
    routing: {
        send: {
            type: 'query',
            property: 'period',
        },
    },
},
```

### Example 2: Add RSI Indicator

```typescript
// 1. Add to Analysis operations
{
    name: 'Get RSI',
    value: 'getRsi',
    action: 'Calculate RSI indicator',
    description: 'Calculate Relative Strength Index for a symbol',
    routing: {
        request: {
            method: 'GET',
            url: '/rsi',
        },
    },
},

// 2. Add RSI-specific parameters
{
    displayName: 'Time Period',
    name: 'rsiTimePeriod',
    type: 'number',
    required: true,
    default: 14,
    description: 'Number of periods for RSI calculation',
    displayOptions: {
        show: {
            resource: ['analysis'],
            operation: ['getRsi'],
        },
    },
    routing: {
        send: {
            type: 'query',
            property: 'time_period',
        },
    },
},
```

### Example 3: Add Batch Quote Endpoint

```typescript
// 1. Add operation
{
    name: 'Get Multiple Quotes',
    value: 'getMultipleQuotes',
    action: 'Get quotes for multiple symbols',
    description: 'Get real-time quotes for up to 8 symbols at once',
    routing: {
        request: {
            method: 'GET',
            url: '/quote',
        },
    },
},

// 2. Add symbols parameter (comma-separated)
{
    displayName: 'Symbols',
    name: 'multipleSymbols',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'e.g., AAPL,MSFT,GOOGL',
    description: 'Comma-separated list of symbols (max 8)',
    displayOptions: {
        show: {
            resource: ['coreData'],
            operation: ['getMultipleQuotes'],
        },
    },
    routing: {
        send: {
            type: 'query',
            property: 'symbol',
        },
    },
},
```

---

## Checklist

Before committing your new endpoint:

- [ ] Operation added to correct resource
- [ ] `name` is user-friendly
- [ ] `value` is camelCase
- [ ] `action` is concise
- [ ] `description` explains what it does
- [ ] `url` matches OpenAPI spec exactly
- [ ] Required parameters have `required: true`
- [ ] Optional parameters are in a collection
- [ ] `displayOptions` shows field only when needed
- [ ] `routing` sends parameters correctly
- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes

---

## Quick Debugging

### Operation Not Showing

1. Check `displayOptions` - is the resource correct?
2. Check for syntax errors (missing commas, brackets)
3. Run `npm run build` and check for errors

### Parameter Not Being Sent

1. Check `routing.send.property` matches API parameter name
2. Check `displayOptions` matches your operation
3. For optional params, check they're in a `collection`

### Wrong Data Returned

1. Verify `url` matches OpenAPI spec exactly
2. Check parameter names match API expectations
3. Test the raw API call with curl first

---

## Need More Help?

- **Full guide**: `docs/REGENERATION_GUIDE.md`
- **OpenAPI analysis**: `docs/OPENAPI_ANALYSIS.md`
- **Coverage report**: `node scripts/validate-implementation.js`
- **n8n docs**: [Creating Nodes](https://docs.n8n.io/integrations/creating-nodes/)

---

*Quick reference for Twelve Data n8n connector development*







