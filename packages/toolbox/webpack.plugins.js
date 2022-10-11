/* eslint-disable @typescript-eslint/no-var-requires */

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = [new ForkTsCheckerWebpackPlugin(), new ReactRefreshWebpackPlugin()]
