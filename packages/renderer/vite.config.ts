import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { join } from "path";

export default defineConfig(({ mode }) => {
    return {
        root: join(__dirname, "../../"),
        publicDir: join(__dirname, "/public"),
        base: "./",
        plugins: [tsconfigPaths(), react()],
        css: { devSourcemap: true },
        server: {
            port: 3000
        },
        build: {
            outDir: "out/renderer",
            emptyOutDir: true,
            sourcemap: "inline",
            minify: mode == "production"
        }
    };
});
