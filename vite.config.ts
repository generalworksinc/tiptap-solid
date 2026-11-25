import solid from "@solidjs/vite-plugin";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    solid({
      include: /src\/.*\.[jt]sx$/,
      refresh: false,
    }),
    dts({
      outDir: "dist",
      include: ["src"],
      rollupTypes: false,
      copyDtsFiles: true,
      tsconfigPath: "tsconfig.json",
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: [
        /^@tiptap\//,
        "@floating-ui/dom",
        "nanoid",
        "solid-js",
        /^solid-js\//,
        "@solidjs/web",
      ],
    },
  },
});
