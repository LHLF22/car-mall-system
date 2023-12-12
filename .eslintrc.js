/*
 * @Date: 2023-12-05 17:06:38
 * @LastEditTime: 2023-12-05 17:06:55
 * @FilePath: \car-mall-system\.eslintrc.js
 * @Description:
 */
module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser", // 指定ESlint的解析器
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
