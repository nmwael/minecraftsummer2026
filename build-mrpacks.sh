#!/usr/bin/env bash
set -euo pipefail

# Export client pack to mrpack
echo "Building client mrpack..."
packwiz export --format mrpack --output ../summer-2026-survival.mrpack

# Export server pack to mrpack
echo "Building server mrpack..."
packwiz export --format mrpack --output ../summer-2026-survival-server.mrpack

echo "Done."