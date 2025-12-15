/**
 * Market Intelligence Operations for Twelve Data API
 * 
 * These operations provide calendars, analyst data, and performance metrics.
 * 
 * ALL OPERATIONS ARE BETA (10 total):
 * - Get Analyst Ratings, Get Commodities Performance, Get Crypto Heatmap
 * - Get Economic Calendar, Get Forex Heatmap, Get Indices Performance
 * - Get Market Overview, Get Price Target, Get Recommendations Trends
 * - Get Sector Performance
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

// =============================================================================
// MARKET INTELLIGENCE OPERATIONS
// =============================================================================

export const marketIntelligenceOperations: INodePropertyOptions[] = [
	{
		name: 'Get Analyst Ratings',
		value: 'getAnalystRatings',
		action: 'Get analyst ratings',
		description: 'Get analyst ratings and recommendations ✨ BETA - Community testing needed',
		routing: {
			request: {
				method: 'GET',
				url: '/analyst_ratings',
			},
		},
	},
	{
		name: 'Get Economic Calendar',
		value: 'getEconomicCalendar',
		action: 'Get economic calendar',
		description: 'Get upcoming economic events and releases ✨ BETA - Community testing needed',
		routing: {
			request: {
				method: 'GET',
				url: '/economic_calendar',
			},
		},
	},
	{
		name: 'Get Earnings Estimate',
		value: 'getEarningsEstimate',
		action: 'Get earnings estimate',
		description: 'Get analyst earnings estimates ✨ BETA - Community testing needed',
		routing: {
			request: {
				method: 'GET',
				url: '/earnings_estimate',
			},
		},
	},
	{
		name: 'Get EPS Trend',
		value: 'getEpsTrend',
		action: 'Get EPS trend',
		description: 'Get earnings per share trend data ✨ BETA - Community testing needed',
		routing: {
			request: {
				method: 'GET',
				url: '/eps_trend',
			},
		},
	},
	{
		name: 'Get Growth Estimates',
		value: 'getGrowthEstimates',
		action: 'Get growth estimates',
		description: 'Get analyst growth estimates ✨ BETA - Community testing needed',
		routing: {
			request: {
				method: 'GET',
				url: '/growth_estimates',
			},
		},
	},
	{
		name: 'Get Price Target',
		value: 'getPriceTarget',
		action: 'Get price target',
		description: 'Get analyst price targets ✨ BETA - Community testing needed',
		routing: {
			request: {
				method: 'GET',
				url: '/price_target',
			},
		},
	},
	{
		name: 'Get Recommendations',
		value: 'getRecommendations',
		action: 'Get recommendations',
		description: 'Get analyst recommendation trends ✨ BETA - Community testing needed',
		routing: {
			request: {
				method: 'GET',
				url: '/recommendations',
			},
		},
	},
	{
		name: 'Get Revenue Estimate',
		value: 'getRevenueEstimate',
		action: 'Get revenue estimate',
		description: 'Get analyst revenue estimates ✨ BETA - Community testing needed',
		routing: {
			request: {
				method: 'GET',
				url: '/revenue_estimate',
			},
		},
	},
];

// =============================================================================
// MARKET INTELLIGENCE PARAMETERS
// =============================================================================

/**
 * Symbol parameter for market intelligence operations
 */
export const marketIntelligenceSymbolParameter: INodeProperties = {
	displayName: 'Symbol',
	name: 'symbol',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'e.g., AAPL, MSFT, GOOGL',
	description: 'The stock symbol to get data for',
	displayOptions: {
		show: {
			resource: ['marketIntelligence'],
		},
		hide: {
			operation: ['getEconomicCalendar'],
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
 * Additional options for market intelligence operations
 */
export const marketIntelligenceOptions: INodeProperties = {
	displayName: 'Additional Options',
	name: 'marketIntelligenceOptions',
	type: 'collection',
	placeholder: 'Add Option',
	default: {},
	displayOptions: {
		show: {
			resource: ['marketIntelligence'],
		},
		hide: {
			operation: ['getEconomicCalendar'],
		},
	},
	options: [
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
			placeholder: 'e.g., United States',
			description: 'Filter by country',
			routing: {
				send: {
					type: 'query',
					property: 'country',
				},
			},
		},
	],
};

/**
 * Economic Calendar options
 */
export const economicCalendarOptions: INodeProperties = {
	displayName: 'Calendar Options',
	name: 'economicCalendarOptions',
	type: 'collection',
	placeholder: 'Add Option',
	default: {},
	displayOptions: {
		show: {
			resource: ['marketIntelligence'],
			operation: ['getEconomicCalendar'],
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
			displayName: 'Importance',
			name: 'importance',
			type: 'options',
			default: '',
			description: 'Filter by event importance',
			options: [
				{ name: 'All', value: '' },
				{ name: 'Low', value: 'low' },
				{ name: 'Medium', value: 'medium' },
				{ name: 'High', value: 'high' },
			],
			routing: {
				send: {
					type: 'query',
					property: 'importance',
					value: '={{$value || undefined}}',
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
// EXPORT ALL MARKET INTELLIGENCE PARAMETERS
// =============================================================================

export const allMarketIntelligenceParameters: INodeProperties[] = [
	marketIntelligenceSymbolParameter,
	marketIntelligenceOptions,
	economicCalendarOptions,
];



