/**
 * Market Intelligence Operations for Twelve Data API
 * 
 * These operations provide calendars, analyst data, and performance metrics.
 * 
 * TESTED OPERATIONS (7):
 * - Get Analyst Ratings, Get Earnings Estimate, Get EPS Trend
 * - Get Growth Estimates, Get Price Target, Get Recommendations, Get Revenue Estimate
 * 
 * NEW HIGH-VALUE OPERATIONS (3):
 * - Get Analyst Ratings (Light), Get EDGAR Filings, Get EPS Revisions
 * 
 * TOTAL: 10 operations
 * 
 * NOTE: Economic Calendar endpoint does not exist in Twelve Data API (removed from codebase)
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
		description: 'Get analyst ratings and recommendations',
		routing: {
			request: {
				method: 'GET',
				url: '/analyst_ratings/us_equities',
			},
		},
	},
	{
		name: 'Get Earnings Estimate',
		value: 'getEarningsEstimate',
		action: 'Get earnings estimate',
		description: 'Get analyst earnings estimates',
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
		description: 'Get earnings per share trend data',
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
		description: 'Get analyst growth estimates',
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
		description: 'Get analyst price targets',
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
		description: 'Get analyst recommendation trends',
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
		description: 'Get analyst revenue estimates',
		routing: {
			request: {
				method: 'GET',
				url: '/revenue_estimate',
			},
		},
	},
	// -------------------------------------------------------------------------
	// NEW HIGH-VALUE OPERATIONS (Phase 1 - 90% Coverage Goal)
	// -------------------------------------------------------------------------
	{
		name: 'Get Analyst Ratings (Light)',
		value: 'getAnalystRatingsLight',
		action: 'Get analyst ratings snapshot',
		description: 'Get lightweight analyst ratings summary (faster, less data)',
		routing: {
			request: {
				method: 'GET',
				url: '/analyst_ratings/light',
			},
		},
	},
	{
		name: 'Get EDGAR Filings',
		value: 'getEdgarFilings',
		action: 'Get SEC EDGAR filings',
		description: 'Get SEC EDGAR filing documents and reports',
		routing: {
			request: {
				method: 'GET',
				url: '/edgar_filings/archive',
			},
		},
	},
	{
		name: 'Get EPS Revisions',
		value: 'getEpsRevisions',
		action: 'Get EPS revisions',
		description: 'Get earnings per share estimate revisions by analysts',
		routing: {
			request: {
				method: 'GET',
				url: '/eps_revisions',
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


// =============================================================================
// EXPORT ALL MARKET INTELLIGENCE PARAMETERS
// =============================================================================

export const allMarketIntelligenceParameters: INodeProperties[] = [
	marketIntelligenceSymbolParameter,
	marketIntelligenceOptions,
];







