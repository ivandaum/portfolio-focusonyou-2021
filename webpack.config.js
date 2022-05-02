const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(png|jpg|jpeg|webp)$/,
        use: 'url-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader',
      },
      {
        test: /\.(vert|frag)$/i,
        use: ['raw-loader', 'glslify-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],
}
