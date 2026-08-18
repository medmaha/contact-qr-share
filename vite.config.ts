import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'
import netlify from '@netlify/vite-plugin-tanstack-start'
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: {
        entry: "./src/server.ts",
      },
    }),
    react(), 
    netlify(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
