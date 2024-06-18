import rollup from 'rollup-plugin-multi-entry'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts', '!src/test/**/*', '!src/**/*.spec.*'],
  format: ['esm', 'cjs'],
  outDir: './build',
  plugins: [rollup()],
  cjsInterop: true,
  minify: true,
  dts: true,
  clean: true,
})
