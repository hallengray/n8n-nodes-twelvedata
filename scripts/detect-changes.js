#!/usr/bin/env node
/**
 * =============================================================================
 * detect-changes.js - OpenAPI Specification Change Detector
 * =============================================================================
 *
 * PURPOSE:
 *   Performs deep comparison of two OpenAPI specification files and generates
 *   a detailed report of all changes, categorized by type and severity.
 *
 * USAGE:
 *   node scripts/detect-changes.js <old-spec.json> <new-spec.json> [options]
 *
 * OPTIONS:
 *   --output, -o <file>   Write report to file (default: stdout)
 *   --format, -f <type>   Output format: json, text, markdown (default: json)
 *   --help, -h            Show help message
 *
 * OUTPUT:
 *   JSON report containing:
 *   - Summary of changes
 *   - New endpoints
 *   - Removed endpoints
 *   - Modified endpoints (parameters, responses, etc.)
 *   - Breaking changes
 *   - Deprecated endpoints
 *
 * =============================================================================
 */

const fs = require('fs');
const path = require('path');

// =============================================================================
// CONFIGURATION
// =============================================================================

const BREAKING_CHANGE_TYPES = [
    'endpoint_removed',
    'required_parameter_added',
    'parameter_removed',
    'parameter_type_changed',
    'response_schema_changed',
    'authentication_changed',
    'method_changed'
];

const NON_BREAKING_CHANGE_TYPES = [
    'endpoint_added',
    'optional_parameter_added',
    'description_changed',
    'example_changed',
    'deprecated_added'
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Deep equality check for objects
 */
function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (obj1 == null || obj2 == null) return false;
    if (typeof obj1 !== typeof obj2) return false;
    
    if (typeof obj1 !== 'object') return obj1 === obj2;
    
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) return false;
    
    for (const key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!deepEqual(obj1[key], obj2[key])) return false;
    }
    
    return true;
}

/**
 * Get all paths (endpoints) from an OpenAPI spec
 */
function getEndpoints(spec) {
    const endpoints = [];
    const paths = spec.paths || {};
    
    for (const [path, methods] of Object.entries(paths)) {
        for (const [method, details] of Object.entries(methods)) {
            // Skip non-method properties like 'parameters', 'summary', etc.
            if (['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].includes(method.toLowerCase())) {
                endpoints.push({
                    path,
                    method: method.toUpperCase(),
                    operationId: details.operationId || null,
                    summary: details.summary || null,
                    description: details.description || null,
                    tags: details.tags || [],
                    parameters: details.parameters || [],
                    requestBody: details.requestBody || null,
                    responses: details.responses || {},
                    security: details.security || null,
                    deprecated: details.deprecated || false,
                    group: details['x-group'] || null
                });
            }
        }
    }
    
    return endpoints;
}

/**
 * Create a unique key for an endpoint
 */
function endpointKey(endpoint) {
    return `${endpoint.method}:${endpoint.path}`;
}

/**
 * Compare parameters between two endpoints
 */
function compareParameters(oldParams, newParams) {
    const changes = [];
    const oldParamMap = new Map(oldParams.map(p => [p.name, p]));
    const newParamMap = new Map(newParams.map(p => [p.name, p]));
    
    // Check for removed parameters
    for (const [name, oldParam] of oldParamMap) {
        if (!newParamMap.has(name)) {
            changes.push({
                type: 'parameter_removed',
                breaking: true,
                parameter: name,
                description: `Parameter '${name}' was removed`
            });
        }
    }
    
    // Check for added parameters
    for (const [name, newParam] of newParamMap) {
        if (!oldParamMap.has(name)) {
            const isBreaking = newParam.required === true;
            changes.push({
                type: isBreaking ? 'required_parameter_added' : 'optional_parameter_added',
                breaking: isBreaking,
                parameter: name,
                required: newParam.required || false,
                description: `Parameter '${name}' was added${isBreaking ? ' (REQUIRED - breaking change)' : ''}`
            });
        }
    }
    
    // Check for modified parameters
    for (const [name, oldParam] of oldParamMap) {
        const newParam = newParamMap.get(name);
        if (newParam) {
            // Check type changes
            const oldType = oldParam.schema?.type || oldParam.type;
            const newType = newParam.schema?.type || newParam.type;
            
            if (oldType !== newType) {
                changes.push({
                    type: 'parameter_type_changed',
                    breaking: true,
                    parameter: name,
                    oldType,
                    newType,
                    description: `Parameter '${name}' type changed from '${oldType}' to '${newType}'`
                });
            }
            
            // Check required status changes
            if (oldParam.required !== newParam.required) {
                const becameRequired = newParam.required === true;
                changes.push({
                    type: 'parameter_required_changed',
                    breaking: becameRequired,
                    parameter: name,
                    wasRequired: oldParam.required,
                    isRequired: newParam.required,
                    description: `Parameter '${name}' ${becameRequired ? 'is now required' : 'is no longer required'}`
                });
            }
            
            // Check enum changes
            const oldEnum = oldParam.schema?.enum || oldParam.enum || [];
            const newEnum = newParam.schema?.enum || newParam.enum || [];
            
            if (!deepEqual(oldEnum, newEnum)) {
                const removedValues = oldEnum.filter(v => !newEnum.includes(v));
                const addedValues = newEnum.filter(v => !oldEnum.includes(v));
                
                if (removedValues.length > 0) {
                    changes.push({
                        type: 'enum_values_removed',
                        breaking: true,
                        parameter: name,
                        removedValues,
                        description: `Parameter '${name}' enum values removed: ${removedValues.join(', ')}`
                    });
                }
                
                if (addedValues.length > 0) {
                    changes.push({
                        type: 'enum_values_added',
                        breaking: false,
                        parameter: name,
                        addedValues,
                        description: `Parameter '${name}' enum values added: ${addedValues.join(', ')}`
                    });
                }
            }
        }
    }
    
    return changes;
}

/**
 * Compare security requirements
 */
function compareSecurity(oldSecurity, newSecurity) {
    const changes = [];
    
    // Normalize security arrays
    const oldSecStr = JSON.stringify(oldSecurity || []);
    const newSecStr = JSON.stringify(newSecurity || []);
    
    if (oldSecStr !== newSecStr) {
        changes.push({
            type: 'authentication_changed',
            breaking: true,
            oldSecurity: oldSecurity,
            newSecurity: newSecurity,
            description: 'Authentication requirements changed'
        });
    }
    
    return changes;
}

// =============================================================================
// MAIN COMPARISON LOGIC
// =============================================================================

/**
 * Compare two OpenAPI specifications
 */
function compareSpecs(oldSpec, newSpec) {
    const report = {
        timestamp: new Date().toISOString(),
        summary: {
            newEndpoints: 0,
            removedEndpoints: 0,
            modifiedEndpoints: 0,
            breakingChanges: 0,
            nonBreakingChanges: 0,
            deprecatedEndpoints: 0
        },
        newEndpoints: [],
        removedEndpoints: [],
        modifiedEndpoints: [],
        breakingChanges: [],
        nonBreakingChanges: [],
        deprecatedEndpoints: [],
        newEndpointsByCategory: {},
        specVersions: {
            old: oldSpec.info?.version || 'unknown',
            new: newSpec.info?.version || 'unknown'
        }
    };
    
    // Get all endpoints from both specs
    const oldEndpoints = getEndpoints(oldSpec);
    const newEndpoints = getEndpoints(newSpec);
    
    // Create maps for easy lookup
    const oldEndpointMap = new Map(oldEndpoints.map(e => [endpointKey(e), e]));
    const newEndpointMap = new Map(newEndpoints.map(e => [endpointKey(e), e]));
    
    // Find new endpoints
    for (const [key, endpoint] of newEndpointMap) {
        if (!oldEndpointMap.has(key)) {
            report.newEndpoints.push({
                path: endpoint.path,
                method: endpoint.method,
                operationId: endpoint.operationId,
                summary: endpoint.summary,
                tags: endpoint.tags,
                group: endpoint.group
            });
            
            // Categorize by tag/group
            const category = endpoint.tags[0] || endpoint.group || 'Uncategorized';
            if (!report.newEndpointsByCategory[category]) {
                report.newEndpointsByCategory[category] = [];
            }
            report.newEndpointsByCategory[category].push({
                path: endpoint.path,
                method: endpoint.method,
                summary: endpoint.summary
            });
            
            report.nonBreakingChanges.push({
                type: 'endpoint_added',
                breaking: false,
                endpoint: key,
                description: `New endpoint: ${endpoint.method} ${endpoint.path}`
            });
        }
    }
    
    // Find removed endpoints
    for (const [key, endpoint] of oldEndpointMap) {
        if (!newEndpointMap.has(key)) {
            report.removedEndpoints.push({
                path: endpoint.path,
                method: endpoint.method,
                operationId: endpoint.operationId,
                summary: endpoint.summary
            });
            
            report.breakingChanges.push({
                type: 'endpoint_removed',
                breaking: true,
                endpoint: key,
                description: `Endpoint removed: ${endpoint.method} ${endpoint.path}`
            });
        }
    }
    
    // Find modified endpoints
    for (const [key, newEndpoint] of newEndpointMap) {
        const oldEndpoint = oldEndpointMap.get(key);
        if (oldEndpoint) {
            const endpointChanges = [];
            
            // Compare parameters
            const paramChanges = compareParameters(
                oldEndpoint.parameters,
                newEndpoint.parameters
            );
            endpointChanges.push(...paramChanges);
            
            // Compare security
            const securityChanges = compareSecurity(
                oldEndpoint.security,
                newEndpoint.security
            );
            endpointChanges.push(...securityChanges);
            
            // Check for deprecation
            if (!oldEndpoint.deprecated && newEndpoint.deprecated) {
                endpointChanges.push({
                    type: 'deprecated_added',
                    breaking: false,
                    description: 'Endpoint marked as deprecated'
                });
                report.deprecatedEndpoints.push({
                    path: newEndpoint.path,
                    method: newEndpoint.method,
                    summary: newEndpoint.summary
                });
            }
            
            // Check description changes
            if (oldEndpoint.description !== newEndpoint.description) {
                endpointChanges.push({
                    type: 'description_changed',
                    breaking: false,
                    description: 'Description updated'
                });
            }
            
            // If there are changes, add to modified endpoints
            if (endpointChanges.length > 0) {
                report.modifiedEndpoints.push({
                    path: newEndpoint.path,
                    method: newEndpoint.method,
                    operationId: newEndpoint.operationId,
                    changes: endpointChanges
                });
                
                // Categorize changes
                for (const change of endpointChanges) {
                    if (change.breaking) {
                        report.breakingChanges.push({
                            ...change,
                            endpoint: key
                        });
                    } else {
                        report.nonBreakingChanges.push({
                            ...change,
                            endpoint: key
                        });
                    }
                }
            }
        }
    }
    
    // Update summary
    report.summary.newEndpoints = report.newEndpoints.length;
    report.summary.removedEndpoints = report.removedEndpoints.length;
    report.summary.modifiedEndpoints = report.modifiedEndpoints.length;
    report.summary.breakingChanges = report.breakingChanges.length;
    report.summary.nonBreakingChanges = report.nonBreakingChanges.length;
    report.summary.deprecatedEndpoints = report.deprecatedEndpoints.length;
    
    return report;
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
    lines.push('  OpenAPI Specification Change Report');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('');
    lines.push(`Generated: ${report.timestamp}`);
    lines.push(`Spec versions: ${report.specVersions.old} → ${report.specVersions.new}`);
    lines.push('');
    
    // Summary
    lines.push('SUMMARY');
    lines.push('───────────────────────────────────────────────────────────────');
    lines.push(`  New endpoints:        ${report.summary.newEndpoints}`);
    lines.push(`  Removed endpoints:    ${report.summary.removedEndpoints}`);
    lines.push(`  Modified endpoints:   ${report.summary.modifiedEndpoints}`);
    lines.push(`  Breaking changes:     ${report.summary.breakingChanges}`);
    lines.push(`  Non-breaking changes: ${report.summary.nonBreakingChanges}`);
    lines.push(`  Deprecated endpoints: ${report.summary.deprecatedEndpoints}`);
    lines.push('');
    
    // Breaking changes
    if (report.breakingChanges.length > 0) {
        lines.push('⚠️  BREAKING CHANGES');
        lines.push('───────────────────────────────────────────────────────────────');
        for (const change of report.breakingChanges) {
            lines.push(`  • ${change.description}`);
            if (change.endpoint) {
                lines.push(`    Endpoint: ${change.endpoint}`);
            }
        }
        lines.push('');
    }
    
    // New endpoints
    if (report.newEndpoints.length > 0) {
        lines.push('✨ NEW ENDPOINTS');
        lines.push('───────────────────────────────────────────────────────────────');
        for (const ep of report.newEndpoints) {
            lines.push(`  • ${ep.method} ${ep.path}`);
            if (ep.summary) {
                lines.push(`    ${ep.summary}`);
            }
        }
        lines.push('');
    }
    
    // Removed endpoints
    if (report.removedEndpoints.length > 0) {
        lines.push('🗑️  REMOVED ENDPOINTS');
        lines.push('───────────────────────────────────────────────────────────────');
        for (const ep of report.removedEndpoints) {
            lines.push(`  • ${ep.method} ${ep.path}`);
            if (ep.summary) {
                lines.push(`    ${ep.summary}`);
            }
        }
        lines.push('');
    }
    
    // Modified endpoints
    if (report.modifiedEndpoints.length > 0) {
        lines.push('📝 MODIFIED ENDPOINTS');
        lines.push('───────────────────────────────────────────────────────────────');
        for (const ep of report.modifiedEndpoints) {
            lines.push(`  • ${ep.method} ${ep.path}`);
            for (const change of ep.changes) {
                const marker = change.breaking ? '⚠️' : '  ';
                lines.push(`    ${marker} ${change.description}`);
            }
        }
        lines.push('');
    }
    
    // New endpoints by category
    if (Object.keys(report.newEndpointsByCategory).length > 0) {
        lines.push('📁 NEW ENDPOINTS BY CATEGORY');
        lines.push('───────────────────────────────────────────────────────────────');
        for (const [category, endpoints] of Object.entries(report.newEndpointsByCategory)) {
            lines.push(`  ${category}: ${endpoints.length} new endpoint(s)`);
            for (const ep of endpoints.slice(0, 5)) {
                lines.push(`    • ${ep.method} ${ep.path}`);
            }
            if (endpoints.length > 5) {
                lines.push(`    ... and ${endpoints.length - 5} more`);
            }
        }
        lines.push('');
    }
    
    return lines.join('\n');
}

/**
 * Format report as markdown
 */
function formatAsMarkdown(report) {
    const lines = [];
    
    lines.push('# OpenAPI Specification Change Report');
    lines.push('');
    lines.push(`**Generated:** ${report.timestamp}`);
    lines.push(`**Spec versions:** ${report.specVersions.old} → ${report.specVersions.new}`);
    lines.push('');
    
    // Summary
    lines.push('## Summary');
    lines.push('');
    lines.push('| Metric | Count |');
    lines.push('|--------|-------|');
    lines.push(`| New endpoints | ${report.summary.newEndpoints} |`);
    lines.push(`| Removed endpoints | ${report.summary.removedEndpoints} |`);
    lines.push(`| Modified endpoints | ${report.summary.modifiedEndpoints} |`);
    lines.push(`| Breaking changes | ${report.summary.breakingChanges} |`);
    lines.push(`| Non-breaking changes | ${report.summary.nonBreakingChanges} |`);
    lines.push(`| Deprecated endpoints | ${report.summary.deprecatedEndpoints} |`);
    lines.push('');
    
    // Breaking changes
    if (report.breakingChanges.length > 0) {
        lines.push('## ⚠️ Breaking Changes');
        lines.push('');
        lines.push('> **Action Required:** These changes may break existing implementations.');
        lines.push('');
        for (const change of report.breakingChanges) {
            lines.push(`- **${change.type}**: ${change.description}`);
        }
        lines.push('');
    }
    
    // New endpoints
    if (report.newEndpoints.length > 0) {
        lines.push('## ✨ New Endpoints');
        lines.push('');
        lines.push('| Method | Path | Summary |');
        lines.push('|--------|------|---------|');
        for (const ep of report.newEndpoints) {
            lines.push(`| ${ep.method} | \`${ep.path}\` | ${ep.summary || '-'} |`);
        }
        lines.push('');
    }
    
    // Removed endpoints
    if (report.removedEndpoints.length > 0) {
        lines.push('## 🗑️ Removed Endpoints');
        lines.push('');
        lines.push('| Method | Path | Summary |');
        lines.push('|--------|------|---------|');
        for (const ep of report.removedEndpoints) {
            lines.push(`| ${ep.method} | \`${ep.path}\` | ${ep.summary || '-'} |`);
        }
        lines.push('');
    }
    
    // Modified endpoints
    if (report.modifiedEndpoints.length > 0) {
        lines.push('## 📝 Modified Endpoints');
        lines.push('');
        for (const ep of report.modifiedEndpoints) {
            lines.push(`### ${ep.method} \`${ep.path}\``);
            lines.push('');
            for (const change of ep.changes) {
                const marker = change.breaking ? '⚠️' : '✓';
                lines.push(`- ${marker} ${change.description}`);
            }
            lines.push('');
        }
    }
    
    return lines.join('\n');
}

// =============================================================================
// CLI
// =============================================================================

function showHelp() {
    console.log(`
OpenAPI Specification Change Detector

USAGE:
    node detect-changes.js <old-spec.json> <new-spec.json> [options]

ARGUMENTS:
    old-spec.json    Path to the previous OpenAPI specification
    new-spec.json    Path to the new OpenAPI specification

OPTIONS:
    --output, -o <file>   Write report to file (default: stdout)
    --format, -f <type>   Output format: json, text, markdown (default: json)
    --help, -h            Show this help message

EXAMPLES:
    # Compare specs and output JSON
    node detect-changes.js old.json new.json

    # Output as markdown to file
    node detect-changes.js old.json new.json -f markdown -o report.md

    # Output as plain text
    node detect-changes.js old.json new.json -f text

OUTPUT:
    The report includes:
    - Summary of all changes
    - List of new endpoints
    - List of removed endpoints
    - List of modified endpoints with details
    - Breaking changes (highlighted)
    - Non-breaking changes
    - Deprecated endpoints
    - New endpoints categorized by tag/group
`);
}

function parseArgs(args) {
    const options = {
        oldSpec: null,
        newSpec: null,
        output: null,
        format: 'json'
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
            default:
                if (!arg.startsWith('-')) {
                    if (!options.oldSpec) {
                        options.oldSpec = arg;
                    } else if (!options.newSpec) {
                        options.newSpec = arg;
                    }
                }
                break;
        }
        i++;
    }
    
    return options;
}

function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        showHelp();
        process.exit(1);
    }
    
    const options = parseArgs(args);
    
    // Validate inputs
    if (!options.oldSpec || !options.newSpec) {
        console.error('Error: Both old and new spec files are required');
        console.error('Usage: node detect-changes.js <old-spec.json> <new-spec.json>');
        process.exit(1);
    }
    
    // Check files exist
    if (!fs.existsSync(options.oldSpec)) {
        console.error(`Error: Old spec file not found: ${options.oldSpec}`);
        process.exit(1);
    }
    
    if (!fs.existsSync(options.newSpec)) {
        console.error(`Error: New spec file not found: ${options.newSpec}`);
        process.exit(1);
    }
    
    // Load specs
    let oldSpec, newSpec;
    try {
        oldSpec = JSON.parse(fs.readFileSync(options.oldSpec, 'utf8'));
    } catch (e) {
        console.error(`Error parsing old spec: ${e.message}`);
        process.exit(1);
    }
    
    try {
        newSpec = JSON.parse(fs.readFileSync(options.newSpec, 'utf8'));
    } catch (e) {
        console.error(`Error parsing new spec: ${e.message}`);
        process.exit(1);
    }
    
    // Compare specs
    const report = compareSpecs(oldSpec, newSpec);
    
    // Format output
    let output;
    switch (options.format) {
        case 'text':
            output = formatAsText(report);
            break;
        case 'markdown':
            output = formatAsMarkdown(report);
            break;
        case 'json':
        default:
            output = JSON.stringify(report, null, 2);
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
    compareSpecs,
    getEndpoints,
    compareParameters,
    formatAsText,
    formatAsMarkdown
};





