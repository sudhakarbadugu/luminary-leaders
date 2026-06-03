import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import { readFileSync } from "fs"

const pkg = JSON.parse(readFileSync(path.resolve(__dirname, "package.json"), "utf-8"))

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [inspectAttr(), react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __APP_BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  server: {
    port: 3000,
    warmup: {
      clientFiles: ['./src/**/*'],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom/client', 'react-router-dom'],
  },
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
