const path = require('path');
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [{ pattern: 'tests/**/*.spec.js', watched: false }],
    preprocessors: { 'tests/**/*.spec.js': ['webpack'] },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: { rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: [['@babel/preset-react', { runtime: 'automatic' }]], plugins: [['istanbul', { exclude: ['**/tests/**', '**/node_modules/**'] }]] } } }] },
      resolve: { extensions: ['.js', '.jsx'] }
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: { dir: path.join(__dirname, 'coverage'), reporters: [{ type: 'html' }, { type: 'text-summary' }] },
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: { ChromeHeadlessNoSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] } },
    singleRun: true,
    restartOnFileChange: false
  });
};
