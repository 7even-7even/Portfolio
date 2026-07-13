import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(moduleId) {
          if (!moduleId.includes("node_modules")) return undefined;
          if (moduleId.includes("three") || moduleId.includes("three-stdlib")) {
            return "three";
          }
          if (moduleId.includes("gsap")) return "gsap";
          if (
            moduleId.includes("react") ||
            moduleId.includes("scheduler")
          ) {
            return "vendor";
          }
          return undefined;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ["three", "gsap", "lenis"],
  },
});
