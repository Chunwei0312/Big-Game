# Dungeon Survivor

Dungeon Survivor is a scalable React + TypeScript + Vite project for a canvas-based roguelike survival game. It ships with a playable MVP and a modular engine layout that can grow into a fuller survivor-style game.

## MVP

- React 19 + TypeScript + Vite app shell
- Canvas rendering driven by `requestAnimationFrame`
- Zustand stores for game state, UI state, and settings
- WASD movement
- Enemy spawning and chase AI
- Projectile attacks aimed by cursor or nearest target
- Player, enemy, projectile, item, and obstacle collision
- XP pickup, leveling, upgrades, pause, restart, and game-over flow

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

## Verification

```bash
npm run check
npm run test
npm run build
```

## Next Steps

- Add sprite sheets, animation states, and audio assets
- Expand skills into reusable effect archetypes
- Introduce procedural map generation and richer wave scripting
- Layer in save-driven meta progression through `saveManager`
