const path = require( 'path' );
const webpack = require( 'webpack' );

const config = require( '../../src/common/config' );

const babelConfig = {
  "stage": 1,
};

const externals = config.production.scripts.filter( script => {
  return script.import;
}).map( script => {
  return {[ script.import ]: script.identifier };
}).reduce(( prev, curr ) => {
  return Object.assign( prev, curr );
});

module.exports = {
  entry: './src/client',
  externals: externals,
  output: {
    path: path.resolve( __dirname, '..', '..', 'dist' ),
    filename: 'client.min.js',
  },
  module: {
    loaders: [{
      loaders: [ `babel?${ JSON.stringify( babelConfig )}` ],
      test: /\.js$/,
    },
    {
      loaders: [ 'json' ],
      test: /\.json$/,
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false,
      },
    }),
  ],
};

