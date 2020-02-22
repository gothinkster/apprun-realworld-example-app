import typescript from '@rollup/plugin-typescript';
// import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';

import { terser } from 'rollup-plugin-terser';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: 'src/main.ts',
  output: {
    external: ['marked', 'apprun'],
    globals: { apprun: 'apprun', marked: 'marked' },
    file: 'dist/app.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    typescript({ tsconfig: "tsconfig.json" }),
    // resolve({skip: ['marked']}),
    // commonjs({ ignore: ['marked' ]}),
    terser({
      warnings: true, output: { comments: false }
    }),
    sourcemaps(),
  ]
};