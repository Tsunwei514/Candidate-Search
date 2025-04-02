import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { env } from 'node:process';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT as string, 10) || 3000,
  },
});
