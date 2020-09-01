const path = require('path');
const isDev = process.env.NODE_ENV == 'development';
const webpack = require('webpack')
module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devServer: {
    port: 7777,
    compress: true,
    contentBase: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        // 打包图片
        test: /\.(jpg|png|gif)$/,
        use: {
          // loader: 'file-loader',
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 8192,
          },
        },
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:isDev?'"development"':'"production"'
      }
    })
  ]
}