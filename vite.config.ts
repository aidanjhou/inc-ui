import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDemo = mode === "demo"

  return {
    plugins: [
      react(),
      ...(!isDemo
        ? [
            dts({
              tsconfigPath: "./tsconfig.app.json",
              insertTypesEntry: true,
              include: ["src"],
              exclude: ["src/main.tsx", "src/App.tsx"],
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "src": path.resolve(__dirname, "./src"),
      },
    },
    build: isDemo
      ? {
          outDir: "dist-demo",
        }
      : {
          outDir: "dist",
          lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "IncUI",
            formats: ["es", "cjs"],
            fileName: (format) => `inc-ui.${format === "es" ? "mjs" : "cjs"}`,
          },
          rollupOptions: {
            external: [
              "react",
              "react/jsx-runtime",
              "react-dom",
              "tailwindcss",
              "clsx",
              "tailwind-merge",
              "class-variance-authority",
              "lucide-react",
              "tailwindcss-animate",
              /^@radix-ui\//,
            ],
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
                tailwindcss: "tailwindcss",
              },
            },
          },
        },
  }
})
