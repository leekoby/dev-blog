/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["tailwindui.com", "images.unsplash.com", "eincode.com", "thrangra.sirv.com", "avatars.githubusercontent.com", "velog.velcdn.com"]
  }
};

module.exports = nextConfig;
