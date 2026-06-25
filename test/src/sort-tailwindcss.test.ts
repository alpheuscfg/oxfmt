import type { OxfmtConfig, SortTailwindcssConfig } from "oxfmt";

import { execFileSync } from "node:child_process";

import { defineConfig } from "@apst/oxfmt";
import {
    CONFIG_DEFAULT_SORT_TAILWINDCSS,
    CONFIG_DEFAULT_SORT_TAILWINDCSS_ATTRIBUTES,
    CONFIG_DEFAULT_SORT_TAILWINDCSS_FUNCTIONS,
} from "@apst/oxfmt/constants/sort-tailwindcss";
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

describe("sortTailwindcss test", (): void => {
    it("should be undefined by default", (): void => {
        const config: OxfmtConfig = defineConfig();

        expect(config.sortTailwindcss).toBeUndefined();
    });

    it("should set sortTailwindcss to true when boolean true is provided", (): void => {
        const config: OxfmtConfig = defineConfig({
            sortTailwindcss: true,
        });

        expect(config.sortTailwindcss).toBe(true);
    });

    it("should set sortTailwindcss to false when boolean false is provided", (): void => {
        const config: OxfmtConfig = defineConfig({
            sortTailwindcss: false,
        });

        expect(config.sortTailwindcss).toBe(false);
    });

    it("should apply the recommended defaults when the constant is provided", (): void => {
        const config: OxfmtConfig = defineConfig({
            sortTailwindcss: CONFIG_DEFAULT_SORT_TAILWINDCSS,
        });

        expect(config.sortTailwindcss).toEqual(CONFIG_DEFAULT_SORT_TAILWINDCSS);
    });

    it("should override a single field while keeping other defaults", (): void => {
        const config: OxfmtConfig = defineConfig({
            sortTailwindcss: {
                ...CONFIG_DEFAULT_SORT_TAILWINDCSS,
                preserveDuplicates: true,
            },
        });

        expect(config.sortTailwindcss).toEqual({
            ...CONFIG_DEFAULT_SORT_TAILWINDCSS,
            preserveDuplicates: true,
        });
    });

    it("should replace the attributes array instead of merging it", (): void => {
        const config: OxfmtConfig = defineConfig({
            sortTailwindcss: {
                ...CONFIG_DEFAULT_SORT_TAILWINDCSS,
                attributes: [
                    "myClassProp",
                ],
            },
        });
        const sortTailwindcss = config.sortTailwindcss as SortTailwindcssConfig;

        expect(sortTailwindcss.attributes).toEqual([
            "myClassProp",
        ]);
        expect(sortTailwindcss.functions).toEqual(
            CONFIG_DEFAULT_SORT_TAILWINDCSS_FUNCTIONS,
        );
    });

    it("should keep the sub-constants referentially stable to the default slices", (): void => {
        expect(CONFIG_DEFAULT_SORT_TAILWINDCSS.attributes).toEqual(
            CONFIG_DEFAULT_SORT_TAILWINDCSS_ATTRIBUTES,
        );
        expect(CONFIG_DEFAULT_SORT_TAILWINDCSS.functions).toEqual(
            CONFIG_DEFAULT_SORT_TAILWINDCSS_FUNCTIONS,
        );
    });

    it("should sort tailwind classes in a tsx fixture when enabled", (): void => {
        const sourceText: string = [
            "export function Button({ label }: { label: string }) {",
            '    return <button className="p-4 bg-blue-500 text-white flex rounded-lg">click</button>;',
            "}",
            "",
        ].join("\n");

        const expectedText: string = [
            "export function Button({ label }: { label: string }) {",
            "    return (",
            '        <button className="flex rounded-lg bg-blue-500 p-4 text-white">',
            "            click",
            "        </button>",
            "    );",
            "}",
            "",
        ].join("\n");

        const resultText: string = formatViaExec(
            "fixture.tsx",
            sourceText,
            "const config = defineConfig({ sortTailwindcss: true });",
        );

        expect(resultText).toBe(expectedText);
    });
});
