import tseslint from "typescript-eslint";
import ignores from "./eslint.ignores.config.js";

export default [
    ...ignores,
    ...tseslint.configs.recommendedTypeChecked.map(config => ({
        ...config,
        files: ["**/*.{ts,mts,cts,tsx}"],
    })),
    {
        files: ["**/*.{ts,mts,cts,tsx}"],
        languageOptions: {
            parserOptions: {
                project: true,
            },
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-function-return-type": "warn",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-unsafe-member-access": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/explicit-member-accessibility": ["warn", {
                overrides: {
                    constructors: "no-public",
                },
            }],
        },
    },
];
