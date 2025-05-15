import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    port: Number(process.env.PORT) || 4173,
    host: "0.0.0.0",
    allowedHosts: ["calm-analysis-production.up.railway.app"],
  },
});
