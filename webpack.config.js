const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const commonConfig = {
  entry: {
    swg: ['./src/js/swg.js', './src/css/swg.css'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return {
      ...commonConfig,
      mode: 'development',
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: {
          name: 'SWG',
          type: 'umd',
        },
        globalObject: 'this'
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css'
        })
      ],
      devtool: false,
    };
  }

  return [
    {
      ...commonConfig,
      mode: 'production',
      optimization: {
        minimize: false
      },
      output: {
        filename: 'swg.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
          name: 'SWG',
          type: 'umd',
        },
        globalObject: 'this'
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'swg.css'
        })
      ]
    },
    {
      ...commonConfig,
      mode: 'production',
      output: {
        filename: 'swg.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
          name: 'SWG',
          type: 'umd',
        },
        globalObject: 'this'
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'swg.min.css'
        })
      ],
      optimization: {
        minimizer: [
          `...`,
          new CssMinimizerPlugin(),
        ],
      },
    }
  ];
};