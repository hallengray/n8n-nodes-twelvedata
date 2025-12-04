# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in the Twelve Data n8n node, please report it by emailing:

**Email:** hallengray@gmail.com

Please **DO NOT** create a public GitHub issue for security vulnerabilities.

### What to include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

### Response time:

- Initial response: Within 48 hours
- Security patch: Within 7 days for critical issues

## Security Best Practices for Users

### 1. Protect Your API Key

- Never share your Twelve Data API key
- Rotate keys regularly (every 6-12 months)
- Use separate keys for development vs production

### 2. Use n8n's Credential Manager

- Always store API keys in n8n's credential system
- Never hardcode credentials in workflows
- Don't share workflows with embedded credentials

### 3. Limit API Key Permissions

- Use Twelve Data's API key restrictions if available
- Limit to specific IP addresses when possible
- Use read-only keys when write access isn't needed

### 4. Keep Software Updated

- Update to the latest version of this node
- Keep n8n updated to the latest version
- Monitor for security advisories

### 5. Secure Your n8n Instance

- Use HTTPS for all connections
- Enable authentication on n8n
- Set a strong `N8N_ENCRYPTION_KEY`
- Regular backups of encrypted credentials

## Known Security Considerations

### Credential Encryption

This node stores API keys using n8n's built-in credential encryption. Security depends on:

1. **Your n8n instance encryption key** (`N8N_ENCRYPTION_KEY`)
2. **Physical/network security** of your n8n server
3. **Access control** to your n8n instance

### Data in Transit

All API requests to Twelve Data use HTTPS encryption by default.

### No Runtime Dependencies

This node has zero runtime dependencies, reducing the attack surface for supply chain vulnerabilities.

## Compliance

This node is compliant with:
- n8n verified community node security requirements
- npm package security best practices
- OWASP secure coding guidelines

## Security Audits

- Last security review: December 2024
- No known vulnerabilities as of v0.1.0

## Contact

For non-security issues, use GitHub Issues:
https://github.com/hallengray/n8n-nodes-twelvedata/issues

For security concerns: hallengray@gmail.com

