import { fileURLToPath, URL } from "node:url";
import Legacy from "@vitejs/plugin-legacy";
import Vue from "@vitejs/plugin-vue";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import { IconComponentResolver } from "./icon-component-resolver";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.CI ? "/biblion-web" : "/",
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
