/**
 * Adapted from https://github.com/07akioni/xicons/issues/364#issuecomment-1118129894
 */

import { readdirSync } from "fs";
import { resolveModule } from "local-pkg";
import { dirname } from "path";
import type { ComponentResolver } from "unplugin-vue-components/types";

let cachedNames: Set<string>;

export interface IconResolverOptions {
  pkg: string;
  prefix?: string;
}

function loadNames(pkg: string) {
  const modulePath = dirname(resolveModule(pkg) as string);

  const names = readdirSync(modulePath, { withFileTypes: true })
    .filter((item) => item.isFile() && item.name.endsWith(".js"))
    .map((item) => item.name.slice(0, -3));

  return new Set(names);
}

export function IconComponentResolver({ pkg, prefix }: IconResolverOptions): ComponentResolver {
  if (!cachedNames) cachedNames = loadNames(pkg);

  return {
    type: "component",
    resolve: (name: string) => {
      if (prefix && !name.startsWith(prefix)) return;
      name = name.slice(prefix?.length ?? 0);
      if (cachedNames.has(name)) return { name, from: pkg };
    },
  };
}
