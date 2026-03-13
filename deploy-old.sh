#!/bin/bash

# LdA Website Deployment Script with Rollback
# Usage:
#   ./deploy.sh          - Deploy current version
#   ./deploy.sh rollback - Rollback to previous version
#   ./deploy.sh list    - List available versions
#   ./deploy.sh 1       - Rollback to version 1

SERVER="git@github.com:jaysonsu1993-a11y/lda-website.git"
ALIYUN_SERVER="root@8.163.21.207"
SERVER_PATH="/var/www/lda-website"
BACKUP_PATH="$SERVER_PATH/backups"
PASS="AutoClaw000"
PROJECT_DIR="$HOME/.openclaw/workspace-crab/lda-website"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Build the project
build() {
    log_info "Building Next.js project..."
    cd "$PROJECT_DIR"
    rm -rf out/ .next/
    npm run build
    if [ $? -ne 0 ]; then
        log_error "Build failed!"
        exit 1
    fi
    log_info "Build completed!"
}

# Create Git commit and tag
git_commit() {
    local version=$1
    cd "$PROJECT_DIR"
    
    # Check if there are changes
    if git diff --quiet && git diff --cached --quiet; then
        log_warn "No changes to commit"
        return 0
    fi
    
    log_info "Creating Git commit..."
    git add -A
    git commit -m "$version"
    
    # Create tag
    git tag -a "$version" -m "$version release"
    
    log_info "Git commit and tag created: $version"
}

# Create server backup
backup_server() {
    log_info "Creating server backup..."
    VERSION=$(date +%Y%m%d_%H%M%S)
    
    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $ALIYUN_SERVER "
        mkdir -p $BACKUP_PATH/$VERSION
        cp -r $SERVER_PATH/* $BACKUP_PATH/$VERSION/ 2>/dev/null || true
        echo $VERSION > $BACKUP_PATH/latest
    "
    
    log_info "Backup created: $VERSION"
}

# Deploy to server
deploy() {
    # Generate version name
    local version="v$(date +%Y%m%d_%H%M%S)"
    
    # Git commit and tag
    git_commit "$version"
    
    # Push to GitHub
    log_info "Pushing to GitHub..."
    cd "$PROJECT_DIR"
    GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no" git push -u origin main --tags
    
    build
    backup_server
    
    log_info "Deploying to server..."
    
    # Copy out folder
    rsync -avz -e "ssh -o StrictHostKeyChecking=no -o PreferredAuthentications=password -o PubkeyAuthentication=no" \
        --progress "$PROJECT_DIR/out/" $ALIYUN_SERVER:$SERVER_PATH/
    
    # Handle editor/ms-3/index.html
    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $ALIYUN_SERVER "
        rm -f $SERVER_PATH/editor/ms-3.html
        cp $SERVER_PATH/editor/ms-3.html $SERVER_PATH/editor/ms-3/index.html 2>/dev/null || true
        chmod -R 755 $SERVER_PATH
        chown -R www-data:www-data $SERVER_PATH
    "
    
    log_info "Deployment completed! Version: $version"
}

# List available versions
list_versions() {
    log_info "=== Server Backups ==="
    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $SERVER "ls -1t $BACKUP_PATH/ 2>/dev/null | head -10"
    
    echo ""
    log_info "=== Git Tags ==="
    cd "$PROJECT_DIR"
    git tag -l --sort=-vcreatordate | head -10
}

# Rollback to specific version
rollback_to() {
    local version=$1
    
    log_warn "Rolling back to: $version"
    
    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $SERVER "
        rm -rf $SERVER_PATH/*
        cp -r $BACKUP_PATH/$version/* $SERVER_PATH/
        chmod -R 755 $SERVER_PATH
        chown -R www-data:www-data $SERVER_PATH
    "
    
    log_info "Rollback completed!"
}

# Rollback to previous version
rollback() {
    local latest=$(sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $SERVER "cat $BACKUP_PATH/latest 2>/dev/null")
    
    if [ -z "$latest" ]; then
        log_error "No backup found!"
        exit 1
    fi
    
    # Find previous version
    local prev=$(sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $SERVER "ls -1t $BACKUP_PATH/ | grep -v $latest | head -1")
    
    if [ -z "$prev" ]; then
        log_error "No previous version found!"
        exit 1
    fi
    
    rollback_to "$prev"
}

# Main
case "${1:-deploy}" in
    deploy)
        deploy
        ;;
    rollback)
        rollback
        ;;
    list)
        list_versions
        ;;
    *)
        if [[ "$1" =~ ^[0-9]+$ ]]; then
            # Rollback to version by number
            version=$(sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no $SERVER "ls -1t $BACKUP_PATH/ | sed -n '${1}p'")
            rollback_to "$version"
        else
            rollback_to "$1"
        fi
        ;;
esac
