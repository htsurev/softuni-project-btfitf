import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: { 
    environment: 'jsdom', // Allowes us to have JSDOM in NodeJS 
    globals: false, // Don't have to import these each time in each file: import { it, expect, describe } from "vitest";
  }, 
})
