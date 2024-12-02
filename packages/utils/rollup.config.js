import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'

/**
 * @type {import('rollup').RollupOptions}
 */
export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs'
      }
    ],
    plugins: [
      /**
       * @type {import('@rollup/plugin-typescript').RollupTypescriptOptions}
       */
      typescript(),
      /**
       * @type {import('@rollup/plugin-terser').Options}
       */
      terser()
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm'
      }
    ],
    plugins: [
      /**
       * @type {import('@rollup/plugin-typescript').RollupTypescriptOptions}
       */
      typescript(),
      /**
       * @type {import('@rollup/plugin-terser').Options}
       */
      terser()
    ]
  }
])
