import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { reactClickToComponent } from "vite-plugin-react-click-to-component";
import { Schema, ValidateEnv } from "@julr/vite-plugin-validate-env";
import TurboConsole from 'unplugin-turbo-console/vite'
import svgr from "vite-plugin-svgr";
import richSvg from "vite-plugin-react-rich-svg";

// Environment validation schema
const envSchema = {
  VITE_APP_ENV: Schema.enum(['local', 'development', 'qa', 'beta', 'production']),
  VITE_APP_API_ORIGIN: Schema.string(),
  VITE_APP_WEBEX_BASE_URL: Schema.string(),
  VITE_APP_WEBEX_CLIENT_ID: Schema.string(),
  VITE_APP_SENTRY_TOKEN: Schema.string(),
  VITE_APP_SENTRY_ORG_SLUG: Schema.string(),
  VITE_APP_SENTRY_PROJECT_NAME: Schema.string(),
  VITE_APP_SENTRY_RELEASE: Schema.string(),
  VITE_APP_SENTRY_DNS: Schema.string(),
  VITE_APP_ENABLE_CONSOLE_LOGS: Schema.boolean(),
  VITE_APP_DEBUG: Schema.boolean(),
  VITE_APP_FEATURE_FLAG_TEST: Schema.boolean(),
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    build: {
      outDir: 'dist',
      sourcemap: mode === 'local' || mode === 'development',
      minify: mode === 'production' ? 'esbuild' : 'terser',
    },
    
    server: {
      port: 3000,
      open: true,
      hmr: {
        path: 'hmr',
      },
    },
    
    preview: {
      port: 3000,
    },
    
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@locales': path.resolve(__dirname, 'src/locales'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@redux': path.resolve(__dirname, 'src/redux'),
        '@routes': path.resolve(__dirname, 'src/routes'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@theme': path.resolve(__dirname, 'src/theme'),
        '@models': path.resolve(__dirname, 'src/types'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@lottie files': path.resolve(__dirname, 'src/lottie files'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@config': path.resolve(__dirname, 'src/config'),
      },
    },

    plugins: [
      react(),
      richSvg(), 
      TurboConsole({}), 
      svgr({}),
      ValidateEnv(envSchema)
    ],

    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  }
})
