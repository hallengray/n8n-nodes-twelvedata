/**
 * Reference Data Operations for Twelve Data API
 *
 * These operations provide symbol lists, exchange information, and metadata
 * for various financial instruments.
 *
 * TOTAL: 26 operations
 * - Get Cross Listings, Get Exchanges Schedule, Get Instrument Type, Get Market State
 * - List Analysis, List Bonds, List Commodities, List Countries
 * - List Cryptocurrencies, List Cryptocurrency Exchanges, List ETF Families, List ETF Types
 * - List ETFs, List ETFs (Extended), List Exchanges, List Forex Pairs
 * - List Fundamentals, List Funds, List Indices, List Intervals
 * - List Market Data, List Mutual Fund Families, List Mutual Fund Types, List Stocks
 * - List Technical Indicators, Search Symbol
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

// =============================================================================
// REFERENCE DATA OPERATIONS
// =============================================================================

export const referenceDataOperations: INodePropertyOptions[] = [
	{
		name: 'Get Cross Listings',
		value: 'getCrossListings',
		action: 'Get cross listings',
		description: 'Get cross-listed symbols for a security',
		routing: {
			request: {
				method: 'GET',
				url: '/cross_listings',
			},
		},
	},
	{
		name: 'Get Exchanges Schedule',
		value: 'getExchangesSchedule',
		action: 'Get exchanges schedule',
		description: 'Get trading hours and holidays for exchanges',
		routing: {
			request: {
				method: 'GET',
				url: '/exchanges_schedule',
			},
		},
	},
	{
		name: 'Get Instrument Type',
		value: 'getInstrumentType',
		action: 'Get instrument type',
		description: 'Get the type of a financial instrument',
		routing: {
			request: {
				method: 'GET',
				url: '/instrument_type',
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
	{
		name: 'List Analysis',
		value: 'listAnalysis',
		action: 'List analysis endpoints',
		description: 'Get a list of available analysis/research endpoints',
		routing: {
			request: {
				method: 'GET',
				url: '/analysis',
			},
		},
	},
	{
		name: 'List Bonds',
		value: 'listBonds',
		action: 'List bonds',
		description: 'Get a list of available bond instruments',
		routing: {
			request: {
				method: 'GET',
				url: '/bonds',
			},
		},
	},
	{
		name: 'List Commodities',
		value: 'listCommodities',
		action: 'List commodities',
		description: 'Get a list of available commodity instruments',
		routing: {
			request: {
				method: 'GET',
				url: '/commodities',
			},
		},
	},
	{
		name: 'List Countries',
		value: 'listCountries',
		action: 'List countries',
		description: 'Get a list of supported countries',
		routing: {
			request: {
				method: 'GET',
				url: '/countries',
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
		name: 'List Cryptocurrency Exchanges',
		value: 'listCryptoExchanges',
		action: 'List cryptocurrency exchanges',
		description: 'Get a list of available cryptocurrency exchanges',
		routing: {
			request: {
				method: 'GET',
				url: '/cryptocurrency_exchanges',
			},
		},
	},
	{
		name: 'List ETF Families',
		value: 'listEtfFamilies',
		action: 'List ETF families',
		description: 'Get a list of ETF families/providers',
		routing: {
			request: {
				method: 'GET',
				url: '/etfs/family',
			},
		},
	},
	{
		name: 'List ETF Types',
		value: 'listEtfTypes',
		action: 'List ETF types',
		description: 'Get a list of ETF types/categories',
		routing: {
			request: {
				method: 'GET',
				url: '/etfs/type',
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
		name: 'List ETFs (Extended)',
		value: 'listEtfsExtended',
		action: 'List ETFs with full details',
		description: 'Get comprehensive list of ETFs with extended information',
		routing: {
			request: {
				method: 'GET',
				url: '/etfs',
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
		name: 'List Fundamentals',
		value: 'listFundamentals',
		action: 'List fundamentals endpoints',
		description: 'Get a list of available fundamental data endpoints',
		routing: {
			request: {
				method: 'GET',
				url: '/fundamentals',
			},
		},
	},
	{
		name: 'List Funds',
		value: 'listFunds',
		action: 'List mutual funds',
		description: 'Get a list of available mutual fund symbols',
		routing: {
			request: {
				method: 'GET',
				url: '/funds',
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
		name: 'List Intervals',
		value: 'listIntervals',
		action: 'List available intervals',
		description: 'Get a list of available time intervals for data queries',
		routing: {
			request: {
				method: 'GET',
				url: '/intervals',
			},
		},
	},
	{
		name: 'List Market Data',
		value: 'listMarketData',
		action: 'List market data endpoints',
		description: 'Get a list of available market data endpoints',
		routing: {
			request: {
				method: 'GET',
				url: '/market_data',
			},
		},
	},
	{
		name: 'List Mutual Fund Families',
		value: 'listMutualFundFamilies',
		action: 'List mutual fund families',
		description: 'Get a list of mutual fund families/providers',
		routing: {
			request: {
				method: 'GET',
				url: '/mutual_funds/family',
			},
		},
	},
	{
		name: 'List Mutual Fund Types',
		value: 'listMutualFundTypes',
		action: 'List mutual fund types',
		description: 'Get a list of mutual fund types/categories',
		routing: {
			request: {
				method: 'GET',
				url: '/mutual_funds/type',
			},
		},
	},
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
		name: 'List Technical Indicators',
		value: 'listTechnicalIndicators',
		action: 'List technical indicators',
		description: 'Get a list of available technical indicators',
		routing: {
			request: {
				method: 'GET',
				url: '/technical_indicators',
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
];

// =============================================================================
// REFERENCE DATA PARAMETERS
// =============================================================================

/**
 * Search Query parameter for symbol search
 */
export const referenceDataSearchQueryParameter: INodeProperties = {
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
};

/**
 * Symbol parameter for cross listings and instrument type
 */
export const referenceDataSymbolParameter: INodeProperties = {
	displayName: 'Symbol',
	name: 'symbol',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'e.g., AAPL',
	description: 'The symbol to look up',
	displayOptions: {
		show: {
			resource: ['referenceData'],
			operation: ['getCrossListings', 'getInstrumentType'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'symbol',
		},
	},
};

/**
 * Additional options for listing operations
 */
export const referenceDataListOptions: INodeProperties = {
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
			operation: ['symbolSearch', 'getMarketState', 'getCrossListings', 'getInstrumentType', 'getExchangesSchedule'],
		},
	},
	options: [
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
	],
};

/**
 * Symbol Search options
 */
export const referenceDataSearchOptions: INodeProperties = {
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
};

/**
 * Market State options
 */
export const referenceDataMarketStateOptions: INodeProperties = {
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
	],
};

/**
 * Exchange Schedule options
 */
export const referenceDataExchangeScheduleOptions: INodeProperties = {
	displayName: 'Schedule Options',
	name: 'scheduleOptions',
	type: 'collection',
	placeholder: 'Add Option',
	default: {},
	displayOptions: {
		show: {
			resource: ['referenceData'],
			operation: ['getExchangesSchedule'],
		},
	},
	options: [
		{
			displayName: 'Exchange',
			name: 'exchange',
			type: 'string',
			default: '',
			placeholder: 'e.g., NYSE, NASDAQ',
			description: 'Get schedule for specific exchange',
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
			description: 'Get schedule for exchanges in a country',
			routing: {
				send: {
					type: 'query',
					property: 'country',
				},
			},
		},
	],
};

// =============================================================================
// EXPORT ALL REFERENCE DATA PARAMETERS
// =============================================================================

export const allReferenceDataParameters: INodeProperties[] = [
	referenceDataSearchQueryParameter,
	referenceDataSymbolParameter,
	referenceDataListOptions,
	referenceDataSearchOptions,
	referenceDataMarketStateOptions,
	referenceDataExchangeScheduleOptions,
];







