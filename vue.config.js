module.exports = {
  devServer: {
    disableHostCheck: true
  },
  css: {
    extract: false
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 102400 }))

    config.module.rule('svg').uses.clear()
  },
  configureWebpack: {
    performance: {
      hints: false
    }
  }
}
