const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpackConfigBase = require('./webpack.config.base.js')
const proxyConfig = require('./proxy.config.js')
const os = require('os')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = Object.assign(webpackConfigBase.config, {
  mode: 'development',
  devtool: 'eval-source-map',
  // 入口
  entry: {
    app: ['babel-polyfill',webpackConfigBase.resolve('src/index.js')]
  },
  // 输出
  output: {
    path: webpackConfigBase.resolve('dev'),
    filename: '[name].js',
    publicPath:'/'
  },
  plugins: [
    // html 模板插件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: webpackConfigBase.resolve('src/index.ejs')
    }),
    new CopyWebpackPlugin([
      // 复制favicon到dist
      {
        from: webpackConfigBase.static,
        to: webpackConfigBase.resolve('dev/static')
      }
    ]),
    // 热替换插件
    new webpack.HotModuleReplacementPlugin(),
    // 更友好地输出错误信息
    new FriendlyErrorsPlugin(),
    // make sure to include the plugin for the magic
    webpackConfigBase.VueLoaderPluginInstance
  ],
  devServer: {
    proxy: {
      '/arb': {
        target: 'http://172.19.60.78:9800',
        secure: false,
        changeOrigin: true
      },
      // koa 代码在 ./mock 目录中，启动命令为 npm run mock。
      '/mockapi': {
        target: `${proxyConfig.domain}:${proxyConfig.port}`, // 如果说联调了，将地址换成后端环境的地址就哦了
        secure: false,
        changeOrigin: true
      }
    },
    host: getIP(),
    disableHostCheck: true, // 为了手机可以访问
    publicPath:'/',
    // contentBase: webpackConfigBase.resolve('dev'), // 本地服务器所加载的页面所在的目录
    // historyApiFallback: true, // 为了SPA应用服务
    historyApiFallback:true,
    quiet: true, //安静模式 省略多余console
    inline: true, //实时刷新
    hot: true, // 使用热加载插件 HotModuleReplacementPlugin
    clientLogLevel: "none"  // HRM WDS 在浏览器控制台的输出
  }
})

/**
 * 获取本机ip
 */
function getIP() {
  const interfaces = os.networkInterfaces()
  let addresses = []
  for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
      let address = interfaces[k][k2]
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address)
      }
    }
  }
  return addresses[0]
}

module.exports = config