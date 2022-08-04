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
};
