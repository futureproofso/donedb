
const path = require('path');
module.exports = {
  entry: ['./test/index.ts'],
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'test/dist')
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /.*serviceWorkerRegistration\.ts$/,
        use: 'ignore-loader',
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /.*serviceWorkerRegistration\.ts$/],
      },

    ]
  },
};
