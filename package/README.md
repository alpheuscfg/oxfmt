# Oxfmt Configuration

A shareable Oxfmt configuration.

## Usage

Implement the configuration into `oxfmt.config.ts`:

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
