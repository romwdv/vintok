import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Force l'utilisation d'Esbuild pour le minify (au lieu de Rolldown)
    minify: "esbuild",
    // Force l'utilisation d'Esbuild pour le CSS
    cssMinify: "esbuild",
    // Optionnel : Désactive Rolldown explicitement (si supporté par ta version de Vite)
    rollupOptions: {
      experimental: {
        // Désactive Rolldown si disponible (Vite 5+)
        useRolldown: false,
      },
    },
  },
});
