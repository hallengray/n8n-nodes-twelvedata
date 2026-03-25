/**
 * TwelveData.node.ts
 * 
 * This is the main node file for the Twelve Data n8n connector.
 * It defines what users see in the n8n interface and how the node behaves.
 * 
 * ARCHITECTURE OVERVIEW:
 * ----------------------
 * This node uses n8n's "declarative style" (also called low-code approach).
 * Instead of writing manual API call logic, we define:
 * 1. What fields to show the user (properties)
 * 2. How to construct API requests (routing)
 * 
 * n8n then automatically handles making the HTTP requests for us!
 * 
 * KEY CONCEPTS:
 * - Resource: A category of data (Core Data, Fundamentals, etc.)
 * - Operation: An action on that resource (Get Quote, Get Time Series, etc.)
 * - Properties: Form fields users fill out (symbol, interval, etc.)
 * - Routing: How user input maps to API endpoints
 * 
 * OPERATIONS SUMMARY:
 * - Core Data: 11 operations (6 tested, 3 beta, 2 new)
 * - Reference Data: 26 operations (8 tested, 7 beta, 11 new)
 * - Fundamentals: 22 operations (4 tested, 12 beta, 6 new)
 * - Technical Indicators: 92 operations (all beta)
 * - Market Intelligence: 10 operations (7 tested, 3 new)
 * - Advanced: 3 operations (all beta)
 * - TOTAL: 164 operations (89.1% API coverage)
 * 
 * SECURITY NOTE:
 * Error sanitization function is available in utils/errorSanitizer.ts
 * for future use when implementing custom error handling.
 */

import {
	NodeConnectionTypes,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

// Import operations from modular files
import {
	coreDataOperations,
	allCoreDataParameters,
} from './operations/coreData';

import {
	referenceDataOperations,
	allReferenceDataParameters,
} from './operations/referenceData';

import {
	fundamentalsOperations,
	allFundamentalsParameters,
} from './operations/fundamentals';

import {
	technicalIndicatorsOperations,
} from './operations/technicalIndicators';

import {
	marketIntelligenceOperations,
	allMarketIntelligenceParameters,
} from './operations/marketIntelligence';

import {
	advancedOperations,
	allAdvancedParameters,
} from './operations/advanced';

import {
	allIndicatorParameters,
} from './parameters/indicatorParams';

/**
 * The main TwelveData node class
 * 
 * This class implements INodeType, which means it must have:
 * - description: Object describing the node (required)
 * - execute(): Function that runs the node (optional for declarative nodes)
 * - methods: Helper methods like list search (optional)
 * 
 * Since we're using declarative style with routing, we don't need execute()!
 * n8n will automatically make API calls based on our routing configuration.
 */
export class TwelveData implements INodeType {
	/**
	 * NODE DESCRIPTION
	 * ================
	 * This object tells n8n everything about our node:
	 * - How to display it in the UI
	 * - What credentials it needs
	 * - What form fields to show users
	 * - How to make API requests
	 */
	description: INodeTypeDescription = {
		// =========================================================================
		// BASIC INFORMATION
		// =========================================================================
		
		displayName: 'Twelve Data',
		name: 'twelveData',
		
		icon: {
			light: 'file:../../icons/twelvedata.svg',
			dark: 'file:../../icons/twelvedata.dark.svg',
		},
		
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Access 140+ financial market data endpoints from Twelve Data API including stocks, forex, cryptocurrencies, ETFs, indices, and 90+ technical indicators',
		
		defaults: {
			name: 'Twelve Data',
		},
		
		usableAsTool: true,
		
		// =========================================================================
		// CONNECTIONS
		// =========================================================================
		
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		
		// =========================================================================
		// CREDENTIALS
		// =========================================================================
		
		credentials: [
			{
				name: 'twelveDataApi',
				required: true,
			},
		],
		
		// =========================================================================
		// REQUEST DEFAULTS
		// =========================================================================
		
		requestDefaults: {
			baseURL: 'https://api.twelvedata.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		
		// =========================================================================
		// PROPERTIES (Form Fields)
		// =========================================================================
		
		properties: [
			// -----------------------------------------------------------------
			// RESOURCE SELECTOR (6 categories)
			// -----------------------------------------------------------------
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Advanced',
						value: 'advanced',
						description: 'Batch requests, API usage, and utility endpoints',
					},
					{
						name: 'Core Data',
						value: 'coreData',
						description: 'Real-time and historical price data (quotes, time series, OHLC)',
					},
					{
						name: 'Fundamentals',
						value: 'fundamentals',
						description: 'Company fundamentals, financials, dividends, earnings',
					},
					{
						name: 'Market Intelligence',
						value: 'marketIntelligence',
						description: 'Analyst ratings, estimates, and economic calendar',
					},
					{
						name: 'Reference Data',
						value: 'referenceData',
						description: 'Symbol lists, exchanges, instrument types, market state',
					},
					{
						name: 'Technical Indicators',
						value: 'technicalIndicators',
						description: '90+ technical indicators for trading analysis',
					},
				],
				default: 'coreData',
			},
			
			// -----------------------------------------------------------------
			// OPERATION SELECTORS (one per resource)
			// -----------------------------------------------------------------
			
			// Core Data Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['coreData'],
					},
				},
				options: coreDataOperations,
				default: 'getQuote',
			},
			
			// Reference Data Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['referenceData'],
					},
				},
				options: referenceDataOperations,
				default: 'listStocks',
			},
			
			// Fundamentals Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['fundamentals'],
					},
				},
				options: fundamentalsOperations,
				default: 'getProfile',
			},
			
			// Technical Indicators Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['technicalIndicators'],
					},
				},
				options: technicalIndicatorsOperations,
				default: 'sma',
			},
			
			// Market Intelligence Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['marketIntelligence'],
					},
				},
				options: marketIntelligenceOperations,
				default: 'getAnalystRatings',
			},
			
			// Advanced Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['advanced'],
					},
				},
				options: advancedOperations,
				default: 'getApiUsage',
			},
			
			// -----------------------------------------------------------------
			// PARAMETERS (spread from modular files)
			// -----------------------------------------------------------------
			
			// Core Data Parameters
			...allCoreDataParameters,
			
			// Reference Data Parameters
			...allReferenceDataParameters,
			
			// Fundamentals Parameters
			...allFundamentalsParameters,
			
			// Technical Indicators Parameters
			...allIndicatorParameters,
			
			// Market Intelligence Parameters
			...allMarketIntelligenceParameters,
			
			// Advanced Parameters
			...allAdvancedParameters,
		],
	};
	
	// =========================================================================
	// NO EXECUTE METHOD NEEDED!
	// =========================================================================
	// 
	// Because we're using declarative style with routing, n8n automatically:
	// 1. Reads the user's selections
	// 2. Builds the API URL from routing configuration
	// 3. Adds query parameters from field routing
	// 4. Makes the HTTP request using credentials
	// 5. Returns the response data
	//
	// This is the power of declarative nodes - less code, same functionality!
	// =========================================================================
}
