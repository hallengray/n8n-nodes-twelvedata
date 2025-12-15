/**
 * Technical Indicators Operations for Twelve Data API
 * 
 * This file contains 50+ technical indicator operations organized by category:
 * - Moving Averages (9)
 * - Momentum Indicators (16)
 * - Volatility Indicators (5)
 * - Volume Indicators (4)
 * - Trend Indicators (10)
 * - Statistical Functions (9)
 * - Overlap Studies (14)
 * - Math Transform (25)
 * 
 * ALL operations are marked as BETA since they haven't been individually tested.
 */

import type { INodePropertyOptions } from 'n8n-workflow';

// =============================================================================
// TECHNICAL INDICATORS OPERATIONS
// =============================================================================

export const technicalIndicatorsOperations: INodePropertyOptions[] = [
	// =========================================================================
	// MOVING AVERAGES (9 operations)
	// =========================================================================
	{
		name: 'DEMA - Double Exponential Moving Average',
		value: 'dema',
		action: 'Calculate DEMA indicator',
		description: 'Double Exponential Moving Average - reduces lag ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/dema',
			},
		},
	},
	{
		name: 'EMA - Exponential Moving Average',
		value: 'ema',
		action: 'Calculate EMA indicator',
		description: 'Exponential Moving Average - weighted toward recent prices ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/ema',
			},
		},
	},
	{
		name: 'KAMA - Kaufman Adaptive Moving Average',
		value: 'kama',
		action: 'Calculate KAMA indicator',
		description: 'Kaufman Adaptive Moving Average - adjusts to market volatility ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/kama',
			},
		},
	},
	{
		name: 'MAMA - MESA Adaptive Moving Average',
		value: 'mama',
		action: 'Calculate MAMA indicator',
		description: 'MESA Adaptive Moving Average - adapts to price cycles ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/mama',
			},
		},
	},
	{
		name: 'SMA - Simple Moving Average',
		value: 'sma',
		action: 'Calculate SMA indicator',
		description: 'Simple Moving Average - basic price average ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/sma',
			},
		},
	},
	{
		name: 'T3 - Triple Exponential Moving Average',
		value: 't3',
		action: 'Calculate T3 indicator',
		description: 'Triple Exponential Moving Average - smoother than EMA ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/t3',
			},
		},
	},
	{
		name: 'TEMA - Triple Exponential Moving Average',
		value: 'tema',
		action: 'Calculate TEMA indicator',
		description: 'Triple Exponential Moving Average - reduces lag significantly ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/tema',
			},
		},
	},
	{
		name: 'TRIMA - Triangular Moving Average',
		value: 'trima',
		action: 'Calculate TRIMA indicator',
		description: 'Triangular Moving Average - double smoothed ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/trima',
			},
		},
	},
	{
		name: 'WMA - Weighted Moving Average',
		value: 'wma',
		action: 'Calculate WMA indicator',
		description: 'Weighted Moving Average - linear weighted ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/wma',
			},
		},
	},
	// =========================================================================
	// MOMENTUM INDICATORS (16 operations)
	// =========================================================================
	{
		name: 'ADX - Average Directional Index',
		value: 'adx',
		action: 'Calculate ADX indicator',
		description: 'Average Directional Index - measures trend strength ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/adx',
			},
		},
	},
	{
		name: 'ADXR - Average Directional Movement Index Rating',
		value: 'adxr',
		action: 'Calculate ADXR indicator',
		description: 'Average Directional Movement Index Rating ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/adxr',
			},
		},
	},
	{
		name: 'APO - Absolute Price Oscillator',
		value: 'apo',
		action: 'Calculate APO indicator',
		description: 'Absolute Price Oscillator - difference between two EMAs ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/apo',
			},
		},
	},
	{
		name: 'CCI - Commodity Channel Index',
		value: 'cci',
		action: 'Calculate CCI indicator',
		description: 'Commodity Channel Index - identifies overbought/oversold ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/cci',
			},
		},
	},
	{
		name: 'CMO - Chande Momentum Oscillator',
		value: 'cmo',
		action: 'Calculate CMO indicator',
		description: 'Chande Momentum Oscillator - momentum indicator ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/cmo',
			},
		},
	},
	{
		name: 'DX - Directional Movement Index',
		value: 'dx',
		action: 'Calculate DX indicator',
		description: 'Directional Movement Index ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/dx',
			},
		},
	},
	{
		name: 'MACD - Moving Average Convergence Divergence',
		value: 'macd',
		action: 'Calculate MACD indicator',
		description: 'Moving Average Convergence Divergence - trend following ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/macd',
			},
		},
	},
	{
		name: 'MFI - Money Flow Index',
		value: 'mfi',
		action: 'Calculate MFI indicator',
		description: 'Money Flow Index - volume-weighted RSI ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/mfi',
			},
		},
	},
	{
		name: 'MOM - Momentum',
		value: 'mom',
		action: 'Calculate Momentum indicator',
		description: 'Momentum - rate of price change ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/mom',
			},
		},
	},
	{
		name: 'PPO - Percentage Price Oscillator',
		value: 'ppo',
		action: 'Calculate PPO indicator',
		description: 'Percentage Price Oscillator - percentage MACD ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/ppo',
			},
		},
	},
	{
		name: 'ROC - Rate of Change',
		value: 'roc',
		action: 'Calculate ROC indicator',
		description: 'Rate of Change - percentage price change ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/roc',
			},
		},
	},
	{
		name: 'RSI - Relative Strength Index',
		value: 'rsi',
		action: 'Calculate RSI indicator',
		description: 'Relative Strength Index - momentum oscillator ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/rsi',
			},
		},
	},
	{
		name: 'STOCH - Stochastic Oscillator',
		value: 'stoch',
		action: 'Calculate Stochastic indicator',
		description: 'Stochastic Oscillator - compares closing price to range ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/stoch',
			},
		},
	},
	{
		name: 'STOCHRSI - Stochastic RSI',
		value: 'stochrsi',
		action: 'Calculate Stochastic RSI indicator',
		description: 'Stochastic RSI - stochastic of RSI ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/stochrsi',
			},
		},
	},
	{
		name: 'TRIX - Triple Exponential Average',
		value: 'trix',
		action: 'Calculate TRIX indicator',
		description: 'Triple Exponential Average - momentum oscillator ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/trix',
			},
		},
	},
	{
		name: 'ULTOSC - Ultimate Oscillator',
		value: 'ultosc',
		action: 'Calculate Ultimate Oscillator',
		description: 'Ultimate Oscillator - multi-timeframe momentum ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/ultosc',
			},
		},
	},
	{
		name: 'WILLR - Williams %R',
		value: 'willr',
		action: 'Calculate Williams %R indicator',
		description: 'Williams %R - overbought/oversold indicator ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/willr',
			},
		},
	},
	// =========================================================================
	// VOLATILITY INDICATORS (5 operations)
	// =========================================================================
	{
		name: 'ATR - Average True Range',
		value: 'atr',
		action: 'Calculate ATR indicator',
		description: 'Average True Range - measures volatility ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/atr',
			},
		},
	},
	{
		name: 'BBANDS - Bollinger Bands',
		value: 'bbands',
		action: 'Calculate Bollinger Bands',
		description: 'Bollinger Bands - volatility bands around SMA ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/bbands',
			},
		},
	},
	{
		name: 'NATR - Normalized Average True Range',
		value: 'natr',
		action: 'Calculate NATR indicator',
		description: 'Normalized Average True Range - percentage ATR ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/natr',
			},
		},
	},
	{
		name: 'SUPERTREND - SuperTrend',
		value: 'supertrend',
		action: 'Calculate SuperTrend indicator',
		description: 'SuperTrend - trend following indicator ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/supertrend',
			},
		},
	},
	{
		name: 'TRANGE - True Range',
		value: 'trange',
		action: 'Calculate True Range',
		description: 'True Range - single period volatility ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/trange',
			},
		},
	},
	// =========================================================================
	// VOLUME INDICATORS (4 operations)
	// =========================================================================
	{
		name: 'AD - Accumulation/Distribution',
		value: 'ad',
		action: 'Calculate A/D indicator',
		description: 'Accumulation/Distribution - volume-based indicator ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/ad',
			},
		},
	},
	{
		name: 'ADOSC - Chaikin A/D Oscillator',
		value: 'adosc',
		action: 'Calculate Chaikin A/D Oscillator',
		description: 'Chaikin A/D Oscillator - momentum of A/D line ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/adosc',
			},
		},
	},
	{
		name: 'OBV - On Balance Volume',
		value: 'obv',
		action: 'Calculate OBV indicator',
		description: 'On Balance Volume - cumulative volume indicator ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/obv',
			},
		},
	},
	{
		name: 'VWAP - Volume Weighted Average Price',
		value: 'vwap',
		action: 'Calculate VWAP',
		description: 'Volume Weighted Average Price ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/vwap',
			},
		},
	},
	// =========================================================================
	// TREND INDICATORS (10 operations)
	// =========================================================================
	{
		name: 'AROON - Aroon Indicator',
		value: 'aroon',
		action: 'Calculate Aroon indicator',
		description: 'Aroon Indicator - identifies trend changes ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/aroon',
			},
		},
	},
	{
		name: 'AROONOSC - Aroon Oscillator',
		value: 'aroonosc',
		action: 'Calculate Aroon Oscillator',
		description: 'Aroon Oscillator - difference between Aroon Up and Down ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/aroonosc',
			},
		},
	},
	{
		name: 'BOP - Balance of Power',
		value: 'bop',
		action: 'Calculate Balance of Power',
		description: 'Balance of Power - measures buying/selling pressure ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/bop',
			},
		},
	},
	{
		name: 'HT_TRENDMODE - Hilbert Transform Trend Mode',
		value: 'ht_trendmode',
		action: 'Calculate HT Trend Mode',
		description: 'Hilbert Transform - Trend vs Cycle Mode ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/ht_trendmode',
			},
		},
	},
	{
		name: 'MINUS_DI - Minus Directional Indicator',
		value: 'minus_di',
		action: 'Calculate Minus DI',
		description: 'Minus Directional Indicator - downward trend strength ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/minus_di',
			},
		},
	},
	{
		name: 'MINUS_DM - Minus Directional Movement',
		value: 'minus_dm',
		action: 'Calculate Minus DM',
		description: 'Minus Directional Movement ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/minus_dm',
			},
		},
	},
	{
		name: 'PLUS_DI - Plus Directional Indicator',
		value: 'plus_di',
		action: 'Calculate Plus DI',
		description: 'Plus Directional Indicator - upward trend strength ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/plus_di',
			},
		},
	},
	{
		name: 'PLUS_DM - Plus Directional Movement',
		value: 'plus_dm',
		action: 'Calculate Plus DM',
		description: 'Plus Directional Movement ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/plus_dm',
			},
		},
	},
	{
		name: 'SAR - Parabolic SAR',
		value: 'sar',
		action: 'Calculate Parabolic SAR',
		description: 'Parabolic Stop and Reverse - trend following ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/sar',
			},
		},
	},
	{
		name: 'ICHIMOKU - Ichimoku Cloud',
		value: 'ichimoku',
		action: 'Calculate Ichimoku Cloud',
		description: 'Ichimoku Kinko Hyo - comprehensive trend indicator ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/ichimoku',
			},
		},
	},
	// =========================================================================
	// STATISTICAL FUNCTIONS (9 operations)
	// =========================================================================
	{
		name: 'BETA - Beta Coefficient',
		value: 'beta',
		action: 'Calculate Beta',
		description: 'Beta - measures volatility relative to market ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/beta',
			},
		},
	},
	{
		name: 'CORREL - Pearson Correlation Coefficient',
		value: 'correl',
		action: 'Calculate Correlation',
		description: 'Pearson Correlation Coefficient ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/correl',
			},
		},
	},
	{
		name: 'LINEARREG - Linear Regression',
		value: 'linearreg',
		action: 'Calculate Linear Regression',
		description: 'Linear Regression - trend line value ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/linearreg',
			},
		},
	},
	{
		name: 'LINEARREG_ANGLE - Linear Regression Angle',
		value: 'linearreg_angle',
		action: 'Calculate Linear Regression Angle',
		description: 'Linear Regression Angle in degrees ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/linearreg_angle',
			},
		},
	},
	{
		name: 'LINEARREG_INTERCEPT - Linear Regression Intercept',
		value: 'linearreg_intercept',
		action: 'Calculate Linear Regression Intercept',
		description: 'Linear Regression Intercept ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/linearreg_intercept',
			},
		},
	},
	{
		name: 'LINEARREG_SLOPE - Linear Regression Slope',
		value: 'linearreg_slope',
		action: 'Calculate Linear Regression Slope',
		description: 'Linear Regression Slope ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/linearreg_slope',
			},
		},
	},
	{
		name: 'STDDEV - Standard Deviation',
		value: 'stddev',
		action: 'Calculate Standard Deviation',
		description: 'Standard Deviation - measures dispersion ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/stddev',
			},
		},
	},
	{
		name: 'TSF - Time Series Forecast',
		value: 'tsf',
		action: 'Calculate Time Series Forecast',
		description: 'Time Series Forecast - linear regression projection ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/tsf',
			},
		},
	},
	{
		name: 'VAR - Variance',
		value: 'var',
		action: 'Calculate Variance',
		description: 'Variance - measures spread ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/var',
			},
		},
	},
	// =========================================================================
	// OVERLAP STUDIES (14 operations)
	// =========================================================================
	{
		name: 'AVGPRICE - Average Price',
		value: 'avgprice',
		action: 'Calculate Average Price',
		description: 'Average of OHLC prices ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/avgprice',
			},
		},
	},
	{
		name: 'HT_DCPERIOD - Hilbert Transform Dominant Cycle Period',
		value: 'ht_dcperiod',
		action: 'Calculate HT Dominant Cycle Period',
		description: 'Hilbert Transform - Dominant Cycle Period ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/ht_dcperiod',
			},
		},
	},
	{
		name: 'HT_DCPHASE - Hilbert Transform Dominant Cycle Phase',
		value: 'ht_dcphase',
		action: 'Calculate HT Dominant Cycle Phase',
		description: 'Hilbert Transform - Dominant Cycle Phase ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/ht_dcphase',
			},
		},
	},
	{
		name: 'HT_PHASOR - Hilbert Transform Phasor Components',
		value: 'ht_phasor',
		action: 'Calculate HT Phasor',
		description: 'Hilbert Transform - Phasor Components ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/ht_phasor',
			},
		},
	},
	{
		name: 'HT_SINE - Hilbert Transform SineWave',
		value: 'ht_sine',
		action: 'Calculate HT SineWave',
		description: 'Hilbert Transform - SineWave ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/ht_sine',
			},
		},
	},
	{
		name: 'HT_TRENDLINE - Hilbert Transform Instantaneous Trendline',
		value: 'ht_trendline',
		action: 'Calculate HT Trendline',
		description: 'Hilbert Transform - Instantaneous Trendline ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/ht_trendline',
			},
		},
	},
	{
		name: 'MEDPRICE - Median Price',
		value: 'medprice',
		action: 'Calculate Median Price',
		description: 'Median Price - (High + Low) / 2 ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/medprice',
			},
		},
	},
	{
		name: 'MIDPOINT - Midpoint',
		value: 'midpoint',
		action: 'Calculate Midpoint',
		description: 'Midpoint over period ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/midpoint',
			},
		},
	},
	{
		name: 'MIDPRICE - Midpoint Price',
		value: 'midprice',
		action: 'Calculate Midpoint Price',
		description: 'Midpoint Price over period ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/midprice',
			},
		},
	},
	{
		name: 'PERCENT_B - Bollinger Bands %B',
		value: 'percent_b',
		action: 'Calculate Percent B',
		description: 'Bollinger Bands %B - position within bands ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/percent_b',
			},
		},
	},
	{
		name: 'PIVOT_POINTS_HL - Pivot Points High/Low',
		value: 'pivot_points_hl',
		action: 'Calculate Pivot Points',
		description: 'Pivot Points High/Low ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/pivot_points_hl',
			},
		},
	},
	{
		name: 'TYPPRICE - Typical Price',
		value: 'typprice',
		action: 'Calculate Typical Price',
		description: 'Typical Price - (High + Low + Close) / 3 ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/typprice',
			},
		},
	},
	{
		name: 'WCLPRICE - Weighted Close Price',
		value: 'wclprice',
		action: 'Calculate Weighted Close Price',
		description: 'Weighted Close Price - (High + Low + 2*Close) / 4 ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/wclprice',
			},
		},
	},
	// =========================================================================
	// MATH TRANSFORM (25 operations)
	// =========================================================================
	{
		name: 'ACOS - Arc Cosine',
		value: 'acos',
		action: 'Calculate Arc Cosine',
		description: 'Vector Trigonometric ACos ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/acos',
			},
		},
	},
	{
		name: 'ADD - Arithmetic Add',
		value: 'add',
		action: 'Calculate Addition',
		description: 'Vector Arithmetic Add ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/add',
			},
		},
	},
	{
		name: 'ASIN - Arc Sine',
		value: 'asin',
		action: 'Calculate Arc Sine',
		description: 'Vector Trigonometric ASin ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/asin',
			},
		},
	},
	{
		name: 'ATAN - Arc Tangent',
		value: 'atan',
		action: 'Calculate Arc Tangent',
		description: 'Vector Trigonometric ATan ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/atan',
			},
		},
	},
	{
		name: 'CEIL - Ceiling',
		value: 'ceil',
		action: 'Calculate Ceiling',
		description: 'Vector Ceiling ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/ceil',
			},
		},
	},
	{
		name: 'COS - Cosine',
		value: 'cos',
		action: 'Calculate Cosine',
		description: 'Vector Trigonometric Cos ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/cos',
			},
		},
	},
	{
		name: 'COSH - Hyperbolic Cosine',
		value: 'cosh',
		action: 'Calculate Hyperbolic Cosine',
		description: 'Vector Trigonometric Cosh ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/cosh',
			},
		},
	},
	{
		name: 'DIV - Arithmetic Division',
		value: 'div',
		action: 'Calculate Division',
		description: 'Vector Arithmetic Division ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/div',
			},
		},
	},
	{
		name: 'EXP - Exponential',
		value: 'exp',
		action: 'Calculate Exponential',
		description: 'Vector Arithmetic Exp ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/exp',
			},
		},
	},
	{
		name: 'FLOOR - Floor',
		value: 'floor',
		action: 'Calculate Floor',
		description: 'Vector Floor ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/floor',
			},
		},
	},
	{
		name: 'LN - Natural Logarithm',
		value: 'ln',
		action: 'Calculate Natural Log',
		description: 'Vector Log Natural ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/ln',
			},
		},
	},
	{
		name: 'LOG10 - Logarithm Base 10',
		value: 'log10',
		action: 'Calculate Log Base 10',
		description: 'Vector Log10 ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/log10',
			},
		},
	},
	{
		name: 'MAX - Maximum Value',
		value: 'max',
		action: 'Calculate Maximum',
		description: 'Highest value over period ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/max',
			},
		},
	},
	{
		name: 'MIN - Minimum Value',
		value: 'min',
		action: 'Calculate Minimum',
		description: 'Lowest value over period ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/min',
			},
		},
	},
	{
		name: 'MINMAX - Min/Max Values',
		value: 'minmax',
		action: 'Calculate Min/Max',
		description: 'Lowest and highest values over period ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/minmax',
			},
		},
	},
	{
		name: 'MINMAXINDEX - Min/Max Index',
		value: 'minmaxindex',
		action: 'Calculate Min/Max Index',
		description: 'Index of lowest and highest values ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/minmaxindex',
			},
		},
	},
	{
		name: 'MULT - Arithmetic Multiplication',
		value: 'mult',
		action: 'Calculate Multiplication',
		description: 'Vector Arithmetic Mult ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/mult',
			},
		},
	},
	{
		name: 'ROUND - Round',
		value: 'round',
		action: 'Calculate Round',
		description: 'Vector Round ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/round',
			},
		},
	},
	{
		name: 'SIN - Sine',
		value: 'sin',
		action: 'Calculate Sine',
		description: 'Vector Trigonometric Sin ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/sin',
			},
		},
	},
	{
		name: 'SINH - Hyperbolic Sine',
		value: 'sinh',
		action: 'Calculate Hyperbolic Sine',
		description: 'Vector Trigonometric Sinh ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/sinh',
			},
		},
	},
	{
		name: 'SQRT - Square Root',
		value: 'sqrt',
		action: 'Calculate Square Root',
		description: 'Vector Square Root ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/sqrt',
			},
		},
	},
	{
		name: 'SUB - Arithmetic Subtraction',
		value: 'sub',
		action: 'Calculate Subtraction',
		description: 'Vector Arithmetic Sub ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/sub',
			},
		},
	},
	{
		name: 'SUM - Summation',
		value: 'sum',
		action: 'Calculate Sum',
		description: 'Summation over period ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/sum',
			},
		},
	},
	{
		name: 'TAN - Tangent',
		value: 'tan',
		action: 'Calculate Tangent',
		description: 'Vector Trigonometric Tan ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/tan',
			},
		},
	},
	{
		name: 'TANH - Hyperbolic Tangent',
		value: 'tanh',
		action: 'Calculate Hyperbolic Tangent',
		description: 'Vector Trigonometric Tanh ✨ BETA',
		routing: {
			request: {
				method: 'GET',
				url: '/tanh',
			},
		},
	},
];



