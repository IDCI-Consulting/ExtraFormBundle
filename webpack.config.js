module.exports = {
  entry: {
    'form-editor': './Resources/public/js/editor/entrypoint.js'
  },
  output: {
    path: __dirname + '/Resources/public/js',
    filename: 'editor.[name].js',
    chunkFilename: '[name].vendor.js',
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
