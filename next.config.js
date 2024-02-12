// const headers = require("./headers");
// const next_config = {
//   reactStrictMode: false,
//   swcMinify: true,
//   images: {
//     loader: "imgix",
//     path: "https://example.com/mycdn/",
//     remotePatterns: [
//       {
//         hostname: "**",
//       },
//     ],
//     domains: ["example.com"],
//   },
//   i18n: {
//     defaultLocale: "en",
//     locales: ["en", "bn", "ar", "fr"],
//   },
//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers,
//       },
//     ];
//   },
//   env: {
//     APP_ENV: process.env.NODE_ENV,
//     APP_SSL: process.env.NEXT_PUBLIC_APP_SSL,
//   },
// };

// module.exports = next_config;

const headers = require("./headers");

module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    loader: "imgix",
    path: "https://example.com/mycdn/",
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
    domains: ["example.com"],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "bn", "ar", "fr"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers,
      },
    ];
  },
  env: {
    APP_ENV: process.env.NODE_ENV,
    APP_SSL: process.env.NEXT_PUBLIC_APP_SSL,
  },
  webpack: (config, { isServer }) => {
    // Add file-loader rule for mp4 files
    config.module.rules.push({
      test: /\.(mp4)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next',
          outputPath: 'static/media',
          name: '[name].[hash].[ext]',
          emitFile: true,
        },
      },
    });

    return config;
  },
};
