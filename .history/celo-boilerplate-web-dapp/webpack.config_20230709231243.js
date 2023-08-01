const path = require("path");
const webpack = require("webpack");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: {
    intro: path.resolve(process.cwd(), "src", "intro.js"),
    main: path.resolve(process.cwd(), "src", "main.js")
  },
  output: {
    path: path.resolve(process.cwd(), "docs"),
    publicPath: ""
  },
  node: {
    fs: "empty",
    net: "empty"
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'intro.html',
      template: path.resolve(process.cwd(), "public", "intro.html"),
      chunks: ['intro']
    })
  ]
}
