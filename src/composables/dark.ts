import { useDark, usePreferredDark } from "@vueuse/core";
import { useToggle } from "@vueuse/shared";

// WARNING: We need to make sure these are only instantiated once, otherwise we will lose reactivity.
// See https://github.com/vueuse/vueuse/issues/1369

export const isDark = useDark();
export const toggleDark = useToggle(isDark);
export const preferredDark = usePreferredDark();
