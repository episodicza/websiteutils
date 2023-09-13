import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [{
  input: 'src/tracking.js',
  output: [{
    file: 'dist/tracking.js',
    format: 'iife',
    name: 'episodicTracking'
  }, {
    file: 'dist/tracking.min.js',
    format: 'iife',
    name: 'episodicTracking',
    plugins: [terser()]
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
    plugins: [terser()]
  }],
  plugins: [nodeResolve()]
}];
