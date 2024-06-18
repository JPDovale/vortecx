import rollup from 'rollup-plugin-multi-entry'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts', '!src/test/**/*', '!src/**/*.spec.*'],
  format: ['cjs', 'esm'],
  outDir: './build',
  target: 'node14',
  plugins: [rollup()],
  cjsInterop: true,
  sourcemap: true,
  minify: true,
  dts: true,
  clean: true,
})
