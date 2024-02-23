/** @type {import('next').NextConfig} */
// import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [ "antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table" ],
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
};

module.exports = nextConfig;
