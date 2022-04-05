/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },

  reactStrictMode: true,

  // Uncoment to add domain whitelist
  images: {
    loader: 'custom',
    // domains: [
    //   'res.cloudinary.com',
    // ],
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};
