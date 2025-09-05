import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbitePlugin from 'flowbite/plugin'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: [
          './index.html',
          './src/**/*.{js,ts,jsx,tsx}',
          './node_modules/flowbite/**/*.js',
        ],
        plugins: [flowbitePlugin],
      }
    })
  ],
})
