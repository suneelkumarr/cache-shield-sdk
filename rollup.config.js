import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * Released under the ${pkg.license} License
 */`;

// Shared plugins
const plugins = [
  resolve(),
  commonjs(),
  typescript({ tsconfig: './tsconfig.json' })
];

export default [
  // Main bundle - CJS
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      banner,
      exports: 'named'
    },
    plugins
  },
  
  // Main bundle - ESM
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.mjs',
      format: 'es',
      banner
    },
    plugins
  },
  
  // Main bundle - UMD (browser)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'CacheShield',
      banner,
      exports: 'named'
    },
    plugins
  },
  
  // Main bundle - UMD minified
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'CacheShield',
      banner,
      exports: 'named',
      plugins: [terser()]
    },
    plugins
  },
  
  // React plugin
  {
    input: 'src/plugins/react.tsx',
    output: [
      { file: 'dist/react.js', format: 'cjs', exports: 'named' },
      { file: 'dist/react.mjs', format: 'es' }
    ],
    external: ['react'],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ 
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist'
      })
    ]
  },
  
  // Vue plugin
  {
    input: 'src/plugins/vue.ts',
    output: [
      { file: 'dist/vue.js', format: 'cjs', exports: 'named' },
      { file: 'dist/vue.mjs', format: 'es' }
    ],
    external: ['vue'],
    plugins
  }
];