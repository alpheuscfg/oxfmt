set shell := ["bash", "-cu"]
set windows-shell := ["pwsh", "-Command"]

tsc := "pnpm exec tsc"
biome := "pnpm exec biome"
tsdown := "pnpm exec tsdown"

publish_dev := "pnpm publish --no-git-checks --tag dev --access public"
publish := "pnpm publish --access public"

pkg := "package"

tst := "test"

# Default action
_:
    just fmt
    just lint
    just build

# Install
i:
    pnpm install

# Lint with TypeScript Compiler
tsc:
    cd ./{{pkg}} && {{tsc}} --noEmit

# Lint code
lint:
    ls-lint -config ./.ls-lint.yaml
    typos
    just tsc

# Lint code with Biome
lint-biome:
    {{biome}} lint .

# Format code
fmt:
    {{biome}} check --write .

# Build package
build:
    cd ./{{pkg}} && {{tsdown}} -c tsdown.config.ts

# Publish package with dev tag as dry-run
publish-dev-try:
    cd ./{{pkg}} && {{publish_dev}} --dry-run

# Publish package with dev tag
publish-dev:
    cd ./{{pkg}} && {{publish_dev}}

# Publish package as dry-run
publish-try:
    cd ./{{pkg}} && {{publish}} --dry-run

# Publish package
publish:
    cd ./{{pkg}} && {{publish}}

# Clean builds (Linux)
clean-linux:
    rm -rf ./{{pkg}}/dist

# Clean builds (macOS)
clean-macos:
    just clean-linux

# Clean builds (Windows)
clean-windows:
    Remove-Item -Recurse -Force ./{{pkg}}/dist

# Clean builds
clean:
    just clean-{{os()}}

# Clean everything (Linux)
clean-all-linux:
    just clean

    rm -rf ./{{pkg}}/node_modules

    rm -rf ./node_modules

# Clean everything (macOS)
clean-all-macos:
    just clean-all-linux

# Clean everything (Windows)
clean-all-windows:
    just clean

    Remove-Item -Recurse -Force ./{{pkg}}/node_modules

    Remove-Item -Recurse -Force ./node_modules

# Clean everything
clean-all:
    just clean-all-{{os()}}

