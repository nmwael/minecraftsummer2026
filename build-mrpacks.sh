#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VERSION=$(grep -oP '^version = "\K[^"]+' packwiz/pack.toml)

# Export client pack to mrpack
echo "Building client mrpack (v$VERSION)..."
packwiz modrinth export --output "$SCRIPT_DIR/summer-2026-survival-client-$VERSION.mrpack"

# Export server pack to mrpack
echo "Building server mrpack (v$VERSION)..."
packwiz modrinth export --output "$SCRIPT_DIR/summer-2026-survival-server-$VERSION.mrpack"

echo "Done."
