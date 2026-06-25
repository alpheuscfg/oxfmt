import type { OxfmtConfig, SortImportsConfig } from "oxfmt";

import { execFileSync } from "node:child_process";

import { defineConfig } from "@apst/oxfmt";
import { CONFIG_DEFAULT } from "@apst/oxfmt/constants/default";
import {
    SORT_IMPORTS_GROUPS_DEFAULT,
    SORT_IMPORTS_INTERNAL_PATTERN_DEFAULT,
} from "@apst/oxfmt/constants/sort-imports";
import { describe, expect, it } from "vitest";

const formatViaExec = (sourceText: string, configLine: string): string => {
    const script: string = [
        'import { defineConfig } from "@apst/oxfmt";',
        'import { format } from "oxfmt";',
        configLine,
        `const sourceText = ${JSON.stringify(sourceText)};`,
        'const result = await format("fixture.ts", sourceText, config);',
        "if (result.errors.length > 0) {",
        "    console.error(JSON.stringify(result.errors));",
        "    process.exit(1);",
        "}",
        "process.stdout.write(result.code);",
    ].join("\n");

    return execFileSync(
        process.execPath,
        [
            "--input-type=module",
            "-e",
            script,
        ],
        {
            cwd: process.cwd(),
            encoding: "utf-8",
        },
    );
};

const SOURCE_TEXT: string = [
    'import { name as manifestName } from "../package.json";',
    'import { memoize } from "./memoize";',
    'import { index } from ".";',
    'import { memoizeStore } from "#/features/memoize";',
    'import { builder } from "plugin-factory";',
    'import { createAuditLogger } from "@example-kit/logger";',
    'import "#/styles/index.css";',
    'import { app } from "#/index";',
    'import module from "#/styles/index.module.css";',
    'import type { InternalConfig } from "#/@models/config";',
    'import type { Builder } from "plugin-factory";',
    'import type { AuditLogger } from "@example-kit/logger";',
    'import "@example-kit/core";',
    'import Fs from "node:fs";',
    'import type Path from "node:path";',
    "",
].join("\n");

describe("sortImports test", (): void => {
    it("should return the default sortImports config when no arguments are provided", (): void => {
        const config: OxfmtConfig = defineConfig();
        const sortImports = config.sortImports as SortImportsConfig;

        expect(config.sortImports).toEqual(CONFIG_DEFAULT.sortImports);
        expect(sortImports.groups).toStrictEqual(SORT_IMPORTS_GROUPS_DEFAULT);
        expect(sortImports.internalPattern).toStrictEqual(
            SORT_IMPORTS_INTERNAL_PATTERN_DEFAULT,
        );
    });

    it("should deep merge nested scalar options from the user config", (): void => {
        const config: OxfmtConfig = defineConfig({
            sortImports: {
                order: "desc",
            },
        });

        expect(config.sortImports).toEqual({
            ...CONFIG_DEFAULT.sortImports,
            order: "desc",
        });
    });

    it("should replace array options instead of merging them", (): void => {
        const config: OxfmtConfig = defineConfig({
            sortImports: {
                groups: [
                    "builtin",
                ],
                internalPattern: [
                    "$lib/",
                ],
            },
        });

        expect(config.sortImports).toEqual({
            ...CONFIG_DEFAULT.sortImports,
            groups: [
                "builtin",
            ],
            internalPattern: [
                "$lib/",
            ],
        });
    });

    it("should set customGroups when provided (array replacement)", (): void => {
        const config: OxfmtConfig = defineConfig({
            sortImports: {
                customGroups: [
                    {
                        selector: "side_effect",
                        modifiers: [],
                        elementNamePattern: [
                            "^foo",
                        ],
                    },
                ],
            },
        });
        const sortImports = config.sortImports as SortImportsConfig;

        expect(sortImports.customGroups).toEqual([
            {
                selector: "side_effect",
                modifiers: [],
                elementNamePattern: [
                    "^foo",
                ],
            },
        ]);
    });

    it("should set sortImports to false when boolean false is provided", (): void => {
        const config: OxfmtConfig = defineConfig({
            sortImports: false,
        });

        expect(config.sortImports).toBe(false);
    });

    it("should set sortImports to true when boolean true is provided", (): void => {
        const config: OxfmtConfig = defineConfig({
            sortImports: true,
        });

        expect(config.sortImports).toBe(true);
    });

    it("should not affect later calls after overriding a previous config", (): void => {
        const previousConfig: OxfmtConfig = {
            sortImports: {
                order: "desc",
            },
        };

        defineConfig(previousConfig);

        const config: OxfmtConfig = defineConfig();

        expect(config.sortImports).toEqual(CONFIG_DEFAULT.sortImports);
    });

    it("should sort imports in ascending order by default", (): void => {
        const expectedText: string = [
            'import "@example-kit/core";',
            "",
            'import "#/styles/index.css";',
            "",
            'import type Path from "node:path";',
            "",
            'import type { AuditLogger } from "@example-kit/logger";',
            'import type { Builder } from "plugin-factory";',
            "",
            'import type { InternalConfig } from "#/@models/config";',
            "",
            'import Fs from "node:fs";',
            "",
            'import { createAuditLogger } from "@example-kit/logger";',
            'import { builder } from "plugin-factory";',
            "",
            'import { memoizeStore } from "#/features/memoize";',
            'import { app } from "#/index";',
            "",
            'import { name as manifestName } from "../package.json";',
            'import { memoize } from "./memoize";',
            'import { index } from ".";',
            "",
            'import module from "#/styles/index.module.css";',
            "",
        ].join("\n");

        const resultText: string = formatViaExec(
            SOURCE_TEXT,
            "const config = defineConfig();",
        );

        expect(resultText).toBe(expectedText);
    });

    it("should sort imports in descending order when order is desc", (): void => {
        const expectedText: string = [
            'import "@example-kit/core";',
            "",
            'import "#/styles/index.css";',
            "",
            'import type Path from "node:path";',
            "",
            'import type { Builder } from "plugin-factory";',
            'import type { AuditLogger } from "@example-kit/logger";',
            "",
            'import type { InternalConfig } from "#/@models/config";',
            "",
            'import Fs from "node:fs";',
            "",
            'import { builder } from "plugin-factory";',
            'import { createAuditLogger } from "@example-kit/logger";',
            "",
            'import { app } from "#/index";',
            'import { memoizeStore } from "#/features/memoize";',
            "",
            'import { name as manifestName } from "../package.json";',
            'import { memoize } from "./memoize";',
            'import { index } from ".";',
            "",
            'import module from "#/styles/index.module.css";',
            "",
        ].join("\n");

        const resultText: string = formatViaExec(
            SOURCE_TEXT,
            "const config = defineConfig({ sortImports: { order: 'desc' } });",
        );

        expect(resultText).toBe(expectedText);
    });

    it("should sort imports case-sensitively when ignoreCase is false", (): void => {
        const expectedText: string = [
            'import "@example-kit/core";',
            "",
            'import "#/styles/index.css";',
            "",
            'import type Path from "node:path";',
            "",
            'import type { AuditLogger } from "@example-kit/logger";',
            'import type { Builder } from "plugin-factory";',
            "",
            'import type { InternalConfig } from "#/@models/config";',
            "",
            'import Fs from "node:fs";',
            "",
            'import { createAuditLogger } from "@example-kit/logger";',
            'import { builder } from "plugin-factory";',
            "",
            'import { memoizeStore } from "#/features/memoize";',
            'import { app } from "#/index";',
            "",
            'import { name as manifestName } from "../package.json";',
            'import { memoize } from "./memoize";',
            'import { index } from ".";',
            "",
            'import module from "#/styles/index.module.css";',
            "",
        ].join("\n");

        const resultText: string = formatViaExec(
            SOURCE_TEXT,
            "const config = defineConfig({ sortImports: { ignoreCase: false } });",
        );

        expect(resultText).toBe(expectedText);
    });

    it("should insert blank lines between every group when newlinesBetween is true", (): void => {
        const expectedText: string = [
            'import "@example-kit/core";',
            "",
            'import "#/styles/index.css";',
            "",
            'import type Path from "node:path";',
            "",
            'import type { AuditLogger } from "@example-kit/logger";',
            'import type { Builder } from "plugin-factory";',
            "",
            'import type { InternalConfig } from "#/@models/config";',
            "",
            'import Fs from "node:fs";',
            "",
            'import { createAuditLogger } from "@example-kit/logger";',
            'import { builder } from "plugin-factory";',
            "",
            'import { memoizeStore } from "#/features/memoize";',
            'import { app } from "#/index";',
            "",
            'import { name as manifestName } from "../package.json";',
            "",
            'import { memoize } from "./memoize";',
            "",
            'import { index } from ".";',
            "",
            'import module from "#/styles/index.module.css";',
            "",
        ].join("\n");

        const resultText: string = formatViaExec(
            SOURCE_TEXT,
            "const config = defineConfig({ sortImports: { newlinesBetween: true } });",
        );

        expect(resultText).toBe(expectedText);
    });

    it("should sort side-effect imports when sortSideEffects is true", (): void => {
        const sourceText: string = [
            'import "zzz";',
            'import "aaa";',
            'import "mmm";',
            "",
        ].join("\n");

        const expectedText: string = [
            'import "aaa";',
            'import "mmm";',
            'import "zzz";',
            "",
        ].join("\n");

        const resultText: string = formatViaExec(
            sourceText,
            "const config = defineConfig({ sortImports: { sortSideEffects: true } });",
        );

        expect(resultText).toBe(expectedText);
    });

    it("should partition imports by comment when partitionByComment is true", (): void => {
        const sourceText: string = [
            'import { z } from "zod";',
            'import { a } from "./a";',
            "// partition-imports",
            'import { b } from "./b";',
            'import { y } from "yjs";',
            "",
        ].join("\n");

        const expectedText: string = [
            'import { z } from "zod";',
            "",
            'import { a } from "./a";',
            "// partition-imports",
            'import { y } from "yjs";',
            "",
            'import { b } from "./b";',
            "",
        ].join("\n");

        const resultText: string = formatViaExec(
            sourceText,
            "const config = defineConfig({ sortImports: { partitionByComment: true } });",
        );

        expect(resultText).toBe(expectedText);
    });

    it("should preserve input order when sortImports is false", (): void => {
        const expectedText: string = [
            'import { name as manifestName } from "../package.json";',
            'import { memoize } from "./memoize";',
            'import { index } from ".";',
            'import { memoizeStore } from "#/features/memoize";',
            'import { builder } from "plugin-factory";',
            'import { createAuditLogger } from "@example-kit/logger";',
            'import "#/styles/index.css";',
            'import { app } from "#/index";',
            'import module from "#/styles/index.module.css";',
            'import type { InternalConfig } from "#/@models/config";',
            'import type { Builder } from "plugin-factory";',
            'import type { AuditLogger } from "@example-kit/logger";',
            'import "@example-kit/core";',
            'import Fs from "node:fs";',
            'import type Path from "node:path";',
            "",
        ].join("\n");

        const resultText: string = formatViaExec(
            SOURCE_TEXT,
            "const config = defineConfig({ sortImports: false });",
        );

        expect(resultText).toBe(expectedText);
    });

    it("should apply oxfmt built-in sort defaults when sortImports is true", (): void => {
        const expectedText: string = [
            'import Fs from "node:fs";',
            'import type Path from "node:path";',
            "",
            'import { createAuditLogger } from "@example-kit/logger";',
            'import type { AuditLogger } from "@example-kit/logger";',
            'import { builder } from "plugin-factory";',
            'import type { Builder } from "plugin-factory";',
            "",
            'import "#/styles/index.css";',
            'import type { InternalConfig } from "#/@models/config";',
            'import { memoizeStore } from "#/features/memoize";',
            'import { app } from "#/index";',
            "",
            'import { index } from ".";',
            'import { name as manifestName } from "../package.json";',
            'import "@example-kit/core";',
            "",
            'import { memoize } from "./memoize";',
            "",
            'import module from "#/styles/index.module.css";',
            "",
        ].join("\n");

        const resultText: string = formatViaExec(
            SOURCE_TEXT,
            "const config = defineConfig({ sortImports: true });",
        );

        expect(resultText).toBe(expectedText);
    });
});
