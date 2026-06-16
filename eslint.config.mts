import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import angular from "angular-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", ".angular", "coverage", "out-tsc"]),
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/unbound-method": ["error", { ignoreStatic: true }],
      "@typescript-eslint/no-extraneous-class": ["error", { allowWithDecorator: true }],
      "@angular-eslint/component-selector": ["error", { type: "element", prefix: "hive", style: "kebab-case" }],
      "@angular-eslint/directive-selector": ["error", { type: "attribute", prefix: "hive", style: "camelCase" }],
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      ...angular.configs.tsRecommended,
      eslintConfigPrettier,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    linterOptions: {
      noInlineConfig: true,
    },
    processor: angular.processInlineTemplates,
  },
  {
    files: ["src/**/*.html"],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility, eslintConfigPrettier],
  },
]);
