#!/usr/bin/env bash
# =============================================================================
# manage-backups.sh - Backup Management Script
# =============================================================================
#
# PURPOSE:
#   Manages backups created by the regeneration system. Allows listing,
#   restoring, and cleaning up old backups.
#
# USAGE:
#   ./scripts/manage-backups.sh [COMMAND] [OPTIONS]
#
# COMMANDS:
#   list, -l          List all available backups
#   restore <id>      Restore from a specific backup
#   cleanup           Remove old backups (keeps last 5 or within 30 days)
#   info <id>         Show detailed information about a backup
#   verify <id>       Verify backup integrity
#
# OPTIONS:
#   -h, --help        Show this help message
#   -f, --force       Skip confirmation prompts
#   -n, --keep <num>  Number of backups to keep during cleanup (default: 5)
#   -d, --days <num>  Keep backups newer than N days (default: 30)
#
# =============================================================================

set -euo pipefail

# =============================================================================
# CONFIGURATION
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BACKUPS_DIR="$PROJECT_ROOT/backups"

# Default options
FORCE=false
KEEP_COUNT=5
KEEP_DAYS=30

# =============================================================================
# COLORS
# =============================================================================

if [[ -t 1 ]] && command -v tput &> /dev/null; then
    RED=$(tput setaf 1)
    GREEN=$(tput setaf 2)
    YELLOW=$(tput setaf 3)
    BLUE=$(tput setaf 4)
    MAGENTA=$(tput setaf 5)
    CYAN=$(tput setaf 6)
    BOLD=$(tput bold)
    RESET=$(tput sgr0)
else
    RED=""
    GREEN=""
    YELLOW=""
    BLUE=""
    MAGENTA=""
    CYAN=""
    BOLD=""
    RESET=""
fi

# =============================================================================
# UTILITY FUNCTIONS
# =============================================================================

log_info() { echo -e "${BLUE}ℹ${RESET} $1"; }
log_success() { echo -e "${GREEN}✓${RESET} $1"; }
log_warning() { echo -e "${YELLOW}⚠${RESET} $1"; }
log_error() { echo -e "${RED}✗${RESET} $1" >&2; }

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

# Format bytes to human readable
format_size() {
    local bytes=$1
    
    if [[ $bytes -lt 1024 ]]; then
        echo "${bytes}B"
    elif [[ $bytes -lt 1048576 ]]; then
        echo "$((bytes / 1024))KB"
    elif [[ $bytes -lt 1073741824 ]]; then
        echo "$((bytes / 1048576))MB"
    else
        echo "$((bytes / 1073741824))GB"
    fi
}

# Get directory size
get_dir_size() {
    local dir="$1"
    
    if command -v du &> /dev/null; then
        du -sb "$dir" 2>/dev/null | cut -f1 || echo "0"
    else
        # Fallback for systems without du -b
        find "$dir" -type f -exec wc -c {} + 2>/dev/null | tail -1 | awk '{print $1}' || echo "0"
    fi
}

# =============================================================================
# HELP FUNCTION
# =============================================================================

show_help() {
    cat << EOF
${BOLD}Backup Management Script for Twelve Data n8n Connector${RESET}

${BOLD}USAGE:${RESET}
    ./scripts/manage-backups.sh [COMMAND] [OPTIONS]

${BOLD}COMMANDS:${RESET}
    list, -l              List all available backups with details
    restore <timestamp>   Restore from a specific backup
    cleanup               Remove old backups based on retention policy
    info <timestamp>      Show detailed information about a backup
    verify <timestamp>    Verify backup integrity

${BOLD}OPTIONS:${RESET}
    -h, --help            Show this help message
    -f, --force           Skip confirmation prompts
    -n, --keep <num>      Number of backups to keep during cleanup (default: 5)
    -d, --days <num>      Keep backups newer than N days (default: 30)

${BOLD}EXAMPLES:${RESET}
    # List all backups
    ./scripts/manage-backups.sh list

    # Restore from a specific backup
    ./scripts/manage-backups.sh restore 2024-01-15-09-30-00

    # Clean up old backups (interactive)
    ./scripts/manage-backups.sh cleanup

    # Clean up, keeping only last 3 backups
    ./scripts/manage-backups.sh cleanup --keep 3 --force

    # Show backup details
    ./scripts/manage-backups.sh info 2024-01-15-09-30-00

${BOLD}BACKUP LOCATION:${RESET}
    $BACKUPS_DIR/

${BOLD}RETENTION POLICY:${RESET}
    By default, cleanup keeps:
    - The last 5 backups (regardless of age)
    - All backups less than 30 days old
    
    Use --keep and --days to customize.

EOF
}

# =============================================================================
# LIST BACKUPS
# =============================================================================

list_backups() {
    echo ""
    echo "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${RESET}"
    echo "${BOLD}${MAGENTA}  Available Backups${RESET}"
    echo "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${RESET}"
    echo ""
    
    if [[ ! -d "$BACKUPS_DIR" ]]; then
        log_warning "No backups directory found at: $BACKUPS_DIR"
        log_info "Run ./scripts/regenerate.sh to create your first backup"
        return 0
    fi
    
    # Find all backup directories
    local backups=()
    while IFS= read -r -d '' dir; do
        backups+=("$(basename "$dir")")
    done < <(find "$BACKUPS_DIR" -mindepth 1 -maxdepth 1 -type d -print0 2>/dev/null | sort -z -r)
    
    if [[ ${#backups[@]} -eq 0 ]]; then
        log_warning "No backups found"
        log_info "Run ./scripts/regenerate.sh to create your first backup"
        return 0
    fi
    
    # Calculate total size
    local total_size=0
    
    echo "${BOLD}  #  Timestamp              Size      Contents${RESET}"
    echo "───────────────────────────────────────────────────────────────"
    
    local count=1
    for backup in "${backups[@]}"; do
        local backup_path="$BACKUPS_DIR/$backup"
        local size
        size=$(get_dir_size "$backup_path")
        total_size=$((total_size + size))
        
        # Count files
        local file_count
        file_count=$(find "$backup_path" -type f 2>/dev/null | wc -l)
        
        # Check for manifest
        local has_manifest=""
        if [[ -f "$backup_path/MANIFEST.txt" ]]; then
            has_manifest=" 📋"
        fi
        
        printf "  %-3s %s  %-9s %s files%s\n" \
            "$count." \
            "$backup" \
            "$(format_size "$size")" \
            "$file_count" \
            "$has_manifest"
        
        ((count++))
    done
    
    echo "───────────────────────────────────────────────────────────────"
    echo "  ${BOLD}Total: ${#backups[@]} backup(s), $(format_size "$total_size")${RESET}"
    echo ""
    
    log_info "Use 'manage-backups.sh info <timestamp>' for details"
    log_info "Use 'manage-backups.sh restore <timestamp>' to restore"
}

# =============================================================================
# BACKUP INFO
# =============================================================================

show_backup_info() {
    local backup_id="$1"
    local backup_path="$BACKUPS_DIR/$backup_id"
    
    if [[ ! -d "$backup_path" ]]; then
        log_error "Backup not found: $backup_id"
        log_info "Use 'manage-backups.sh list' to see available backups"
        return 1
    fi
    
    echo ""
    echo "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${RESET}"
    echo "${BOLD}${MAGENTA}  Backup Details: $backup_id${RESET}"
    echo "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${RESET}"
    echo ""
    
    # Basic info
    local size
    size=$(get_dir_size "$backup_path")
    echo "  ${BOLD}Location:${RESET}  $backup_path"
    echo "  ${BOLD}Size:${RESET}      $(format_size "$size")"
    echo ""
    
    # Show manifest if exists
    if [[ -f "$backup_path/MANIFEST.txt" ]]; then
        echo "${BOLD}  Manifest:${RESET}"
        echo "───────────────────────────────────────────────────────────────"
        sed 's/^/  /' "$backup_path/MANIFEST.txt"
        echo ""
    fi
    
    # List contents
    echo "${BOLD}  Contents:${RESET}"
    echo "───────────────────────────────────────────────────────────────"
    
    if [[ -d "$backup_path/nodes" ]]; then
        local nodes_count
        nodes_count=$(find "$backup_path/nodes" -type f 2>/dev/null | wc -l)
        echo "  📁 nodes/          ($nodes_count files)"
    fi
    
    if [[ -d "$backup_path/credentials" ]]; then
        local creds_count
        creds_count=$(find "$backup_path/credentials" -type f 2>/dev/null | wc -l)
        echo "  📁 credentials/    ($creds_count files)"
    fi
    
    if [[ -f "$backup_path/openapi-spec.json" ]]; then
        local spec_size
        spec_size=$(wc -c < "$backup_path/openapi-spec.json")
        echo "  📄 openapi-spec.json ($(format_size "$spec_size"))"
    fi
    
    if [[ -f "$backup_path/package.json" ]]; then
        echo "  📄 package.json"
    fi
    
    echo ""
}

# =============================================================================
# VERIFY BACKUP
# =============================================================================

verify_backup() {
    local backup_id="$1"
    local backup_path="$BACKUPS_DIR/$backup_id"
    
    if [[ ! -d "$backup_path" ]]; then
        log_error "Backup not found: $backup_id"
        return 1
    fi
    
    echo ""
    echo "${BOLD}Verifying backup: $backup_id${RESET}"
    echo ""
    
    local errors=0
    
    # Check for essential files
    if [[ -d "$backup_path/nodes" ]]; then
        if [[ -f "$backup_path/nodes/TwelveData/TwelveData.node.ts" ]]; then
            log_success "nodes/TwelveData/TwelveData.node.ts exists"
        else
            log_warning "Main node file not found in backup"
            ((errors++))
        fi
    else
        log_warning "nodes/ directory not found"
        ((errors++))
    fi
    
    if [[ -d "$backup_path/credentials" ]]; then
        log_success "credentials/ directory exists"
    else
        log_warning "credentials/ directory not found"
        ((errors++))
    fi
    
    if [[ -f "$backup_path/openapi-spec.json" ]]; then
        # Validate JSON
        if (command -v jq &> /dev/null && jq empty "$backup_path/openapi-spec.json" 2>/dev/null) || \
           node -e "JSON.parse(require('fs').readFileSync('$backup_path/openapi-spec.json', 'utf8'))" 2>/dev/null; then
            log_success "openapi-spec.json is valid JSON"
        else
            log_error "openapi-spec.json is not valid JSON"
            ((errors++))
        fi
    else
        log_warning "openapi-spec.json not found"
    fi
    
    if [[ -f "$backup_path/MANIFEST.txt" ]]; then
        log_success "MANIFEST.txt exists"
    else
        log_warning "MANIFEST.txt not found"
    fi
    
    echo ""
    
    if [[ $errors -eq 0 ]]; then
        log_success "Backup verification passed"
        return 0
    else
        log_warning "Backup verification completed with $errors warning(s)"
        return 1
    fi
}

# =============================================================================
# RESTORE BACKUP
# =============================================================================

restore_backup() {
    local backup_id="$1"
    local backup_path="$BACKUPS_DIR/$backup_id"
    
    if [[ ! -d "$backup_path" ]]; then
        log_error "Backup not found: $backup_id"
        log_info "Use 'manage-backups.sh list' to see available backups"
        return 1
    fi
    
    echo ""
    echo "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${RESET}"
    echo "${BOLD}${MAGENTA}  Restore Backup: $backup_id${RESET}"
    echo "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${RESET}"
    echo ""
    
    # Show what will be restored
    log_info "The following will be restored:"
    
    if [[ -d "$backup_path/nodes" ]]; then
        echo "  • nodes/ directory"
    fi
    
    if [[ -d "$backup_path/credentials" ]]; then
        echo "  • credentials/ directory"
    fi
    
    if [[ -f "$backup_path/openapi-spec.json" ]]; then
        echo "  • openapi-spec.json"
    fi
    
    echo ""
    
    log_warning "This will OVERWRITE current files!"
    
    if ! confirm "Proceed with restore?"; then
        log_info "Restore cancelled"
        return 0
    fi
    
    echo ""
    
    # Create a safety backup of current state
    local safety_backup="$BACKUPS_DIR/pre-restore-$(date +%Y-%m-%d-%H-%M-%S)"
    log_info "Creating safety backup at: $safety_backup"
    mkdir -p "$safety_backup"
    
    if [[ -d "$PROJECT_ROOT/nodes" ]]; then
        cp -r "$PROJECT_ROOT/nodes" "$safety_backup/"
    fi
    
    if [[ -d "$PROJECT_ROOT/credentials" ]]; then
        cp -r "$PROJECT_ROOT/credentials" "$safety_backup/"
    fi
    
    if [[ -f "$PROJECT_ROOT/openapi-spec.json" ]]; then
        cp "$PROJECT_ROOT/openapi-spec.json" "$safety_backup/"
    fi
    
    log_success "Safety backup created"
    
    # Restore files
    log_info "Restoring files..."
    
    if [[ -d "$backup_path/nodes" ]]; then
        rm -rf "$PROJECT_ROOT/nodes"
        cp -r "$backup_path/nodes" "$PROJECT_ROOT/"
        log_success "Restored nodes/"
    fi
    
    if [[ -d "$backup_path/credentials" ]]; then
        rm -rf "$PROJECT_ROOT/credentials"
        cp -r "$backup_path/credentials" "$PROJECT_ROOT/"
        log_success "Restored credentials/"
    fi
    
    if [[ -f "$backup_path/openapi-spec.json" ]]; then
        cp "$backup_path/openapi-spec.json" "$PROJECT_ROOT/"
        log_success "Restored openapi-spec.json"
    fi
    
    echo ""
    log_success "Restore completed successfully!"
    echo ""
    log_info "Safety backup saved at: $safety_backup"
    log_info "Run 'npm run build' to rebuild the project"
}

# =============================================================================
# CLEANUP BACKUPS
# =============================================================================

cleanup_backups() {
    echo ""
    echo "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${RESET}"
    echo "${BOLD}${MAGENTA}  Cleanup Backups${RESET}"
    echo "${BOLD}${MAGENTA}═══════════════════════════════════════════════════════════════${RESET}"
    echo ""
    
    if [[ ! -d "$BACKUPS_DIR" ]]; then
        log_info "No backups directory found - nothing to clean up"
        return 0
    fi
    
    # Get all backups sorted by date (newest first)
    local backups=()
    while IFS= read -r -d '' dir; do
        backups+=("$(basename "$dir")")
    done < <(find "$BACKUPS_DIR" -mindepth 1 -maxdepth 1 -type d -print0 2>/dev/null | sort -z -r)
    
    if [[ ${#backups[@]} -eq 0 ]]; then
        log_info "No backups found - nothing to clean up"
        return 0
    fi
    
    log_info "Retention policy:"
    echo "  • Keep last $KEEP_COUNT backups"
    echo "  • Keep backups newer than $KEEP_DAYS days"
    echo ""
    
    # Determine which backups to delete
    local to_delete=()
    local to_keep=()
    local cutoff_date
    cutoff_date=$(date -d "-$KEEP_DAYS days" +%Y-%m-%d 2>/dev/null || date -v-${KEEP_DAYS}d +%Y-%m-%d 2>/dev/null || echo "")
    
    local count=0
    for backup in "${backups[@]}"; do
        local keep=false
        
        # Keep if within count limit
        if [[ $count -lt $KEEP_COUNT ]]; then
            keep=true
        fi
        
        # Keep if within date limit
        if [[ -n "$cutoff_date" ]]; then
            local backup_date="${backup:0:10}"
            if [[ "$backup_date" > "$cutoff_date" ]] || [[ "$backup_date" == "$cutoff_date" ]]; then
                keep=true
            fi
        fi
        
        if [[ "$keep" == "true" ]]; then
            to_keep+=("$backup")
        else
            to_delete+=("$backup")
        fi
        
        ((count++))
    done
    
    if [[ ${#to_delete[@]} -eq 0 ]]; then
        log_success "No backups need to be deleted"
        log_info "All ${#backups[@]} backup(s) are within retention policy"
        return 0
    fi
    
    # Show what will be deleted
    log_info "Backups to keep (${#to_keep[@]}):"
    for backup in "${to_keep[@]}"; do
        echo "  ${GREEN}✓${RESET} $backup"
    done
    echo ""
    
    log_warning "Backups to delete (${#to_delete[@]}):"
    local delete_size=0
    for backup in "${to_delete[@]}"; do
        local size
        size=$(get_dir_size "$BACKUPS_DIR/$backup")
        delete_size=$((delete_size + size))
        echo "  ${RED}✗${RESET} $backup ($(format_size "$size"))"
    done
    echo ""
    
    log_info "Space to be freed: $(format_size "$delete_size")"
    echo ""
    
    if ! confirm "Delete ${#to_delete[@]} backup(s)?"; then
        log_info "Cleanup cancelled"
        return 0
    fi
    
    # Delete backups
    echo ""
    for backup in "${to_delete[@]}"; do
        rm -rf "$BACKUPS_DIR/$backup"
        log_success "Deleted: $backup"
    done
    
    echo ""
    log_success "Cleanup completed - freed $(format_size "$delete_size")"
}

# =============================================================================
# MAIN
# =============================================================================

main() {
    local command=""
    local backup_id=""
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -h|--help)
                show_help
                exit 0
                ;;
            -f|--force)
                FORCE=true
                shift
                ;;
            -n|--keep)
                KEEP_COUNT="$2"
                shift 2
                ;;
            -d|--days)
                KEEP_DAYS="$2"
                shift 2
                ;;
            list|-l)
                command="list"
                shift
                ;;
            restore)
                command="restore"
                backup_id="$2"
                shift 2
                ;;
            cleanup)
                command="cleanup"
                shift
                ;;
            info)
                command="info"
                backup_id="$2"
                shift 2
                ;;
            verify)
                command="verify"
                backup_id="$2"
                shift 2
                ;;
            *)
                # If no command yet, assume it's a backup ID for restore
                if [[ -z "$command" ]]; then
                    log_error "Unknown command: $1"
                    echo "Use --help for usage information"
                    exit 1
                fi
                shift
                ;;
        esac
    done
    
    # Default to list if no command
    if [[ -z "$command" ]]; then
        command="list"
    fi
    
    # Execute command
    case "$command" in
        list)
            list_backups
            ;;
        restore)
            if [[ -z "$backup_id" ]]; then
                log_error "Please specify a backup timestamp to restore"
                log_info "Use 'manage-backups.sh list' to see available backups"
                exit 1
            fi
            restore_backup "$backup_id"
            ;;
        cleanup)
            cleanup_backups
            ;;
        info)
            if [[ -z "$backup_id" ]]; then
                log_error "Please specify a backup timestamp"
                exit 1
            fi
            show_backup_info "$backup_id"
            ;;
        verify)
            if [[ -z "$backup_id" ]]; then
                log_error "Please specify a backup timestamp"
                exit 1
            fi
            verify_backup "$backup_id"
            ;;
    esac
}

main "$@"



