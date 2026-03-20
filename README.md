# Oxfmt Configuration

A shareable Oxfmt configuration.

Implement the configuration into `oxfmt.config.ts`:

```ts
import { createConfig } from "@apst/oxfmt";

export default createConfig();
```

For extending the configuration, use `withConfig`:

```ts
import { withConfig } from "@apst/oxfmt";

export default withConfig({
    printWidth: 120,
});
```

## License

This project is licensed under the terms of the MIT license.
