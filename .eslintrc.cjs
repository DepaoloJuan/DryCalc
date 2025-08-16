/* .eslintrc.cjs */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    es6: true,
    node: true,
  },
  ignorePatterns: ["dist/", "build/", ".expo/", "node_modules/"],
};
