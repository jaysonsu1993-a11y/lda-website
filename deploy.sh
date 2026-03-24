#!/bin/bash

# LdA Website Deployment Script
# This script automates the complete deployment process to avoid hydration issues

# Load local-only configuration (NOT uploaded to GitHub)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SCRIPT_DIR/.env.deploy" ]; then
    source "$SCRIPT_DIR/.env.deploy"
else
    echo "Error: .env.deploy not found!"
    echo "Please create .env.deploy with your server configuration."
    echo "See .env.deploy.example for the template."
    exit 1
fi

# Fallback PROJECT_DIR if not set
PROJECT_DIR="${PROJECT_DIR:-$SCRIPT_DIR}"

# Check if password is set
if [ -z "$DEPLOY_PASS" ]; then
    echo "Error: DEPLOY_PASS not set in .env.deploy!"
    exit 1
fi

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Step 1: Clean local build
log_info "Step 1: Cleaning local build..."
cd "$PROJECT_DIR"
rm -rf out/ .next/
log_info "Local build cleaned!"

# Step 2: Build
log_info "Step 2: Building Next.js project..."
npm run build
if [ $? -ne 0 ]; then
    log_error "Build failed!"
    exit 1
fi
log_info "Build completed!"

# Step 3: Clean server directory completely
log_info "Step 3: Cleaning server directory..."
sshpass -p "$DEPLOY_PASS" ssh -o StrictHostKeyChecking=no $ALIYUN_SERVER "rm -rf $SERVER_PATH/*"
log_info "Server directory cleaned!"

# Step 4: Deploy all files
log_info "Step 4: Deploying to server..."
rsync -avz -e "ssh -o StrictHostKeyChecking=no" \
    --progress "$PROJECT_DIR/out/" $ALIYUN_SERVER:$SERVER_PATH/

# Step 5: Fix editor routing (copy .html to index.html for directory routes)
# Next.js static export generates .html files but not index.html inside directories
# This causes 404 when Nginx serves directory without index.html
log_info "Step 5: Fixing directory routing (copy .html to index.html)..."
sshpass -p "$DEPLOY_PASS" ssh -o StrictHostKeyChecking=no $ALIYUN_SERVER "
    cd $SERVER_PATH
    # Fix all language/prefixed sub-routes
    for lang in en zh; do
        # Main sub-pages
        for page in ms-3 store lab editor gallery downloads support terms privacy; do
            if [ -f \"\$lang/\$page.html\" ] && [ -d \"\$lang/\$page\" ]; then
                cp \"\$lang/\$page.html\" \"\$lang/\$page/index.html\"
                rm -f \"\$lang/\$page.html\"
            fi
        done
        # Nested routes: editor/ms-3 and ms-3/editor
        for nested in editor/ms-3 ms-3/editor; do
            if [ -f \"\$lang/\$nested.html\" ] && [ -d \"\$lang/\$nested\" ]; then
                cp \"\$lang/\$nested.html\" \"\$lang/\$nested/index.html\"
                rm -f \"\$lang/\$nested.html\"
            fi
        done
    done
"

# Step 6: Set permissions
log_info "Step 6: Setting permissions..."
sshpass -p "$DEPLOY_PASS" ssh -o StrictHostKeyChecking=no $ALIYUN_SERVER "
    chmod -R 755 $SERVER_PATH
    chown -R www-data:www-data $SERVER_PATH
"

# Step 7: Git commit and push
log_info "Step 7: Git commit and push..."
cd "$PROJECT_DIR"
VERSION="v$(date +%Y%m%d_%H%M%S)"
if git diff --quiet && git diff --cached --quiet; then
    log_warn "No changes to commit"
else
    git add -A
    git commit -m "$VERSION"
    GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no" git push -u origin main --tags
    log_info "Git commit and push completed: $VERSION"
fi

log_info "========================================="
log_info "Deployment completed successfully!"
log_info "========================================="
