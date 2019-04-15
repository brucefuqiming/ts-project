const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  outputDir: isProd ? '../public' : 'dist',
  chainWebpack: (config) => {
    if (isProd) {
      return;
    }
    config.module
      .rule('link-replace')
      .test(/\.(vue|js)$/)
      .use('webpack-repalce')
      .loader('webpack-replace')
      .options({
        replace: [{
            from: '__ALLHISTORY_HOSTNAME__',
            to: 'http://10.4.40.168',
          },
          {
            from: '__ALLHISTORY_MAPTILEHOST__',
            to: '//maptile.allhistory.com',
          },
          {
            from: '__ALLHISTORY_EVENT_HOSTNAME__',
            to: '//10.4.40.168:8806',
          },
          {
            from: '__ALLHISTORY_IMAGEHOST__',
            to: '//pic.evatlas.com',
          },
          {
            from: '__ALLHISTORY_MAPHOST__',
            to: '//mapre.allhistory.com',
          },
          {
            from: '__ALLHISTORY_DOMAIN_HOSTNAME__',
            to: 'http://10.4.40.168',
          },
          {
            from: '__ALLHISTORY_APP_HOST__',
            to: 'marble-test:',
          },
        ],
      });
  },
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [
  //         require('postcss-sprites')({
  //           // retina: true,
  //           // stylesheetPath: './dist/css',
  //           relativeTo:'file',
  //           basePath: './src/',
  //           spritePath: './dist/img/',
  //           svgsprite: {
  //             dest: './dist/img',
  //           },
  //           spritesmith: {
  //             padding: 2
  //           },
  //           plugins: postcssInit
  //         })
  //       ]
  //     }
  //   }
  // },
};
