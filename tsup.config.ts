import { defineConfig } from "tsup";

export default defineConfig({
    splitting: false,
    sourcemap: true,
    clean: true,
    entry: ["src/index.ts"],
    format: ["cjs", "esm"], // Build for commonJS and ESmodules
    dts: true, // Generate declaration file (.d.ts)
});
