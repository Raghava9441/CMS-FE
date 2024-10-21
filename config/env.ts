import { defineConfig, Schema } from '@julr/vite-plugin-validate-env'

export default defineConfig({
    VITE_MY_VAR: Schema.string({ message: 'This is a required env variable' }),
})