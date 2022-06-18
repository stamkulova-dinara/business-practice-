const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

let templates = [];
let dir = 'src/pug/pages';

fs.readdirSync(dir).forEach(file => {
  if (file.match(/\.pug$/)) {
    let filename = file.substring(0, file.length - 4);
    templates.push(
      new HtmlWebpackPlugin({
        template: dir + '/' + filename + '.pug',
        filename: filename + '.html'
      })
    );
  }
});

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        port: 8050,
    }
};

module.exports = ({develop}) => ({
  mode: develop ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
    ...templates,
    new HtmlWebpackPugPlugin(),
      new MiniCssExtractPlugin({
          filename: './styles.css'
      }),
      new CopyWebpackPlugin({
        patterns: [
            {
                from: "./src/assets",
                to: "./assets"
            }
        ]
      })
  ],
  module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["css-loader"],
        },
        {
          test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
          type: 'asset/inline'
        },
        {
          test: /\.pug$/,
          use: [
            "raw-loader",
            "pug-html-loader"
          ]
        },
        {
          test: /\.scss$/i,
          // use: [
          //   MiniCssExtractPlugin.loader,
          //   "css-loader",
          //   "resolve-url-loader",
          //   {
          //     loader: "sass-loader",
          //     options: {
          //       sourceMap: true,
          //     },
          //   },
          // ],
          use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
          ]
        }
      ]
  },
  ...devServer(develop),
});