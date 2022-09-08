const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = [new ForkTsCheckerWebpackPlugin(), new ReactRefreshWebpackPlugin()];
