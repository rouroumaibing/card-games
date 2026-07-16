# CrimsonFront

> English | [中文](README.zh-CN.md)

A Red Alert-inspired card battle game running on [card-battle-framework](../../README.md).

## Gameplay

### Core Rules

- **Base health**: 20
- **Power**: 0–10, +1 per turn
- **Max turns**: 50
- **Starting hand**: 3 cards
- **Attack rule**: Taunt — must attack taunt units first; otherwise can attack face
- **Death timing**: Attack-only — deaths resolved during attack resolution

### Factions

| Faction | Color | Style |
|---------|-------|-------|
| Coalition | Blue | Conventional military (USA, Korea, France, Germany, Britain) |
| Crimson | Red | Soviet-style aggressive units (Russia, Libya, Iraq, Cuba) |
| Psion | Purple | Psychic / mind control |
| Neutral | Gray | Buildings + utility units |

### Cards

- **56 cards total**: 34 minions, 13 spells, 9 buildings
- **Faction distribution**: Coalition 16, Crimson 16, Psion 12, Neutral 12
- **Rarity tiers**: Common, Rare, Epic, Legendary
- **Legendary cards**: weather, nuke, leviathan, psi_avatar

### Preset Decks

10 national presets: USA, Korea, France, Germany, Britain, Russia, Libya, Iraq, Cuba, Psilord.

### Deck Rules

- 30 cards per deck
- Max 2 copies of the same card
- Max 3 buildings
- Max 1 superweapon (legendary spell)

## Quick Start

| Mode | Command |
|------|---------|
| Browser | `python3 -m http.server 8000` → open `localhost:8000/card-games/crimsonfront/web/` |
| CLI smoke test | `npm run crimsonfront` |
| Online server | `npm run crimsonfront:server` (WS port 8099) |
| Desktop dev | `npm run desktop:crimsonfront` |

- **Browser**: Serve the repo root with any static server, then navigate to the web entry.
- **Online**: Start the WS server, then open the browser entry and click "Online Battle" in the lobby.
- **Desktop**: Embedded WS server — no separate server process needed.

## Project Structure

```
card-games/crimsonfront/
├── config/
│   ├── meta.js            # Game metadata (id, name, faction colors)
│   ├── cards.js           # 56-card pool + deck validation (CJS)
│   ├── effects.js         # EffectRegistry registrations (CJS)
│   ├── rules.js           # Rule flags + hooks (CJS)
│   ├── index.js           # Pack entry: assembles meta/cards/rules/effects (CJS)
│   ├── theme.mjs          # Theme tokens, factions, tabs, labels (ESM)
│   ├── presetDecks.mjs    # 10 preset decks (ESM)
│   ├── battleFx.mjs       # Battle screen FX config (ESM)
│   ├── battleFx.css       # Battle FX styles
│   ├── videoCrypt.mjs     # Video encryption keys/manifest (ESM)
│   ├── cards.data.mjs     # Generated card pool mirror (tool output)
│   ├── dist/              # ESM build output
│   └── assets/
│       ├── cards/         # Card art (56 PNGs)
│       ├── videos/        # Encrypted video effects (.bin + .mp4)
│       ├── app_icon.png
│       └── title_splash.png
├── run.js                 # CLI entry (node run.js [seed])
├── server.js              # Online WS server entry (node server.js [port])
└── web/
    └── index.html         # Browser entry (game × shell coupling point)
```

**Module format boundary**: `meta.js`, `cards.js`, `effects.js`, `rules.js`, `index.js` are CommonJS (Node + config loader). `theme.mjs`, `presetDecks.mjs`, `battleFx.mjs`, `videoCrypt.mjs` are ESM (browser). `cards.data.mjs` and `dist/*.mjs` are tool-generated — do not hand-edit.

## Build Commands

| Purpose | Command |
|---------|---------|
| ESM build | `npm run build:esm:crimsonfront` |
| Card pool generation | `npm run gen:cards:crimsonfront` |
| Video encryption | `npm run build:videos:crimsonfront` |
| Desktop release | `npm run release:crimsonfront` |
| Clean build output | `npm run clean` |

> `cards.data.mjs` and `dist/*.mjs` are generated artifacts. Re-run the build after changing `.js` sources.

## Configuration

The game uses the framework's three-layer extensibility model:

- **EffectRegistry** — per-card effects via 6 active triggers: `battlecry`, `onPlay`, `onBuild`, `deathrattle`, `onTurnStart`, `onTurnEnd`
- **rules.flags** — declarative rule differences (base health, max power, attack rule, etc.)
- **rules.hooks** — custom logic with whitelist (e.g. barracks infantry cost reduction)

### Further Reading

- Framework design: [`docs/prompts/FRAMEWORK_DESIGN_PROMPT.md`](../../docs/prompts/FRAMEWORK_DESIGN_PROMPT.md)
- Game design: [`docs/prompts/CRIMSONFRONT_DESIGN_PROMPT.md`](docs/prompts/CRIMSONFRONT_DESIGN_PROMPT.md)

## License

MIT
