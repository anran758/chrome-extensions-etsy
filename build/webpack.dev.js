const merge = require("webpack-merge");
const path = require("path");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "../dist-test/js"),
    filename: "[name].js",
  },
});