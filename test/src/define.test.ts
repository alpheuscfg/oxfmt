import type { OxfmtConfig } from "oxfmt";

import { execFileSync } from "node:child_process";

import { defineConfig } from "@apst/oxfmt";
import { CONFIG_DEFAULT } from "@apst/oxfmt/constants/default";
import { describe, expect, it } from "vitest";

describe("defineConfig test", (): void => {
    it("should returns the default config when no arguments are provided", (): void => {
        const config: OxfmtConfig = defineConfig();

        expect(config).toEqual(CONFIG_DEFAULT);
    });

    it("should override top-level options from the user config", (): void => {
        const userConfig: OxfmtConfig = {
            printWidth: 100,
            singleQuote: true,
        };

        const config: OxfmtConfig = defineConfig(userConfig);

        expect(config).toEqual({
            ...CONFIG_DEFAULT,
            printWidth: 100,
            singleQuote: true,
        });
    });

    it("should deep merge nested object options from the user config", (): void => {
        const userConfig: OxfmtConfig = {
            sortImports: {
                order: "desc",
            },
        };

        const config: OxfmtConfig = defineConfig(userConfig);

        expect(config).toEqual({
            ...CONFIG_DEFAULT,
            sortImports: {
                ...CONFIG_DEFAULT.sortImports,
                order: "desc",
            },
        });
    });

    it("should replace array options instead of merging them", (): void => {
        const userConfig: OxfmtConfig = {
            ignorePatterns: [
                "custom-ignore",
            ],
            sortImports: {
                groups: [
                    "builtin",
                ],
                internalPattern: [
                    "$lib/",
                ],
            },
        };
        const config: OxfmtConfig = defineConfig(userConfig);

        expect(config).toEqual({
            ...CONFIG_DEFAULT,
            ignorePatterns: [
                "custom-ignore",
            ],
            sortImports: {
                ...CONFIG_DEFAULT.sortImports,
                groups: [
                    "builtin",
                ],
                internalPattern: [
                    "$lib/",
                ],
            },
        });
    });

    it("should not affect later calls after overriding a previous config", (): void => {
        const previousConfig: OxfmtConfig = {
            printWidth: 100,
            ignorePatterns: [
                "custom-ignore",
            ],
            sortImports: {
                order: "desc",
            },
        };

        defineConfig(previousConfig);

        const config: OxfmtConfig = defineConfig();

        expect(config).toEqual(CONFIG_DEFAULT);
    });

    it("should sort imports correctly", (): void => {
        const sourceText: string = [
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

        const script: string = [
            'import { defineConfig } from "@apst/oxfmt";',
            'import { format } from "oxfmt";',
            `const sourceText = ${JSON.stringify(sourceText)};`,
            "const config = defineConfig();",
            'const result = await format("fixture.ts", sourceText, config);',
            "if (result.errors.length > 0) {",
            "    console.error(JSON.stringify(result.errors));",
            "    process.exit(1);",
            "}",
            "process.stdout.write(result.code);",
        ].join("\n");

        const resultText: string = execFileSync(
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

        expect(resultText).toBe(expectedText);
    });
});
