import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "no-shadow": "off",
      "import/no-unresolved": "off",
      "arrow-body-style": "off",
      "linebreak-style": "off",
      "no-unused-vars": "off",
      "no-debugger": "off",
      "class-methods-use-this": "off",
      "comma-dangle": "off",
      "import/no-cycle": "off",
      "import/no-extraneous-dependencies": "off",
      "import/order": "off",
      "import/prefer-default-export": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "max-len": "off",
      "no-console": "off",
      "no-param-reassign": "off",
      "no-plusplus": "off",
      "no-return-assign": "off",
      "object-curly-newline": "off",
      "react/forbid-prop-types": "off",
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "import/extensions": "off",
      "react/no-array-index-key": "off",
      "react/jsx-filename-extension": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/require-default-props": "off",
      "react/function-component-definition": "off",
      "react/jsx-no-useless-fragment": "off",
      "react/button-has-type": "off",
      "react/jsx-props-no-spreading": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "react/no-unstable-nested-components": "off",
      "no-nested-ternary": "off",
      "consistent-return": "off",
      "no-use-before-define": "off",
      camelcase: "off",
      "react/no-unescaped-entities": "off",
      "jsx-a11y/control-has-associated-label": "off",
    },
  },
]);
