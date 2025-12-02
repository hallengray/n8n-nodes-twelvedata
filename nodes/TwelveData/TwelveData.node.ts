/**
 * TwelveData.node.ts
 * 
 * This is the main node file for the Twelve Data n8n connector.
 * It defines what users see in the n8n interface and how the node behaves.
 * 
 * ARCHITECTURE OVERVIEW:
 * ----------------------
 * This node uses n8n's "declarative style" (also called low-code approach).
 * Instead of writing manual API call logic, we define:
 * 1. What fields to show the user (properties)
 * 2. How to construct API requests (routing)
 * 
 * n8n then automatically handles making the HTTP requests for us!
 * 
 * KEY CONCEPTS:
 * - Resource: A category of data (Stock, Forex, Crypto, etc.)
 * - Operation: An action on that resource (Get Quote, Get Time Series, etc.)
 * - Properties: Form fields users fill out (symbol, interval, etc.)
 * - Routing: How user input maps to API endpoints
 */

import {
	// NodeConnectionTypes defines input/output connection types
	// 'Main' means standard data flow (most common)
	NodeConnectionTypes,
	
	// INodeType is the interface our class must implement
	// Think of it as a contract - our class must have certain properties/methods
	type INodeType,
	
	// INodeTypeDescription describes everything about our node
	// This is the "blueprint" that tells n8n how to render and use our node
	type INodeTypeDescription,
} from 'n8n-workflow';

// =============================================================================
// RESOURCE DESCRIPTIONS (imported from separate files for organization)
// =============================================================================
// Each resource (Stock, Forex, etc.) has its own file defining:
// - Available operations (Get Quote, Get Time Series, etc.)
// - Required/optional parameters for each operation
// - How to route requests to the Twelve Data API
//
// We'll create these files in the next steps. For now, we start with basics.
// =============================================================================

/**
 * The main TwelveData node class
 * 
 * This class implements INodeType, which means it must have:
 * - description: Object describing the node (required)
 * - execute(): Function that runs the node (optional for declarative nodes)
 * - methods: Helper methods like list search (optional)
 * 
 * Since we're using declarative style with routing, we don't need execute()!
 * n8n will automatically make API calls based on our routing configuration.
 */
export class TwelveData implements INodeType {
	/**
	 * NODE DESCRIPTION
	 * ================
	 * This object tells n8n everything about our node:
	 * - How to display it in the UI
	 * - What credentials it needs
	 * - What form fields to show users
	 * - How to make API requests
	 */
	description: INodeTypeDescription = {
		// =========================================================================
		// BASIC INFORMATION
		// =========================================================================
		
		/**
		 * displayName: What users see when searching for nodes
		 * This appears in the node browser and on the node itself
		 */
		displayName: 'Twelve Data',
		
		/**
		 * name: Internal identifier used by n8n
		 * RULES:
		 * - Must be lowercase
		 * - No spaces (use camelCase)
		 * - Must be unique across all nodes
		 * - Once published, NEVER change this (breaks existing workflows)
		 */
		name: 'twelveData',
		
		/**
		 * icon: Path to the node's icon
		 * 
		 * We support both light and dark themes!
		 * - light: Used on light backgrounds
		 * - dark: Used on dark backgrounds
		 * 
		 * The path is relative to this file's location
		 * '../../icons/' goes up 2 folders (to project root) then into icons/
		 */
		icon: {
			light: 'file:../../icons/twelvedata.svg',
			dark: 'file:../../icons/twelvedata.dark.svg',
		},
		
		/**
		 * group: Which category the node appears under in n8n
		 * Common options:
		 * - 'input': Nodes that bring data in (APIs, databases)
		 * - 'transform': Nodes that modify data
		 * - 'output': Nodes that send data out
		 * 
		 * We use 'input' because we're fetching data from an external API
		 */
		group: ['input'],
		
		/**
		 * version: Version number of this node
		 * 
		 * Start with 1. Increment when you make breaking changes.
		 * n8n uses this to handle backward compatibility.
		 */
		version: 1,
		
		/**
		 * subtitle: Dynamic text shown under the node on the canvas
		 * 
		 * This uses n8n's expression syntax:
		 * - ={{...}} means "evaluate this expression"
		 * - $parameter["resource"] gets the selected resource value
		 * - $parameter["operation"] gets the selected operation value
		 * 
		 * Example output: "Stock: Get Quote" or "Crypto: Get Time Series"
		 */
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		
		/**
		 * description: Longer description shown in the node browser
		 * Helps users understand what this node does
		 */
		description: 'Access real-time and historical financial market data from Twelve Data API including stocks, forex, cryptocurrencies, ETFs, and indices',
		
		/**
		 * defaults: Default values when node is first added to canvas
		 */
		defaults: {
			// Default name shown on the node
			name: 'Twelve Data',
		},
		
		/**
		 * usableAsTool: Allows this node to be used as an AI tool
		 * 
		 * When true, AI agents in n8n can use this node to fetch data.
		 * Great for building AI-powered financial analysis workflows!
		 */
		usableAsTool: true,
		
		// =========================================================================
		// CONNECTIONS
		// =========================================================================
		
		/**
		 * inputs: What types of connections this node accepts
		 * 
		 * NodeConnectionTypes.Main = standard data connection
		 * Most nodes have one main input (data flows in)
		 */
		inputs: [NodeConnectionTypes.Main],
		
		/**
		 * outputs: What types of connections this node provides
		 * 
		 * NodeConnectionTypes.Main = standard data connection
		 * Most nodes have one main output (data flows out)
		 */
		outputs: [NodeConnectionTypes.Main],
		
		// =========================================================================
		// CREDENTIALS
		// =========================================================================
		
		/**
		 * credentials: Which credential types this node can use
		 * 
		 * This links to our TwelveDataApi.credentials.ts file.
		 * The 'name' must match exactly: 'twelveDataApi'
		 */
		credentials: [
			{
				// Must match the 'name' property in TwelveDataApi.credentials.ts
				name: 'twelveDataApi',
				
				// User must configure credentials to use this node
				required: true,
			},
		],
		
		// =========================================================================
		// REQUEST DEFAULTS
		// =========================================================================
		
		/**
		 * requestDefaults: Default settings for ALL API requests
		 * 
		 * These are applied to every request made by this node.
		 * Individual operations can override these if needed.
		 */
		requestDefaults: {
			// Base URL for all Twelve Data API requests
			baseURL: 'https://api.twelvedata.com',
			
			// Default headers sent with every request
			headers: {
				// We expect JSON responses
				Accept: 'application/json',
				
				// We send JSON in request bodies (for POST requests)
				'Content-Type': 'application/json',
			},
		},
		
		// =========================================================================
		// PROPERTIES (Form Fields)
		// =========================================================================
		
		/**
		 * properties: Array of form fields shown to users
		 * 
		 * This is where the magic happens! Each property defines:
		 * - What type of field (dropdown, text, number, etc.)
		 * - When to show it (based on other selections)
		 * - How it maps to API parameters (routing)
		 * 
		 * PROPERTY TYPES:
		 * - 'options': Dropdown menu
		 * - 'string': Text input
		 * - 'number': Number input
		 * - 'boolean': Checkbox
		 * - 'collection': Group of optional fields
		 * - 'fixedCollection': Group of fields that can be repeated
		 * 
		 * ORDER MATTERS! Fields appear in the order listed here.
		 */
		properties: [
			// -----------------------------------------------------------------
			// RESOURCE SELECTOR
			// -----------------------------------------------------------------
			// First dropdown: What type of data do you want?
			{
				/**
				 * displayName: Label shown above the field
				 */
				displayName: 'Resource',
				
				/**
				 * name: Internal name used in code and expressions
				 * Access via: $parameter["resource"]
				 */
				name: 'resource',
				
				/**
				 * type: 'options' creates a dropdown menu
				 */
				type: 'options',
				
				/**
				 * noDataExpression: Prevents using expressions in this field
				 * 
				 * For resource/operation selectors, we want users to pick
				 * from the list, not enter dynamic values.
				 */
				noDataExpression: true,
				
				/**
				 * options: The choices in the dropdown
				 * 
				 * Each option has:
				 * - name: What users see
				 * - value: Internal value used in code
				 * - description: Tooltip/help text (optional)
				 */
				options: [
					{
						name: 'Core Data',
						value: 'coreData',
						description: 'Real-time and historical price data (quotes, time series, OHLC)',
					},
					{
						name: 'Fundamentals',
						value: 'fundamentals',
						description: 'Company fundamentals, financials, dividends, earnings',
					},
					{
						name: 'Reference Data',
						value: 'referenceData',
						description: 'Symbol lists, exchanges, instrument types, market state',
					},
					{
						name: 'Analysis',
						value: 'analysis',
						description: 'Technical indicators and analytical data',
					},
				],
				
				/**
				 * default: Which option is selected by default
				 * Should match one of the option values
				 */
				default: 'coreData',
			},
			
			// -----------------------------------------------------------------
			// OPERATION SELECTOR (for Core Data)
			// -----------------------------------------------------------------
			// Second dropdown: What do you want to do with that resource?
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				
				/**
				 * displayOptions: Control when this field is visible
				 * 
				 * show: { resource: ['coreData'] } means:
				 * "Only show this field when resource equals 'coreData'"
				 * 
				 * This creates a dynamic form that changes based on selections!
				 */
				displayOptions: {
					show: {
						resource: ['coreData'],
					},
				},
				
				options: [
					{
						name: 'Get Quote',
						value: 'getQuote',
						
						/**
						 * action: Short description shown in node subtitle
						 */
						action: 'Get real-time quote for a symbol',
						
						/**
						 * description: Longer help text
						 */
						description: 'Get real-time price quote including bid, ask, open, high, low, close, volume',
						
						/**
						 * routing: How this operation maps to an API request
						 * 
						 * This is the DECLARATIVE MAGIC!
						 * Instead of writing code to make API calls, we just describe:
						 * - method: HTTP method (GET, POST, etc.)
						 * - url: API endpoint path
						 * 
						 * n8n handles the rest automatically!
						 */
						routing: {
							request: {
								method: 'GET',
								url: '/quote',
							},
						},
					},
					{
						name: 'Get Price',
						value: 'getPrice',
						action: 'Get current price for a symbol',
						description: 'Get just the current price (lighter than full quote)',
						routing: {
							request: {
								method: 'GET',
								url: '/price',
							},
						},
					},
					{
						name: 'Get Time Series',
						value: 'getTimeSeries',
						action: 'Get historical time series data',
						description: 'Get historical OHLCV (Open, High, Low, Close, Volume) data',
						routing: {
							request: {
								method: 'GET',
								url: '/time_series',
							},
						},
					},
					{
						name: 'Get End of Day Price',
						value: 'getEod',
						action: 'Get end of day price',
						description: 'Get the closing price for a specific date',
						routing: {
							request: {
								method: 'GET',
								url: '/eod',
							},
						},
					},
					{
						name: 'Get Exchange Rate',
						value: 'getExchangeRate',
						action: 'Get currency exchange rate',
						description: 'Get real-time exchange rate between two currencies',
						routing: {
							request: {
								method: 'GET',
								url: '/exchange_rate',
							},
						},
					},
					{
						name: 'Convert Currency',
						value: 'currencyConversion',
						action: 'Convert currency amount',
						description: 'Convert an amount from one currency to another',
						routing: {
							request: {
								method: 'GET',
								url: '/currency_conversion',
							},
						},
					},
				],
				default: 'getQuote',
			},
			
			// -----------------------------------------------------------------
			// OPERATION SELECTOR (for Fundamentals)
			// -----------------------------------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['fundamentals'],
					},
				},
				options: [
					{
						name: 'Get Profile',
						value: 'getProfile',
						action: 'Get company profile',
						description: 'Get company information including sector, industry, employees, description',
						routing: {
							request: {
								method: 'GET',
								url: '/profile',
							},
						},
					},
					{
						name: 'Get Dividends',
						value: 'getDividends',
						action: 'Get dividend history',
						description: 'Get historical dividend payments for a stock',
						routing: {
							request: {
								method: 'GET',
								url: '/dividends',
							},
						},
					},
					{
						name: 'Get Earnings',
						value: 'getEarnings',
						action: 'Get earnings data',
						description: 'Get historical and upcoming earnings data',
						routing: {
							request: {
								method: 'GET',
								url: '/earnings',
							},
						},
					},
					{
						name: 'Get Statistics',
						value: 'getStatistics',
						action: 'Get key statistics',
						description: 'Get key financial statistics and metrics',
						routing: {
							request: {
								method: 'GET',
								url: '/statistics',
							},
						},
					},
				],
				default: 'getProfile',
			},
			
			// -----------------------------------------------------------------
			// OPERATION SELECTOR (for Reference Data)
			// -----------------------------------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['referenceData'],
					},
				},
				options: [
					{
						name: 'List Stocks',
						value: 'listStocks',
						action: 'List available stocks',
						description: 'Get a list of available stock symbols',
						routing: {
							request: {
								method: 'GET',
								url: '/stocks',
							},
						},
					},
					{
						name: 'List Forex Pairs',
						value: 'listForexPairs',
						action: 'List forex currency pairs',
						description: 'Get a list of available forex currency pairs',
						routing: {
							request: {
								method: 'GET',
								url: '/forex_pairs',
							},
						},
					},
					{
						name: 'List Cryptocurrencies',
						value: 'listCryptocurrencies',
						action: 'List cryptocurrencies',
						description: 'Get a list of available cryptocurrency pairs',
						routing: {
							request: {
								method: 'GET',
								url: '/cryptocurrencies',
							},
						},
					},
					{
						name: 'List ETFs',
						value: 'listEtfs',
						action: 'List ETFs',
						description: 'Get a list of available ETF symbols',
						routing: {
							request: {
								method: 'GET',
								url: '/etf',
							},
						},
					},
					{
						name: 'List Indices',
						value: 'listIndices',
						action: 'List market indices',
						description: 'Get a list of available market indices',
						routing: {
							request: {
								method: 'GET',
								url: '/indices',
							},
						},
					},
					{
						name: 'List Exchanges',
						value: 'listExchanges',
						action: 'List exchanges',
						description: 'Get a list of available stock exchanges',
						routing: {
							request: {
								method: 'GET',
								url: '/exchanges',
							},
						},
					},
					{
						name: 'Search Symbol',
						value: 'symbolSearch',
						action: 'Search for symbols',
						description: 'Search for symbols by name or ticker',
						routing: {
							request: {
								method: 'GET',
								url: '/symbol_search',
							},
						},
					},
					{
						name: 'Get Market State',
						value: 'getMarketState',
						action: 'Get market state',
						description: 'Check if markets are open or closed',
						routing: {
							request: {
								method: 'GET',
								url: '/market_state',
							},
						},
					},
				],
				default: 'listStocks',
			},
			
			// -----------------------------------------------------------------
			// OPERATION SELECTOR (for Analysis)
			// -----------------------------------------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['analysis'],
					},
				},
				options: [
					{
						name: 'Get Technical Indicator',
						value: 'getTechnicalIndicator',
						action: 'Calculate technical indicator',
						description: 'Calculate technical indicators like SMA, EMA, RSI, MACD, etc.',
						routing: {
							request: {
								method: 'GET',
								// URL will be set dynamically based on indicator type
								url: '/sma',
							},
						},
					},
				],
				default: 'getTechnicalIndicator',
			},
			
			// -----------------------------------------------------------------
			// COMMON PARAMETERS
			// -----------------------------------------------------------------
			// These fields appear for multiple operations
			
			/**
			 * SYMBOL FIELD
			 * Required for most operations - the ticker symbol to look up
			 */
			{
				displayName: 'Symbol',
				name: 'symbol',
				type: 'string',
				
				/**
				 * required: User must fill this in
				 */
				required: true,
				
				/**
				 * default: Empty string (user must enter a value)
				 */
				default: '',
				
				/**
				 * placeholder: Ghost text shown when field is empty
				 * Gives users a hint of what to enter
				 */
				placeholder: 'e.g., AAPL, EUR/USD, BTC/USD',
				
				/**
				 * description: Help text shown below the field
				 */
				description: 'The symbol to get data for (stock ticker, forex pair, or crypto pair)',
				
				/**
				 * displayOptions: When to show this field
				 * 
				 * This field appears for Core Data and Fundamentals resources,
				 * but NOT for Reference Data (which lists symbols, doesn't need one)
				 */
				displayOptions: {
					show: {
						resource: ['coreData', 'fundamentals', 'analysis'],
					},
					hide: {
						operation: ['getExchangeRate', 'currencyConversion'],
					},
				},
				
				/**
				 * routing: How this field maps to the API request
				 * 
				 * send.type: 'query' means add as URL query parameter
				 * send.property: 'symbol' is the parameter name
				 * 
				 * Result: ?symbol=AAPL (appended to the URL)
				 */
				routing: {
					send: {
						type: 'query',
						property: 'symbol',
					},
				},
			},
			
			/**
			 * FROM SYMBOL FIELD (for exchange rate/conversion)
			 */
			{
				displayName: 'From Symbol',
				name: 'fromSymbol',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'e.g., EUR, BTC',
				description: 'The currency to convert from',
				displayOptions: {
					show: {
						resource: ['coreData'],
						operation: ['getExchangeRate', 'currencyConversion'],
					},
				},
				routing: {
					send: {
						type: 'query',
						property: 'symbol',
						// Combine with toSymbol to create pair like EUR/USD
						value: '={{$value + "/" + $parameter["toSymbol"]}}',
					},
				},
			},
			
			/**
			 * TO SYMBOL FIELD (for exchange rate/conversion)
			 */
			{
				displayName: 'To Symbol',
				name: 'toSymbol',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'e.g., USD, ETH',
				description: 'The currency to convert to',
				displayOptions: {
					show: {
						resource: ['coreData'],
						operation: ['getExchangeRate', 'currencyConversion'],
					},
				},
				// No routing here - handled by fromSymbol's routing
			},
			
			/**
			 * AMOUNT FIELD (for currency conversion)
			 */
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				required: true,
				default: 1,
				description: 'The amount to convert',
				displayOptions: {
					show: {
						resource: ['coreData'],
						operation: ['currencyConversion'],
					},
				},
				routing: {
					send: {
						type: 'query',
						property: 'amount',
					},
				},
			},
			
			/**
			 * SEARCH QUERY FIELD (for symbol search)
			 */
			{
				displayName: 'Search Query',
				name: 'searchQuery',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'e.g., Apple, Tesla, Bitcoin',
				description: 'Search term to find symbols',
				displayOptions: {
					show: {
						resource: ['referenceData'],
						operation: ['symbolSearch'],
					},
				},
				routing: {
					send: {
						type: 'query',
						property: 'symbol',
					},
				},
			},
			
			/**
			 * INTERVAL FIELD (for time series data)
			 */
			{
				displayName: 'Interval',
				name: 'interval',
				type: 'options',
				required: true,
				default: '1day',
				description: 'Time interval between data points',
				displayOptions: {
					show: {
						resource: ['coreData', 'analysis'],
						operation: ['getTimeSeries', 'getTechnicalIndicator'],
					},
				},
				options: [
					{ name: '1 Minute', value: '1min' },
					{ name: '5 Minutes', value: '5min' },
					{ name: '15 Minutes', value: '15min' },
					{ name: '30 Minutes', value: '30min' },
					{ name: '45 Minutes', value: '45min' },
					{ name: '1 Hour', value: '1h' },
					{ name: '2 Hours', value: '2h' },
					{ name: '4 Hours', value: '4h' },
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
			
			// -----------------------------------------------------------------
			// ADDITIONAL OPTIONS (Optional parameters)
			// -----------------------------------------------------------------
			/**
			 * collection type groups optional parameters together
			 * Users can expand this to see more options
			 */
			{
				displayName: 'Additional Options',
				name: 'additionalOptions',
				type: 'collection',
				
				/**
				 * placeholder: Text shown on the "Add" button
				 */
				placeholder: 'Add Option',
				
				default: {},
				
				displayOptions: {
					show: {
						resource: ['coreData'],
						operation: ['getTimeSeries', 'getQuote', 'getPrice', 'getEod'],
					},
				},
				
				/**
				 * options: The optional fields users can add
				 */
				options: [
					{
						displayName: 'Output Size',
						name: 'outputsize',
						type: 'number',
						default: 30,
						description: 'Number of data points to return (max 5000)',
						routing: {
							send: {
								type: 'query',
								property: 'outputsize',
							},
						},
					},
					{
						displayName: 'Date',
						name: 'date',
						type: 'string',
						default: '',
						placeholder: 'e.g., 2024-01-15',
						description: 'Specific date for EOD price (format: YYYY-MM-DD)',
						routing: {
							send: {
								type: 'query',
								property: 'date',
							},
						},
					},
					{
						displayName: 'Start Date',
						name: 'start_date',
						type: 'string',
						default: '',
						placeholder: 'e.g., 2024-01-01',
						description: 'Start date for time series (format: YYYY-MM-DD)',
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
						description: 'End date for time series (format: YYYY-MM-DD)',
						routing: {
							send: {
								type: 'query',
								property: 'end_date',
							},
						},
					},
					{
						displayName: 'Exchange',
						name: 'exchange',
						type: 'string',
						default: '',
						placeholder: 'e.g., NYSE, NASDAQ',
						description: 'Filter by specific exchange',
						routing: {
							send: {
								type: 'query',
								property: 'exchange',
							},
						},
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						placeholder: 'e.g., United States, Germany',
						description: 'Filter by country',
						routing: {
							send: {
								type: 'query',
								property: 'country',
							},
						},
					},
					{
						displayName: 'Timezone',
						name: 'timezone',
						type: 'string',
						default: '',
						placeholder: 'e.g., America/New_York, UTC',
						description: 'Timezone for the returned data',
						routing: {
							send: {
								type: 'query',
								property: 'timezone',
							},
						},
					},
					{
						displayName: 'Decimal Places',
						name: 'dp',
						type: 'number',
						default: 5,
						description: 'Number of decimal places for prices',
						routing: {
							send: {
								type: 'query',
								property: 'dp',
							},
						},
					},
				],
			},
			
			// -----------------------------------------------------------------
			// REFERENCE DATA OPTIONS
			// -----------------------------------------------------------------
			{
				displayName: 'Additional Options',
				name: 'referenceOptions',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						resource: ['referenceData'],
					},
					hide: {
						operation: ['symbolSearch', 'getMarketState'],
					},
				},
				options: [
					{
						displayName: 'Exchange',
						name: 'exchange',
						type: 'string',
						default: '',
						placeholder: 'e.g., NYSE, NASDAQ, LSE',
						description: 'Filter by exchange',
						routing: {
							send: {
								type: 'query',
								property: 'exchange',
							},
						},
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						placeholder: 'e.g., United States, United Kingdom',
						description: 'Filter by country',
						routing: {
							send: {
								type: 'query',
								property: 'country',
							},
						},
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'string',
						default: '',
						placeholder: 'e.g., Common Stock, ETF',
						description: 'Filter by instrument type',
						routing: {
							send: {
								type: 'query',
								property: 'type',
							},
						},
					},
					{
						displayName: 'Show Plan',
						name: 'show_plan',
						type: 'boolean',
						default: false,
						description: 'Whether to show which plan is required for each symbol',
						routing: {
							send: {
								type: 'query',
								property: 'show_plan',
								value: '={{$value ? "true" : undefined}}',
							},
						},
					},
				],
			},
			
			// -----------------------------------------------------------------
			// SYMBOL SEARCH OPTIONS
			// -----------------------------------------------------------------
			{
				displayName: 'Search Options',
				name: 'searchOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						resource: ['referenceData'],
						operation: ['symbolSearch'],
					},
				},
				options: [
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
			
			// -----------------------------------------------------------------
			// MARKET STATE OPTIONS
			// -----------------------------------------------------------------
			{
				displayName: 'Market State Options',
				name: 'marketStateOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: {
					show: {
						resource: ['referenceData'],
						operation: ['getMarketState'],
					},
				},
				options: [
					{
						displayName: 'Exchange',
						name: 'exchange',
						type: 'string',
						default: '',
						placeholder: 'e.g., NYSE, NASDAQ',
						description: 'Check state of specific exchange',
						routing: {
							send: {
								type: 'query',
								property: 'exchange',
							},
						},
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						placeholder: 'e.g., United States',
						description: 'Check state of exchanges in a country',
						routing: {
							send: {
								type: 'query',
								property: 'country',
							},
						},
					},
					{
						displayName: 'Code',
						name: 'code',
						type: 'string',
						default: '',
						placeholder: 'e.g., XNYS',
						description: 'Exchange MIC code',
						routing: {
							send: {
								type: 'query',
								property: 'code',
							},
						},
					},
				],
			},
		],
	};
	
	// =========================================================================
	// NO EXECUTE METHOD NEEDED!
	// =========================================================================
	// 
	// Because we're using declarative style with routing, n8n automatically:
	// 1. Reads the user's selections
	// 2. Builds the API URL from routing configuration
	// 3. Adds query parameters from field routing
	// 4. Makes the HTTP request using credentials
	// 5. Returns the response data
	//
	// This is the power of declarative nodes - less code, same functionality!
	// =========================================================================
}

