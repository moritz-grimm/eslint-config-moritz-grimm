# eslint-config-moritz-grimm

My preferred ESLint config for JavaScript and TypeScript projects.

**Disclaimer:** This config is built for my personal use. There might be rough edges or opinionated choices that don't fit your workflow. Feel free to use it, but adjust it to your workflow.

---

## Features

- **TypeScript support** with type-checked rules
- **Stylistic rules** via `@stylistic/eslint-plugin`
- **ESLint 9 Flat Config** format
- - **Modular**: Import only what you need

---

## Installation

```bash
npm install --save-dev @moritz-grimm/eslint-config-moritz-grimm
```

or if you prefer Bun

```bash
bun install @moritz-grimm/eslint-config-moritz-grimm --dev
```

### Requirements

- **Node.js:** >=18.0.0
- **ESLint:** >=9.0.0
- **TypeScript:** >=5.0.0 (only if linting TypeScript files)

If you don't have ESLint or TypeScript installed yet:

```bash
npm install --save-dev eslint typescript
```

---

## Configuration

This config is modular. You can import everything or only specific parts.

### Option 1: Full Config (Recommended)

Import all rules (base + stylistic + TypeScript):

```js
import eslintConfig from "@moritz-grimm/eslint-config-moritz-grimm";

export default [
    ...eslintConfig,
];
```

### Option 2: Modular Import

Pick only what you need:

**Base rules** (core JavaScript/TypeScript linting):

```js
import eslintConfig from "@moritz-grimm/eslint-config-moritz-grimm/base";

export default [
    ...eslintConfig,
];
```

**Stylistic rules** (code formatting):

```js
import eslintConfig from "@moritz-grimm/eslint-config-moritz-grimm/stylistic";

export default [
    ...eslintConfig,
];
```

**TypeScript rules** (type-checked linting):

```js
import eslintConfig from "@moritz-grimm/eslint-config-moritz-grimm/typescript";

export default [
    ...eslintConfig,
];
```

You can also combine multiple modules:

```js
import baseConfig from "@moritz-grimm/eslint-config-moritz-grimm/base";
import stylisticConfig from "@moritz-grimm/eslint-config-moritz-grimm/stylistic";

export default [
    ...baseConfig,
    ...stylisticConfig,
];
```

---

## Usage

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

Then run:

```bash
npm run lint        # Check for linting issues
npm run lint:fix    # Auto-fix issues
```

---

## What's Included?

For a complete list of all rules and their configuration, see **[RULES.md](RULES.md)**.

Quick overview:

- **Code Quality:** Strict equality, no unreachable code, prefer `const`, no duplicate imports
- **TypeScript:** Type-checked linting, `any` warnings, promise handling
- **Code Style:** 4-space indentation, semicolons, double quotes, 1TBS brace style, trailing commas

---
<!-- TODO: Check if this workflow even works anymore -->
<!-- ## CI/CD Integration

Example GitHub Actions workflow for automatic linting:

```yaml
name: Lint

on:
  push:
    branches: [main, master, dev]
  pull_request:
    branches: [main, master, dev]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
```

Save this as `.github/workflows/lint.yaml` in your project. -->

---

## License

[MIT](LICENSE)
