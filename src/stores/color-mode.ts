import { useColorMode } from "@vueuse/core";
import { defineStore } from "pinia";

export const useColorModeStore = defineStore("color-mode", () => {
  const colorMode = useColorMode();

  const toggleColorMode = () => {
    colorMode.value = colorMode.value === "dark" ? "light" : "dark";
  };

  return { colorMode, toggleColorMode };
});
