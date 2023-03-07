const standard = require('@neutrinojs/standardjs');
const reactComponents = require('@neutrinojs/react-components');
const jest = require('@neutrinojs/jest');

const styles = require('@neutrinojs/style-loader');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    
    standard({
      env: {
        URL: 'foo',
      },
    }),
    reactComponents(),
    jest(),
    styles({
      style: {},
      css: {
        importLoaders: opts.loaders ? opts.loaders.length : 0,
      },
      loaders: [],
      test: /\.css$/,
      ruleId: 'style',
      modules: true,
      modulesTest: /\.module.css$/,
      extract: {
        enabled: process.env.NODE_ENV === 'production',
        loader: {
          esModule: true,
        },
        plugin: {
          filename:
            process.env.NODE_ENV === 'production'
              ? 'assets/[name].[contenthash:8].css'
              : 'assets/[name].css',
        },
      },
    }),
    // web(),
  ],
};
