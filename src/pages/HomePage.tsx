import StartScreen from "../components/menu/StartScreen";
import Panel from "../components/ui/Panel";
import { useGameStore } from "../store/gameStore";
import { useUIStore } from "../store/uiStore";

export default function HomePage() {
  const bestTimeMs = useGameStore((state) => state.snapshot.bestTimeMs);
  const startRun = useGameStore((state) => state.startRun);
  const openSettings = useUIStore((state) => state.openSettings);
  const setScreen = useUIStore((state) => state.setScreen);

  const handleStart = () => {
    startRun();
    setScreen("game");
  };

  return (
    <main className="page-shell page-shell--home">
      <div className="hero-grid">
        <StartScreen bestTimeMs={bestTimeMs} onOpenSettings={openSettings} onStart={handleStart} />

        <div className="info-stack">
          <Panel eyebrow="Controls" title="How To Survive">
            <ul className="bullet-list">
              <li>Move with WASD and kite around dungeon obstacles.</li>
              <li>Projectiles auto-fire toward your cursor or the nearest enemy.</li>
              <li>Pick up XP shards to trigger level-up upgrade choices.</li>
            </ul>
          </Panel>

          <Panel eyebrow="Architecture" title="Scalable Foundation">
            <ul className="bullet-list">
              <li>React + TypeScript + Vite app shell with reusable UI components.</li>
              <li>Zustand stores separated by game, UI, and settings concerns.</li>
              <li>Canvas engine split into entities, systems, managers, and world data.</li>
            </ul>
          </Panel>
        </div>
      </div>
    </main>
  );
}
