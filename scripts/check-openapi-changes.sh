#!/usr/bin/env bash
# =============================================================================
# check-openapi-changes.sh - Lightweight OpenAPI Change Detector
# =============================================================================
#
# PURPOSE:
#   A lightweight script that quickly checks if the Twelve Data OpenAPI
#   specification has changed. Designed for automation and cron jobs.
#
# USAGE:
#   ./scripts/check-openapi-changes.sh [OPTIONS]
#
# OPTIONS:
#   -h, --help      Show this help message
#   -q, --quiet     Suppress all output (exit code only)
#   -v, --verbose   Show detailed output
#
# EXIT CODES:
#   0 - No changes detected (spec is up to date)
#   1 - Changes detected (run regenerate.sh)
#   2 - Error occurred (network, file, etc.)
#
# CRON EXAMPLE:
#   # Check every Monday at 9 AM
#   0 9 * * 1 /path/to/check-openapi-changes.sh || echo "Changes detected!"
#
# =============================================================================

set -euo pipefail

# =============================================================================
# CONFIGURATION
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

OPENAPI_URL="https://api.twelvedata.com/doc/swagger/openapi.json"
CURRENT_SPEC="$PROJECT_ROOT/openapi-spec.json"

# Options
QUIET=false
VERBOSE=false

# =============================================================================
# COLORS (disabled in quiet mode)
# =============================================================================

setup_colors() {
    if [[ "$QUIET" == "true" ]] || [[ ! -t 1 ]]; then
        RED=""
        GREEN=""
        YELLOW=""
        BLUE=""
        RESET=""
    elif command -v tput &> /dev/null; then
        RED=$(tput setaf 1)
        GREEN=$(tput setaf 2)
        YELLOW=$(tput setaf 3)
        BLUE=$(tput setaf 4)
        RESET=$(tput sgr0)
    else
        RED=""
        GREEN=""
        YELLOW=""
        BLUE=""
        RESET=""
    fi
}

# =============================================================================
# OUTPUT FUNCTIONS
# =============================================================================

output() {
    if [[ "$QUIET" != "true" ]]; then
        echo "$@"
    fi
}

output_verbose() {
    if [[ "$VERBOSE" == "true" ]] && [[ "$QUIET" != "true" ]]; then
        echo "$@"
    fi
}

output_error() {
    if [[ "$QUIET" != "true" ]]; then
        echo "$@" >&2
    fi
}

# =============================================================================
# HELP FUNCTION
# =============================================================================

show_help() {
    cat << EOF
Twelve Data OpenAPI Change Detector

USAGE:
    ./scripts/check-openapi-changes.sh [OPTIONS]

DESCRIPTION:
    Quickly checks if the Twelve Data OpenAPI specification has changed
    by comparing SHA256 hashes. Designed for automation and cron jobs.

OPTIONS:
    -h, --help      Show this help message
    -q, --quiet     Suppress all output (use exit code only)
    -v, --verbose   Show detailed output including hashes

EXIT CODES:
    0 - No changes detected (spec is up to date)
    1 - Changes detected (you should run regenerate.sh)
    2 - Error occurred (network issue, missing file, etc.)

EXAMPLES:
    # Basic check
    ./scripts/check-openapi-changes.sh

    # Quiet mode for scripts
    if ./scripts/check-openapi-changes.sh --quiet; then
        echo "No changes"
    else
        echo "Changes detected!"
    fi

    # Verbose mode for debugging
    ./scripts/check-openapi-changes.sh --verbose

CRON SETUP:
    # Check every Monday at 9 AM
    0 9 * * 1 /path/to/check-openapi-changes.sh

    # Check daily and send email if changes
    0 9 * * * /path/to/check-openapi-changes.sh || mail -s "API Changed" you@email.com

EOF
}

# =============================================================================
# HASH FUNCTION
# =============================================================================

get_hash() {
    local input="$1"
    
    if command -v sha256sum &> /dev/null; then
        echo "$input" | sha256sum | cut -d' ' -f1
    elif command -v shasum &> /dev/null; then
        echo "$input" | shasum -a 256 | cut -d' ' -f1
    else
        # Fallback for Windows Git Bash
        echo "$input" | openssl sha256 | cut -d' ' -f2
    fi
}

get_file_hash() {
    local file="$1"
    
    if command -v sha256sum &> /dev/null; then
        sha256sum "$file" | cut -d' ' -f1
    elif command -v shasum &> /dev/null; then
        shasum -a 256 "$file" | cut -d' ' -f1
    else
        cat "$file" | openssl sha256 | cut -d' ' -f2
    fi
}

# =============================================================================
# MAIN LOGIC
# =============================================================================

main() {
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -h|--help)
                show_help
                exit 0
                ;;
            -q|--quiet)
                QUIET=true
                shift
                ;;
            -v|--verbose)
                VERBOSE=true
                shift
                ;;
            *)
                echo "Unknown option: $1" >&2
                echo "Use --help for usage information" >&2
                exit 2
                ;;
        esac
    done
    
    setup_colors
    
    # Check if current spec exists
    if [[ ! -f "$CURRENT_SPEC" ]]; then
        output_error "${RED}Error:${RESET} Current spec not found at $CURRENT_SPEC"
        output_error "Run regenerate.sh first to download the initial spec."
        exit 2
    fi
    
    output_verbose "${BLUE}Current spec:${RESET} $CURRENT_SPEC"
    output_verbose "${BLUE}Remote URL:${RESET} $OPENAPI_URL"
    
    # Get hash of current spec
    output_verbose "Calculating hash of current spec..."
    local current_hash
    current_hash=$(get_file_hash "$CURRENT_SPEC")
    output_verbose "${BLUE}Current hash:${RESET} $current_hash"
    
    # Download new spec to temp file
    output_verbose "Downloading latest spec..."
    local temp_file
    temp_file=$(mktemp)
    
    # Cleanup on exit
    trap "rm -f '$temp_file'" EXIT
    
    if ! curl -sSL --fail --connect-timeout 15 --max-time 60 -o "$temp_file" "$OPENAPI_URL" 2>/dev/null; then
        output_error "${RED}Error:${RESET} Failed to download OpenAPI spec"
        output_error "Check your internet connection and try again."
        exit 2
    fi
    
    # Validate it's valid JSON
    if ! (command -v jq &> /dev/null && jq empty "$temp_file" 2>/dev/null) && \
       ! node -e "JSON.parse(require('fs').readFileSync('$temp_file', 'utf8'))" 2>/dev/null; then
        output_error "${RED}Error:${RESET} Downloaded file is not valid JSON"
        exit 2
    fi
    
    # Get hash of new spec
    output_verbose "Calculating hash of new spec..."
    local new_hash
    new_hash=$(get_file_hash "$temp_file")
    output_verbose "${BLUE}New hash:${RESET} $new_hash"
    
    # Compare hashes
    if [[ "$current_hash" == "$new_hash" ]]; then
        output "${GREEN}✓${RESET} No changes detected - OpenAPI spec is up to date"
        exit 0
    else
        output "${YELLOW}⚠${RESET} Changes detected - run ${BLUE}./scripts/regenerate.sh${RESET} to update"
        
        if [[ "$VERBOSE" == "true" ]]; then
            # Show some basic stats about the change
            local current_size new_size
            current_size=$(wc -c < "$CURRENT_SPEC")
            new_size=$(wc -c < "$temp_file")
            
            output_verbose ""
            output_verbose "${BLUE}Size comparison:${RESET}"
            output_verbose "  Current: $current_size bytes"
            output_verbose "  New:     $new_size bytes"
            output_verbose "  Diff:    $((new_size - current_size)) bytes"
        fi
        
        exit 1
    fi
}

main "$@"



