import type { OxfmtConfig } from "oxfmt";

import { mergeWith } from "es-toolkit";

import { createConfig } from "#/functions/create";

const mergeConfig = (
    configDefault: OxfmtConfig,
    config?: OxfmtConfig,
): OxfmtConfig => {
    if (!config) return configDefault;

    return mergeWith(
        configDefault,
        config,
        // array replacement
        (_: unknown, target: unknown): unknown => {
            if (Array.isArray(target)) return target;
            return void 0;
        },
    );
};

/**
 * Create an extendable Oxfmt configuration.
 *
 * All arrays will not be merged, adding new values will replace existing values.
 *
 * For extending the existing arrays, consider importing them from `@apst/oxfmt/consts`.
 *
 * ### Example
 *
 * ```ts
 * import { withConfig } from "@apst/oxfmt";
 *
 * export default withConfig({
 *     printWidth: 120,
 * });
 * ```
 */
const withConfig = (config?: OxfmtConfig): OxfmtConfig => {
    return mergeConfig(createConfig(), config);
};

export { withConfig };
