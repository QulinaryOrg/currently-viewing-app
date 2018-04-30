const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  return {
    entry: [
      './src/index.js'
    ],
    output: {
      path: __dirname,
      publicPath: '/',
      filename: 'app.js'
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ["react", "env", "stage-1"]
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']        
        }
      ],
      loaders: []
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devServer: {
      historyApiFallback: true,
      contentBase: './'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.ECHOSERVER': JSON.stringify(env.ECHOSERVER)
      })
    ]
  }
};
