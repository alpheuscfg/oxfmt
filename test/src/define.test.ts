import type { OxfmtConfig } from "oxfmt";

import { defineConfig } from "@apst/oxfmt";
import { CONFIG_DEFAULT } from "@apst/oxfmt/constants/default";
import { describe, expect, it } from "vitest";

describe("defineConfig test", (): void => {
    it("should returns the default config when no arguments are provided", (): void => {
        const config: OxfmtConfig = defineConfig();

        expect(config).toEqual(CONFIG_DEFAULT);
    });
});
