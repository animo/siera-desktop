/* eslint-disable @typescript-eslint/no-var-requires */

const plugins = require('./webpack.plugins')
const rules = require('./webpack.rules')

/* eslint-enable @typescript-eslint/no-var-requires */

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
})

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
      https: false,
    },
    alias: {
      'abort-controller': require.resolve('native-abort-controller'),
    },
  },
}
