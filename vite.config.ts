import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Big-Game/" : "/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "legacy-games/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
}));
