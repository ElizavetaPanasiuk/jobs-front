const path = require("path");
const PrettierPlugin = require("prettier-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  devServer: {
    historyApiFallback: true,
    static: "./dist",
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: 'asset/resource',
      },
      {
        loader: 'file-loader',
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        options: {
          publicPath: '',
          name: `assets/[name].[ext]`,
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: 'assets',
        },
      ]
    }),
    new PrettierPlugin({
      printWidth: 80,
      tabWidth: 2,
      useTabs: true,
      semi: true,
      singleQuote: true,
      encoding: 'utf-8',
      jsxSingleQuote: false,            
      extensions: [ ".tsx", ".ts" ]
    }),
    new ESLintPlugin({
      extensions: [".tsx", ".ts"]
    })
  ],
};