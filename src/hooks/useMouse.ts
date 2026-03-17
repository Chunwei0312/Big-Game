import { useEffect, type RefObject } from "react";
import type { InputController } from "../game";
import { setPointerState } from "../game";

export function useMouse(targetRef: RefObject<HTMLElement | null>, controller: InputController): void {
  useEffect(() => {
    const element = targetRef.current;

    if (!element) {
      return;
    }

    const getPointer = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();

      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handlePointerMove = (event: PointerEvent) => {
      setPointerState(controller, {
        pointerScreen: getPointer(event),
        pointerActive: true,
      });
    };

    const handlePointerDown = (event: PointerEvent) => {
      setPointerState(controller, {
        pointerScreen: getPointer(event),
        pointerActive: true,
        primaryDown: true,
      });
    };

    const handlePointerUp = (event: PointerEvent) => {
      setPointerState(controller, {
        pointerScreen: getPointer(event),
        pointerActive: true,
        primaryDown: false,
      });
    };

    const handlePointerLeave = () => {
      setPointerState(controller, {
        pointerActive: false,
        primaryDown: false,
      });
    };

    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerdown", handlePointerDown);
    element.addEventListener("pointerup", handlePointerUp);
    element.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("pointerup", handlePointerUp);
      element.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [controller, targetRef]);
}
