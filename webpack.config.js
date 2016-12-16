/**
 * Created by Oleksandr Tserkovnyi on 12/15/16.
 * kemperomg@gmail.com
 */

const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

module.exports = {
  entry: "./4.js",
  output: {
    filename: "bundle.js"
  },

  devtool: "cheap-module-eval-source-map",

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx', '.coffee']
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      CURRENT_DIR: JSON.stringify(__dirname)
    }),

    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),

    new webpack.ContextReplacementPlugin(
      /\/locale/, /en-gb|ru/
    )
  ]
};