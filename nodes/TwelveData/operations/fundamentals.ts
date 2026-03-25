/**
 * Fundamentals Operations for Twelve Data API
 *
 * These operations provide company financial data, reports, and corporate events.
 *
 * TOTAL: 20 operations
 * - Get Balance Sheet, Get Balance Sheet Consolidated, Get Cash Flow
 * - Get Cash Flow Consolidated, Get Dividends, Get Dividends Calendar
 * - Get Earnings, Get Earnings Calendar, Get Fund Holders
 * - Get Income Statement, Get Income Statement Consolidated, Get Insider Transactions
 * - Get Institutional Holders, Get IPO Calendar, Get Key Executives
 * - Get Market Cap, Get Profile, Get Splits Calendar
 * - Get Statistics, Get Stock Splits
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

// =============================================================================
// FUNDAMENTALS OPERATIONS
// =============================================================================

export const fundamentalsOperations: INodePropertyOptions[] = [
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
		name: 'Get Balance Sheet Consolidated',
		value: 'getBalanceSheetConsolidated',
		action: 'Get consolidated balance sheet',
		description: 'Get consolidated balance sheet data for companies with subsidiaries',
		routing: {
			request: {
				method: 'GET',
				url: '/balance_sheet/consolidated',
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
		name: 'Get Cash Flow Consolidated',
		value: 'getCashFlowConsolidated',
		action: 'Get consolidated cash flow',
		description: 'Get consolidated cash flow statement for companies with subsidiaries',
		routing: {
			request: {
				method: 'GET',
				url: '/cash_flow/consolidated',
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
		name: 'Get Dividends Calendar',
		value: 'getDividendsCalendar',
		action: 'Get upcoming dividends',
		description: 'Get calendar of upcoming dividend payments across all stocks',
		routing: {
			request: {
				method: 'GET',
				url: '/dividends_calendar',
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
		name: 'Get Earnings Calendar',
		value: 'getEarningsCalendar',
		action: 'Get earnings calendar',
		description: 'Get upcoming earnings announcements',
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
		description: 'Get mutual fund ownership data',
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
		name: 'Get Income Statement Consolidated',
		value: 'getIncomeStatementConsolidated',
		action: 'Get consolidated income statement',
		description: 'Get consolidated income statement for companies with subsidiaries',
		routing: {
			request: {
				method: 'GET',
				url: '/income_statement/consolidated',
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
		description: 'Get upcoming IPO listings',
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
		name: 'Get Market Cap',
		value: 'getMarketCap',
		action: 'Get market capitalization',
		description: 'Get current market capitalization for a stock',
		routing: {
			request: {
				method: 'GET',
				url: '/market_cap',
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
		name: 'Get Splits Calendar',
		value: 'getSplitsCalendar',
		action: 'Get upcoming stock splits',
		description: 'Get calendar of upcoming stock splits across all stocks',
		routing: {
			request: {
				method: 'GET',
				url: '/splits_calendar',
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
			operation: [
				'getEarningsCalendar',
				'getIpoCalendar',
				'getDividendsCalendar',
				'getSplitsCalendar',
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
			operation: [
				'getIncomeStatement',
				'getBalanceSheet',
				'getCashFlow',
				'getIncomeStatementConsolidated',
				'getBalanceSheetConsolidated',
				'getCashFlowConsolidated',
			],
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
			operation: [
				'getEarningsCalendar',
				'getIpoCalendar',
				'getDividendsCalendar',
				'getSplitsCalendar',
			],
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
 * Calendar options (for earnings calendar, IPO calendar, dividends calendar, splits calendar)
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
			operation: [
				'getEarningsCalendar',
				'getIpoCalendar',
				'getDividendsCalendar',
				'getSplitsCalendar',
			],
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
	fundamentalsAdditionalOptions,
	fundamentalsCalendarOptions,
];
