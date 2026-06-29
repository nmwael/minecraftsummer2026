#!/usr/bin/env bash
set -euo pipefail

MODS_DIR="/workspaces/minecraftsummer2026/mods"
mkdir -p "$MODS_DIR"

# Helper: download from Modrinth using project slug + version
# Usage: mr <slug> [extra-version-filter]
mr() {
  local slug="$1"
  local filter="${2:-}"
  local outfile="$MODS_DIR/${slug}.jar"
  echo "=== Fetching $slug (Modrinth) ==="
  
  local url="https://api.modrinth.com/v2/project/${slug}/version"
  if [ -n "$filter" ]; then
    url="${url}?${filter}"
  fi
  
  # Get the first version file URL
  local dl
  dl=$(curl -sS "$url" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if isinstance(data, list) and len(data) > 0:
    v = data[0]
    files = v.get('files', [])
    if files:
        print(files[0]['url'])
" 2>/dev/null || true)
  
  if [ -z "$dl" ]; then
    echo "ERROR: Could not find download for $slug"
    return 1
  fi
  
  echo "Downloading $dl"
  curl -sSL -o "$outfile" "$dl"
  echo "Saved to $outfile ($(du -h "$outfile" | cut -f1))"
}

# For mods that need specific version IDs from Modrinth
mr_version() {
  local slug="$1"
  local ver_id="$2"
  local outfile="$MODS_DIR/${slug}.jar"
  echo "=== Fetching $slug (Modrinth version $ver_id) ==="
  
  local dl
  dl=$(curl -sS "https://api.modrinth.com/v2/version/${ver_id}" | python3 -c "
import json, sys
data = json.load(sys.stdin)
files = data.get('files', [])
if files:
    print(files[0]['url'])
" 2>/dev/null || true)
  
  if [ -z "$dl" ]; then
    echo "ERROR: Could not find download for $slug"
    return 1
  fi
  
  curl -sSL -o "$outfile" "$dl"
  echo "Saved to $outfile ($(du -h "$outfile" | cut -f1))"
}

# Helper: download from CurseForge using project ID and file ID
# Note: CurseForge requires a direct download URL pattern
mr_cf() {
  local filename="$1"
  local url="$2"
  local outfile="$MODS_DIR/$filename"
  echo "=== Fetching $filename (CurseForge) ==="
  curl -sSL -o "$outfile" "$url"
  echo "Saved to $outfile ($(du -h "$outfile" | cut -f1))"
}

echo "=========================================="
echo " Downloading MinecraftSummer2026 Mods"
echo "=========================================="

# =============================================
# EXPLORATION / WORLD GEN
# =============================================

# Biomes O'Plenty - use specific version for 26.1.2 NeoForge
mr_version "biomes-o-plenty" "8gqa3I6u"

# TerraBlender - needed by BOP
mr_version "terrablender" "JIWVAUKP"

# Terralith - datapack (zip file), just download directly
echo "=== Fetching Terralith (datapack) ==="
curl -sSL -o "$MODS_DIR/Terralith_26.1_v2.6.2.zip" \
  "https://cdn.modrinth.com/data/8oi3bsk5/versions/f1lDwn23/Terralith_26.1_v2.6.2.zip"
echo "Saved Terralith datapack"

# Repurposed Structures - NeoForge 26.1
echo "=== Fetching Repurposed Structures ==="
curl -sSL -o "$MODS_DIR/repurposed_structures-7.7.4+26.1-neoforge.jar" \
  "https://mediafilez.forgecdn.net/files/7953/275/repurposed_structures-7.7.3+26.1-neoforge.jar"

# Towns and Towers
mr_version "towns-and-towers" "eN3WLQ3P"

# Cristel Lib (needed by Towns and Towers)
echo "=== Fetching Cristel Lib ==="
curl -sSL -o "$MODS_DIR/cristellib-neoforge-26.1-3.1.3.jar" \
  "https://cdn.modrinth.com/data/cl223EMc/versions/MfAQnL3f/cristellib-neoforge-26.1-3.1.3.jar"

# Lio's Overhauled Villages
mr_version "lios-overhauled-villages" "e2X0tIoN"

# Waystones
# Requires Balm (downloaded below)
echo "=== Fetching Waystones ==="
curl -sSL -o "$MODS_DIR/waystones-neoforge-26.1.2-26.1.2.2.jar" \
  "https://mediafilez.forgecdn.net/files/7976/460/waystones-neoforge-26.1.2-26.1.2.2.jar"

# Tectonic
echo "=== Fetching Tectonic ==="
curl -sSL -o "$MODS_DIR/tectonic-3.0.22-neoforge-26.1.jar" \
  "https://cdn.modrinth.com/data/lWDHr9jE/versions/WLiadfmY/tectonic-3.0.22-neoforge-26.1.jar"

# Dungeons and Taverns
echo "=== Fetching Dungeons and Taverns ==="
curl -sSL -o "$MODS_DIR/dungeons-and-taverns-5.2.0-neoforge.jar" \
  "https://mediafilez.forgecdn.net/files/7816/696/dungeons-and-taverns-5.2.0%20%5BNeoForge%5D.jar"

# Moog's Soaring Structures
echo "=== Fetching Moog's Soaring Structures ==="
curl -sSL -o "$MODS_DIR/MoogsSoaringStructures-1.21-2.0.0.jar" \
  "https://cdn.modrinth.com/data/RJCLIx7k/versions/MSUM0j0G/MoogsSoaringStructures-1.21-2.0.0.jar"

# NoisiumForked (optimized noise generation)
echo "=== Fetching NoisiumForked ==="
curl -sSL -o "$MODS_DIR/noisium-neoforge-2.8.4+mc1.21.11.jar" \
  "https://cdn.modrinth.com/data/hasdd01q/versions/DEJ8IfHC/noisium-neoforge-2.8.4+mc1.21.11.jar"

# =============================================
# DECORATION / BUILDING
# =============================================

# Macaw's Doors
mr "macaws-doors"

# Macaw's Trapdoors
echo "=== Fetching Macaw's Trapdoors ==="
curl -sSL -o "$MODS_DIR/mcw-trapdoors-1.1.3-mc1.21.4neoforge.jar" \
  "https://cdn.modrinth.com/data/4rl0i8Ac/versions/mcw-trapdoors-1.1.3-mc1.21.4neoforge.jar"

# Macaw's Fences & Walls
echo "=== Fetching Macaw's Fences & Walls ==="
curl -sSL -o "$MODS_DIR/mcw-fences-1.1.2-mc1.21.4neoforge.jar" \
  "https://cdn.modrinth.com/data/tRpFmiKy/versions/mcw-fences-1.1.2-mc1.21.4neoforge.jar"

# Macaw's Roofs
echo "=== Fetching Macaw's Roofs ==="
curl -sSL -o "$MODS_DIR/mcw-roofs-2.3.2-mc1.21.4neoforge.jar" \
  "https://cdn.modrinth.com/data/6zchU1pl/versions/mcw-roofs-2.3.2-mc1.21.4neoforge.jar"

# Macaw's Furniture
mr "macaws-furniture"

# Macaw's Bridges
echo "=== Fetching Macaw's Bridges ==="
curl -sSL -o "$MODS_DIR/mcw-bridges-3.0.0-mc1.21.4neoforge.jar" \
  "https://cdn.modrinth.com/data/vaSJTp2H/versions/mcw-bridges-3.0.0-mc1.21.4neoforge.jar"

# Macaw's Windows
echo "=== Fetching Macaw's Windows ==="
curl -sSL -o "$MODS_DIR/mcw-windows-2.2.2-mc1.21.4neoforge.jar" \
  "https://cdn.modrinth.com/data/2bP9BQpS/versions/mcw-windows-2.2.2-mc1.21.4neoforge.jar"

# Beautify: Redesigned
echo "=== Fetching Beautify ==="
curl -sSL -o "$MODS_DIR/beautify-neoforge-26.1-1.2.0.jar" \
  "https://cdn.modrinth.com/data/Oy3L06aF/versions/beautify-neoforge-26.1-1.2.0.jar"

# Chisel Modern
echo "=== Fetching Chisel Modern ==="
curl -sSL -o "$MODS_DIR/chisel-26.1-NeoForge-1.3.4.jar" \
  "https://mediafilez.forgecdn.net/files/..."  # Needs specific URL

# Fantasy's Furniture
echo "=== Fetching Fantasy's Furniture ==="
mr "fantasy-furniture"

# Skniro's Furniture
echo "=== Fetching Skniro's Furniture ==="
curl -sSL -o "$MODS_DIR/SkniroFurniture-1.5.0-1.21.11-NeoForge.jar" \
  "https://cdn.modrinth.com/data/pezpt98N/versions/SkniroFurniture-1.5.0-1.21.11-NeoForge.jar"

# =============================================
# MOBS / PETS
# =============================================

# Alex's Mobs (NeoForge 26.1 port by Astryxion)
echo "=== Fetching Alex's Mobs NeoForge ==="
mr "alexs-mobs"

# Citadel (NeoForge) - needed by Alex's Mobs
echo "=== Fetching Citadel NeoForge ==="
curl -sSL -o "$MODS_DIR/citadel-neoforge-26.1-1.0.0.jar" \
  "https://mediafilez.forgecdn.net/files/7918/739/Citadel-NeoForge-26.1-v1.0.0.jar"

# Companion
echo "=== Fetching Companion ==="
mr "companion"

# =============================================
# QUALITY OF LIFE
# =============================================

# JourneyMap
mr "journeymap"

# JEI
mr "jei"

# Jade
mr "jade"

# AppleSkin
mr "appleskin"

# BetterF3
echo "=== Fetching BetterF3 ==="
mr "betterf3"

# Inventory Profiles Next
echo "=== Fetching Inventory Profiles Next ==="
mr "inventory-profiles-next"

# =============================================
# PERFORMANCE
# =============================================

# Sodium
mr "sodium"

# Lithium
echo "=== Fetching Lithium ==="
mr "lithium"

# FerriteCore
echo "=== Fetching FerriteCore ==="
mr "ferrite-core"

# ModernFix
echo "=== Fetching ModernFix ==="
mr "modernfix"

# Entity Culling
echo "=== Fetching Entity Culling ==="
mr "entityculling"

# ImmediatelyFast
echo "=== Fetching ImmediatelyFast ==="
mr "immediatelyfast"

# C2ME
echo "=== Fetching C2ME ==="
mr "c2me"

# Fusion (Connected Textures)
echo "=== Fetching Fusion ==="
mr "fusion-connected-textures"

# =============================================
# MULTIPLAYER / SERVER
# =============================================

# FTB Chunks
echo "=== Fetching FTB Chunks ==="
mr "ftb-chunks"

# FTB Teams
echo "=== Fetching FTB Teams ==="
mr "ftb-teams"

# FTB Library
echo "=== Fetching FTB Library ==="
mr "ftb-library"

# =============================================
# DEPENDENCIES
# =============================================

# Balm (needed by Waystones)
echo "=== Fetching Balm ==="
curl -sSL -o "$MODS_DIR/balm-neoforge-26.1.2-26.1.2.6.jar" \
  "https://mediafilez.forgecdn.net/files/8019/517/balm-neoforge-26.1.2-26.1.2.5.jar"

echo ""
echo "=========================================="
echo " Download complete!"
echo "=========================================="
echo ""
echo "Files in $MODS_DIR:"
ls -lh "$MODS_DIR"
