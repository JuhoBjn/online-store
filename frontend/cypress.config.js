import { defineConfig } from "cypress";
import task from "@cypress/code-coverage/task.js";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {
      task(on, config);
      return config;
    }
  }
});
