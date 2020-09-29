const path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, '/'),
    filename: 'api.bundle.js'
  },
  target: 'node'
};