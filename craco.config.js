const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#ff652f",
              "@secondary-color": "#FFFFFF",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  resolve: {
    fallback: {
      assert: require.resolve("assert"),
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
    },
  },
  ignoreWarnings: [/Failed to parse source map/],
};
