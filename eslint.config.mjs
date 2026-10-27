import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Archived third-party React Bits sources kept for reference, not shipped.
    "react-bits/**",
    // Owner-supplied design references. These hold source snippets that are
    // read and ported, not imported by the app.
    "design/**",
    // Exported reference site kept for comparison, not part of the app build.
    "huly/**",
  ]),
]);

export default eslintConfig;
