import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import json from 'rollup-plugin-json';

export default {
  entry: 'src/index.js',
  format: 'umd',
  plugins: [
    commonjs(),
    resolve(),
    json(),
    eslint(),
    babel(babelrc({ addModuleOptions: false }))
  ],
  targets: [
    {
      dest: 'lib/index.js',
      format: 'umd',
      moduleName: 'proxy-validator',
      sourceMap: true
    },
    {
      dest: 'lib/index.mjs',
      format: 'es',
      sourceMap: true
    }
  ],
  sourceMap: true
};
