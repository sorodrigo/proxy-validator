import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import json from 'rollup-plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import flow from 'rollup-plugin-flow';
import { terser } from 'rollup-plugin-terser';

const terserOptions = {
  safari10: true
};

export default {
  input: 'src/index.js',
  plugins: [
    cleanup({ include: /lib/ }),
    flow(),
    commonjs(),
    resolve(),
    json(),
    babel({
      ...babelrc({ addModuleOptions: false }),
      exclude: 'node_modules/**'
    }),
    terser(terserOptions)
  ],
  output: [
    {
      file: 'lib/index.js',
      format: 'umd',
      name: 'proxy-validator'
    },
    {
      file: 'lib/index.mjs',
      format: 'es'
    }
  ]
};
