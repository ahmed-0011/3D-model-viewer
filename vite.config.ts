import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "./",
    build: {
        rollupOptions: {
            output: {
                assetFileNames: assetInfo => {
                    let extType = assetInfo.name.split(".").at(1);
                    return `assets/${extType}/[name].[hash][extname]`;
                },
                chunkFileNames: "assets/js/[name].[hash].js",
                entryFileNames: "assets/js/[name].[hash].js"
            },
            plugins: [
                copy({
                    targets: [{ src: "src/assets/RobotExpressive.glb", dest: "dist/assets/" }],
                    hook: "writeBundle"
                })
            ]
        }
    },

    resolve: {
        alias: [
            { find: "@", replacement: path.resolve(__dirname, "./src") },
            { find: "@components", replacement: path.resolve(__dirname, "./src/components") }
        ]
    }
});
