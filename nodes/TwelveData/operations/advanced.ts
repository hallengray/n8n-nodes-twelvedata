/**
 * Advanced Operations for Twelve Data API
 * 
 * These operations provide high-throughput and management endpoints.
 * 
 * ALL OPERATIONS ARE BETA (3 total):
 * - Batch Request, API Usage, Logo
 */

import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

// =============================================================================
// ADVANCED OPERATIONS
// =============================================================================

export const advancedOperations: INodePropertyOptions[] = [
	{
		name: 'API Usage',
		value: 'getApiUsage',
		action: 'Get API usage statistics',
		description: 'Get your API usage and remaining credits',
		routing: {
			request: {
				method: 'GET',
				url: '/api_usage',
			},
		},
	},
	{
		name: 'Batch Request',
		value: 'batchRequest',
		action: 'Make batch request',
		description: 'Get multiple data types for multiple symbols in one request',
		routing: {
			request: {
				method: 'GET',
				url: '/batch',
			},
		},
	},
	{
		name: 'Get Logo',
		value: 'getLogo',
		action: 'Get company logo',
		description: 'Get company logo URL',
		routing: {
			request: {
				method: 'GET',
				url: '/logo',
			},
		},
	},
];

// =============================================================================
// ADVANCED PARAMETERS
// =============================================================================

/**
 * Symbols parameter for batch requests
 */
export const advancedSymbolsParameter: INodeProperties = {
	displayName: 'Symbols',
	name: 'symbols',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'e.g., AAPL,MSFT,GOOGL',
	description: 'Comma-separated list of symbols (max 120)',
	displayOptions: {
		show: {
			resource: ['advanced'],
			operation: ['batchRequest'],
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
 * Symbol parameter for logo
 */
export const advancedLogoSymbolParameter: INodeProperties = {
	displayName: 'Symbol',
	name: 'symbol',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'e.g., AAPL',
	description: 'The stock symbol to get logo for',
	displayOptions: {
		show: {
			resource: ['advanced'],
			operation: ['getLogo'],
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
 * Batch request options
 */
export const advancedBatchOptions: INodeProperties = {
	displayName: 'Batch Options',
	name: 'batchOptions',
	type: 'collection',
	placeholder: 'Add Option',
	default: {},
	displayOptions: {
		show: {
			resource: ['advanced'],
			operation: ['batchRequest'],
		},
	},
	options: [
		{
			displayName: 'Interval',
			name: 'interval',
			type: 'options',
			default: '1day',
			description: 'Time interval for time series data',
			options: [
				{ name: '1 Day', value: '1day' },
				{ name: '1 Hour', value: '1h' },
				{ name: '1 Minute', value: '1min' },
				{ name: '1 Month', value: '1month' },
				{ name: '1 Week', value: '1week' },
				{ name: '15 Minutes', value: '15min' },
				{ name: '30 Minutes', value: '30min' },
				{ name: '5 Minutes', value: '5min' },
			],
			routing: {
				send: {
					type: 'query',
					property: 'interval',
				},
			},
		},
		{
			displayName: 'Output Size',
			name: 'outputsize',
			type: 'number',
			default: 30,
			description: 'Number of data points per symbol',
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
			description: 'Start date (format: YYYY-MM-DD)',
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
			description: 'End date (format: YYYY-MM-DD)',
			routing: {
				send: {
					type: 'query',
					property: 'end_date',
				},
			},
		},
	],
};

// =============================================================================
// EXPORT ALL ADVANCED PARAMETERS
// =============================================================================

export const allAdvancedParameters: INodeProperties[] = [
	advancedSymbolsParameter,
	advancedLogoSymbolParameter,
	advancedBatchOptions,
];

