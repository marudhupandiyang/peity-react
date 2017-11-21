var webpack = require('webpack')

module.exports = {

  entry: [
    './source/index.js'
  ],
  output: {
    library: 'PeityReact',
    libraryTarget: 'umd'
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      lodash: {
        root: '_',
        commonjs2: 'lodash',
        commonjs: 'lodash',
        amd: 'lodash',
      }
    }
  ],

  module: {
    loaders: [
      { exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },

  node: {
    Buffer: false
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ]

}
