import type { RefObject } from "react";

interface GameCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function GameCanvas({ canvasRef, containerRef }: GameCanvasProps) {
  return (
    <div className="game-frame" ref={containerRef}>
      <canvas className="game-frame__canvas" ref={canvasRef} />
      <div className="game-frame__caption">WASD to move. Aim with the cursor. Esc pauses the run.</div>
    </div>
  );
}
