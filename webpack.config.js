const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';
  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    entry: './src/js/script.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[contenthash].js',
      assetModuleFilename: 'assets/images/[name].[hash][ext]',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/, // Olha para todos os arquivos javascript. 
          exclude: /node_modules/, // A exclusão Essencial: não queremos traduzir o código de terceiros
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'bundle.[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        favicon: './src/assets/images/favicon.png'
      }),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
    optimization: {
      minimizer: [
        `...`, 
        new CssMinimizerPlugin(),
      ],
      minimize: isProduction,
    },
  }
};