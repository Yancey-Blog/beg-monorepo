import typescript from '@rollup/plugin-typescript'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    /**
     * @type {import('@rollup/plugin-typescript').RollupTypescriptOptions}
     */
    typescript({
      outputToFilesystem: true,
      tsconfig: './tsconfig.json',
    })
  ]
}

export default config
