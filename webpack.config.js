const path              = require('path');
const webpack           = require('webpack');
const htmlPlugin        = require('html-webpack-plugin');
//const htmlPlugin        = require('html-webpack-plugin-for-multihtml');
//const openBrowserPlugin = require('open-browser-webpack-plugin'); 
//const dashboardPlugin   = require('webpack-dashboard/plugin');
const autoprefixer      = require('autoprefixer'); 
const ES6Promise           =require('es6-promise');
const _fetch            = require('whatwg-fetch');
ES6Promise.polyfill();

const PATHS = {
  app: path.join(__dirname, 'src/'),
  images:path.join(__dirname,'src/assets/'),
  build: path.join(__dirname, 'dist')
};

const options = {
  host:'localhost',
  port:'1234'
};

module.exports = {
  entry: {
    //entry: ['babel-polyfill', './app/js']
    //app:PATHS.app //+ "banniere.html"
    "banniere":['babel-polyfill','whatwg-fetch', PATHS.app + "banniere.tsx"],
    "rapportUtilisateurs":['babel-polyfill','whatwg-fetch', PATHS.app + "rapportUtilisateurs.tsx"],
    "rapportLicence":['babel-polyfill','whatwg-fetch', PATHS.app + "rapportLicence.tsx"],
  },
  output: {
    path: PATHS.build,
    //filename: 'bundle.[hash].js'
    filename: '[name]-bundle.[hash].js',
    libraryTarget : "var",
    library: 'Kiwi'
  }, 
  resolve: {
    extensions: ['.ts','.tsx', '.js', '.jsx']
  },
  /*À mettre en comment pour builder */
  devtool: 'inline-source-map',
  devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host,
      port: options.port 
    },
    /* Fin comments */
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
    //new dashboardPlugin(),
    new webpack.HotModuleReplacementPlugin({
        multiStep: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    /* new htmlPlugin({
      template:path.join(PATHS.app,'index.html'),
      inject:'body'
    }) */
    new htmlPlugin({
      chunks:['banniere'],
      filename:'banniere.html',
      template:path.join(PATHS.app,'banniere.html'),
      inject:'body'
    }),
    new htmlPlugin({
      chunks:['rapportUtilisateurs'],
      filename:'rapportUtilisateurs.html',
      template:path.join(PATHS.app,'rapportUtilisateurs.html'),
      inject:'body'
    }),
    new htmlPlugin({
      chunks:['rapportLicence'],
      filename:'rapportLicence.html',
      template:path.join(PATHS.app,'rapportLicence.html'),
      inject:'body'
    }),
       new webpack.ProvidePlugin({
    Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
    fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
  }), 
    /* ,
    new openBrowserPlugin({
      url: `http://${options.host}:${options.port}`
    })*/
  ] ,
  node: {
    fs: "empty"
 }
};