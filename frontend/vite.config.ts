import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "http://backend:5000",
        changeOrigin: true,
      },
      "/health": {
        target: "http://backend:5000",
        changeOrigin: true,
      },
    },
  },
});
