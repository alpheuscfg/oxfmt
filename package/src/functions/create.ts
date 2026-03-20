import type { OxfmtConfig } from "oxfmt";

import { IGNORE_PATTERNS_DEFAULT } from "#/consts/ignore-patterns";
import {
    SORT_IMPORTS_GROUPS_DEFAULT,
    SORT_IMPORTS_INTERNAL_PATTERN_DEFAULT,
} from "#/consts/sort-imports";

/**
 * Create an Oxfmt configuration.
 *
 * ### Example
 *
 * ```ts
 * import { createConfig } from "@apst/oxfmt";
 *
 * export default createConfig();
 * ```
 */
const createConfig = (): OxfmtConfig => {
    return {
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
};

export { createConfig };
