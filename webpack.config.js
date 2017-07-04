module.exports = {
  entry: {
    'editor': './Resources/public/js/editor/entrypoint.js'
  },
  output: {
    path: __dirname + '/Resources/public/js',
    filename: '[name].js',
    chunkFilename: '[name].async.js',
    publicPath: "/bundles/idciextraform/js/"
  },
  // To remove if using .vue loader
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  externals: {
    jquery: 'jQuery'
  }
};
