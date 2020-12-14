module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  globals: {
    expect: true,
    describe: true,
    it: true,
    beforeEach: true,
    afterEach: true,
    context: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
};
