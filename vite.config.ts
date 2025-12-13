import { vitePlugin as remix, cloudflareDevProxyVitePlugin } from "@remix-run/dev";
import { defineConfig } from "vite";
// Trigger restart for wrangler.toml
import tsconfigPaths from "vite-tsconfig-paths";

import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

export default defineConfig({
    plugins: [
        cloudflareDevProxyVitePlugin(),
        /* mdx plugin removed to allow raw string imports of markdown files for manual parsing with marked */
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
