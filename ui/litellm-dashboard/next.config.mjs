/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/ui",
  assetPrefix: "",
  trailingSlash: true,
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    return [
      { source: "/get/:path*", destination: "http://127.0.0.1:3000/get/:path*" },
      { source: "/user/:path*", destination: "http://127.0.0.1:3000/user/:path*" },
      { source: "/v2/:path*", destination: "http://127.0.0.1:3000/v2/:path*" },
      { source: "/litellm/:path*", destination: "http://127.0.0.1:3000/litellm/:path*" },
      { source: "/public/:path*", destination: "http://127.0.0.1:3000/public/:path*" },
      { source: "/login", destination: "http://127.0.0.1:3000/login" },
      { source: "/get_image", destination: "http://127.0.0.1:3000/get_image" },
      { source: "/default_config.content.json", destination: "http://127.0.0.1:3000/default_config.content.json" },
      { source: "/health", destination: "http://127.0.0.1:3000/health" },
    ];
  },
};

export default nextConfig;
