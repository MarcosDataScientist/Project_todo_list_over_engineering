import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
/** Docker Compose define VITE_DEV_PROXY_TARGET=http://backend:5000; fora do Docker use 127.0.0.1:5000 */
const proxyTarget = process.env.VITE_DEV_PROXY_TARGET?.trim() || "http://127.0.0.1:5000";
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
                target: proxyTarget,
                changeOrigin: true,
            },
            "/health": {
                target: proxyTarget,
                changeOrigin: true,
            },
        },
    },
});
