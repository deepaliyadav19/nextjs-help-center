/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  transpilePackages: ['antd', '@ant-design', '@ant-design/icons'],
  reactStrictMode: true,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
};

module.export = nextConfig;
