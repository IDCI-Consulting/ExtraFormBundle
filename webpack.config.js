var webpack = require('webpack');

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
      'vue': 'vue/dist/vue.esm.js'
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
