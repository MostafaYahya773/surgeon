// next.config.js ← النسخة الصحيحة
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // امسح اللي فوق ده كله
      // أو خلّيه بس للي مش مسجل دخول (اختياري)
      // {
      //   source: '/',
      //   has: [
      //     {
      //       type: 'cookie',
      //       key: 'supabase.auth.token', // أو أي كوكي بتاعة supabase
      //       value: undefined,
      //     },
      //   ],
      //   destination: '/auth/Login',
      //   permanent: false,
      // },
    ];
  },
};

export default nextConfig;
