import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TwelveDataApi implements ICredentialType {
	name = 'twelveDataApi';
	displayName = 'Twelve Data API';
	documentationUrl = 'https://twelvedata.com/docs';
	// Icon displayed in n8n UI - financial chart representing market data
	// Supports both light and dark themes
	icon = { light: 'file:../icons/twelvedata.svg', dark: 'file:../icons/twelvedata.dark.svg' } as const;
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Twelve Data API key. Get it from <a href="https://twelvedata.com/account/api-keys" target="_blank">your dashboard</a>.',
		},
		{
			displayName: 'Authentication Method',
			name: 'authMethod',
			type: 'options',
			options: [
				{
					name: 'Header (Recommended)',
					value: 'header',
					description: 'Send API key in Authorization header',
				},
				{
					name: 'Query Parameter',
					value: 'queryString',
					description: 'Send API key as URL query parameter',
				},
			],
			default: 'header',
			description: 'Choose how to send the API key. Header method is recommended for security.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			// Twelve Data API requires 'apikey' as a query parameter
			// Always send it as query parameter to ensure it works
			qs: {
				apikey: '={{$credentials.apiKey}}',
			},
			// Optionally also send in Authorization header if user selected header method
			// (Some users prefer header method for security, but query param is still required)
			headers: {
				Authorization: '={{$credentials.authMethod === "header" ? "apikey " + $credentials.apiKey : undefined}}',
			},
		},
	};

	/**
	 * Test function that validates the API key by making a real API request
	 * This runs when the user clicks "Test" button in n8n credential settings
	 * 
	 * How it works:
	 * 1. Makes a GET request to /stocks endpoint (lightweight, doesn't require parameters)
	 * 2. Uses the authentication method (header or query string) configured above
	 * 3. If successful (HTTP 200), credentials are valid
	 * 4. If failed (401, 403, etc.), shows user-friendly error message
	 * 
	 * The authenticate property automatically adds the API key based on authMethod,
	 * so we don't need to manually add it here.
	 */
	test: ICredentialTestRequest = {
		request: {
			// Base URL for Twelve Data API
			baseURL: 'https://api.twelvedata.com',
			// Test endpoint - /stocks is a simple endpoint that requires authentication
			// but doesn't need any parameters, making it perfect for testing
			url: '/stocks',
			// The authenticate property above will automatically add:
			// - Authorization header (if authMethod is 'header'), OR
			// - apikey query parameter (if authMethod is 'queryString')
		},
	};
}

