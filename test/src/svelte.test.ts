import type { OxfmtConfig } from "oxfmt";

import { execFileSync } from "node:child_process";

import { defineConfig } from "@apst/oxfmt";
import { CONFIG_DEFAULT_SVELTE } from "@apst/oxfmt/constants/svelte";
import { describe, expect, it } from "vitest";

const formatViaExec = (
    fileName: string,
    sourceText: string,
    configLine: string,
): string => {
    const script: string = [
        'import { defineConfig } from "@apst/oxfmt";',
        'import { format } from "oxfmt";',
        configLine,
        `const sourceText = ${JSON.stringify(sourceText)};`,
        `const result = await format(${JSON.stringify(fileName)}, sourceText, config);`,
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

describe("svelte test", (): void => {
    it("should be undefined by default", (): void => {
        const config: OxfmtConfig = defineConfig();

        expect(config.svelte).toBeUndefined();
    });

    it("should set svelte to true when boolean true is provided", (): void => {
        const config: OxfmtConfig = defineConfig({
            svelte: true,
        });

        expect(config.svelte).toBe(true);
    });

    it("should set svelte to false when boolean false is provided", (): void => {
        const config: OxfmtConfig = defineConfig({
            svelte: false,
        });

        expect(config.svelte).toBe(false);
    });

    it("should apply the recommended defaults when the constant is provided", (): void => {
        const config: OxfmtConfig = defineConfig({
            svelte: CONFIG_DEFAULT_SVELTE,
        });

        expect(config.svelte).toEqual(CONFIG_DEFAULT_SVELTE);
    });

    it("should override allowShorthand while keeping other defaults", (): void => {
        const config: OxfmtConfig = defineConfig({
            svelte: {
                ...CONFIG_DEFAULT_SVELTE,
                allowShorthand: true,
            },
        });

        expect(config.svelte).toEqual({
            ...CONFIG_DEFAULT_SVELTE,
            allowShorthand: true,
        });
    });

    it("should override indentScriptAndStyle while keeping other defaults", (): void => {
        const config: OxfmtConfig = defineConfig({
            svelte: {
                ...CONFIG_DEFAULT_SVELTE,
                indentScriptAndStyle: false,
            },
        });

        expect(config.svelte).toEqual({
            ...CONFIG_DEFAULT_SVELTE,
            indentScriptAndStyle: false,
        });
    });

    it("should override sortOrder while keeping other defaults", (): void => {
        const config: OxfmtConfig = defineConfig({
            svelte: {
                ...CONFIG_DEFAULT_SVELTE,
                sortOrder: "scripts-styles-markup-options",
            },
        });

        expect(config.svelte).toEqual({
            ...CONFIG_DEFAULT_SVELTE,
            sortOrder: "scripts-styles-markup-options",
        });
    });

    it("should format a svelte fixture with the recommended defaults", (): void => {
        const sourceText: string = [
            '<script lang="ts">',
            "let count = 0;",
            "function inc(){count++}",
            "</script>",
            "<button on:click={inc}>clicks: {count}</button>",
            "",
        ].join("\n");

        const expectedText: string = [
            '<script lang="ts">',
            "    let count = 0;",
            "    function inc() {",
            "        count++;",
            "    }",
            "</script>",
            "",
            "<button on:click={inc}>clicks: {count}</button>",
            "",
        ].join("\n");

        const resultText: string = formatViaExec(
            "fixture.svelte",
            sourceText,
            [
                'import { CONFIG_DEFAULT_SVELTE } from "@apst/oxfmt/constants/svelte";',
                "const config = defineConfig({ svelte: CONFIG_DEFAULT_SVELTE });",
            ].join("\n"),
        );

        expect(resultText).toBe(expectedText);
    });
});
