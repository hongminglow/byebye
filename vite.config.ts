import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    transformer: "postcss",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/api": resolve(__dirname, "./src/api"),
      "@/components": resolve(__dirname, "./src/components"),
      "@/context": resolve(__dirname, "./src/context"),
      "@/pages": resolve(__dirname, "./src/pages"),
      "@/reducer": resolve(__dirname, "./src/reducer"),
      "@/router": resolve(__dirname, "./src/router"),
      "@/types": resolve(__dirname, "./src/types"),
      "@/hooks": resolve(__dirname, "./src/hooks"),
      "@/store": resolve(__dirname, "./src/store"),
      "@/services": resolve(__dirname, "./src/services"),
      "@/utils": resolve(__dirname, "./src/utils"),
      "@/assets": resolve(__dirname, "./src/assets"),
    },
  },
});
