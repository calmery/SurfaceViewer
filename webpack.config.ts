import * as path from "path";
import * as webpack from "webpack";
import * as merge from "webpack-merge";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

const isProduction = process.env.NODE_ENV === "production";
const isWebpackDevServer =
  process.argv.length <= 1 ||
  process.argv[1].toLowerCase().includes("webpack-dev-server");

const common: webpack.Configuration = {
  mode: isProduction ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  }
};

const main: webpack.Configuration = merge(common, {
  entry: "./src/main/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build/main")
  },
  target: "electron-main",
  node: {
    __dirname: false
  }
});

const renderer: webpack.Configuration = merge(common, {
  entry: "./src/renderer/index.tsx",
  output: {
    filename: isProduction ? "[hash].js" : "bundle.js",
    publicPath: "/", // For webpack-dev-server
    path: path.resolve(__dirname, "build/renderer")
  },
  // target: "electron-renderer",
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: "file-loader",
        options: {
          name: isProduction ? "[hash].[ext]" : "[name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/renderer/index.html`,
      minify: {
        collapseWhitespace: isProduction
      }
    })
  ]
});

export default (isWebpackDevServer ? renderer : [main, renderer]);
