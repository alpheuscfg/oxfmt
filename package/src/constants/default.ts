import type {
    OxfmtConfig,
    SortTailwindcssUserConfig,
    SvelteUserConfig,
} from "oxfmt";

import { IGNORE_PATTERNS_DEFAULT } from "#/constants/ignore-patterns";
import {
    SORT_IMPORTS_GROUPS_DEFAULT,
    SORT_IMPORTS_INTERNAL_PATTERN_DEFAULT,
} from "#/constants/sort-imports";

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

/**
 * Default config for Oxfmt.
 */
const CONFIG_DEFAULT = {
    arrowParens: "always",
    bracketSameLine: false,
    bracketSpacing: true,
    embeddedLanguageFormatting: "auto",
    endOfLine: "lf",
    htmlWhitespaceSensitivity: "ignore",
    ignorePatterns: IGNORE_PATTERNS_DEFAULT,
    insertFinalNewline: true,
    jsdoc: {
        addDefaultToDescription: false,
        bracketSpacing: false,
        capitalizeDescriptions: true,
        commentLineStrategy: "multiline",
        descriptionTag: false,
        descriptionWithDot: false,
        keepUnparsableExampleIndent: true,
        lineWrappingStyle: "greedy",
        preferCodeFences: true,
        separateReturnsFromParam: false,
        separateTagGroups: false,
    },
    jsxSingleQuote: false,
    objectWrap: "preserve",
    overrides: [],
    printWidth: 80,
    proseWrap: "preserve",
    quoteProps: "as-needed",
    semi: true,
    singleAttributePerLine: true,
    singleQuote: false,
    sortImports: {
        groups: SORT_IMPORTS_GROUPS_DEFAULT,
        ignoreCase: true,
        internalPattern: SORT_IMPORTS_INTERNAL_PATTERN_DEFAULT,
        newlinesBetween: false,
        order: "asc",
        partitionByComment: false,
        partitionByNewline: false,
        sortSideEffects: false,
    },
    sortPackageJson: {
        sortScripts: false,
    },
    sortTailwindcss: void 0,
    svelte: void 0,
    tabWidth: 4,
    trailingComma: "all",
    useTabs: false,
    vueIndentScriptAndStyle: true,
} as const satisfies OxfmtConfig;

export {
    CONFIG_DEFAULT,
    CONFIG_DEFAULT_SORT_TAILWINDCSS,
    CONFIG_DEFAULT_SORT_TAILWINDCSS_ATTRIBUTES,
    CONFIG_DEFAULT_SORT_TAILWINDCSS_FUNCTIONS,
    CONFIG_DEFAULT_SVELTE,
};
