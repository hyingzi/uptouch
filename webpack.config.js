const path = require("path")

module.exports = {
  dev: {
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/'
  },
  build: {
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/'
  },
  assetsPath(_path,isAssetsPublicPath) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
      ? this.build.assetsSubDirectory
      : this.dev.assetsSubDirectory

    return path.posix.join(isAssetsPublicPath?isAssetsPublicPath:assetsSubDirectory, _path)
  }
}
