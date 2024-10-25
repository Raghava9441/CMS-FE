import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import { ViteAliases } from 'vite-aliases'
import { reactClickToComponent } from "vite-plugin-react-click-to-component";
// import { Schema, ValidateEnv } from "@julr/vite-plugin-validate-env";
// import autoAlias from 'vite-plugin-auto-alias';
import TurboConsole from 'unplugin-turbo-console/vite'
// import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
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
