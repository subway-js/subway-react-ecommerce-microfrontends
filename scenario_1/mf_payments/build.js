const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
const config = defaults.__get__('config');
const buildFileName = require('./package.json').name;
 
// Consolidate chunk files instead
config.optimization.splitChunks = {
  cacheGroups: {
    default: false,
  },
};
// Move runtime into bundle instead of separate file
config.optimization.runtimeChunk = false;

// JS
config.output.filename = buildFileName+'.js';

// CSS. "5" is MiniCssPlugin
config.plugins[5].options.filename = buildFileName+'.css';
config.plugins[5].options.publicPath = '../';

// config.output.libraryTarget = 'umd';

// config.externals = {
//    react: {
//        root: 'React',
//        commonjs2: 'react',
//        commonjs: 'react',
//        amd: 'react'
//    },
//    'react-dom': {
//        root: 'ReactDOM',
//        commonjs2: 'react-dom',
//        commonjs: 'react-dom',
//        amd: 'react-dom'
//    }
//  };
