/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Sanity already serves resized/format-optimized images from its own CDN
    // via lib/sanity/image.ts (urlForImage().width().height()), and the local
    // demo placeholders are pre-sized SVGs — so Next's own optimizer (which
    // also can't rasterize SVG without libvips/rsvg) is unnecessary here.
    unoptimized: true,
  },
};

module.exports = nextConfig;
