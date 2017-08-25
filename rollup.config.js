import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  plugins: [
    commonjs(),
    resolve(),
    json(),
    eslint(),
    babel(babelrc({ addModuleOptions: false }))
  ],
  output: [
    {
      file: 'lib/index.js',
      format: 'umd',
      name: 'proxy-validator',
      sourcemap: true
    },
    {
      file: 'lib/index.mjs',
      format: 'es',
      sourcemap: true
    }
  ],
  sourcemap: true
};
