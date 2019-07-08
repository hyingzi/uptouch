const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Webpack = require('webpack')
const config = require('./webpack.config')

module.exports = {
  // 入口js路径
  entry: ['webpack-hot-middleware/client', './src/index.js'],
  // 编译输出的js及路径
  output: {
    filename: config.assetsPath('js/[name].[hash:8].js'),
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: config.assetsPath('css/[name].[hash:8].css')
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /jquery/,
          name: 'jquery',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-transform-modules-commonjs'
          ]
        }
      }
    }, {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
          }
        }, 'css-loader'
      ]
    }, {
      test: /\.(png|svg|jpg|gif|webp)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: config.assetsPath('images/[name].[hash:8].[ext]')
        }
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: config.assetsPath('media/[name].[hash:8].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: config.assetsPath('fonts/[name].[hash:8].[ext]')
      }
    }, {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'img:data-src', 'audio:src'],
          minimize: true
        }
      }
    }]
  }
}
