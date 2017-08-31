var webpackConfig = require('./webpack.config.js')
delete webpackConfig.entry;

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    // this is the entry file for all our tests.
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/whatwg-fetch/fetch.js',
      'test/index.js'
    ],
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
      'test/index.js': ['webpack']
    },
    // use the webpack config
    webpack: webpackConfig,
    // avoid walls of useless text
    webpackMiddleware: {
      noInfo: true
    },
    debug: true
  })
}
