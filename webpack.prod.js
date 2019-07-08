process.env.NODE_ENV = 'production'

const merge = require('webpack-merge')
const common = require('./webpack.common')
const config = require('./webpack.config')
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = merge(common, {
  output: {
    publicPath: config.build.assetsPublicPath
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    providedExports: true,
    usedExports: true
  },
  cache: true
})
