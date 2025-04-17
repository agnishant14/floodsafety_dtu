/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
async function redirects() {
  return [
    {
      source: "/twitter",
      destination: "https://twitter.com",
      permanent: false,
      basePath: false,
    },
    {
      source: "/linkedin",
      destination: "https://linkedin.com/in",
      permanent: false,
      basePath: false,
    },
  ];
}
module.exports = { nextConfig, redirects };
