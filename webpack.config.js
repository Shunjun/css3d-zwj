const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
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
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    publicPath: "/",
  },
};
