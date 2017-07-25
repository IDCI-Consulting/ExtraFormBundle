var webpack = require('webpack');
var path    = require('path');

module.exports = {
  entry: {
    'editor': './Resources/public/js/editor/src/entrypoint.js'
  },
  output: {
    path: __dirname + '/Resources/public/js/editor/dist',
    filename: '[name].js',
    chunkFilename: '[name].async.js',
    publicPath: "/bundles/idciextraform/js/editor/dist/"
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      'ExtraFormBundle': path.resolve(
        __dirname,
        'Resources/public/js/editor/src/'
      )
    }
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
