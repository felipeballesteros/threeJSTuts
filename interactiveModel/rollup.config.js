import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  entry: 'main.js',
  input: 'src/main.js',
  dest: 'dist/bundle.js',
  output: {
    file: './dist/bundle.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      extensions: [".js"],
    }),
    commonjs(),
    serve({
      open: true,
      verbose: true,
      contentBase: ['', 'public'],
      host: 'localhost',
    }),
    livereload({
      watch: ['dist', 'index.html']
    }),
  ]
}