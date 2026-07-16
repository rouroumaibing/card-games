# card-games

> English | [中文](README.zh-CN.md)

Game packages for [card-battle-framework](../README.md). Each subdirectory is a complete, self-contained game that runs on the shared engine + UI shell.

## Games

| Game | Description | README |
|------|-------------|--------|
| crimsonfront | Red Alert-inspired card battle game | [README](crimsonfront/README.md) |

## Structure

```
card-games/
├── crimsonfront/          # A complete game package
│   ├── config/            # Game-specific configuration
│   │   ├── cards.js       # Card definitions (CJS)
│   │   ├── effects.js     # Effect registry (CJS)
│   │   ├── rules.js       # Rules: flags + hooks (CJS)
│   │   ├── meta.js        # Metadata: factions, rarities (CJS)
│   │   ├── index.js       # Game pack entry (CJS)
│   │   ├── theme.mjs      # Theme: colors, strings, images (ESM)
│   │   ├── presetDecks.mjs# Preset decks (ESM)
│   │   ├── battleFx.mjs   # Battle screen FX config (ESM)
│   │   ├── battleFx.css   # Battle FX styles
│   │   ├── videoCrypt.mjs # Video encryption config (ESM)
│   │   ├── cards.data.mjs # Generated card pool mirror (ESM, auto-generated)
│   │   ├── dist/          # Generated ESM build output (auto-generated)
│   │   └── assets/        # Card images, videos, icons
│   ├── run.js             # CLI entry point
│   ├── server.js          # Online battle WebSocket server
│   ├── web/index.html     # Browser entry point
│   └── docs/prompts/      # Regeneration prompts
├── .gitignore             # Excludes build artifacts
└── LICENSE                # MIT
```

## Development

### Prerequisites

- Node.js >= 16
- The parent [card-battle-framework](../README.md) repo (provides engine + UI shell + build tooling)

### Build Commands

Run from the parent repo root:

```bash
# ESM build (engine + game config CJS → ESM)
npm run build:esm -- <game>

# Generate card pool mirror
npm run gen:cards -- <game>

# Video encryption
npm run build:videos -- <game>

# CLI smoke test
npm run <game>

# Online battle server (WebSocket on port 8099)
npm run <game>:server

# Desktop dev mode
npm run desktop -- <game>
```

### Adding a New Game

See the framework's [New Game Development Guide](../docs/new_game_guidance/DEVELOPMENT_GUIDE.md) for a 12-step tutorial, or use the [New Game Prompt Template](../docs/new_game_guidance/NEW_GAME_PROMPT.md) for AI-assisted generation.

### Module Format Convention

- **CommonJS** (`.js`): `cards.js`, `effects.js`, `rules.js`, `meta.js`, `index.js`, `run.js`, `server.js`
- **ESM** (`.mjs`): `theme.mjs`, `presetDecks.mjs`, `battleFx.mjs`, `videoCrypt.mjs`, `cards.data.mjs`, `dist/*.mjs`

## License

[MIT](LICENSE)
