#!/usr/bin/env bash
# Summer 2026 Survival — Server Setup Script
# Run this in an empty directory to set up a NeoForge 26.1.2 server.
set -euo pipefail

SERVER_JAR="neoforge-26.1.2.74-installer.jar"
SERVER_URL="https://maven.neoforged.net/releases/net/neoforged/neoforge/26.1.2.74/neoforge-26.1.2.74-installer.jar"

echo "==================================="
echo " Summer 2026 Survival — Server"
echo "==================================="

# 1. Download NeoForge installer
if [ ! -f "$SERVER_JAR" ]; then
  echo "Downloading NeoForge 26.1.2.74..."
  curl -sSL -o "$SERVER_JAR" "$SERVER_URL"
fi

# 2. Install server (no gui, offline)
if [ ! -f "neoforge-26.1.2.74.jar" ]; then
  echo "Installing NeoForge server..."
  java -jar "$SERVER_JAR" --installServer --no-gui
fi

# 3. Accept EULA
if [ ! -f "eula.txt" ]; then
  echo "eula=true" > eula.txt
  echo "Accepted EULA"
fi

# 4. Download mods via packwiz
if command -v packwiz &>/dev/null; then
  echo "Downloading server mods via packwiz..."
  packwiz install --all
elif [ -d "mods" ] && ls mods/*.jar &>/dev/null 2>&1; then
  echo "Mods already present in mods/"
else
  echo "WARNING: packwiz not found and no mods present."
  echo "Install packwiz from https://packwiz.infra.link/ or copy mod jars manually."
fi

echo ""
echo "==================================="
echo " Setup complete!"
echo " Run: ./start.sh"
echo "==================================="