const prod = process.env.NODE_ENV === 'production';
const watch = process.env.WATCH === 'true';

console.log(`
=============================
auth-sdk
MODE:  ${prod ? 'Production' : 'Development'}
WATCH: ${watch}
=============================
`);

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');

const plugins = [
  new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(process.env.NODE_ENV) }),
  new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
  new TSLintPlugin({ files: ['./src/**/*.ts'] }),
  new CopyWebpackPlugin([
    {
      from: './src/css/auth-sdk.css',
      to: '',
    },
  ]),
];

const config = {
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'sample'),
    port: 9000,
  },
  devtool: 'source-map',
  entry: './src/index.ts',
  mode: prod ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
    ],
  },
  optimization: {
    minimize: prod,
  },
  output: {
    filename: 'auth-sdk.js',
    path: path.resolve('./dist'),
  },
  plugins: plugins,
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.html'],
    plugins: [new TsConfigPathsPlugin()],
  },
  watch: watch,
};

module.exports = config;
