import { builtinModules } from "module";
import pkg from "../../package.json";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
    return {
        root: __dirname,
        plugins: [tsconfigPaths({ root: resolve(__dirname, "../../") })],
        build: {
            outDir: "../../out",
            emptyOutDir: false,
            minify: mode == "production",
            sourcemap: "inline",
            lib: {
                entry: "preload.ts",
                formats: ["cjs"]
            },
            rollupOptions: {
                output: {
                    entryFileNames: "preload.cjs"
                },
                external: [
                    "electron",
                    ...builtinModules,
                    ...builtinModules.map(e => `node:${e}`),
                    ...Object.keys(pkg.dependencies || {})
                ]
            }
        }
    };
});
