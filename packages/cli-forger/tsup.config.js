import rollup from "rollup-plugin-multi-entry";
import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/**/*", "!src/test/**/*", "!src/**/*.spec.*"],
	format: ["esm", "cjs"],
	outDir: "./build",
	target: "node14",
	loader: {
		".vort": "copy",
	},
	plugins: [rollup()],
	cjsInterop: true,
	minify: true,
	dts: true,
	clean: true,
});
