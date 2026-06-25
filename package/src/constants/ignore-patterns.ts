const IGNORE_PATTERNS_DEFAULT_VCS = [
    "**/.git/**",
    "**/.svn/**",
] as const satisfies string[];

const IGNORE_PATTERNS_DEFAULT_OS = [
    // macOS
    "**/__MACOSX/**",
    "**/.DS_Store",
    // Windows
    "**/Thumbs.db",
] as const satisfies string[];

const IGNORE_PATTERNS_DEFAULT_DEPENDENCIES = [
    "**/.pnp.*",
    "**/.yarn/**",
    "**/node_modules/**",
] as const satisfies string[];

const IGNORE_PATTERNS_DEFAULT_CACHES = [
    "**/.cache/**",
    "**/*.tsbuildinfo",
] as const satisfies string[];

const IGNORE_PATTERNS_DEFAULT_LOCKFILES = [
    "**/package-lock.json",
    "**/yarn.lock",
    "**/pnpm-lock.yaml",
    "**/deno.lock",
    "**/bun.lock",
    "**/bun.lockb",
] as const satisfies string[];

const IGNORE_PATTERNS_DEFAULT_LOGS = [
    "**/*.log*",
] as const satisfies string[];

const IGNORE_PATTERNS_DEFAULT_OUTPUTS_DEPLOYMENT = [
    "**/.vercel/**",
] as const satisfies string[];

const IGNORE_PATTERNS_DEFAULT_OUTPUTS_FRAMEWORK = [
    "**/.angular/**",
    "**/.astro/**",
    "**/.expo/**",
    "**/.next/**",
    "**/.nuxt/**",
    "**/.panda/**",
    "**/.svelte-kit/**",
] as const satisfies string[];

/**
 * For `build/**` and `out/**`, these patterns are
 * intentionally root-scoped to avoid unintended matches.
 */
const IGNORE_PATTERNS_DEFAULT_OUTPUTS_GENERIC = [
    "**/dist/**",
    "build/**",
    "out/**",
] as const satisfies string[];

const IGNORE_PATTERNS_DEFAULT_OUTPUTS = [
    ...IGNORE_PATTERNS_DEFAULT_OUTPUTS_DEPLOYMENT,
    ...IGNORE_PATTERNS_DEFAULT_OUTPUTS_FRAMEWORK,
    ...IGNORE_PATTERNS_DEFAULT_OUTPUTS_GENERIC,
] as const satisfies string[];

const IGNORE_PATTERNS_DEFAULT = [
    ...IGNORE_PATTERNS_DEFAULT_VCS,
    ...IGNORE_PATTERNS_DEFAULT_OS,
    ...IGNORE_PATTERNS_DEFAULT_DEPENDENCIES,
    ...IGNORE_PATTERNS_DEFAULT_CACHES,
    ...IGNORE_PATTERNS_DEFAULT_LOCKFILES,
    ...IGNORE_PATTERNS_DEFAULT_LOGS,
    ...IGNORE_PATTERNS_DEFAULT_OUTPUTS,
] as const satisfies string[];

export {
    IGNORE_PATTERNS_DEFAULT,
    IGNORE_PATTERNS_DEFAULT_CACHES,
    IGNORE_PATTERNS_DEFAULT_DEPENDENCIES,
    IGNORE_PATTERNS_DEFAULT_LOCKFILES,
    IGNORE_PATTERNS_DEFAULT_LOGS,
    IGNORE_PATTERNS_DEFAULT_OS,
    IGNORE_PATTERNS_DEFAULT_OUTPUTS,
    IGNORE_PATTERNS_DEFAULT_OUTPUTS_DEPLOYMENT,
    IGNORE_PATTERNS_DEFAULT_OUTPUTS_FRAMEWORK,
    IGNORE_PATTERNS_DEFAULT_OUTPUTS_GENERIC,
    IGNORE_PATTERNS_DEFAULT_VCS,
};
