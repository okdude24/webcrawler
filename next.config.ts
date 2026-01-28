import type { NextConfig } from "next";
import path from "path";
import fs from "fs";

// Copy .z-ai-config file during build
const sourceConfigPath = path.join(process.cwd(), '.z-ai-config');
const destConfigPath = path.join(process.cwd(), '.next', '.z-ai-config');

if (fs.existsSync(sourceConfigPath)) {
  try {
    fs.mkdirSync(path.join(process.cwd(), '.next'), { recursive: true });
    fs.copyFileSync(sourceConfigPath, destConfigPath);
    console.log('[Next Config] Copied .z-ai-config to .next directory');
  } catch (error) {
    console.error('[Next Config] Failed to copy .z-ai-config:', error);
  }
} else {
  console.log('[Next Config] .z-ai-config not found in project root');
}

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
