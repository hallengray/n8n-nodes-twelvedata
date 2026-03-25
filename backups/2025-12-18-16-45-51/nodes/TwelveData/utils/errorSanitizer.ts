/**
 * Error Sanitization Utility
 * 
 * This module provides functions to sanitize error messages and prevent
 * accidental credential leakage in logs or error responses.
 * 
 * SECURITY: Always use this when handling errors that might contain
 * API keys, tokens, or other sensitive information.
 */

/**
 * Sanitizes error messages to prevent accidental credential leakage
 * Removes API keys and Authorization headers from error strings
 * 
 * @param error - The error object or message to sanitize
 * @returns Sanitized error message with credentials redacted
 * 
 * @example
 * ```typescript
 * try {
 *   // API call
 * } catch (error) {
 *   const safeMessage = sanitizeError(error);
 *   throw new Error(safeMessage);
 * }
 * ```
 */
export function sanitizeError(error: unknown): string {
	const errorMessage = (error as Error).message || String(error);
	
	// Remove API keys if accidentally included
	const sanitized = errorMessage.replace(
		/apikey[=:]?\s*[a-zA-Z0-9_-]+/gi,
		'apikey=[REDACTED]'
	);
	
	// Remove Authorization headers
	const cleanError = sanitized.replace(
		/Authorization[=:]?\s*[a-zA-Z0-9_-]+/gi,
		'Authorization: [REDACTED]'
	);
	
	return cleanError;
}

/**
 * Sanitizes an entire error object, removing sensitive data from all properties
 * 
 * @param error - The error object to sanitize
 * @returns Sanitized error object safe for logging
 */
export function sanitizeErrorObject(error: unknown): Record<string, unknown> {
	if (!error || typeof error !== 'object') {
		return { message: sanitizeError(error) };
	}

	const sanitized: Record<string, unknown> = {};
	const errorObj = error as Record<string, unknown>;
	
	for (const key in errorObj) {
		if (Object.prototype.hasOwnProperty.call(errorObj, key)) {
			const value = errorObj[key];
			
			if (typeof value === 'string') {
				sanitized[key] = sanitizeError(value);
			} else if (typeof value === 'object' && value !== null) {
				sanitized[key] = sanitizeErrorObject(value);
			} else {
				sanitized[key] = value;
			}
		}
	}
	
	return sanitized;
}

