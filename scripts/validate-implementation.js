#!/usr/bin/env node
/**
 * =============================================================================
 * validate-implementation.js - Implementation Coverage Checker
 * =============================================================================
 *
 * PURPOSE:
 *   Analyzes the TwelveData.node.ts file to determine which API endpoints
 *   are implemented, compares against the OpenAPI specification, and generates
 *   a coverage report with suggestions for high-value endpoints to implement.
 *
 * USAGE:
 *   node scripts/validate-implementation.js [options]
 *
 * OPTIONS:
 *   --spec, -s <file>     Path to OpenAPI spec (default: openapi-spec.json)
 *   --node, -n <file>     Path to node file (default: nodes/TwelveData/TwelveData.node.ts)
 *   --output, -o <file>   Write report to file (default: stdout)
 *   --format, -f <type>   Output format: json, text, markdown (default: text)
 *   --help, -h            Show help message
 *
 * OUTPUT:
 *   - Coverage statistics (implemented vs available)
 *   - List of implemented operations
 *   - List of unimplemented endpoints by category
 *   - Warnings for deprecated/removed operations
 *   - Suggestions for high-value endpoints to implement
 *
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');

// =============================================================================
// CONFIGURATION
// =============================================================================

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DEFAULT_SPEC_PATH = path.join(PROJECT_ROOT, 'openapi-spec.json');
const DEFAULT_NODE_PATH = path.join(PROJECT_ROOT, 'nodes', 'TwelveData', 'TwelveData.node.ts');

// High-value endpoint categories (prioritized for implementation)
const HIGH_VALUE_CATEGORIES = [
    'Market Data',
    'Core Data',
    'Reference Data',
    'Fundamentals',
    'Technical Indicators'
];

// Common/popular endpoints that users frequently request
const POPULAR_ENDPOINTS = [
    '/price',
    '/quote',
    '/time_series',
    '/exchange_rate',
    '/stocks',
    '/forex_pairs',
    '/cryptocurrencies',
    '/profile',
    '/earnings',
    '/dividends',
    '/sma',
    '/ema',
    '/rsi',
    '/macd',
    '/bbands'
];

// =============================================================================
// PARSING FUNCTIONS
// =============================================================================

/**
 * Extract implemented operations from TwelveData.node.ts
 */
function parseNodeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const implemented = {
        resources: [],
        operations: [],
        endpoints: []
    };
    
    // Extract resource options
    const resourceRegex = /name:\s*['"]([^'"]+)['"],\s*\n\s*value:\s*['"]([^'"]+)['"],\s*\n\s*description:\s*['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = resourceRegex.exec(content)) !== null) {
        // Filter to only get resources (not operations)
        if (['coreData', 'fundamentals', 'referenceData', 'analysis'].includes(match[2])) {
            implemented.resources.push({
                name: match[1],
                value: match[2],
                description: match[3]
            });
        }
    }
    
    // Extract operations with their routing URLs
    const operationRegex = /{\s*name:\s*['"]([^'"]+)['"],\s*\n\s*value:\s*['"]([^'"]+)['"],\s*\n\s*action:\s*['"]([^'"]+)['"],\s*\n\s*description:\s*['"]([^'"]+)['"],\s*\n\s*routing:\s*{\s*\n\s*request:\s*{\s*\n\s*method:\s*['"]([^'"]+)['"],\s*\n\s*url:\s*['"]([^'"]+)['"]/g;
    
    while ((match = operationRegex.exec(content)) !== null) {
        implemented.operations.push({
            name: match[1],
            value: match[2],
            action: match[3],
            description: match[4],
            method: match[5],
            url: match[6]
        });
        
        implemented.endpoints.push({
            path: match[6],
            method: match[5].toUpperCase()
        });
    }
    
    // Also try a simpler pattern for operations that might have different formatting
    const simpleUrlRegex = /url:\s*['"](\/[^'"]+)['"]/g;
    const foundUrls = new Set(implemented.endpoints.map(e => e.path));
    
    while ((match = simpleUrlRegex.exec(content)) !== null) {
        if (!foundUrls.has(match[1])) {
            // Try to find the associated method
            const contextStart = Math.max(0, match.index - 200);
            const context = content.substring(contextStart, match.index + match[0].length);
            const methodMatch = context.match(/method:\s*['"]([^'"]+)['"]/);
            
            implemented.endpoints.push({
                path: match[1],
                method: methodMatch ? methodMatch[1].toUpperCase() : 'GET'
            });
            foundUrls.add(match[1]);
        }
    }
    
    return implemented;
}

/**
 * Parse OpenAPI specification to get all available endpoints
 */
function parseOpenAPISpec(filePath) {
    const spec = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const endpoints = [];
    const categories = {};
    
    const paths = spec.paths || {};
    
    for (const [path, methods] of Object.entries(paths)) {
        for (const [method, details] of Object.entries(methods)) {
            if (['get', 'post', 'put', 'patch', 'delete'].includes(method.toLowerCase())) {
                const endpoint = {
                    path,
                    method: method.toUpperCase(),
                    operationId: details.operationId || null,
                    summary: details.summary || null,
                    description: details.description || null,
                    tags: details.tags || [],
                    group: details['x-group'] || null,
                    deprecated: details.deprecated || false,
                    parameters: (details.parameters || []).length,
                    requiredParams: (details.parameters || []).filter(p => p.required).length
                };
                
                endpoints.push(endpoint);
                
                // Categorize by tag or group
                const category = endpoint.tags[0] || endpoint.group || 'Uncategorized';
                if (!categories[category]) {
                    categories[category] = [];
                }
                categories[category].push(endpoint);
            }
        }
    }
    
    return { endpoints, categories, spec };
}

// =============================================================================
// ANALYSIS FUNCTIONS
// =============================================================================

/**
 * Generate coverage report
 */
function generateCoverageReport(implemented, available) {
    const report = {
        timestamp: new Date().toISOString(),
        coverage: {
            implemented: implemented.endpoints.length,
            available: available.endpoints.length,
            percentage: 0
        },
        implementedOperations: implemented.operations,
        implementedEndpoints: [],
        unimplementedEndpoints: [],
        unimplementedByCategory: {},
        warnings: [],
        suggestions: []
    };
    
    // Calculate coverage percentage
    report.coverage.percentage = available.endpoints.length > 0
        ? ((implemented.endpoints.length / available.endpoints.length) * 100).toFixed(1)
        : 0;
    
    // Create a set of implemented paths for easy lookup
    const implementedPaths = new Set(implemented.endpoints.map(e => e.path.toLowerCase()));
    
    // Categorize endpoints
    for (const endpoint of available.endpoints) {
        const isImplemented = implementedPaths.has(endpoint.path.toLowerCase());
        
        if (isImplemented) {
            report.implementedEndpoints.push(endpoint);
            
            // Check for deprecated endpoints that are implemented
            if (endpoint.deprecated) {
                report.warnings.push({
                    type: 'deprecated_implemented',
                    endpoint: `${endpoint.method} ${endpoint.path}`,
                    message: `Implemented endpoint is deprecated: ${endpoint.path}`
                });
            }
        } else {
            report.unimplementedEndpoints.push(endpoint);
            
            // Categorize unimplemented
            const category = endpoint.tags[0] || endpoint.group || 'Uncategorized';
            if (!report.unimplementedByCategory[category]) {
                report.unimplementedByCategory[category] = [];
            }
            report.unimplementedByCategory[category].push(endpoint);
        }
    }
    
    // Check for implemented endpoints that don't exist in spec
    for (const endpoint of implemented.endpoints) {
        const existsInSpec = available.endpoints.some(
            e => e.path.toLowerCase() === endpoint.path.toLowerCase()
        );
        
        if (!existsInSpec) {
            report.warnings.push({
                type: 'not_in_spec',
                endpoint: `${endpoint.method} ${endpoint.path}`,
                message: `Implemented endpoint not found in OpenAPI spec: ${endpoint.path}`
            });
        }
    }
    
    // Generate suggestions for high-value endpoints
    report.suggestions = generateSuggestions(report.unimplementedEndpoints);
    
    return report;
}

/**
 * Generate suggestions for endpoints to implement
 */
function generateSuggestions(unimplementedEndpoints) {
    const suggestions = [];
    const scored = [];
    
    for (const endpoint of unimplementedEndpoints) {
        let score = 0;
        const reasons = [];
        
        // Score based on category
        const category = endpoint.tags[0] || endpoint.group || '';
        if (HIGH_VALUE_CATEGORIES.some(c => category.toLowerCase().includes(c.toLowerCase()))) {
            score += 30;
            reasons.push('High-value category');
        }
        
        // Score based on popularity
        if (POPULAR_ENDPOINTS.some(p => endpoint.path.toLowerCase().includes(p.toLowerCase()))) {
            score += 50;
            reasons.push('Popular endpoint');
        }
        
        // Score based on simplicity (fewer parameters = easier to implement)
        if (endpoint.parameters <= 3) {
            score += 20;
            reasons.push('Simple parameters');
        } else if (endpoint.parameters <= 6) {
            score += 10;
            reasons.push('Moderate complexity');
        }
        
        // Penalize deprecated endpoints
        if (endpoint.deprecated) {
            score -= 50;
            reasons.push('Deprecated');
        }
        
        // Bonus for endpoints with good documentation
        if (endpoint.summary && endpoint.description) {
            score += 10;
            reasons.push('Well documented');
        }
        
        scored.push({
            endpoint,
            score,
            reasons
        });
    }
    
    // Sort by score and take top suggestions
    scored.sort((a, b) => b.score - a.score);
    
    for (const item of scored.slice(0, 15)) {
        if (item.score > 0) {
            suggestions.push({
                path: item.endpoint.path,
                method: item.endpoint.method,
                summary: item.endpoint.summary,
                category: item.endpoint.tags[0] || item.endpoint.group || 'Uncategorized',
                score: item.score,
                reasons: item.reasons,
                parameters: item.endpoint.parameters,
                requiredParams: item.endpoint.requiredParams
            });
        }
    }
    
    return suggestions;
}

// =============================================================================
// OUTPUT FORMATTERS
// =============================================================================

/**
 * Format report as plain text
 */
function formatAsText(report) {
    const lines = [];
    
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('  Twelve Data n8n Connector - Implementation Coverage Report');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('');
    lines.push(`Generated: ${report.timestamp}`);
    lines.push('');
    
    // Coverage summary
    lines.push('COVERAGE SUMMARY');
    lines.push('───────────────────────────────────────────────────────────────');
    lines.push(`  Implemented:  ${report.coverage.implemented} endpoints`);
    lines.push(`  Available:    ${report.coverage.available} endpoints`);
    lines.push(`  Coverage:     ${report.coverage.percentage}%`);
    lines.push('');
    
    // Progress bar
    const barWidth = 40;
    const filled = Math.round((report.coverage.percentage / 100) * barWidth);
    const empty = barWidth - filled;
    const progressBar = '█'.repeat(filled) + '░'.repeat(empty);
    lines.push(`  [${progressBar}] ${report.coverage.percentage}%`);
    lines.push('');
    
    // Implemented operations
    lines.push('IMPLEMENTED OPERATIONS');
    lines.push('───────────────────────────────────────────────────────────────');
    for (const op of report.implementedOperations) {
        lines.push(`  ✓ ${op.name}`);
        lines.push(`    ${op.method} ${op.url}`);
        lines.push(`    ${op.description}`);
        lines.push('');
    }
    
    // Warnings
    if (report.warnings.length > 0) {
        lines.push('⚠️  WARNINGS');
        lines.push('───────────────────────────────────────────────────────────────');
        for (const warning of report.warnings) {
            lines.push(`  • ${warning.message}`);
        }
        lines.push('');
    }
    
    // Unimplemented by category
    lines.push('UNIMPLEMENTED ENDPOINTS BY CATEGORY');
    lines.push('───────────────────────────────────────────────────────────────');
    const sortedCategories = Object.entries(report.unimplementedByCategory)
        .sort((a, b) => b[1].length - a[1].length);
    
    for (const [category, endpoints] of sortedCategories) {
        lines.push(`  ${category}: ${endpoints.length} endpoint(s)`);
        for (const ep of endpoints.slice(0, 3)) {
            lines.push(`    • ${ep.method} ${ep.path}`);
            if (ep.summary) {
                lines.push(`      ${ep.summary.substring(0, 60)}${ep.summary.length > 60 ? '...' : ''}`);
            }
        }
        if (endpoints.length > 3) {
            lines.push(`    ... and ${endpoints.length - 3} more`);
        }
        lines.push('');
    }
    
    // Suggestions
    if (report.suggestions.length > 0) {
        lines.push('💡 SUGGESTED ENDPOINTS TO IMPLEMENT');
        lines.push('───────────────────────────────────────────────────────────────');
        lines.push('  (Ranked by value and ease of implementation)');
        lines.push('');
        
        for (let i = 0; i < report.suggestions.length; i++) {
            const sug = report.suggestions[i];
            lines.push(`  ${i + 1}. ${sug.method} ${sug.path}`);
            lines.push(`     Category: ${sug.category}`);
            if (sug.summary) {
                lines.push(`     ${sug.summary}`);
            }
            lines.push(`     Parameters: ${sug.parameters} (${sug.requiredParams} required)`);
            lines.push(`     Score: ${sug.score} - ${sug.reasons.join(', ')}`);
            lines.push('');
        }
    }
    
    // Next steps
    lines.push('NEXT STEPS');
    lines.push('───────────────────────────────────────────────────────────────');
    lines.push('  1. Review the suggested endpoints above');
    lines.push('  2. Check docs/ADDING_ENDPOINTS_QUICK_GUIDE.md for implementation guide');
    lines.push('  3. Add new operations to TwelveData.node.ts');
    lines.push('  4. Test with: npm run build && npm run lint');
    lines.push('');
    
    return lines.join('\n');
}

/**
 * Format report as markdown
 */
function formatAsMarkdown(report) {
    const lines = [];
    
    lines.push('# Twelve Data n8n Connector - Implementation Coverage Report');
    lines.push('');
    lines.push(`**Generated:** ${report.timestamp}`);
    lines.push('');
    
    // Coverage summary
    lines.push('## Coverage Summary');
    lines.push('');
    lines.push('| Metric | Value |');
    lines.push('|--------|-------|');
    lines.push(`| Implemented | ${report.coverage.implemented} endpoints |`);
    lines.push(`| Available | ${report.coverage.available} endpoints |`);
    lines.push(`| **Coverage** | **${report.coverage.percentage}%** |`);
    lines.push('');
    
    // Implemented operations
    lines.push('## Implemented Operations');
    lines.push('');
    lines.push('| Operation | Method | Endpoint | Description |');
    lines.push('|-----------|--------|----------|-------------|');
    for (const op of report.implementedOperations) {
        lines.push(`| ${op.name} | ${op.method} | \`${op.url}\` | ${op.description.substring(0, 50)}... |`);
    }
    lines.push('');
    
    // Warnings
    if (report.warnings.length > 0) {
        lines.push('## ⚠️ Warnings');
        lines.push('');
        for (const warning of report.warnings) {
            lines.push(`- **${warning.type}**: ${warning.message}`);
        }
        lines.push('');
    }
    
    // Suggestions
    if (report.suggestions.length > 0) {
        lines.push('## 💡 Suggested Endpoints to Implement');
        lines.push('');
        lines.push('> Ranked by value and ease of implementation');
        lines.push('');
        lines.push('| Rank | Endpoint | Category | Parameters | Score |');
        lines.push('|------|----------|----------|------------|-------|');
        for (let i = 0; i < report.suggestions.length; i++) {
            const sug = report.suggestions[i];
            lines.push(`| ${i + 1} | \`${sug.method} ${sug.path}\` | ${sug.category} | ${sug.parameters} | ${sug.score} |`);
        }
        lines.push('');
    }
    
    // Unimplemented by category
    lines.push('## Unimplemented Endpoints by Category');
    lines.push('');
    const sortedCategories = Object.entries(report.unimplementedByCategory)
        .sort((a, b) => b[1].length - a[1].length);
    
    for (const [category, endpoints] of sortedCategories) {
        lines.push(`### ${category} (${endpoints.length} endpoints)`);
        lines.push('');
        lines.push('<details>');
        lines.push('<summary>Click to expand</summary>');
        lines.push('');
        lines.push('| Method | Path | Summary |');
        lines.push('|--------|------|---------|');
        for (const ep of endpoints) {
            lines.push(`| ${ep.method} | \`${ep.path}\` | ${ep.summary || '-'} |`);
        }
        lines.push('');
        lines.push('</details>');
        lines.push('');
    }
    
    return lines.join('\n');
}

// =============================================================================
// CLI
// =============================================================================

function showHelp() {
    console.log(`
Implementation Coverage Checker for Twelve Data n8n Connector

USAGE:
    node validate-implementation.js [options]

OPTIONS:
    --spec, -s <file>     Path to OpenAPI spec (default: openapi-spec.json)
    --node, -n <file>     Path to node file (default: nodes/TwelveData/TwelveData.node.ts)
    --output, -o <file>   Write report to file (default: stdout)
    --format, -f <type>   Output format: json, text, markdown (default: text)
    --help, -h            Show this help message

EXAMPLES:
    # Basic usage
    node scripts/validate-implementation.js

    # Output as markdown
    node scripts/validate-implementation.js -f markdown

    # Save report to file
    node scripts/validate-implementation.js -o coverage-report.txt

    # Use custom spec file
    node scripts/validate-implementation.js -s openapi-latest.json

OUTPUT:
    - Coverage statistics (X out of Y endpoints implemented)
    - List of implemented operations with details
    - Warnings for deprecated or missing endpoints
    - Unimplemented endpoints grouped by category
    - Suggestions for high-value endpoints to implement next
`);
}

function parseArgs(args) {
    const options = {
        specPath: DEFAULT_SPEC_PATH,
        nodePath: DEFAULT_NODE_PATH,
        output: null,
        format: 'text'
    };
    
    let i = 0;
    while (i < args.length) {
        const arg = args[i];
        
        switch (arg) {
            case '-h':
            case '--help':
                showHelp();
                process.exit(0);
                break;
            case '-s':
            case '--spec':
                options.specPath = args[++i];
                break;
            case '-n':
            case '--node':
                options.nodePath = args[++i];
                break;
            case '-o':
            case '--output':
                options.output = args[++i];
                break;
            case '-f':
            case '--format':
                options.format = args[++i];
                if (!['json', 'text', 'markdown'].includes(options.format)) {
                    console.error(`Invalid format: ${options.format}`);
                    console.error('Valid formats: json, text, markdown');
                    process.exit(1);
                }
                break;
        }
        i++;
    }
    
    return options;
}

function main() {
    const args = process.argv.slice(2);
    const options = parseArgs(args);
    
    // Check files exist
    if (!fs.existsSync(options.specPath)) {
        console.error(`Error: OpenAPI spec not found: ${options.specPath}`);
        console.error('Run ./scripts/regenerate.sh first to download the spec.');
        process.exit(1);
    }
    
    if (!fs.existsSync(options.nodePath)) {
        console.error(`Error: Node file not found: ${options.nodePath}`);
        process.exit(1);
    }
    
    // Parse files
    console.error('Parsing node file...');
    const implemented = parseNodeFile(options.nodePath);
    
    console.error('Parsing OpenAPI spec...');
    const available = parseOpenAPISpec(options.specPath);
    
    // Generate report
    console.error('Generating coverage report...');
    const report = generateCoverageReport(implemented, available);
    
    // Format output
    let output;
    switch (options.format) {
        case 'markdown':
            output = formatAsMarkdown(report);
            break;
        case 'json':
            output = JSON.stringify(report, null, 2);
            break;
        case 'text':
        default:
            output = formatAsText(report);
            break;
    }
    
    // Write output
    if (options.output) {
        fs.writeFileSync(options.output, output);
        console.error(`Report written to: ${options.output}`);
    } else {
        console.log(output);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

// Export for programmatic use
module.exports = {
    parseNodeFile,
    parseOpenAPISpec,
    generateCoverageReport,
    generateSuggestions
};

