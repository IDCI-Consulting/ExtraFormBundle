module.exports = {
  entry: {
    'editor': './Resources/public/js/editor/entrypoint.js'
  },
  output: {
    path: __dirname + '/Resources/public/js/dist',
    filename: '[name].js',
    chunkFilename: '[name].async.js',
    publicPath: "/bundles/idciextraform/js/dist/"
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
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
