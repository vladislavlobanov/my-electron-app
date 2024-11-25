const path = require('path');

module.exports = {
  mode: 'development', // Add this line
  entry: './renderer/src/index.js',
  output: {
    path: path.resolve(__dirname, 'renderer/public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
