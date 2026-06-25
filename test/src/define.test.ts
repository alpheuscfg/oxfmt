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

    it("should replace array options instead of merging them", (): void => {
        const userConfig: OxfmtConfig = {
            ignorePatterns: [
                "custom-ignore",
            ],
        };
        const config: OxfmtConfig = defineConfig(userConfig);

        expect(config).toEqual({
            ...CONFIG_DEFAULT,
            ignorePatterns: [
                "custom-ignore",
            ],
        });
    });

    it("should not affect later calls after overriding a previous config", (): void => {
        const previousConfig: OxfmtConfig = {
            printWidth: 100,
            ignorePatterns: [
                "custom-ignore",
            ],
        };

        defineConfig(previousConfig);

        const config: OxfmtConfig = defineConfig();

        expect(config).toEqual(CONFIG_DEFAULT);
    });
});
