import type { SvelteUserConfig } from "oxfmt";

/**
 * Default config for `svelte` option in Oxfmt.
 *
 * Append it manually when using Svelte.
 */
const CONFIG_DEFAULT_SVELTE = {
    allowShorthand: false,
    indentScriptAndStyle: true,
    sortOrder: "options-scripts-markup-styles",
} as const satisfies SvelteUserConfig;

export { CONFIG_DEFAULT_SVELTE };
