import solid from "@solidjs/vite-plugin";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    solid({
      include: /src2\/.*\.[jt]sx$/,
      refresh: { disabled: true },
    }),
    dts({
      outDir: "dist/solid2",
      include: ["src2"],
      aliasesExclude: [/^solid-js/],
      rollupTypes: false,
      copyDtsFiles: true,
      tsconfigPath: "tsconfig.solid2.json",
    }),
  ],
  build: {
    outDir: "dist/solid2",
    emptyOutDir: false,
    lib: {
      entry: "src2/index.ts",
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
