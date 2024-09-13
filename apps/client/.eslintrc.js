/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "@test-fan/eslint-config/base.js",
    "react-app"
  ],
};
