// eslint-disable-next-line @typescript-eslint/no-require-imports
const typescript = require('@rollup/plugin-typescript')

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'commonjs',
    sourcemap: true
  },
  plugins: [
    /**
     * @type {import('@rollup/plugin-typescript').RollupTypescriptOptions}
     */
    typescript({
      outputToFilesystem: true,
      tsconfig: './tsconfig.json'
    })
  ]
}
