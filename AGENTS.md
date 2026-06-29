# Summer 2026 Survival — Modpack Project

## Project Overview

A curated Minecraft 26.1.2 modpack for a parent and two children. The pack emphasizes exploration, colony-building, and decoration — with a family-friendly, cooperative experience.

## Players & Preferences

- **Child A** — Loves exploration and village enhancement. Enjoys venturing into new biomes, finding cool structures, and trading with villagers.
- **Child B** — Loves exploration and creative building with decoration. Enjoys gathering building materials, furnishing homes, and making bases look great.
- **Parent** — Wants a stable, polished pack that all three can enjoy together. Needs JourneyMap for navigation.

## Required Mod

- **JourneyMap** — essential for all players
- **Minecraft version: 26.1.2** (stable modding version for 2026, replaces 1.21.1)
- **Loader: NeoForge 26.1.2** (Forge is dead at 26.x+; NeoForge is the standard)

## Pack Design Principles

0. **Stability first** — prefer well-maintained, compatible mods. Avoid alpha/beta mods or known conflicts.
1. **Family-friendly** — no horror/gore mods, keep it age-appropriate.
2. **Performance matters** — include optimization mods (Sodium, Lithium) so it runs well on a range of hardware.
3. **Cooperative play** — prefer mods that work well in multiplayer/LAN.

## Mod Categories

| Category | Included Mods |
|---|---|
| **Exploration / World Gen** | Biomes O' Plenty, Terralith, Repurposed Structures, Towns and Towers, Lio's Overhauled Villages, Waystones |
| **Village Enhancement** | Towns and Towers, Lio's Overhauled Villages, More Villagers (if 26.x build verified) |
| **Decoration / Building** | Macaw's全套 (doors, trapdoors, fences, roofs, furniture, bridges, windows), Beautify: Redesigned |
| **Mobs / Pets** | Alex's Mobs (NeoForge port), Companion |
| **Quality of Life** | JourneyMap, JEI, Jade, AppleSkin, BetterF3, Inventory Profiles Next |
| **Performance** | Optimized FPS (base pack v4.2.0 — 19 performance mods bundled) |
| **Multiplayer / Server** | FTB Chunks, FTB Teams, FTB Library |

## Lost Mods (from 1.20.1 plan)

- Supplementaries, YUNG's mods, CTOV, Decorative Blocks, Let's Do Furniture, Handcrafted, Adorable Hamster Pets — all stuck at 1.21.x or older. Replacements documented in modlist.md.

## Tech Stack & Tools

- **Mod loader:** NeoForge 26.1.2
- **Modpack format:** Extends [Optimized FPS](https://modrinth.com/modpack/optimized-fps) v4.2.0 as base performance pack + additional content mods
- **Development:** This devcontainer includes opencode.ai for AI-assisted modpack management
- **Distribution:** Can use a GitHub release with the modpack zip or point to a modrinth/packwiz pack.
- With the `AI_FUN_TOKEN` environment variable set, the `gh` CLI can be used from the AI environment to automate release creation and asset upload. For example, after tagging a new version and ensuring the `*.mrpack` files exist in the current directory, run:

```bash
export GH_TOKEN=$AI_FUN_TOKEN
gh release create v1.0.1 \
  --repo nmwael/minecraftsummer2026 \
  --notes "Release notes: bump version to 1.0.1, built client and server mrpacks." \
  --title "Summer 2026 Survival v1.0.1" \
  --file summer-2026-survival-client-1.0.1.mrpack \
  --file summer-2026-survival-server-1.0.1.mrpack
```

The `--file` options tell `gh` to upload each mrpack as an asset, so they will appear on the release page (e.g., https://github.com/nmwael/minecraftsummer2026/releases/tag/v1.0.1). No manual token configuration is needed.
- **Java:** 25 (required by Minecraft 26.x)

## How the AI Should Help

- Research mods that fit the criteria above — check they're for 26.1.2, open-source, and actively maintained
- Suggest additions with brief reasoning for inclusion
- Resolve conflicts between mods, suggest load order, and recommend config tweaks

## Useful Commands

- Run the devcontainer to set up the environment
- Use opencode to search for mod info, compare mods, or generate configs
- Git commit messages should describe changes to the modpack (e.g., "rewrite modlist.md for Minecraft 26.1.2")

## Notes

- The repo name `minecraftsummer2026` is the pack name
- All three players will play together on a LAN world or small server
- Mods should be balanced — don't make survival too easy, but remove excessive grind
- Minecraft 26.1 removed obfuscation — modding ecosystem is healthier and faster-moving

## Releasing the Modpack

1. **Increment the version** in `packwiz/pack.toml` (`version = "X.Y.Z"`).  
2. **Export the packs**: run `./build-mrpacks.sh`. This creates  
   `summer-2026-survival-client-<version>.mrpack` and  
   `summer-2026-survival-server-<version>.mrpack`.  
3. **Commit & tag**:  
   ```bash
   git add packwiz/*.mrpack
   git commit -m "Release vX.Y.Z"
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   git push origin main --tags
   ```  
4. **Create a GitHub Release**:  
   - Go to *Releases* on the repository page.  
   - Click *Draft a new release*, select the tag `vX.Y.Z`, fill in release notes, and publish.  
   - Upload the two `.mrpack` files as assets.  

   *(Alternatively, if the `gh` CLI is installed, run:*  
   `gh release create vX.Y.Z --notes "Release notes" --files *.mrpack`*  
   *to upload assets automatically.)*