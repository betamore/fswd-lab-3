var path = require('path'),
    webpack = require('webpack');

module.exports = {
  entry: './app/index.js',
  output: {
      path: path.join(__dirname, 'public'),
      publicPath: '/',
      filename: 'bundle.js'
  },
  plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
      })
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }

  // module: {
  //   loaders: [
  //     // the url-loader uses DataUrls.
  //     // the file-loader emits files.
  //     {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
  //     {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
  //     {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
  //     {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
  //   ]
  // }
};
