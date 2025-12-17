import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
// Trigger restart for wrangler.toml
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name][extname]'
            }
        }
    },
    plugins: [
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
