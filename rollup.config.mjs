import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const terserOptions = {
  mangle: {
    reserved: [
      "Webflow", "jQuery"
    ]
  }
}

export default [{
  input: 'src/tracking.js',
  output: [{
    file: 'dist/tracking.js',
    format: 'iife',
    name: 'epsTracking'
  }, {
    file: 'dist/tracking.min.js',
    format: 'iife',
    name: 'epsTracking',
    plugins: [terser(terserOptions)]
  }],
  plugins: [nodeResolve()]
}, {
  input: 'src/tabanchors.js',
  output: [{
    file: 'dist/tabanchors.js',
    format: 'iife',
  }, {
    file: 'dist/tabanchors.min.js',
    format: 'iife',
    plugins: [terser(terserOptions)]
  }],
  plugins: [nodeResolve()]
}, {
  input: 'src/forms.js',
  output: [{
    file: 'dist/forms.js',
    format: 'iife',
    name: 'epsForms'
  }, {
    file: 'dist/forms.min.js',
    format: 'iife',
    name: 'epsForms',
    plugins: [terser(terserOptions)]
  }],
  plugins: [nodeResolve()]
}];
