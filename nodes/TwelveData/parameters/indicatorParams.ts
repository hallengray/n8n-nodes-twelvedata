/**
 * Technical Indicator Parameters for Twelve Data API
 * 
 * This file contains parameter definitions specific to technical indicators.
 * These are reused across the 50+ indicator operations.
 */

import type { INodeProperties } from 'n8n-workflow';
import { intervalOptions, seriesTypeOptions, maTypeOptions } from './common';

// =============================================================================
// ALL TECHNICAL INDICATOR OPERATION VALUES
// =============================================================================

/**
 * List of all technical indicator operations that need symbol parameter
 */
export const allIndicatorOperations = [
	// Moving Averages
	'sma', 'ema', 'wma', 'dema', 'tema', 'trima', 'kama', 'mama', 't3',
	// Momentum Indicators
	'rsi', 'macd', 'stoch', 'stochrsi', 'adx', 'cci', 'mfi', 'roc', 'willr', 'uo', 'mom',
	'ppo', 'apo', 'cmo', 'dx', 'trix', 'ultosc',
	// Volatility Indicators
	'bbands', 'atr', 'natr', 'trange', 'supertrend',
	// Volume Indicators
	'obv', 'ad', 'adosc', 'vwap',
	// Trend Indicators
	'aroon', 'aroonosc', 'bop', 'sar', 'plus_di', 'minus_di', 'plus_dm', 'minus_dm',
	'adxr', 'ht_trendmode',
	// Statistical Functions
	'stddev', 'var', 'linearreg', 'linearreg_slope', 'linearreg_intercept', 
	'linearreg_angle', 'tsf', 'correl', 'beta',
	// Overlap Studies
	'midpoint', 'midprice', 'ht_trendline', 'ht_sine', 'ht_dcperiod', 'ht_dcphase',
	'ht_phasor', 'ichimoku', 'pivot_points_hl', 'percent_b', 'avgprice', 'medprice',
	'typprice', 'wclprice',
	// Math Transform
	'ceil', 'floor', 'round', 'exp', 'sqrt', 'ln', 'log10', 'sin', 'cos', 'tan',
	'asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh', 'add', 'sub', 'mult', 'div',
	'max', 'min', 'sum', 'minmax', 'minmaxindex',
];

/**
 * Indicators that use time_period parameter
 */
export const indicatorsWithTimePeriod = [
	'sma', 'ema', 'wma', 'dema', 'tema', 'trima', 'kama', 't3',
	'rsi', 'adx', 'cci', 'mfi', 'roc', 'willr', 'mom', 'cmo', 'dx', 'trix', 'adxr',
	'atr', 'natr',
	'aroon', 'aroonosc', 'plus_di', 'minus_di', 'plus_dm', 'minus_dm',
	'stddev', 'var', 'linearreg', 'linearreg_slope', 'linearreg_intercept',
	'linearreg_angle', 'tsf', 'correl', 'beta',
	'midpoint', 'percent_b', 'sum', 'minmax', 'minmaxindex',
];

/**
 * Indicators that use series_type parameter
 */
export const indicatorsWithSeriesType = [
	'sma', 'ema', 'wma', 'dema', 'tema', 'trima', 'kama', 'mama', 't3',
	'rsi', 'roc', 'mom', 'cmo', 'trix', 'ppo', 'apo',
	'stddev', 'var', 'linearreg', 'linearreg_slope', 'linearreg_intercept',
	'linearreg_angle', 'tsf',
	'midpoint', 'ht_trendline', 'ht_sine', 'ht_dcperiod', 'ht_dcphase', 'ht_phasor',
	'ceil', 'floor', 'round', 'exp', 'sqrt', 'ln', 'log10', 'sin', 'cos', 'tan',
	'asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh', 'sum', 'minmax', 'minmaxindex',
];

/**
 * Indicators that use fast/slow period parameters (MACD-style)
 */
export const indicatorsWithFastSlowPeriod = [
	'macd', 'ppo', 'apo', 'adosc',
];

/**
 * Indicators that use Bollinger Bands parameters
 */
export const indicatorsWithBBandsParams = ['bbands', 'percent_b'];

/**
 * Indicators that use Stochastic parameters
 */
export const indicatorsWithStochParams = ['stoch', 'stochrsi'];

// =============================================================================
// INDICATOR SYMBOL PARAMETER
// =============================================================================

export const indicatorSymbolParameter: INodeProperties = {
	displayName: 'Symbol',
	name: 'symbol',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'e.g., AAPL, EUR/USD, BTC/USD',
	description: 'The symbol to calculate the indicator for',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'symbol',
		},
	},
};

// =============================================================================
// INDICATOR INTERVAL PARAMETER
// =============================================================================

export const indicatorIntervalParameter: INodeProperties = {
	displayName: 'Interval',
	name: 'interval',
	type: 'options',
	required: true,
	default: '1day',
	description: 'Time interval between data points',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
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

// =============================================================================
// TIME PERIOD PARAMETER
// =============================================================================

export const indicatorTimePeriodParameter: INodeProperties = {
	displayName: 'Time Period',
	name: 'time_period',
	type: 'number',
	default: 14,
	description: 'Number of periods for calculation (default varies by indicator)',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: indicatorsWithTimePeriod,
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'time_period',
		},
	},
};

// =============================================================================
// SERIES TYPE PARAMETER
// =============================================================================

export const indicatorSeriesTypeParameter: INodeProperties = {
	displayName: 'Series Type',
	name: 'series_type',
	type: 'options',
	default: 'close',
	description: 'Price type to use for calculation',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: indicatorsWithSeriesType,
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

// =============================================================================
// MACD/PPO/APO PARAMETERS
// =============================================================================

export const fastPeriodParameter: INodeProperties = {
	displayName: 'Fast Period',
	name: 'fast_period',
	type: 'number',
	default: 12,
	description: 'Number of periods for the fast moving average',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: indicatorsWithFastSlowPeriod,
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'fast_period',
		},
	},
};

export const slowPeriodParameter: INodeProperties = {
	displayName: 'Slow Period',
	name: 'slow_period',
	type: 'number',
	default: 26,
	description: 'Number of periods for the slow moving average',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: indicatorsWithFastSlowPeriod,
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'slow_period',
		},
	},
};

export const signalPeriodParameter: INodeProperties = {
	displayName: 'Signal Period',
	name: 'signal_period',
	type: 'number',
	default: 9,
	description: 'Number of periods for the signal line',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: ['macd'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'signal_period',
		},
	},
};

// =============================================================================
// BOLLINGER BANDS PARAMETERS
// =============================================================================

export const bbandsSdParameter: INodeProperties = {
	displayName: 'Standard Deviation',
	name: 'sd',
	type: 'number',
	default: 2,
	description: 'Number of standard deviations for the bands',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: indicatorsWithBBandsParams,
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'sd',
		},
	},
};

export const bbandsMaTypeParameter: INodeProperties = {
	displayName: 'MA Type',
	name: 'ma_type',
	type: 'options',
	default: '0',
	description: 'Type of moving average to use',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: indicatorsWithBBandsParams,
		},
	},
	options: maTypeOptions,
	routing: {
		send: {
			type: 'query',
			property: 'ma_type',
		},
	},
};

// =============================================================================
// STOCHASTIC PARAMETERS
// =============================================================================

export const stochFastKPeriodParameter: INodeProperties = {
	displayName: 'Fast K Period',
	name: 'fast_k_period',
	type: 'number',
	default: 14,
	description: 'Time period for the %K line',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: indicatorsWithStochParams,
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'fast_k_period',
		},
	},
};

export const stochSlowKPeriodParameter: INodeProperties = {
	displayName: 'Slow K Period',
	name: 'slow_k_period',
	type: 'number',
	default: 3,
	description: 'Smoothing period for the %K line',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: indicatorsWithStochParams,
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'slow_k_period',
		},
	},
};

export const stochSlowDPeriodParameter: INodeProperties = {
	displayName: 'Slow D Period',
	name: 'slow_d_period',
	type: 'number',
	default: 3,
	description: 'Smoothing period for the %D line',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: indicatorsWithStochParams,
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'slow_d_period',
		},
	},
};

// =============================================================================
// ULTIMATE OSCILLATOR PARAMETERS
// =============================================================================

export const uoTimePeriod1Parameter: INodeProperties = {
	displayName: 'Time Period 1',
	name: 'time_period1',
	type: 'number',
	default: 7,
	description: 'First time period',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: ['uo', 'ultosc'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'time_period1',
		},
	},
};

export const uoTimePeriod2Parameter: INodeProperties = {
	displayName: 'Time Period 2',
	name: 'time_period2',
	type: 'number',
	default: 14,
	description: 'Second time period',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: ['uo', 'ultosc'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'time_period2',
		},
	},
};

export const uoTimePeriod3Parameter: INodeProperties = {
	displayName: 'Time Period 3',
	name: 'time_period3',
	type: 'number',
	default: 28,
	description: 'Third time period',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: ['uo', 'ultosc'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'time_period3',
		},
	},
};

// =============================================================================
// SAR PARAMETERS
// =============================================================================

export const sarAccelerationParameter: INodeProperties = {
	displayName: 'Acceleration',
	name: 'acceleration',
	type: 'number',
	default: 0.02,
	description: 'Acceleration factor',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: ['sar'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'acceleration',
		},
	},
};

export const sarMaximumParameter: INodeProperties = {
	displayName: 'Maximum',
	name: 'maximum',
	type: 'number',
	default: 0.2,
	description: 'Maximum acceleration factor',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: ['sar'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'maximum',
		},
	},
};

// =============================================================================
// ICHIMOKU PARAMETERS
// =============================================================================

export const ichimokuConversionParameter: INodeProperties = {
	displayName: 'Conversion Line Period',
	name: 'conversion_line_period',
	type: 'number',
	default: 9,
	description: 'Tenkan-sen period',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: ['ichimoku'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'conversion_line_period',
		},
	},
};

export const ichimokuBaseParameter: INodeProperties = {
	displayName: 'Base Line Period',
	name: 'base_line_period',
	type: 'number',
	default: 26,
	description: 'Kijun-sen period',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: ['ichimoku'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'base_line_period',
		},
	},
};

export const ichimokuLeadingSpanParameter: INodeProperties = {
	displayName: 'Leading Span B Period',
	name: 'leading_span_b_period',
	type: 'number',
	default: 52,
	description: 'Senkou Span B period',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: ['ichimoku'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'leading_span_b_period',
		},
	},
};

export const ichimokuLaggingSpanParameter: INodeProperties = {
	displayName: 'Lagging Span Period',
	name: 'lagging_span_period',
	type: 'number',
	default: 26,
	description: 'Chikou Span displacement',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: ['ichimoku'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'lagging_span_period',
		},
	},
};

// =============================================================================
// SUPERTREND PARAMETERS
// =============================================================================

export const supertrendMultiplierParameter: INodeProperties = {
	displayName: 'Multiplier',
	name: 'multiplier',
	type: 'number',
	default: 3,
	description: 'ATR multiplier for SuperTrend calculation',
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
			operation: ['supertrend'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: 'multiplier',
		},
	},
};

// =============================================================================
// INDICATOR ADDITIONAL OPTIONS
// =============================================================================

export const indicatorAdditionalOptions: INodeProperties = {
	displayName: 'Additional Options',
	name: 'indicatorOptions',
	type: 'collection',
	placeholder: 'Add Option',
	default: {},
	displayOptions: {
		show: {
			resource: ['technicalIndicators'],
		},
	},
	options: [
		{
			displayName: 'End Date',
			name: 'end_date',
			type: 'string',
			default: '',
			placeholder: 'e.g., 2024-12-31',
			description: 'End date for data (format: YYYY-MM-DD)',
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
			description: 'Start date for data (format: YYYY-MM-DD)',
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

// =============================================================================
// EXPORT ALL INDICATOR PARAMETERS
// =============================================================================

export const allIndicatorParameters: INodeProperties[] = [
	indicatorSymbolParameter,
	indicatorIntervalParameter,
	indicatorTimePeriodParameter,
	indicatorSeriesTypeParameter,
	fastPeriodParameter,
	slowPeriodParameter,
	signalPeriodParameter,
	bbandsSdParameter,
	bbandsMaTypeParameter,
	stochFastKPeriodParameter,
	stochSlowKPeriodParameter,
	stochSlowDPeriodParameter,
	uoTimePeriod1Parameter,
	uoTimePeriod2Parameter,
	uoTimePeriod3Parameter,
	sarAccelerationParameter,
	sarMaximumParameter,
	ichimokuConversionParameter,
	ichimokuBaseParameter,
	ichimokuLeadingSpanParameter,
	ichimokuLaggingSpanParameter,
	supertrendMultiplierParameter,
	indicatorAdditionalOptions,
];

