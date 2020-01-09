import {Configuration} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpackSourceFileLoader from './webpack-source-file-loader';

const config: Configuration = {
  mode: "development",
  entry: './src/entry.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: [
        {loader: 'ts-loader'},
        {
          loader: './webpack-source-file-loader.ts',
          options: {
            placeholder: '__FILENAME_LINE__'
          }
        }
      ],
      exclude: /node_modules/
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }) as any
  ]
}

export default config;
