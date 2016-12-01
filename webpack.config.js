var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

var commonConfig = {
  resolve: {
    extensions: ['', '.js', '.json']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?retainLines=true" },
      { test: /\.json$/, loader: 'json-loader' }
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'config.json',
        to: 'config.json'
      }
    ])
  ]

};

var serverConfig = {
  target: 'node',
  entry: './server/server.js',
  devtool: 'source-map',
  output: {
    path: root('dist'),
    libraryTarget: 'commonjs'
  },
  externals: [nodeExternals(), renameConfig],
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};


// Default config
var defaultConfig = {
  context: __dirname,
  resolve: {
    root: root('/server')
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'index.js'
  }
};


var webpackMerge = require('webpack-merge');
module.exports = [
// Server
  webpackMerge({}, defaultConfig, commonConfig, serverConfig)
];

// Helpers
function renameConfig(context, request, callback) {
  var m = request.match(/(?:^|[\/\\])(config)\.json$/);
  if (m) return callback(null, `./${m[1]}.json`);

  callback();
}

function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request);
    return;
  }
  cb();
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
