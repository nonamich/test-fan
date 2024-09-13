/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "@test-fans/eslint-config/base.js",
    "react-app"
  ],
};
