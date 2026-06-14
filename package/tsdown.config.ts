import { defineConfig } from "@apst/tsdown";
import { cjsPreset, dtsPreset, esmPreset } from "@apst/tsdown/presets";

export default defineConfig(
    {
        entry: [
            // entry
            "./src/index.ts",
            // constants
            "./src/constants/*.ts",
        ],
        platform: "node",
        unbundle: true,
    },
    [
        esmPreset(),
        cjsPreset(),
        dtsPreset(),
    ],
);
