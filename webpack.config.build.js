const path              = require('path');
const webpack           = require('webpack');
//const htmlPlugin        = require('html-webpack-plugin-for-multihtml');
//const openBrowserPlugin = require('open-browser-webpack-plugin'); 
//const dashboardPlugin   = require('webpack-dashboard/plugin');
const autoprefixer      = require('autoprefixer'); 
const _fetch            = require('whatwg-fetch');
const ES6Promise           =require('es6-promise');
ES6Promise.polyfill();
/* require('core-js/modules/es6.symbol');
require('core-js/modules/es6.array.iterator');
require('core-js/modules/es6.promise');
require('whatwg-fetch'); */



const PATHS = {
  app: path.join(__dirname, 'src/'),
  images:path.join(__dirname,'src/assets/'),
  build: path.join(__dirname, 'dist')
};

module.exports = {
  entry: {
    app: ['babel-polyfill','whatwg-fetch',PATHS.app]
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.cspq.js',
    libraryTarget : "var",
    library: 'CSPQ'
  }, 
  resolve: {
    extensions: ['.ts','.tsx', '.js', '.jsx']
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [ 
      {
        test: /\.tsx?$/,
        loaders: ['babel-loader','ts-loader'],
        exclude: /(node_modules|bower_components)/
      },
      { 
        test: /\.s?css$/, 
        loader: "style-loader!css-loader"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      }, 
      {
        test: /\.json$/,
        loader: 'json-loader'
      },     
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,        
        loader: 'file',
        query: {
          name: '[path][name].[ext]'
        }
      },   
    ]
  },
   externals :{
    jquery:"jQuery"
   
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
  }),
  new webpack.ProvidePlugin({
    Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
    fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
  }),
  new webpack.NoEmitOnErrorsPlugin()
  ] ,
  node: {
    fs: "empty",
    __dirname:false
 }
};