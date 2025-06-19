module.exports = {
  extends: ["next", "next/core-web-vitals", "plugin:prettier/recommended"],
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "semi": ["error", "always"],
    "quotes": ["error", "single", { "avoidEscape": true }],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "sort-imports": ["warn", {
      "ignoreCase": false,
      "ignoreDeclarationSort": true,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
    }]
  },
};
