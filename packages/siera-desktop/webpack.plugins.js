/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const relocateLoader = require('@vercel/webpack-asset-relocator-loader')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

/* eslint-enable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new ReactRefreshWebpackPlugin(),

  // https://www.electronforge.io/config/plugins/webpack#hot-reload-caching
  {
    apply(compiler) {
      compiler.hooks.compilation.tap('webpack-asset-relocator-loader', (compilation) => {
        relocateLoader.initAssetCache(compilation, 'native_modules')
      })
    },
  },
]
