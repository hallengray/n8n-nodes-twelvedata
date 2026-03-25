/**
 * Common Parameters for Twelve Data API
 * 
 * This file contains reusable parameter definitions that are shared
 * across multiple operations. Using shared parameters ensures consistency
 * and reduces code duplication.
 */

import type { INodeProperties } from 'n8n-workflow';

// =============================================================================
// INTERVAL OPTIONS
// =============================================================================

/**
 * Standard interval options used across time series and indicator endpoints
 */
export const intervalOptions: INodeProperties['options'] = [
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
];

// =============================================================================
// SERIES TYPE OPTIONS
// =============================================================================

/**
 * Series type options for technical indicators
 */
export const seriesTypeOptions: INodeProperties['options'] = [
	{ name: 'Close', value: 'close' },
	{ name: 'Open', value: 'open' },
	{ name: 'High', value: 'high' },
	{ name: 'Low', value: 'low' },
];

// =============================================================================
// MA TYPE OPTIONS
// =============================================================================

/**
 * Moving average type options for indicators that support multiple MA types
 */
export const maTypeOptions: INodeProperties['options'] = [
	{ name: 'SMA - Simple Moving Average', value: '0' },
	{ name: 'EMA - Exponential Moving Average', value: '1' },
	{ name: 'WMA - Weighted Moving Average', value: '2' },
	{ name: 'DEMA - Double Exponential Moving Average', value: '3' },
	{ name: 'TEMA - Triple Exponential Moving Average', value: '4' },
	{ name: 'TRIMA - Triangular Moving Average', value: '5' },
	{ name: 'KAMA - Kaufman Adaptive Moving Average', value: '6' },
	{ name: 'MAMA - MESA Adaptive Moving Average', value: '7' },
	{ name: 'T3 - Triple Exponential Moving Average', value: '8' },
];

// =============================================================================
// PERIOD OPTIONS (for fundamentals)
// =============================================================================

/**
 * Period options for fundamental data (annual vs quarterly)
 */
export const periodOptions: INodeProperties['options'] = [
	{ name: 'Annual', value: 'annual' },
	{ name: 'Quarterly', value: 'quarterly' },
];

// =============================================================================
// MARKET MOVER DIRECTION OPTIONS
// =============================================================================

/**
 * Direction options for market movers
 */
export const marketMoverDirectionOptions: INodeProperties['options'] = [
	{ name: 'Gainers', value: 'gainers' },
	{ name: 'Losers', value: 'losers' },
];

// =============================================================================
// HELPER FUNCTION: Create Symbol Parameter
// =============================================================================

/**
 * Creates a symbol parameter for a specific resource and operations
 */
export function createSymbolParameter(
	resources: string[],
	operations: string[],
	hideOperations?: string[],
): INodeProperties {
	const param: INodeProperties = {
		displayName: 'Symbol',
		name: 'symbol',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g., AAPL, EUR/USD, BTC/USD',
		description: 'The symbol to get data for (stock ticker, forex pair, or crypto pair)',
		displayOptions: {
			show: {
				resource: resources,
				operation: operations,
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'symbol',
			},
		},
	};

	if (hideOperations && hideOperations.length > 0) {
		param.displayOptions!.hide = {
			operation: hideOperations,
		};
	}

	return param;
}

// =============================================================================
// HELPER FUNCTION: Create Interval Parameter
// =============================================================================

/**
 * Creates an interval parameter for a specific resource and operations
 */
export function createIntervalParameter(
	resources: string[],
	operations: string[],
): INodeProperties {
	return {
		displayName: 'Interval',
		name: 'interval',
		type: 'options',
		required: true,
		default: '1day',
		description: 'Time interval between data points',
		displayOptions: {
			show: {
				resource: resources,
				operation: operations,
			},
		},
		options: intervalOptions,
		routing: {
			send: {
				type: 'query',
				property: 'interval',
			},
		},
	};
}

// =============================================================================
// HELPER FUNCTION: Create Time Period Parameter
// =============================================================================

/**
 * Creates a time period parameter for technical indicators
 */
export function createTimePeriodParameter(
	operations: string[],
	defaultValue: number = 14,
): INodeProperties {
	return {
		displayName: 'Time Period',
		name: 'time_period',
		type: 'number',
		default: defaultValue,
		description: 'Number of periods for calculation',
		displayOptions: {
			show: {
				resource: ['technicalIndicators'],
				operation: operations,
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'time_period',
			},
		},
	};
}

// =============================================================================
// HELPER FUNCTION: Create Series Type Parameter
// =============================================================================

/**
 * Creates a series type parameter for technical indicators
 */
export function createSeriesTypeParameter(operations: string[]): INodeProperties {
	return {
		displayName: 'Series Type',
		name: 'series_type',
		type: 'options',
		default: 'close',
		description: 'Price type to use for calculation',
		displayOptions: {
			show: {
				resource: ['technicalIndicators'],
				operation: operations,
			},
		},
		options: seriesTypeOptions,
		routing: {
			send: {
				type: 'query',
				property: 'series_type',
			},
		},
	};
}

// =============================================================================
// HELPER FUNCTION: Create Output Size Parameter
// =============================================================================

/**
 * Creates an output size parameter
 */
export function createOutputSizeParameter(
	resources: string[],
	operations: string[],
	defaultValue: number = 30,
): INodeProperties {
	return {
		displayName: 'Output Size',
		name: 'outputsize',
		type: 'number',
		default: defaultValue,
		description: 'Number of data points to return (max 5000)',
		displayOptions: {
			show: {
				resource: resources,
				operation: operations,
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'outputsize',
			},
		},
	};
}







