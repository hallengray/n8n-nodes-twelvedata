import {
	IAuthenticate,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestOptions,
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
			description: 'Your Twelve Data API key. Get it from <a href="https://twelvedata.com/account/api-keys" target="_blank">your dashboard</a>. <strong>Security:</strong> Never share this key or commit it to version control. Rotate regularly for best security.',
		},
		{
			displayName: 'Authentication Method',
			name: 'authMethod',
			type: 'options',
			options: [
				{
					name: 'Header (Recommended)',
					value: 'header',
					description: 'Sends API key in Authorization header (more secure, not visible in URL logs)',
				},
				{
					name: 'Query Parameter',
					value: 'queryString',
					description: 'Sends API key as query parameter in URL (simpler for testing)',
				},
			],
			default: 'header',
			required: true,
			description: 'Choose how to send the API key to Twelve Data. Header method is recommended for production use.',
		},
	];

	/**
	 * Authentication configuration that respects the selected authMethod
	 * 
	 * Behavior:
	 * - When authMethod === 'header': Adds Authorization header with format "apikey YOUR_API_KEY"
	 * - When authMethod === 'queryString': Adds apikey query parameter to URL
	 * 
	 * Only one method is used at a time based on the user's selection.
	 * The API key is never sent via both methods simultaneously.
	 * 
	 * Validation:
	 * - Throws an error if apiKey is missing or empty
	 * - Ensures credentials are properly configured before making API requests
	 * 
	 * Implementation:
	 * - Uses function-based authentication to dynamically inject actual credential values
	 * - Receives decrypted credentials and modifies request options accordingly
	 * - Returns modified request options with authentication added
	 */
	authenticate: IAuthenticate = async (
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> => {
		// Validate that API key exists
		if (!credentials.apiKey || typeof credentials.apiKey !== 'string') {
			throw new Error(
				'API Key is required. Please configure your Twelve Data API credentials with a valid API key.',
			);
		}

		// Get the authentication method (default to 'header' if not specified)
		const authMethod = (credentials.authMethod as string) || 'header';

		// Clone request options to avoid mutating the original
		const modifiedOptions = { ...requestOptions };

		if (authMethod === 'queryString') {
			// Query parameter method: add apikey to URL query string
			modifiedOptions.qs = {
				...modifiedOptions.qs,
				apikey: credentials.apiKey,
			};
		} else {
			// Header method (default): add Authorization header
			modifiedOptions.headers = {
				...modifiedOptions.headers,
				Authorization: `apikey ${credentials.apiKey}`,
			};
		}

		return modifiedOptions;
	};

	/**
	 * Test function that validates the API key by making a real API request
	 * This runs when the user clicks "Test" button in n8n credential settings
	 * 
	 * How it works:
	 * 1. Makes a GET request to /stocks endpoint (lightweight, doesn't require parameters)
	 * 2. The authenticate property automatically adds authentication based on selected authMethod:
	 *    - Header method: Adds Authorization header with "apikey YOUR_KEY"
	 *    - Query parameter method: Adds apikey query parameter to URL
	 * 3. If successful (HTTP 200), credentials are valid
	 * 4. If failed (401, 403, etc.), shows user-friendly error message
	 */
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.twelvedata.com',
			url: '/stocks',
		},
	};
}

