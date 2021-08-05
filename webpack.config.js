
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


let mode = "development"
let target = "web"

if (process.env.NODE_ENV === "production") {
  mode = "production"
  target= "browserslist"
}

exports.default = {

  mode: mode,
  target: target,

  module: {
    rules:[
      {
        test: /\.(frag|vert|glsl)$/,
        use: [
          { 
            loader: 'glsl-shader-loader',
            options: {}  
          }
        ]
      },
      // {
      //   test: /\.(gltf|fbx)$/i,
      //   type: "assets",
      //   generator: {
      //     filename: 'assets/models/[name][ext][query]'
      //   }
      // },
      {
        test: /\.(png|jpe?g|gif|svg|gltf)$/i,
        type: "asset",
        generator: {
          filename: 'assets/image/[name][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        type: "asset",
        generator: {
          filename: 'assets/font/[name][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test:/\.css/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            //options: {publicPath: ""}
          }, 
          "css-loader", 
          "postcss-loader"
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css'
    }), 
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/image/icon_tsuru.ico"
    })
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].bundle.js',
    //assetModuleFilename: "assets/[hash][ext][query]"
  },

  devtool: "source-map",

  devServer: {
    contentBase: "./dist",
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}