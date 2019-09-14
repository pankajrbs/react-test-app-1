import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import chokidar from 'chokidar';
import minify from 'rollup-plugin-babel-minify';
const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    dir: './dist',
    format: 'amd',
    name: 'myBundle',
    entryFileNames: 'bundle.js',
    sourcemap: true
  },
  plugins: [
    serve(),
    livereload(),
    json(),
    resolve({
      // pass custom options to the resolve plugin
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    minify({
      sourceMap: true
    })

    //isProduction && (await import('rollup-plugin-terser')).terser()
  ],
  external: ['lodash'],
  watch: {
    include: './src/**'
    //exclude: './node_modules/**',
    //clearScreen: true
  }
};
