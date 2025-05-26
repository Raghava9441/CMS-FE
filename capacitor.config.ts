import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'cms-fe',
  webDir: 'dist',
  // bundledWebRuntime: false,
  server: {
    url: 'http://192.168.1.14:3000/CMS-FE/',
    cleartext: true,
  },
};

export default config;
