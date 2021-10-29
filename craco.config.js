const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
						modifyVars: { 
              '@primary-color': '#b0e0e6', 
              '@font-size-base':'16px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};