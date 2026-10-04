import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const cloudinaryCloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "your-cloud-name";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: `/${cloudinaryCloudName}/**`,
      },
    ],
  },
};

export default createNextIntlPlugin("./i18n/request.ts")(nextConfig);
