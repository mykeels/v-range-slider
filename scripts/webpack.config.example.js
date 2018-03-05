const path = require('path')
const autoprefixer = require('autoprefixer')

const postcss = [
  autoprefixer({
    browsers: ['> 1%', 'last 2 versions', 'IE >= 9']
  })
]

module.exports = {
  context: path.resolve(__dirname, '../example'),
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, '../example'),
    filename: '__build__.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../dist'),
      'node_modules'
    ],
    alias: {
      'v-range-slider/dist/v-range-slider.scss': 'v-range-slider.scss',
      'v-range-slider': 'v-range-slider.cjs.js'
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.scss/,
        loader: 'sass-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|dist)/
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { postcss }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  devServer: {
    contentBase: './example'
  }
}
