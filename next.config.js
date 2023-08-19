/** @type {import('next').NextConfig} */

const kakaoMapSrc =
  "https://developers.kakao.com/sdk/js/kakao.js http://dapi.kakao.com/v2/maps/sdk.js  http://t1.daumcdn.net/mapjsapi/js/main/4.4.12/kakao.js http://t1.daumcdn.net/mapjsapi/js/libs/services/1.0.2/services.js";

const googleLoginSrc =
  "https://accounts.google.com/gsi/client https://accounts.google.com/gsi/button";

const ContentSecurityPolicy = `
  default-src 'self' ${googleLoginSrc};
  script-src 'self' 'unsafe-eval' 'unsafe-inline' ${kakaoMapSrc} ${googleLoginSrc};
  style-src 'self' 'unsafe-inline' *;
  img-src * blob: data: ;
  media-src 'self';
  connect-src 'self';
  font-src 'self';
  frame-src 'self' ${googleLoginSrc};
`;
const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
