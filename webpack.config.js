// var path = require('path');
// var SRC_DIR = path.join(__dirname, '/client/src');
// var DIST_DIR = path.join(__dirname, '/client/dist');

// module.exports = {
//   entry: './client/src/index.jsx',
//   output: {
//     filename: 'bundle.js',
//     path: './client/dist'
//   },
//   module : {
//     loaders : [
//       {
//         test : /\.jsx?/,
//         include : SRC_DIR,
//         loader : 'babel-loader',      
//         query: {
//           presets: ['react', 'es2015']
//        }
//       }
//     ]
//   }
// };

var webpack = require("webpack");

module.exports = {
  entry: __dirname + "/client/src/index.jsx",
  output: {
    path: __dirname + "/dist/assets",
    filename: "bundle.js",
    publicPath: "assets"
  },
  devServer: {
    inline: true,
    contentBase: __dirname + "/dist/assets",
    port: 3000
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
}