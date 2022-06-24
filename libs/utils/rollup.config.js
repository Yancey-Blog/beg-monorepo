import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import progress from 'rollup-plugin-progress'
import { visualizer } from 'rollup-plugin-visualizer'
import buble from 'rollup-plugin-buble'
import sizes from 'rollup-plugin-sizes'

const isAnalysis = process.env.NODE_ENV === 'analysis'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true,
    banner:
      '// @shared/utils for BEG Monorepo \n // Copyright (c) 2022 Yancey Inc. and its affiliates. \n'
  },
  plugins: [
    /**
     * @type {import('@rollup/plugin-typescript').RollupTypescriptOptions}
     */
    typescript({
      outputToFilesystem: true,
      tsconfig: './tsconfig.json'
    }),
    terser(),
    progress(),
    isAnalysis && visualizer({
      open: true,
    }),
    buble(),
    sizes()
  ].filter(Boolean)
}

export default config
