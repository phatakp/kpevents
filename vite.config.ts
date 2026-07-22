import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const config = defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
    ssr: {
        external: ["@clerk/shared"],
    },
    plugins: [
        devtools(),
        nitro({
            rollupConfig: { external: [/^@sentry\//, /^@clerk\//] },
            preset: "vercel",
            vercel: {
                functions: {
                    runtime: "bun1.x", // If you want to use the Bun runtime on Vercel
                },
            },
        }),
        tailwindcss(),
        tanstackStart({
            serverFns: { disableCsrfMiddlewareWarning: true },
        }),
        viteReact(),
        babel({ presets: [reactCompilerPreset()] }),
    ],
});

export default config;
