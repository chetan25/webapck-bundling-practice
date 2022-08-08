const commonPaths = require("./common-paths");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  mode: "production",
  entry: {
    app: [`${commonPaths.appEntry}/index.js`],
    about: [`${commonPaths.appEntry}/About/About.js`], // entry-point-splitting
  },
  output: {
    filename: "static/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: 1,
              // localsConvention: "camelCase",
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
    // this will generate one HTML file with both scripts in it
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      favicon: `public/favicon.ico`,
    }),
    // this will generate multiple html files
    // new HtmlWebpackPlugin({
    //     template: `public/index.html`,
    //     favicon: `public/favicon.ico`,
    //     chunks: ["about"],
    //     filename: `${commonPaths.outputPath}/about.html`,
    // }),
    // new HtmlWebpackPlugin({
    //     template: `public/index.html`,
    //     favicon: `public/favicon.ico`,
    //     chunks: ["app"],
    // }),
  ],
  optimization: {
    // this will combine dependencies based on where it's imported
    // splitChunks: {
    //     chunks: "all", //vendor splitting,
    //     minSize: 1000 * 600 // this tells webpack to create new vendor bundle if dependency it pulled out exceed f 600KB
    // }

    // to give custom name to vendor chunk, so that all dependencies from node_modules combined in it
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "node_vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
        },
        // this will combine all common app code into one bundle
        common: {
          test: /[\\/]src[\\/]components[\\/]/, // this will only bundle common dep under component folder
          chunks: "all",
          minSize: 0, // just for our app
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
  // use to remove external dependency from bundle
  // externals: {
  //     react: "React",
  //     "react-dom": "ReactDOM",
  // },
};

module.exports = config;
