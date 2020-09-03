const path = require('path');
// const isDev = process.env.NODE_ENV == 'development';
const isDev = false;
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
            name: '[name].[ext]',
            outputPath: 'assets/img/',
            limit: 8192,
          },
        },
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   PRODUCTION: JSON.stringify(true),
    //   'process.env': {
    //     NODE_ENV:isDev?'"development"':'"production"'
    //   }
    // }),
    new CopyWebpackPlugin({
      patterns: [{
        from: __dirname + '/src/assets',
        to: __dirname + '/dist/assets',
        toType: 'dir'
      }, {
        from: __dirname + '/src/index.html',
        to: __dirname + '/dist/index.html',
        toType: 'file'
      }],
    })
  ]
}