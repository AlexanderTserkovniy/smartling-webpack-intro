/**
 * Created by Oleksandr Tserkovnyi on 12/15/16.
 * kemperomg@gmail.com
 */

const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

module.exports = {
  entry: "./3.js",
  output: {
    filename: "bundle.js"
  },

  devtool: "inline-source-map",

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx', '.coffee']
  },

  // module: {
  //   noParse: /jquery|angular|backbone/
  // },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),

    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ]
};