import Button from "../components/ui/Button";
import GameContainer from "../components/game/GameContainer";
import { useGameStore } from "../store/gameStore";
import { useUIStore } from "../store/uiStore";

export default function GamePage() {
  const status = useGameStore((state) => state.snapshot.status);
  const startRun = useGameStore((state) => state.startRun);
  const setStatus = useGameStore((state) => state.setStatus);
  const setScreen = useUIStore((state) => state.setScreen);
  const openSettings = useUIStore((state) => state.openSettings);

  return (
    <main className="page-shell game-page">
      <header className="page-topbar">
        <div>
          <span className="page-kicker">Dungeon Floor Alpha</span>
          <h1 className="page-heading">Dungeon Survivor</h1>
        </div>

        <div className="page-topbar__actions">
          <Button
            onClick={() => {
              setStatus("menu");
              setScreen("home");
            }}
            variant="ghost"
          >
            Home
          </Button>
          <Button
            onClick={() => {
              if (status === "running") {
                setStatus("paused");
                return;
              }

              if (status === "paused") {
                setStatus("running");
              }
            }}
            variant="secondary"
          >
            {status === "paused" ? "Resume" : "Pause"}
          </Button>
          <Button onClick={startRun} variant="secondary">
            Restart
          </Button>
          <Button onClick={openSettings}>Settings</Button>
        </div>
      </header>

      <GameContainer />
    </main>
  );
}
