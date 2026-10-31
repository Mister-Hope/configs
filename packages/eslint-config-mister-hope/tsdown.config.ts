import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    vue: "src/vue.ts",
  },
  dts: true,
  fixedExtension: false,
  minify: true,
  publint: true,
});
