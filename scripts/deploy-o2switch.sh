#!/bin/bash
# deploy-o2switch.sh — Run this via SSH on the o2switch server
# Usage: bash deploy-o2switch.sh
# Prereq: .env must already exist at /home/rivu1882/dokaipi/.env

set -e

APP_DIR="/home/rivu1882/dokaipi"
REPO_URL="https://github.com/Donquichot13/DokaiPi.git"
NODE_BIN="$HOME/.nvm/versions/node/v22.0.0/bin"

echo "=== DokaiPi Deploy Script ==="

# 1. Clone or pull
if [ -d "$APP_DIR/.git" ]; then
  echo "[1/6] Pulling latest changes..."
  cd "$APP_DIR"
  git pull origin master
else
  echo "[1/6] Cloning repository..."
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

# 2. Install pnpm if needed
if ! command -v pnpm &> /dev/null; then
  echo "[2/6] Installing pnpm..."
  npm install -g pnpm
fi

# 3. Install dependencies
echo "[3/6] Installing dependencies..."
pnpm install --frozen-lockfile

# 4. Generate Prisma client + run migrations
echo "[4/6] Running Prisma migrations..."
pnpm prisma migrate deploy
# Optional: seed initial admin user
# pnpm prisma db seed

# 5. Build Next.js
echo "[5/6] Building Next.js..."
pnpm build

# 6. Done — restart the Node.js app via cPanel touch
echo "[6/6] Touching restart.txt to trigger Passenger restart..."
mkdir -p "$APP_DIR/tmp"
touch "$APP_DIR/tmp/restart.txt"

echo ""
echo "=== Deploy complete! ==="
echo "If the app is not running yet, configure it in cPanel:"
echo "  cPanel > Setup Node.js App > Create"
echo "    Node version   : 22"
echo "    App mode       : Production"
echo "    App root       : $APP_DIR"
echo "    App URL        : dokaipi.fr"
echo "    Startup file   : server.js"
echo ""
echo "Then add these env vars in cPanel Node.js app settings:"
echo "  NODE_ENV=production"
echo "  (all others from .env are loaded by Next.js automatically)"
