import Legacy from "@vitejs/plugin-legacy";
import Vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";

import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { IconComponentResolver } from "./icon-component-resolver";

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Legacy(),
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
