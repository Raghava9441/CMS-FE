import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
// import { ViteAliases } from 'vite-aliases'
import { reactClickToComponent } from "vite-plugin-react-click-to-component";
// import { Schema, ValidateEnv } from "@julr/vite-plugin-validate-env";
// import autoAlias from 'vite-plugin-auto-alias';
import TurboConsole from 'unplugin-turbo-console/vite'
// import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@locales': path.resolve(__dirname, 'src/locales'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@lottie files': path.resolve(__dirname, 'src/lottie files'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  plugins: [
    react(),
    TurboConsole({}),
    reactClickToComponent(),// alt+right click to see  where the component is locatedd in the code base
    // ValidateEnv({ configFile: 'config/env' })
  ],
  server: {
    port: 3000,
    hmr: {
      path: 'hmr',
    },
  },
  preview: {
    port: 3000,
  },
})
