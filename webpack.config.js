const path = require('path');
module.exports = {
  entry: {
    'app': './src/main.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname)
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /.tsx?$/, loader: 'ts-loader' },
      { test: /\.js$/, use: ['source-map-loader'], enforce: 'pre' }
    ]
  },
  externals: { apprun: 'apprun', marked: 'marked' },
  devtool:'source-map'
};