import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";

const config: webpack.Configuration = {
  mode: "development",

  entry: "./src/index.tsx",

  output: {
    filename: "bundle.js",
    path: `${__dirname}/dist`,
  },

  devtool: "source-map",

  devServer: {
    open: true,
    overlay: {
      errors: true,
      warnings: true,
    },
    port: 3000,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      appMountId: "app",
      inject: false,
      lang: "en-US",
      links: ["https://fonts.googleapis.com/css?family=Roboto:300,400,500"],
      mobile: true,
      template: require("html-webpack-template"),
      title: "Physics",
    }),
  ],
};

export default config;
