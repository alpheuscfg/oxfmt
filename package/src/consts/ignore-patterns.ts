const IGNORE_PATTERNS_DEFAULT = [
    // git
    "**/.git/**",
    // macOS
    "**/__MACOSX/**",
    "**/.DS_Store",
    // node modules
    "**/node_modules/**",
    // build
    "**/.panda/**",
    "**/.next/**",
    "**/.expo/**",
    "**/.vercel/**",
    "**/dist/**",
    "build/**",
    "app/build/**",
    "web/build/**",
    "out/**",
    "app/out/**",
    "web/out/**",
    // lock
    "**/package-lock.json",
    "**/yarn.lock",
    "**/pnpm-lock.yaml",
    "**/bun.lock",
] as const satisfies string[];

export { IGNORE_PATTERNS_DEFAULT };
