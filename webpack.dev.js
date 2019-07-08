const merge = require('webpack-merge')
const common = require('./webpack.common')
const config = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getlocationip = require('getlocationip')
const Webpack = require('webpack')

module.exports = merge(common, {
  output: {
    pathinfo: false,
    publicPath: config.dev.assetsPublicPath
  },
  devServer: {
    clientLogLevel: 'warning',
    port: 8080,
    compress:true,
    host: getlocationip(),
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    publicPath: config.dev.assetsPublicPath
  }
})
