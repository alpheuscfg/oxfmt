# Oxfmt Configuration

A shareable Oxfmt configuration.

## Installation

Install this package as a dependency in the project:

```sh
# npm
npm i @apst/oxfmt

# Yarn
yarn add @apst/oxfmt

# pnpm
pnpm add @apst/oxfmt

# Bun
bun add @apst/oxfmt
```

## Usage

Implement the configuration into `oxlint.config.ts`:

```ts
import { defineConfig } from "@apst/oxfmt";

export default defineConfig();
```

It is possible to override the default configuration by passing an object to the `defineConfig` function:

```ts
import { defineConfig } from "@apst/oxfmt";
import { IGNORE_PATTERNS_DEFAULT } from "@apst/oxfmt/constants/ignore-patterns";

export default defineConfig({
    ignorePatterns: [
        ...IGNORE_PATTERNS_DEFAULT,
        // ...
    ],
});
```

## License

This project is licensed under the terms of the MIT license.
