import type { OxfmtConfig } from "oxfmt";

type SortGroupItemConfigArray = Required<
    Required<OxfmtConfig>["sortImports"]
>["groups"];

const SORT_IMPORTS_GROUPS_DEFAULT = [
    // import "p";
    "side_effect",
    {
        newlinesBetween: true,
    },
    // import "./index.css";
    "side_effect_style",
    {
        newlinesBetween: true,
    },
    // import type Path from "node:path";
    "type-builtin",
    {
        newlinesBetween: true,
    },
    // import type { x } from "p";
    [
        "type-external",
        "type-subpath",
    ],
    {
        newlinesBetween: true,
    },
    // import type { x } from "#/p";
    "type-internal",
    [
        "type-parent",
        "type-sibling",
        "type-index",
    ],
    {
        newlinesBetween: true,
    },
    // others
    "type-import",
    {
        newlinesBetween: true,
    },
    // import Path from "node:path";
    "builtin",
    {
        newlinesBetween: true,
    },
    // import { x } from "p";
    [
        "external",
        "subpath",
    ],
    {
        newlinesBetween: true,
    },
    // import { x } from "#/p";
    "internal",
    [
        "parent",
        "sibling",
        "index",
    ],
    {
        newlinesBetween: true,
    },
    // import x from "./index.css";
    "style",
    {
        newlinesBetween: true,
    },
    // others
    "import",
    {
        newlinesBetween: true,
    },
    "unknown",
] as const satisfies SortGroupItemConfigArray;

const SORT_IMPORTS_INTERNAL_PATTERN_DEFAULT = [
    "~/",
    "@/",
    "#/",
] as const satisfies string[];

export type { SortGroupItemConfigArray };
export { SORT_IMPORTS_GROUPS_DEFAULT, SORT_IMPORTS_INTERNAL_PATTERN_DEFAULT };
