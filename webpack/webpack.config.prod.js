const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const exec = require('child_process').execSync
const webpackConfigBase = require('./webpack.config.base.js')
const pkg = require('../package.json')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
var WebpackInlineManifestPlugin = require('webpack-inline-manifest-plugin')
const ANALYZE = process.env.ANALYZE

// 网站版本号设置
let appVersion = ''
try {
  appVersion = exec('git rev-parse --short HEAD').toString().replace(/\n/, '')
} catch (e) {
  console.warn('Getting revision FAILED. Maybe this is not a git project.')
}

// const vendors =  Object.keys(pkg.dependencies)

const config = Object.assign(webpackConfigBase.config, {
  mode: 'production',
  // You should configure your server to disallow access to the Source Map file for normal users!
  // devtool: 'source-map',
  entry: {
    app: ['babel-polyfill', webpackConfigBase.resolve('src/index.js')],
    // 将第三方依赖（node_modules）的库打包，从而充分利用浏览器缓存
    // vendors: vendors
  },
  output: {
    path: webpackConfigBase.resolve('dist'),
    // publicPath: 'https://cdn.self.com'
    publicPath: '/',
    filename: 'static/js/[name].[chunkhash:8].js'
  },
  optimization: {
    // 分割文件
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        initCommon: {
          name: 'init-common',
          chunks: 'initial',
          minChunks: 2
        },
        // 合并css为两个
        commonStyles: {
          name: 'common-styles',
          test: /\.(s?css)$/,
          // test: /\.(s?css|vue)$/, // 这样会将所有css合为一个
          chunks: 'initial',
          enforce: true
        },
        vendors: {
          name: 'vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          minChunks: 1,
          chunks: 'initial'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
    // 压缩js
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            dead_code: true,
            drop_console: true
          }
        }
      })
    ]
  },
  plugins: [
    // Scope hosting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 删除build文件夹
    new CleanWebpackPlugin(
      'dist',
      {
        root: webpackConfigBase.resolve('')
      }
    ),
    new CopyWebpackPlugin([
      // 复制favicon到dist
      {
        from: webpackConfigBase.static,
        to: webpackConfigBase.resolve('dist/static')
      }
    ]),
    // 抽离出css
    webpackConfigBase.extractCSS,
    // html 模板插件
    new HtmlWebpackPlugin({
      appVersion,
      filename: 'index.html',
      template: webpackConfigBase.resolve('src/index.ejs'),
      thunks: [],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true
      }
    }),
    new WebpackInlineManifestPlugin({
      name: 'webpackManifest'
    }),
    // 定义全局常量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    webpackConfigBase.VueLoaderPluginInstance
  ]
})

// analyze的话，进行文件可视化分析
if (ANALYZE === 'active') {
  config.plugins.push(
    new BundleAnalyzerPlugin()
  )
}

module.exports = config