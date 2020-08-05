const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require('webpack-merge');

const { getHtmlOptions } = require("./get-html.js");

module.exports = merge({
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.less$/,
        use: [
          { loader: "style-loader", },
          { loader: "css-loader", },
          { loader: "less-loader", },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".js"],
  },

  optimization: {
    minimize: true,
    minimizer: [
      // 使用 terser 来缩小 JavaScript
      // https://webpack.docschina.org/plugins/terser-webpack-plugin/
      new TerserPlugin({
        cache: '.cache/',
        parallel: true,
        sourceMap: true,
        extractComments: false,

        // 压缩选项: https://github.com/terser/terser#compress-options
        terserOptions: {
          warnings: false,
          output: {
            comments: false,
          },
        },
      }),
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../public'), },
      ]
    }),
  ],
}, getHtmlOptions());
