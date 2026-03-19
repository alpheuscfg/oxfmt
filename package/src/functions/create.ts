import type { OxfmtConfig } from "oxfmt";

import { mergeWith } from "es-toolkit";

import { IGNORE_PATTERNS_DEFAULT } from "#/consts/ignore-patterns";
import {
    SORT_IMPORTS_GROUPS_DEFAULT,
    SORT_IMPORTS_INTERNAL_PATTERN_DEFAULT,
} from "#/consts/sort-imports";

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
 * Create an Oxfmt configuration.
 *
 * All arrays will not be merged, adding new values will replace existing values.
 *
 * For extending the existing arrays, consider import them from `@apst/oxfmt/consts`.
 */
const createConfig = (config?: OxfmtConfig): OxfmtConfig => {
    const configDefault: OxfmtConfig = {
        arrowParens: "always",
        bracketSameLine: false,
        bracketSpacing: true,
        embeddedLanguageFormatting: "auto",
        endOfLine: "lf",
        htmlWhitespaceSensitivity: "ignore",
        ignorePatterns: IGNORE_PATTERNS_DEFAULT,
        insertFinalNewline: true,
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
        tabWidth: 4,
        trailingComma: "all",
        useTabs: false,
    };

    return mergeConfig(configDefault, config);
};

export { createConfig };
