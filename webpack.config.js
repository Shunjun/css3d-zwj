const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "index.bundle.js",
    publicPath: "/css3d-zwj/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "./public", to: "./" }],
    }),
  ],
  devServer: {
    compress: true,
    port: 9000,
    publicPath: "/",
  },
};
