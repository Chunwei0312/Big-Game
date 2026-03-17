import { useEffect } from "react";
import type { InputController } from "../game";
import { isTrackedMovementKey, setKeyState } from "../game";

export function useKeyboard(controller: InputController): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isTrackedMovementKey(event.code) && event.code !== "Escape") {
        return;
      }

      event.preventDefault();
      setKeyState(controller, event.code, true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!isTrackedMovementKey(event.code) && event.code !== "Escape") {
        return;
      }

      event.preventDefault();
      setKeyState(controller, event.code, false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [controller]);
}
