/**
 * Core Data Operations for Twelve Data API
 *
 * These operations provide real-time and historical price data including
 * quotes, time series, OHLC, and exchange rates.
 *
 * TOTAL: 10 operations
 * - Convert Currency, Get Earliest Timestamp, Get End of Day Price
 * - Get Exchange Rate, Get Market Movers, Get Market Movers (All Markets)
 * - Get Price, Get Quote, Get Time Series, Get Time Series Cross
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

// =============================================================================
// CORE DATA OPERATIONS
// =============================================================================

export const coreDataOperations: INodePropertyOptions[] = [
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
	{
		name: 'Get Earliest Timestamp',
		value: 'getEarliestTimestamp',
		action: 'Get earliest available timestamp',
		description: 'Get the earliest available data timestamp for a symbol',
		routing: {
			request: {
				method: 'GET',
				url: '/earliest_timestamp',
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
		name: 'Get Market Movers',
		value: 'getMarketMovers',
		action: 'Get market movers (gainers/losers)',
		description: 'Get top gaining or losing stocks',
		routing: {
			request: {
				method: 'GET',
				url: '/market_movers/stocks',
			},
		},
	},
	{
		name: 'Get Market Movers (All Markets)',
		value: 'getMarketMoversAll',
		action: 'Get market movers for any market',
		description: 'Get top gaining or losing securities across stocks, forex, crypto, and more',
		routing: {
			request: {
				method: 'GET',
				url: '=/market_movers/{{$parameter.marketType}}',
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
		name: 'Get Quote',
		value: 'getQuote',
		action: 'Get real time quote for a symbol',
		description: 'Get real-time price quote including bid, ask, open, high, low, close, volume',
		routing: {
			request: {
				method: 'GET',
				url: '/quote',
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
		name: 'Get Time Series Cross',
		value: 'getTimeSeriesCross',
		action: 'Get cross-asset time series',
		description: 'Get time series data for multiple symbols or cross-asset analysis',
		routing: {
			request: {
				method: 'GET',
				url: '/time_series/cross',
			},
		},
	},
];

// =============================================================================
// CORE DATA PARAMETERS
// =============================================================================

/**
 * Symbol parameter for core data operations (most operations)
 */
export const coreDataSymbolParameter: INodeProperties = {
	displayName: 'Symbol',
	name: 'symbol',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'e.g., AAPL, EUR/USD, BTC/USD',
	description: 'The symbol to get data for (stock ticker, forex pair, or crypto pair)',
	displayOptions: {
		show: {
			resource: ['coreData'],
		},
		hide: {
			operation: [
				'getExchangeRate',
				'currencyConversion',
				'getMarketMovers',
				'getMarketMoversAll',
				'getTimeSeriesCross',
			],
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
 * From Symbol parameter for exchange rate/conversion
 */
export const coreDataFromSymbolParameter: INodeProperties = {
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
			value: '={{$value + "/" + $parameter["toSymbol"]}}',
		},
	},
};

/**
 * To Symbol parameter for exchange rate/conversion
 */
export const coreDataToSymbolParameter: INodeProperties = {
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
};

/**
 * Amount parameter for currency conversion
 */
export const coreDataAmountParameter: INodeProperties = {
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
};

/**
 * Interval parameter for time series operations
 */
export const coreDataIntervalParameter: INodeProperties = {
	displayName: 'Interval',
	name: 'interval',
	type: 'options',
	required: true,
	default: '1day',
	description: 'Time interval between data points',
	displayOptions: {
		show: {
			resource: ['coreData'],
			operation: ['getTimeSeries', 'getEarliestTimestamp'],
		},
	},
	options: [
		{ name: '1 Day', value: '1day' },
		{ name: '1 Hour', value: '1h' },
		{ name: '1 Minute', value: '1min' },
		{ name: '1 Month', value: '1month' },
		{ name: '1 Week', value: '1week' },
		{ name: '15 Minutes', value: '15min' },
		{ name: '2 Hours', value: '2h' },
		{ name: '30 Minutes', value: '30min' },
		{ name: '4 Hours', value: '4h' },
		{ name: '45 Minutes', value: '45min' },
		{ name: '5 Minutes', value: '5min' },
	],
	routing: {
		send: {
			type: 'query',
			property: 'interval',
		},
	},
};

/**
 * Market Movers Direction parameter
 */
export const coreDataMarketMoverDirectionParameter: INodeProperties = {
	displayName: 'Direction',
	name: 'direction',
	type: 'options',
	required: true,
	default: 'gainers',
	description: 'Get top gainers or losers',
	displayOptions: {
		show: {
			resource: ['coreData'],
			operation: ['getMarketMovers'],
		},
	},
	options: [
		{ name: 'Gainers', value: 'gainers' },
		{ name: 'Losers', value: 'losers' },
	],
	routing: {
		request: {
			url: '=/market_movers/{{ $value }}',
		},
	},
};

/**
 * Additional options for core data operations
 */
export const coreDataAdditionalOptions: INodeProperties = {
	displayName: 'Additional Options',
	name: 'additionalOptions',
	type: 'collection',
	placeholder: 'Add Option',
	default: {},
	displayOptions: {
		show: {
			resource: ['coreData'],
			operation: ['getTimeSeries', 'getQuote', 'getPrice', 'getEod'],
		},
	},
	options: [
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
	],
};

/**
 * Market Movers additional options
 */
export const coreDataMarketMoversOptions: INodeProperties = {
	displayName: 'Additional Options',
	name: 'marketMoversOptions',
	type: 'collection',
	placeholder: 'Add Option',
	default: {},
	displayOptions: {
		show: {
			resource: ['coreData'],
			operation: ['getMarketMovers'],
		},
	},
	options: [
		{
			displayName: 'Country',
			name: 'country',
			type: 'string',
			default: '',
			placeholder: 'e.g., United States',
			description: 'Filter by country',
			routing: {
				send: {
					type: 'query',
					property: 'country',
				},
			},
		},
		{
			displayName: 'Output Size',
			name: 'outputsize',
			type: 'number',
			default: 10,
			description: 'Number of results to return',
			routing: {
				send: {
					type: 'query',
					property: 'outputsize',
				},
			},
		},
	],
};

/**
 * Market Type parameter for market movers (all markets)
 */
export const coreDataMarketTypeParameter: INodeProperties = {
	displayName: 'Market Type',
	name: 'marketType',
	type: 'options',
	required: true,
	default: 'stocks',
	description: 'Type of market to get movers for',
	displayOptions: {
		show: {
			resource: ['coreData'],
			operation: ['getMarketMoversAll'],
		},
	},
	options: [
		{ name: 'Crypto', value: 'crypto' },
		{ name: 'ETFs', value: 'etf' },
		{ name: 'Forex', value: 'forex' },
		{ name: 'Indices', value: 'indices' },
		{ name: 'Stocks', value: 'stocks' },
	],
};

/**
 * Symbols parameter for time series cross
 */
export const coreDataCrossSymbolsParameter: INodeProperties = {
	displayName: 'Symbols',
	name: 'symbols',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'e.g., AAPL,MSFT,GOOGL',
	description: 'Comma-separated list of symbols for cross-asset analysis',
	displayOptions: {
		show: {
			resource: ['coreData'],
			operation: ['getTimeSeriesCross'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'symbols',
		},
	},
};

/**
 * Direction parameter for market movers (all markets)
 */
export const coreDataMarketMoversAllDirectionParameter: INodeProperties = {
	displayName: 'Direction',
	name: 'direction',
	type: 'options',
	default: 'gainers',
	description: 'Show gainers or losers',
	displayOptions: {
		show: {
			resource: ['coreData'],
			operation: ['getMarketMoversAll'],
		},
	},
	options: [
		{ name: 'Gainers', value: 'gainers' },
		{ name: 'Losers', value: 'losers' },
	],
	routing: {
		send: {
			type: 'query',
			property: 'direction',
		},
	},
};

// =============================================================================
// EXPORT ALL CORE DATA PARAMETERS
// =============================================================================

export const allCoreDataParameters: INodeProperties[] = [
	coreDataSymbolParameter,
	coreDataFromSymbolParameter,
	coreDataToSymbolParameter,
	coreDataAmountParameter,
	coreDataIntervalParameter,
	coreDataMarketMoverDirectionParameter,
	coreDataAdditionalOptions,
	coreDataMarketMoversOptions,
	coreDataMarketTypeParameter,
	coreDataCrossSymbolsParameter,
	coreDataMarketMoversAllDirectionParameter,
];
