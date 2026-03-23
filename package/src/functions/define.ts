import type { OxfmtConfig } from "oxfmt";

import { clone } from "es-toolkit";

import { CONFIG_DEFAULT } from "#/constants/default";
import { mergeConfig } from "#/functions/merge";

const defineConfigFn = (userConfig?: OxfmtConfig): OxfmtConfig => {
    return mergeConfig(clone(CONFIG_DEFAULT), userConfig);
};

/**
 * Define Oxfmt configuration.
 *
 * All arrays will not be merged, adding new values will replace existing values.
 *
 * ### Example
 *
 * ```ts
 * import { defineConfig } from "@apst/oxfmt";
 * import { IGNORE_PATTERNS_DEFAULT } from "@apst/oxfmt/constants/ignore-patterns";
 *
 * export default defineConfig({
 *     ignorePatterns: [
 *         ...IGNORE_PATTERNS_DEFAULT,
 *         // ...
 *     ],
 * });
 * ```
 */
function defineConfig(config?: OxfmtConfig): OxfmtConfig;

function defineConfig(config?: OxfmtConfig): OxfmtConfig {
    return defineConfigFn(config);
}

export { defineConfig };
