# Rule Configuration

This document provides a detailed overview of all rules included in `eslint-config-moritz-grimm`.

---

## Module Overview

This config is split into three modules:

- **base**: Core JavaScript and TypeScript linting rules
- **stylistic**: Code formatting and style rules (via `@stylistic/eslint-plugin`)
- **typescript**: TypeScript-specific type-checked rules (via `typescript-eslint`)

Additionally, this config includes:

- `@eslint/js` recommended rules
- TypeScript ESLint's `recommendedTypeChecked` preset
- Global environment support for both browser and Node.js

---

## Ignored Files

The following directories are automatically ignored:

- `node_modules/`
- `dist/`
- `build/`

---

## Base Rules

Core linting rules applicable to both JavaScript and TypeScript files (`**/*.{js,mjs,cjs,ts,mts,cts}`).

### Error Prevention

#### `eqeqeq: ["warn", "always"]`

**Always use strict equality (`===` and `!==`) instead of loose equality (`==` and `!=`).**

```js
// ❌ Bad
if (value == 5) { }
if (value != null) { }

// ✅ Good
if (value === 5) { }
if (value !== null) { }
```

**Why?** Loose equality can lead to unexpected type coercion bugs.

---

#### `no-undef: "error"`

**Disallow the use of undeclared variables.**

```js
// ❌ Bad
console.log(unknownVariable); // ReferenceError

// ✅ Good
const knownVariable = 42;
console.log(knownVariable);
```

**Why?** Catches typos and prevents runtime errors from undefined variables.

---

#### `no-unreachable: "error"`

**Disallow unreachable code after return, throw, continue, or break.**

```js
// ❌ Bad
function example() {
    return true;
    console.log("This will never run"); // Unreachable
}

// ✅ Good
function example() {
    console.log("This runs");
    return true;
}
```

**Why?** Unreachable code is dead code and indicates a logic error.

---

#### `no-duplicate-imports: "warn"`

**Warn on duplicate imports from the same module.**

```js
// ⚠️ Warning
import { a } from "module";
import { b } from "module";

// ✅ Good
import { a, b } from "module";
```

**Why?** Duplicate imports clutter the code and can cause confusion.

---

#### `prefer-const: "warn"`

**Prefer `const` over `let` for variables that are never reassigned.**

```js
// ⚠️ Warning
let name = "Moritz";
console.log(name);

// ✅ Good
const name = "Moritz";
console.log(name);
```

**Why?** `const` makes code more predictable and prevents accidental reassignment.

---

## Stylistic Rules

Code formatting rules powered by `@stylistic/eslint-plugin`. No Prettier needed.

### Semicolons

#### `stylistic/semi: ["warn", "always"]`

**Always use semicolons at the end of statements.**

```js
// ⚠️ Warning
const value = 42
console.log(value)

// ✅ Good
const value = 42;
console.log(value);
```

---

### Indentation

#### `stylistic/indent: ["warn", 4]`

**Use 4 spaces for indentation.**

```js
// ⚠️ Warning (2 spaces)
function example() {
  return true;
}

// ✅ Good (4 spaces)
function example() {
    return true;
}
```

---

### Brace Style

#### `stylistic/brace-style: ["warn", "1tbs", { allowSingleLine: true }]`

**Use the One True Brace Style (1TBS), but allow single-line blocks.**

```js
// ⚠️ Warning
if (condition)
{
    doSomething();
}

// ✅ Good
if (condition) {
    doSomething();
}

// ✅ Also good (single-line allowed)
if (condition) { doSomething(); }
```

---

#### `curly: ["warn", "multi-line"]`

**Require curly braces for multi-line blocks, but allow omitting them for single-line statements.**

```js
// ✅ Good (single-line)
if (condition) doSomething();

// ⚠️ Warning (multi-line without braces)
if (condition)
    doSomething();
    doSomethingElse();

// ✅ Good (multi-line with braces)
if (condition) {
    doSomething();
    doSomethingElse();
}
```

---

### Trailing Commas

#### `stylistic/comma-dangle: ["warn", "always-multiline"]`

**Always use trailing commas in multiline structures.**

```js
// ⚠️ Warning
const obj = {
    a: 1,
    b: 2
};

// ✅ Good
const obj = {
    a: 1,
    b: 2,
};
```

**Why?** Trailing commas make diffs cleaner when adding new lines.

---

### Spacing

#### `stylistic/object-curly-spacing: ["warn", "always"]`

**Require spaces inside object literal braces.**

```js
// ⚠️ Warning
const obj = {a: 1, b: 2};

// ✅ Good
const obj = { a: 1, b: 2 };
```

---

#### `stylistic/keyword-spacing: ["warn", { before: true, after: true }]`

**Require spaces before and after keywords.**

```js
// ⚠️ Warning
if(condition){
    return;
}

// ✅ Good
if (condition) {
    return;
}
```

---

#### `stylistic/space-before-function-paren: ["warn", { ... }]`

**Control spacing before function parentheses.**

```js
// ⚠️ Warning
function example () { } // Named function with space
const fn = function () { }; // Anonymous function with space

// ✅ Good
function example() { } // Named: no space
const fn = function() { }; // Anonymous: no space
const arrow = async() => { }; // Async arrow: no space

// ✅ Good (catch blocks need space)
try {
} catch (error) { }
```

---

#### `stylistic/no-trailing-spaces: "warn"`

**Disallow trailing whitespace at the end of lines.**

```js
// ⚠️ Warning
const value = 42;   

// ✅ Good
const value = 42;
```

---

#### `stylistic/eol-last: ["warn", "always"]`

**Require a newline at the end of files.**

**Why?** POSIX standard and prevents issues with some tools.

---

#### `stylistic/no-multi-spaces: "warn"`

**Disallow multiple consecutive spaces.**

```js
// ⚠️ Warning
const value  =  42;

// ✅ Good
const value = 42;
```

---

### Quotes

#### `stylistic/quotes: ["warn", "double", { "allowTemplateLiterals": "always" }]`

**Use double quotes for strings, but always allow template literals.**

```js
// ⚠️ Warning
const name = 'Moritz';

// ✅ Good
const name = "Moritz";

// ✅ Also good (template literals always allowed)
const greeting = `Hello, ${name}`;
const simple = `Just a string`;
```

---

## TypeScript Rules

TypeScript-specific rules with type-checking enabled. Requires a `tsconfig.json`. Only applies to `**/*.{ts,mts,cts,tsx}` files.

### Type Safety

#### `@typescript-eslint/no-explicit-any: "warn"`

**Warn when using the `any` type.**

```ts
// ⚠️ Warning
function process(data: any) {
    return data;
}

// ✅ Better
function process(data: unknown) {
    return data;
}

// ✅ Best
function process(data: string) {
    return data;
}
```

**Why?** `any` disables type checking and defeats the purpose of TypeScript. Use specific types or `unknown` instead.

---

#### `@typescript-eslint/explicit-function-return-type: "warn"`

**Warn when function return types are not explicitly defined.**

```ts
// ⚠️ Warning
function calculate(a: number, b: number) {
    return a + b;
}

// ✅ Good
function calculate(a: number, b: number): number {
    return a + b;
}
```

**Why?** Explicit return types make the code more readable and catch type errors early. However, this is a warning (not an error) because type inference is often sufficient.

---

#### `@typescript-eslint/no-floating-promises: "error"`

**Error on missing `await` for promises.**

```ts
// ❌ Bad
async function fetchData() {
    fetch("/api/data"); // Promise not awaited
}

// ✅ Good
async function fetchData() {
    await fetch("/api/data");
}

// ✅ Also good (if you intentionally don't need the result)
async function fetchData() {
    void fetch("/api/data");
}
```

**Why?** Forgetting to await promises can lead to unhandled errors and race conditions.

---

#### `@typescript-eslint/no-unsafe-member-access: "warn"`

**Warn when accessing properties on values typed as `any`.**

```ts
// ⚠️ Warning
function process(data: any) {
    console.log(data.value); // Unsafe member access
}

// ✅ Good
function process(data: { value: string }) {
    console.log(data.value);
}
```

**Why?** Accessing members on `any` bypasses type safety and can lead to runtime errors.

---

#### `@typescript-eslint/no-unused-vars: "warn"`

**Warn on unused variables.**

```ts
// ⚠️ Warning
const unusedVariable = 42;
function example(unusedParam: string) {
    return true;
}

// ✅ Good
const usedVariable = 42;
console.log(usedVariable);

function example(param: string) {
    return param.toUpperCase();
}

// ✅ Also good (prefix with underscore to indicate intentionally unused)
function example(_unusedParam: string) {
    return true;
}
```

**Why?** Unused variables clutter the code and may indicate bugs.

---

### Included Presets

This config also includes all rules from:

- **`typescript-eslint/recommendedTypeChecked`**: Full suite of TypeScript rules with type-checking
- **`@eslint/js/recommended`**: ESLint's recommended JavaScript rules

For a complete list of these preset rules, see:

- [TypeScript ESLint Recommended Type Checked](https://typescript-eslint.io/linting/configs#recommended-type-checked)
- [ESLint Recommended](https://eslint.org/docs/latest/rules/)

---

## Global Variables

This config automatically provides globals for:

- **Browser**: `window`, `document`, `localStorage`, etc.
- **Node.js**: `process`, `__dirname`, `require`, etc.

You don't need to manually define these globals.

---

## Customization

You can override any rule in your `eslint.config.js`:

```js
import eslintConfig from "eslint-config-moritz-grimm";

export default [
    ...eslintConfig,
    {
        rules: {
            // Override example: Allow 2 spaces instead of 4
            "stylistic/indent": ["warn", 2],
            
            // Disable a rule
            "prefer-const": "off",
            
            // Make a warning an error
            "@typescript-eslint/no-explicit-any": "error",
        },
    },
];
```

---

## Questions or Issues?

If you find bugs, have suggestions, or want to discuss specific rules, feel free to open an issue on [GitHub](https://github.com/Moritz-Grimm/eslint-config-moritz-grimm).
