import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv';

dotenv.config();


export default defineConfig({
  plugins: [react()
    , tailwindcss()
  ],
  define: {
    // Makes environment variables accessible in your app
    'process.env': JSON.stringify(import.meta.env),
  },

})


