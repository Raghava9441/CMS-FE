import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// import { ViteAliases } from 'vite-aliases'
import { reactClickToComponent } from "vite-plugin-react-click-to-component";
// import { Schema, ValidateEnv } from "@julr/vite-plugin-validate-env";
// import autoAlias from 'vite-plugin-auto-alias';
import TurboConsole from 'unplugin-turbo-console/vite'
import svgr from "vite-plugin-svgr";
import richSvg from "vite-plugin-react-rich-svg";

// import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
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
    },
  },
  plugins: [
    react(),
    richSvg(),
    TurboConsole({}),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        // Keep title by default
        titleProp: true,
        // Convert SVG to React Native format
        native: false,
        // Custom props to component
        exportType: 'named',
        ref: true,
        svgo: true,
        // Plugin options
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          plugins: [
            {
              name: 'removeViewBox',
              // active: false
            },
            {
              name: 'removeDimensions',
              // active: true
            }
          ]
        }
      }
    }),
    reactClickToComponent(),// alt+right click to see  where the component is locatedd in the code base
    // ValidateEnv({ configFile: 'config/env' })
  ],
  base:'/CMS-FE/',
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
