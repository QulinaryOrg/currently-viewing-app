const Dotenv = require('dotenv-webpack');

module.exports = {
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
    new Dotenv() // defaults to .env
  ]
};
