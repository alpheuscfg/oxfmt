import type { OxfmtConfig } from "oxfmt";

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
});
