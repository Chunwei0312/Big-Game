# Dungeon Survivor

A canvas-based roguelike survival prototype built with React,
TypeScript, Vite, and Zustand.

## What changed

- Single React app shell with dedicated home and game screens
- Modular canvas engine split into entities, systems, managers, and
  world data
- Zustand stores for gameplay state, UI state, and player settings
- Stable `requestAnimationFrame` game loop with keyboard and pointer
  input handling
- Responsive game layout with top HUD moved outside the stage so the
  map remains visible
- GitHub Pages-ready Vite build configuration for repository-based
  deployment

## Gameplay

- WASD player movement
- Auto-fired projectiles aimed by cursor or nearest enemy
- Enemy spawning with simple chase AI
- Collision handling for player, enemies, projectiles, items, and
  obstacles
- XP pickup, level-up choices, score tracking, pause, restart, and
  game-over flow

## Project Structure

```text
dungeon-survivor/
├─ public/
│  ├─ icons/
│  └─ sounds/
├─ src/
│  ├─ assets/
│  │  ├─ audio/
│  │  ├─ images/
│  │  └─ sprites/
│  ├─ components/
│  │  ├─ game/
│  │  │  ├─ GameCanvas.tsx
│  │  │  ├─ GameContainer.tsx
│  │  │  └─ PauseOverlay.tsx
│  │  ├─ hud/
│  │  │  ├─ ExpBar.tsx
│  │  │  ├─ HpBar.tsx
│  │  │  ├─ KillCounter.tsx
│  │  │  ├─ SkillBar.tsx
│  │  │  └─ Timer.tsx
│  │  ├─ menu/
│  │  │  ├─ GameOverScreen.tsx
│  │  │  ├─ LevelUpModal.tsx
│  │  │  ├─ SettingsModal.tsx
│  │  │  └─ StartScreen.tsx
│  │  └─ ui/
│  │     ├─ Button.tsx
│  │     ├─ Modal.tsx
│  │     └─ Panel.tsx
│  ├─ game/
│  │  ├─ data/
│  │  │  ├─ enemies.ts
│  │  │  ├─ items.ts
│  │  │  └─ skills.ts
│  │  ├─ engine/
│  │  │  ├─ gameLoop.ts
│  │  │  ├─ input.ts
│  │  │  ├─ renderer.ts
│  │  │  └─ timing.ts
│  │  ├─ entities/
│  │  │  ├─ enemy.ts
│  │  │  ├─ item.ts
│  │  │  ├─ player.ts
│  │  │  └─ projectile.ts
│  │  ├─ managers/
│  │  │  ├─ audioManager.ts
│  │  │  ├─ gameStateManager.ts
│  │  │  └─ saveManager.ts
│  │  ├─ systems/
│  │  │  ├─ collisionSystem.ts
│  │  │  ├─ combatSystem.ts
│  │  │  ├─ enemyAISystem.ts
│  │  │  ├─ levelSystem.ts
│  │  │  ├─ movementSystem.ts
│  │  │  └─ spawnSystem.ts
│  │  ├─ world/
│  │  │  ├─ map.ts
│  │  │  ├─ obstacles.ts
│  │  │  └─ waves.ts
│  │  └─ index.ts
│  ├─ hooks/
│  │  ├─ useGameEngine.ts
│  │  ├─ useKeyboard.ts
│  │  └─ useMouse.ts
│  ├─ pages/
│  │  ├─ GamePage.tsx
│  │  └─ HomePage.tsx
│  ├─ store/
│  │  ├─ gameStore.ts
│  │  ├─ settingsStore.ts
│  │  └─ uiStore.ts
│  ├─ styles/
│  │  └─ global.css
│  ├─ types/
│  │  ├─ enemy.ts
│  │  ├─ gameState.ts
│  │  ├─ item.ts
│  │  └─ player.ts
│  ├─ utils/
│  │  ├─ collision.ts
│  │  ├─ id.ts
│  │  ├─ math.ts
│  │  └─ random.ts
│  ├─ App.tsx
│  └─ main.tsx
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ README.md
```

The current workspace root contains this app directly, with placeholder asset folders already created under `public/` and `src/assets/`.

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run check
npm run test
npm run build
npm run verify
```

`npm run verify` runs typecheck, lint, tests, and production build in
sequence.

## Build and deploy

```bash
npm run build
npm run deploy
```

If GitHub Pages is enabled for the `gh-pages` branch, the deployed game
can be served from:

`https://chunwei0312.github.io/Big-Game/`

## Next steps

- Add sprites, animation states, and sound assets
- Expand combat into reusable weapons and skill archetypes
- Introduce richer waves, map generation, and progression systems
- Add CI workflow automation when the repository process is ready
