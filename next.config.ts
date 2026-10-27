import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // `skills/` is 200 symlinks into a 2.7GB external library. Without this, the
  // standalone trace tries to pull all of it into the output and the build crawls
  // 119k files. It is a documentation/skill library, not app code.
  outputFileTracingExcludes: {
    "*": ["./skills/**/*", "./react-bits/**/*", "./.agents/**/*"],
  },
};

export default nextConfig;
