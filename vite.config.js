import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:7000",
      '/ws': {
        target: 'ws://localhost:7000',
        ws: true,
      },
    },
  },
});
