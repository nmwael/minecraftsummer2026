# Summer 2026 Survival — Server

**Minecraft:** 26.1.2 · **Loader:** NeoForge 26.1.2.74 · **Server mods:** 55

## Quick Start

```bash
sh setup-server.sh   # downloads NeoForge, mods, accepts EULA
sh start.sh          # starts the server (default 4G RAM)
sh start.sh 6G       # or with custom memory
```

## Client-Only Mods (not on server)

These are installed on the Prism Launcher client pack but excluded from the server:

- JourneyMap (client minimap)
- BetterF3 (client debug screen)
- Legendary Tooltips (client tooltip rendering)
- Traveler's Titles (client biome title display)
- AppleSkin (client hunger HUD)
- Iceberg, Prism, YUNG's API (libraries for the above)

## Port Forwarding

To play over the internet, forward port `25565` (TCP) on your router to the server machine. For LAN play, no port forwarding is needed — players join via the LAN button in-game.

## Recommended

- Don't run the server on the same machine you play on if possible (performance)
- Use [Chunky](https://modrinth.com/mod/chunky) to pre-generate chunks around spawn
- Set `white-list=true` and add players to `whitelist.json` for a family-only server