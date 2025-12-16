#!/usr/bin/env bash
# =============================================================================
# regenerate.sh - Main Regeneration Script for Twelve Data n8n Connector
# =============================================================================
#
# PURPOSE:
#   Fetches the latest OpenAPI specification from Twelve Data API, creates
#   backups of current code, compares changes, and generates detailed reports
#   to help maintain the n8n connector.
#
# USAGE:
#   ./scripts/regenerate.sh [OPTIONS]
#
# OPTIONS:
#   -h, --help      Show this help message
#   -d, --dry-run   Preview changes without modifying files
#   -f, --force     Skip confirmation prompts
#   -v, --verbose   Enable verbose output
#
# REQUIREMENTS:
#   - curl (for downloading OpenAPI spec)
#   - node (for running change detection scripts)
#   - jq (optional, for JSON validation)
#
# =============================================================================

set -euo pipefail

# =============================================================================
# CONFIGURATION
# =============================================================================

# Script directory (resolves symlinks)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# URLs and paths
OPENAPI_URL="https://api.twelvedata.com/doc/swagger/openapi.json"
CURRENT_SPEC="$PROJECT_ROOT/openapi-spec.json"
SPECS_DIR="$PROJECT_ROOT/openapi-specs"
BACKUPS_DIR="$PROJECT_ROOT/backups"
LOG_FILE="$PROJECT_ROOT/regeneration.log"

# Timestamp format
TIMESTAMP=$(date +"%Y-%m-%d-%H-%M-%S")
DATE_ONLY=$(date +"%Y-%m-%d")

# Default options
DRY_RUN=false
FORCE=false
VERBOSE=false

# =============================================================================
# COLORS FOR TERMINAL OUTPUT
# =============================================================================

# Check if terminal supports colors
if [[ -t 1 ]] && command -v tput &> /dev/null; then
    RED=$(tput setaf 1)
    GREEN=$(tput setaf 2)
    YELLOW=$(tput setaf 3)
    BLUE=$(tput setaf 4)
    MAGENTA=$(tput setaf 5)
    CYAN=$(tput setaf 6)
    WHITE=$(tput setaf 7)
    BOLD=$(tput bold)
    RESET=$(tput sgr0)
else
    RED=""
    GREEN=""
    YELLOW=""
    BLUE=""
    MAGENTA=""
    CYAN=""
    WHITE=""
    BOLD=""
    RESET=""
fi

# =============================================================================
# LOGGING FUNCTIONS
# =============================================================================

# Log to both console and file
log() {
    local level="$1"
    local message="$2"
    local timestamp
    timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    
    # Log to file
    echo "[$timestamp] [$level] $message" >> "$LOG_FILE"
    
    # Log to console with colors
    case "$level" in
        INFO)
            echo -e "${BLUE}ℹ${RESET} $message"
            ;;
        SUCCESS)
            echo -e "${GREEN}✓${RESET} $message"
            ;;
        WARNING)
            echo -e "${YELLOW}⚠${RESET} $message"
            ;;
        ERROR)
            echo -e "${RED}✗${RESET} $message" >&2
            ;;
        DEBUG)
            if [[ "$VERBOSE" == "true" ]]; then
                echo -e "${CYAN}⋯${RESET} $message"
            fi
            ;;
        *)
            echo "$message"
            ;;
    esac
}

log_info() { log "INFO" "$1"; }
log_success() { log "SUCCESS" "$1"; }
log_warning() { log "WARNING" "$1"; }
log_error() { log "ERROR" "$1"; }
log_debug() { log "DEBUG" "$1"; }

# Print a section header
print_header() {
    local title="$1"
    echo ""
    echo "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${RESET}"
    echo "${BOLD}${MAGENTA}  $title${RESET}"
    echo "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${RESET}"
    echo ""
}

# Print a subsection header
print_subheader() {
    local title="$1"
    echo ""
    echo "${BOLD}${CYAN}───────────────────────────────────────────────────────────────${RESET}"
    echo "${BOLD}${CYAN}  $title${RESET}"
    echo "${BOLD}${CYAN}───────────────────────────────────────────────────────────────${RESET}"
}

# =============================================================================
# HELP FUNCTION
# =============================================================================

show_help() {
    cat << EOF
${BOLD}Twelve Data n8n Connector - Regeneration Script${RESET}

${BOLD}USAGE:${RESET}
    ./scripts/regenerate.sh [OPTIONS]

${BOLD}DESCRIPTION:${RESET}
    This script fetches the latest OpenAPI specification from Twelve Data API,
    creates backups of your current code, compares changes between specs, and
    generates detailed reports to help you maintain the n8n connector.

${BOLD}OPTIONS:${RESET}
    -h, --help      Show this help message and exit
    -d, --dry-run   Preview what would happen without making changes
    -f, --force     Skip all confirmation prompts
    -v, --verbose   Enable verbose/debug output

${BOLD}WORKFLOW:${RESET}
    1. Downloads latest OpenAPI spec from Twelve Data
    2. Validates the downloaded JSON
    3. Creates timestamped backup of current code
    4. Archives current spec to openapi-specs/ directory
    5. Runs change detection to compare old vs new spec
    6. Generates detailed change report
    7. Provides actionable next steps

${BOLD}EXAMPLES:${RESET}
    # Standard regeneration
    ./scripts/regenerate.sh

    # Preview changes without modifying anything
    ./scripts/regenerate.sh --dry-run

    # Run without confirmation prompts (for CI/automation)
    ./scripts/regenerate.sh --force

    # Verbose output for debugging
    ./scripts/regenerate.sh --verbose

${BOLD}FILES CREATED:${RESET}
    backups/YYYY-MM-DD-HH-MM-SS/    Timestamped backup directory
    openapi-specs/openapi-YYYY-MM-DD.json    Archived spec
    regeneration.log               Operation log

${BOLD}REQUIREMENTS:${RESET}
    - curl     For downloading the OpenAPI spec
    - node     For running change detection scripts
    - jq       (optional) For JSON validation

${BOLD}SEE ALSO:${RESET}
    docs/REGENERATION_GUIDE.md     Comprehensive regeneration guide
    docs/ADDING_ENDPOINTS_QUICK_GUIDE.md    Quick reference for adding endpoints

EOF
}

# =============================================================================
# UTILITY FUNCTIONS
# =============================================================================

# Check if a command exists
command_exists() {
    command -v "$1" &> /dev/null
}

# Confirm action with user (respects --force flag)
confirm() {
    local message="$1"
    
    if [[ "$FORCE" == "true" ]]; then
        return 0
    fi
    
    echo -n "${YELLOW}$message [y/N]: ${RESET}"
    read -r response
    case "$response" in
        [yY][eE][sS]|[yY])
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

# Validate JSON file
validate_json() {
    local file="$1"
    
    if command_exists jq; then
        if jq empty "$file" 2>/dev/null; then
            return 0
        else
            return 1
        fi
    else
        # Fallback: use Node.js to validate JSON
        if node -e "JSON.parse(require('fs').readFileSync('$file', 'utf8'))" 2>/dev/null; then
            return 0
        else
            return 1
        fi
    fi
}

# Get file hash for comparison
get_file_hash() {
    local file="$1"
    
    if command_exists sha256sum; then
        sha256sum "$file" | cut -d' ' -f1
    elif command_exists shasum; then
        shasum -a 256 "$file" | cut -d' ' -f1
    else
        # Fallback for Windows Git Bash
        cat "$file" | openssl sha256 | cut -d' ' -f2
    fi
}

# Create directory if it doesn't exist
ensure_dir() {
    local dir="$1"
    if [[ ! -d "$dir" ]]; then
        if [[ "$DRY_RUN" == "true" ]]; then
            log_debug "Would create directory: $dir"
        else
            mkdir -p "$dir"
            log_debug "Created directory: $dir"
        fi
    fi
}

# =============================================================================
# CHECK DEPENDENCIES
# =============================================================================

check_dependencies() {
    print_subheader "Checking Dependencies"
    
    local missing_deps=()
    
    # Required dependencies
    if ! command_exists curl; then
        missing_deps+=("curl")
    else
        log_success "curl is installed"
    fi
    
    if ! command_exists node; then
        missing_deps+=("node")
    else
        log_success "node is installed ($(node --version))"
    fi
    
    # Optional dependencies
    if command_exists jq; then
        log_success "jq is installed (optional, for JSON validation)"
    else
        log_warning "jq is not installed (optional, using Node.js fallback)"
    fi
    
    # Check if required scripts exist
    if [[ ! -f "$SCRIPT_DIR/detect-changes.js" ]]; then
        log_warning "detect-changes.js not found - change detection will be limited"
    fi
    
    if [[ ! -f "$SCRIPT_DIR/validate-implementation.js" ]]; then
        log_warning "validate-implementation.js not found - coverage report will be skipped"
    fi
    
    # Exit if missing required dependencies
    if [[ ${#missing_deps[@]} -gt 0 ]]; then
        log_error "Missing required dependencies: ${missing_deps[*]}"
        log_error "Please install them and try again."
        exit 1
    fi
    
    log_success "All required dependencies are available"
}

# =============================================================================
# DOWNLOAD OPENAPI SPEC
# =============================================================================

download_openapi_spec() {
    print_subheader "Downloading Latest OpenAPI Specification"
    
    local temp_file
    temp_file=$(mktemp)
    
    log_info "Fetching from: $OPENAPI_URL"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        log_debug "Would download OpenAPI spec to temporary file"
        echo "$temp_file"
        return 0
    fi
    
    # Download with progress indicator
    if curl -sSL --fail --connect-timeout 30 --max-time 120 \
        -o "$temp_file" \
        -w "Downloaded %{size_download} bytes in %{time_total}s\n" \
        "$OPENAPI_URL"; then
        
        log_success "Download completed successfully"
        
        # Validate JSON
        log_info "Validating JSON structure..."
        if validate_json "$temp_file"; then
            log_success "JSON validation passed"
            echo "$temp_file"
            return 0
        else
            log_error "Downloaded file is not valid JSON"
            rm -f "$temp_file"
            return 1
        fi
    else
        log_error "Failed to download OpenAPI spec"
        log_error "Please check your internet connection and try again"
        rm -f "$temp_file"
        return 1
    fi
}

# =============================================================================
# CREATE BACKUP
# =============================================================================

create_backup() {
    print_subheader "Creating Backup"
    
    local backup_dir="$BACKUPS_DIR/$TIMESTAMP"
    
    log_info "Backup location: $backup_dir"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        log_debug "Would create backup directory: $backup_dir"
        log_debug "Would backup: nodes/, credentials/, openapi-spec.json"
        return 0
    fi
    
    ensure_dir "$backup_dir"
    
    # Backup node files
    if [[ -d "$PROJECT_ROOT/nodes" ]]; then
        cp -r "$PROJECT_ROOT/nodes" "$backup_dir/"
        log_success "Backed up nodes/ directory"
    fi
    
    # Backup credentials
    if [[ -d "$PROJECT_ROOT/credentials" ]]; then
        cp -r "$PROJECT_ROOT/credentials" "$backup_dir/"
        log_success "Backed up credentials/ directory"
    fi
    
    # Backup current OpenAPI spec
    if [[ -f "$CURRENT_SPEC" ]]; then
        cp "$CURRENT_SPEC" "$backup_dir/"
        log_success "Backed up openapi-spec.json"
    fi
    
    # Backup package.json
    if [[ -f "$PROJECT_ROOT/package.json" ]]; then
        cp "$PROJECT_ROOT/package.json" "$backup_dir/"
        log_success "Backed up package.json"
    fi
    
    # Create backup manifest
    cat > "$backup_dir/MANIFEST.txt" << EOF
Backup created: $(date)
Timestamp: $TIMESTAMP
Project: Twelve Data n8n Connector

Contents:
$(ls -la "$backup_dir")

To restore this backup, run:
./scripts/manage-backups.sh --restore $TIMESTAMP
EOF
    
    log_success "Backup completed: $backup_dir"
    echo "$backup_dir"
}

# =============================================================================
# ARCHIVE CURRENT SPEC
# =============================================================================

archive_current_spec() {
    print_subheader "Archiving Current Specification"
    
    if [[ ! -f "$CURRENT_SPEC" ]]; then
        log_warning "No current spec found at $CURRENT_SPEC"
        log_info "This appears to be a fresh setup"
        return 0
    fi
    
    ensure_dir "$SPECS_DIR"
    
    local archive_path="$SPECS_DIR/openapi-$DATE_ONLY.json"
    
    # Check if we already have an archive for today
    if [[ -f "$archive_path" ]]; then
        archive_path="$SPECS_DIR/openapi-$TIMESTAMP.json"
        log_info "Archive for today exists, using timestamp: $archive_path"
    fi
    
    if [[ "$DRY_RUN" == "true" ]]; then
        log_debug "Would archive current spec to: $archive_path"
        return 0
    fi
    
    cp "$CURRENT_SPEC" "$archive_path"
    log_success "Archived current spec to: $archive_path"
}

# =============================================================================
# DETECT CHANGES
# =============================================================================

detect_changes() {
    local new_spec="$1"
    
    print_subheader "Detecting Changes"
    
    if [[ ! -f "$CURRENT_SPEC" ]]; then
        log_info "No previous spec found - this is a fresh setup"
        log_info "All endpoints in the new spec will be considered 'new'"
        return 0
    fi
    
    # Compare hashes first for quick check
    local old_hash new_hash
    old_hash=$(get_file_hash "$CURRENT_SPEC")
    new_hash=$(get_file_hash "$new_spec")
    
    log_debug "Current spec hash: $old_hash"
    log_debug "New spec hash: $new_hash"
    
    if [[ "$old_hash" == "$new_hash" ]]; then
        log_success "No changes detected - specs are identical"
        return 0
    fi
    
    log_info "Changes detected between specs"
    
    # Run detailed change detection if script exists
    if [[ -f "$SCRIPT_DIR/detect-changes.js" ]]; then
        log_info "Running detailed change analysis..."
        
        local report_file="$PROJECT_ROOT/change-report-$TIMESTAMP.json"
        
        if [[ "$DRY_RUN" == "true" ]]; then
            log_debug "Would run: node detect-changes.js '$CURRENT_SPEC' '$new_spec'"
            log_debug "Would save report to: $report_file"
        else
            if node "$SCRIPT_DIR/detect-changes.js" "$CURRENT_SPEC" "$new_spec" > "$report_file" 2>&1; then
                log_success "Change report generated: $report_file"
                
                # Display summary from report
                display_change_summary "$report_file"
            else
                log_warning "Change detection script encountered issues"
                log_info "Check $report_file for details"
            fi
        fi
    else
        log_warning "detect-changes.js not found - showing basic comparison"
        
        # Basic comparison using diff
        if command_exists diff; then
            local diff_output
            diff_output=$(diff -u "$CURRENT_SPEC" "$new_spec" | head -50 || true)
            if [[ -n "$diff_output" ]]; then
                echo ""
                echo "${BOLD}First 50 lines of diff:${RESET}"
                echo "$diff_output"
            fi
        fi
    fi
}

# =============================================================================
# DISPLAY CHANGE SUMMARY
# =============================================================================

display_change_summary() {
    local report_file="$1"
    
    if [[ ! -f "$report_file" ]]; then
        return 0
    fi
    
    print_subheader "Change Summary"
    
    # Parse and display summary using Node.js
    node -e "
        const fs = require('fs');
        try {
            const report = JSON.parse(fs.readFileSync('$report_file', 'utf8'));
            
            if (report.summary) {
                console.log('');
                console.log('  New endpoints:      ' + (report.summary.newEndpoints || 0));
                console.log('  Removed endpoints:  ' + (report.summary.removedEndpoints || 0));
                console.log('  Modified endpoints: ' + (report.summary.modifiedEndpoints || 0));
                console.log('  Breaking changes:   ' + (report.summary.breakingChanges || 0));
                console.log('');
            }
            
            if (report.breakingChanges && report.breakingChanges.length > 0) {
                console.log('⚠️  BREAKING CHANGES DETECTED:');
                report.breakingChanges.slice(0, 10).forEach(change => {
                    console.log('    - ' + change.description);
                });
                if (report.breakingChanges.length > 10) {
                    console.log('    ... and ' + (report.breakingChanges.length - 10) + ' more');
                }
                console.log('');
            }
            
            if (report.newEndpoints && report.newEndpoints.length > 0) {
                console.log('✨ NEW ENDPOINTS:');
                report.newEndpoints.slice(0, 10).forEach(ep => {
                    console.log('    - ' + ep.path + ' (' + ep.method + ')');
                });
                if (report.newEndpoints.length > 10) {
                    console.log('    ... and ' + (report.newEndpoints.length - 10) + ' more');
                }
                console.log('');
            }
        } catch (e) {
            console.log('Could not parse change report: ' + e.message);
        }
    " 2>/dev/null || log_warning "Could not display change summary"
}

# =============================================================================
# VALIDATE IMPLEMENTATION
# =============================================================================

validate_implementation() {
    print_subheader "Validating Current Implementation"
    
    if [[ ! -f "$SCRIPT_DIR/validate-implementation.js" ]]; then
        log_warning "validate-implementation.js not found - skipping coverage report"
        return 0
    fi
    
    if [[ "$DRY_RUN" == "true" ]]; then
        log_debug "Would run implementation validation"
        return 0
    fi
    
    log_info "Analyzing implementation coverage..."
    
    if node "$SCRIPT_DIR/validate-implementation.js" 2>&1; then
        log_success "Implementation validation completed"
    else
        log_warning "Implementation validation encountered issues"
    fi
}

# =============================================================================
# UPDATE SPEC FILE
# =============================================================================

update_spec_file() {
    local new_spec="$1"
    
    print_subheader "Updating OpenAPI Specification"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        log_debug "Would update $CURRENT_SPEC with new spec"
        return 0
    fi
    
    if ! confirm "Update openapi-spec.json with the new specification?"; then
        log_info "Skipping spec update"
        log_info "New spec saved at: $new_spec"
        return 0
    fi
    
    cp "$new_spec" "$CURRENT_SPEC"
    log_success "Updated openapi-spec.json"
}

# =============================================================================
# SHOW NEXT STEPS
# =============================================================================

show_next_steps() {
    print_header "Next Steps"
    
    cat << EOF
${BOLD}1. Review the Change Report${RESET}
   Check the generated change report for details on what changed.
   Look for breaking changes that might affect existing operations.

${BOLD}2. Update Implemented Operations (if needed)${RESET}
   If any implemented operations have breaking changes:
   - Update parameter definitions in TwelveData.node.ts
   - Test affected operations manually
   - Update documentation if needed

${BOLD}3. Consider Adding New Endpoints${RESET}
   Review the list of new endpoints and consider implementing
   high-value ones. See: docs/ADDING_ENDPOINTS_QUICK_GUIDE.md

${BOLD}4. Run Tests${RESET}
   npm run build
   npm run lint

${BOLD}5. Commit Changes${RESET}
   git add .
   git commit -m "chore: update OpenAPI spec ($DATE_ONLY)"

${BOLD}Useful Commands:${RESET}
   ./scripts/validate-implementation.js  - Check implementation coverage
   ./scripts/manage-backups.sh --list    - View available backups
   ./scripts/check-openapi-changes.sh    - Quick change check

EOF
}

# =============================================================================
# CLEANUP
# =============================================================================

cleanup() {
    # Remove temporary files
    if [[ -n "${TEMP_SPEC_FILE:-}" ]] && [[ -f "$TEMP_SPEC_FILE" ]]; then
        rm -f "$TEMP_SPEC_FILE"
    fi
}

# Set up trap for cleanup
trap cleanup EXIT

# =============================================================================
# MAIN FUNCTION
# =============================================================================

main() {
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -h|--help)
                show_help
                exit 0
                ;;
            -d|--dry-run)
                DRY_RUN=true
                shift
                ;;
            -f|--force)
                FORCE=true
                shift
                ;;
            -v|--verbose)
                VERBOSE=true
                shift
                ;;
            *)
                log_error "Unknown option: $1"
                echo "Use --help for usage information"
                exit 1
                ;;
        esac
    done
    
    # Initialize log file
    ensure_dir "$(dirname "$LOG_FILE")"
    echo "" >> "$LOG_FILE"
    echo "========================================" >> "$LOG_FILE"
    echo "Regeneration started: $(date)" >> "$LOG_FILE"
    echo "Options: DRY_RUN=$DRY_RUN, FORCE=$FORCE, VERBOSE=$VERBOSE" >> "$LOG_FILE"
    echo "========================================" >> "$LOG_FILE"
    
    print_header "Twelve Data n8n Connector - Regeneration"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        log_warning "DRY RUN MODE - No files will be modified"
    fi
    
    # Step 1: Check dependencies
    check_dependencies
    
    # Step 2: Download new spec
    TEMP_SPEC_FILE=$(download_openapi_spec)
    if [[ -z "$TEMP_SPEC_FILE" ]] || [[ ! -f "$TEMP_SPEC_FILE" ]]; then
        if [[ "$DRY_RUN" != "true" ]]; then
            log_error "Failed to download OpenAPI specification"
            exit 1
        fi
    fi
    
    # Step 3: Create backup
    create_backup
    
    # Step 4: Archive current spec
    archive_current_spec
    
    # Step 5: Detect changes
    if [[ -f "$TEMP_SPEC_FILE" ]]; then
        detect_changes "$TEMP_SPEC_FILE"
    fi
    
    # Step 6: Validate implementation
    validate_implementation
    
    # Step 7: Update spec file
    if [[ -f "$TEMP_SPEC_FILE" ]]; then
        update_spec_file "$TEMP_SPEC_FILE"
    fi
    
    # Step 8: Show next steps
    show_next_steps
    
    print_header "Regeneration Complete"
    
    log_success "Regeneration completed successfully!"
    log_info "Log file: $LOG_FILE"
    
    echo "" >> "$LOG_FILE"
    echo "Regeneration completed: $(date)" >> "$LOG_FILE"
}

# Run main function
main "$@"





