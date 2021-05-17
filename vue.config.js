module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/HappyAquarium/'
    : './',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '快樂水族'
        return args
      })
  }
}
