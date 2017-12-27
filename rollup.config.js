import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import json from 'rollup-plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import flow from 'rollup-plugin-flow';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';


const dev = process.env.NODE_ENV !== 'production';

export default {
  input: 'src/index.js',
  plugins: [
    cleanup({ include: /lib/ }),
    flow(),
    commonjs(),
    resolve(),
    json(),
    babel(babelrc({ addModuleOptions: false })),
    uglify({}, minify)
  ],
  output: [
    {
      file: 'lib/index.js',
      format: 'umd',
      name: 'proxy-validator',
      sourcemap: dev
    },
    {
      file: 'lib/index.mjs',
      format: 'es',
      sourcemap: dev
    }
  ],
  sourcemap: dev
};
