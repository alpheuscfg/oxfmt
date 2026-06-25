import type { SortTailwindcssUserConfig } from "oxfmt";

/**
 * Default attributes for `sortTailwindcss` option in Oxfmt.
 */
const CONFIG_DEFAULT_SORT_TAILWINDCSS_ATTRIBUTES = [
    ":class",
] as const satisfies string[];

/**
 * Default functions for `sortTailwindcss` option in Oxfmt.
 */
const CONFIG_DEFAULT_SORT_TAILWINDCSS_FUNCTIONS = [
    "clsx",
    "cn",
    "cva",
    "tw",
] as const satisfies string[];

/**
 * Default config for `sortTailwindcss` option in Oxfmt.
 *
 * Append it manually when using Tailwind CSS.
 */
const CONFIG_DEFAULT_SORT_TAILWINDCSS = {
    attributes: CONFIG_DEFAULT_SORT_TAILWINDCSS_ATTRIBUTES,
    config: "tailwind.config.ts",
    functions: CONFIG_DEFAULT_SORT_TAILWINDCSS_FUNCTIONS,
    preserveDuplicates: false,
    preserveWhitespace: false,
} as const satisfies SortTailwindcssUserConfig;

export {
    CONFIG_DEFAULT_SORT_TAILWINDCSS,
    CONFIG_DEFAULT_SORT_TAILWINDCSS_ATTRIBUTES,
    CONFIG_DEFAULT_SORT_TAILWINDCSS_FUNCTIONS,
};
