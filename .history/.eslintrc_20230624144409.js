module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: [
      "./tsconfig.json",
      "./packages/web/tsconfig.json",
      "./packages/server/tsconfig.json",
    ],
    tsconfigRootDir: ".",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "vue"],
  extends: ["plugin:vue/recommended", "plugin:@typescript-eslint/recommended"],
  root: true,
  env: {
    node: true,
    jest: true,
  },

  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/quotes": [1, "double"],
    "prettier/prettier": "off",
    "vue/singleline-html-element-content-newline": "off",
  },
};
