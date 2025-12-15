/**
 * Fundamentals Operations for Twelve Data API
 * 
 * These operations provide company financial data, reports, and corporate events.
 * 
 * TESTED OPERATIONS (4):
 * - Get Dividends, Get Earnings, Get Profile, Get Statistics
 * 
 * BETA OPERATIONS (12):
 * - Get Balance Sheet, Get Cash Flow, Get Earnings Calendar, Get Fund Holders
 * - Get Income Statement, Get Insider Transactions, Get Institutional Holders, Get IPO Calendar
 * - Get Key Executives, Get Options Chain, Get Options Expiration, Get Stock Splits
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

// =============================================================================
// FUNDAMENTALS OPERATIONS
// =============================================================================

export const fundamentalsOperations: INodePropertyOptions[] = [
	// -------------------------------------------------------------------------
	// TESTED OPERATIONS (alphabetically ordered)
	// -------------------------------------------------------------------------
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
	// -------------------------------------------------------------------------
	// BETA OPERATIONS (alphabetically ordered)
	// -------------------------------------------------------------------------
	{
		name: 'Get Balance Sheet',
		value: 'getBalanceSheet',
		action: 'Get balance sheet',
		description: 'Get company balance sheet data',
		routing: {
			request: {
				method: 'GET',
				url: '/balance_sheet',
			},
		},
	},
	{
		name: 'Get Cash Flow',
		value: 'getCashFlow',
		action: 'Get cash flow statement',
		description: 'Get company cash flow statement data',
		routing: {
			request: {
				method: 'GET',
				url: '/cash_flow',
			},
		},
	},
	{
		name: 'Get Earnings Calendar',
		value: 'getEarningsCalendar',
		action: 'Get earnings calendar',
		description: 'Get upcoming earnings announcements ✨ BETA - Community testing needed',
		routing: {
			request: {
				method: 'GET',
				url: '/earnings_calendar',
			},
		},
	},
	{
		name: 'Get Fund Holders',
		value: 'getFundHolders',
		action: 'Get fund holders',
		description: 'Get mutual fund ownership data ✨ BETA - Community testing needed',
		routing: {
			request: {
				method: 'GET',
				url: '/fund_holders',
			},
		},
	},
	{
		name: 'Get Income Statement',
		value: 'getIncomeStatement',
		action: 'Get income statement',
		description: 'Get company income statement data',
		routing: {
			request: {
				method: 'GET',
				url: '/income_statement',
			},
		},
	},
	{
		name: 'Get Insider Transactions',
		value: 'getInsiderTransactions',
		action: 'Get insider transactions',
		description: 'Get insider buying and selling activity',
		routing: {
			request: {
				method: 'GET',
				url: '/insider_transactions',
			},
		},
	},
	{
		name: 'Get Institutional Holders',
		value: 'getInstitutionalHolders',
		action: 'Get institutional holders',
		description: 'Get institutional ownership data',
		routing: {
			request: {
				method: 'GET',
				url: '/institutional_holders',
			},
		},
	},
	{
		name: 'Get IPO Calendar',
		value: 'getIpoCalendar',
		action: 'Get IPO calendar',
		description: 'Get upcoming IPO listings ✨ BETA - Community testing needed',
		routing: {
			request: {
				method: 'GET',
				url: '/ipo_calendar',
			},
		},
	},
	{
		name: 'Get Key Executives',
		value: 'getKeyExecutives',
		action: 'Get key executives',
		description: 'Get company executive and management information',
		routing: {
			request: {
				method: 'GET',
				url: '/key_executives',
			},
		},
	},
	{
		name: 'Get Options Chain',
		value: 'getOptionsChain',
		action: 'Get options chain',
		description: '🚧 PLANNED API ENDPOINT - Not yet available in REST API (currently only in Google Sheets Add-on). Expected in future Twelve Data API release.',
		routing: {
			request: {
				method: 'GET',
				url: '/options/chain',
			},
		},
	},
	{
		name: 'Get Options Expiration',
		value: 'getOptionsExpiration',
		action: 'Get options expiration dates',
		description: '🚧 PLANNED API ENDPOINT - Not yet available in REST API (currently only in Google Sheets Add-on). Expected in future Twelve Data API release.',
		routing: {
			request: {
				method: 'GET',
				url: '/options/expiration',
			},
		},
	},
	{
		name: 'Get Stock Splits',
		value: 'getStockSplits',
		action: 'Get stock splits',
		description: 'Get historical stock split data',
		routing: {
			request: {
				method: 'GET',
				url: '/splits',
			},
		},
	},
];

// =============================================================================
// FUNDAMENTALS PARAMETERS
// =============================================================================

/**
 * Symbol parameter for fundamentals operations
 */
export const fundamentalsSymbolParameter: INodeProperties = {
	displayName: 'Symbol',
	name: 'symbol',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'e.g., AAPL, MSFT, GOOGL',
	description: 'The stock symbol to get fundamental data for',
	displayOptions: {
		show: {
			resource: ['fundamentals'],
		},
		hide: {
			operation: ['getEarningsCalendar', 'getIpoCalendar'],
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
 * Period parameter for financial statements
 */
export const fundamentalsPeriodParameter: INodeProperties = {
	displayName: 'Period',
	name: 'period',
	type: 'options',
	default: 'annual',
	description: 'Reporting period (annual or quarterly)',
	displayOptions: {
		show: {
			resource: ['fundamentals'],
			operation: ['getIncomeStatement', 'getBalanceSheet', 'getCashFlow'],
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
};

/**
 * Options expiration date parameter
 */
export const fundamentalsExpirationDateParameter: INodeProperties = {
	displayName: 'Expiration Date',
	name: 'expiration_date',
	type: 'string',
	default: '',
	placeholder: 'e.g., 2024-03-15',
	description: 'Options expiration date (format: YYYY-MM-DD)',
	displayOptions: {
		show: {
			resource: ['fundamentals'],
			operation: ['getOptionsChain'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'expiration_date',
		},
	},
};

/**
 * Options type parameter
 */
export const fundamentalsOptionTypeParameter: INodeProperties = {
	displayName: 'Option Type',
	name: 'option_type',
	type: 'options',
	default: '',
	description: 'Filter by option type',
	displayOptions: {
		show: {
			resource: ['fundamentals'],
			operation: ['getOptionsChain'],
		},
	},
	options: [
		{ name: 'All', value: '' },
		{ name: 'Call', value: 'call' },
		{ name: 'Put', value: 'put' },
	],
	routing: {
		send: {
			type: 'query',
			property: 'option_type',
			value: '={{$value || undefined}}',
		},
	},
};

/**
 * Additional options for fundamentals operations
 */
export const fundamentalsAdditionalOptions: INodeProperties = {
	displayName: 'Additional Options',
	name: 'fundamentalsOptions',
	type: 'collection',
	placeholder: 'Add Option',
	default: {},
	displayOptions: {
		show: {
			resource: ['fundamentals'],
		},
		hide: {
			operation: ['getEarningsCalendar', 'getIpoCalendar', 'getOptionsChain', 'getOptionsExpiration'],
		},
	},
	options: [
		{
			displayName: 'End Date',
			name: 'end_date',
			type: 'string',
			default: '',
			placeholder: 'e.g., 2024-12-31',
			description: 'End date for data range (format: YYYY-MM-DD)',
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
			default: 10,
			description: 'Number of data points to return',
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
			description: 'Start date for data range (format: YYYY-MM-DD)',
			routing: {
				send: {
					type: 'query',
					property: 'start_date',
				},
			},
		},
	],
};

/**
 * Calendar options (for earnings calendar and IPO calendar)
 */
export const fundamentalsCalendarOptions: INodeProperties = {
	displayName: 'Calendar Options',
	name: 'calendarOptions',
	type: 'collection',
	placeholder: 'Add Option',
	default: {},
	displayOptions: {
		show: {
			resource: ['fundamentals'],
			operation: ['getEarningsCalendar', 'getIpoCalendar'],
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
			displayName: 'End Date',
			name: 'end_date',
			type: 'string',
			default: '',
			placeholder: 'e.g., 2024-12-31',
			description: 'End date for calendar range (format: YYYY-MM-DD)',
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
			description: 'Filter by exchange',
			routing: {
				send: {
					type: 'query',
					property: 'exchange',
				},
			},
		},
		{
			displayName: 'Start Date',
			name: 'start_date',
			type: 'string',
			default: '',
			placeholder: 'e.g., 2024-01-01',
			description: 'Start date for calendar range (format: YYYY-MM-DD)',
			routing: {
				send: {
					type: 'query',
					property: 'start_date',
				},
			},
		},
	],
};

// =============================================================================
// EXPORT ALL FUNDAMENTALS PARAMETERS
// =============================================================================

export const allFundamentalsParameters: INodeProperties[] = [
	fundamentalsSymbolParameter,
	fundamentalsPeriodParameter,
	fundamentalsExpirationDateParameter,
	fundamentalsOptionTypeParameter,
	fundamentalsAdditionalOptions,
	fundamentalsCalendarOptions,
];



