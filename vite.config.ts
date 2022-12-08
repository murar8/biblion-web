import Vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import { IconComponentResolver } from "./icon-component-resolver";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Components({
      resolvers: [NaiveUiResolver(), IconComponentResolver({ pkg: "@vicons/fa", prefix: "Fa" })],
      dirs: "src",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
});
