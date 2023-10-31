import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: "src/*",
      exclude: ["node_modules", "test", "cypress", "dist"],
      extensions: [".js", ".jsx"],
      requireEnv: false,
      cypress: true
    })
  ],
  test: {
    globals: true,
    setupFiles: "./test/setup.js",
    environment: "jsdom"
  },
  server: {
    host: "127.0.0.1"
  }
});
