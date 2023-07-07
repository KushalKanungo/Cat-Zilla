module.exports = {
    plugins: ["@angular-eslint"],

    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:@angular-eslint/recommended", "standard-with-typescript"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        camelcase: "error",
        snake_case: "off",
        PascalCase: "warn",
        UPPER_CASE: "error",
    },
};
