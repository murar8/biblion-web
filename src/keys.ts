import type { InjectionKey } from "vue";

export const toggleThemeKey = Symbol() as InjectionKey<() => void>;
