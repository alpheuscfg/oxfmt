import { defineConfig } from "@apst/tsdown";
import { cjsPreset, dtsPreset, esmPreset } from "@apst/tsdown/presets";

export default defineConfig(
    {
        entry: {
            // entry
            index: "./src/index.ts",
            // constants
            "constants/default": "./src/constants/default.ts",
            "constants/ignore-patterns": "./src/constants/ignore-patterns.ts",
            "constants/sort-imports": "./src/constants/sort-imports.ts",
        },
        platform: "node",
        unbundle: true,
    },
    [
        esmPreset(),
        cjsPreset(),
        dtsPreset(),
    ],
);
