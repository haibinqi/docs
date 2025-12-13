import { vitePlugin as remix, cloudflareDevProxyVitePlugin } from "@remix-run/dev";
import { defineConfig } from "vite";
// Trigger restart for wrangler.toml
import tsconfigPaths from "vite-tsconfig-paths";

import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
    plugins: [
        nodePolyfills({
            include: ["path", "stream", "util"],
            globals: {
                Buffer: true,
            },
        }),
        cloudflareDevProxyVitePlugin(),
        mdx({
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        }),
        remix({
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
            },
        }),
        tsconfigPaths(),
    ],
});
