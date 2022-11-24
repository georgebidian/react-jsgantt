import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import * as path from 'path';
import external from 'rollup-plugin-peer-deps-external';
import scss from 'rollup-plugin-scss';
import sass from 'sass';
import { fileURLToPath } from 'url';
import pkg from './package.json' assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    scss({
      fileName: 'index.css',
      includePaths: [
        path.join(__dirname, 'node_modules/'),
      ],
      outputStyle: 'compressed',
      sass,
    }),
    url(),
    svgr(),
    resolve(),
    typescript(),
    commonjs()
  ]
};
