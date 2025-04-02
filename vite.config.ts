import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Expose the server to external connections
    port: parseInt(process.env.PORT ?? "4173", 10), // Use the PORT environment variable or default to 4173
  },
  preview: {
    host: "0.0.0.0", // Expose the preview server to external connections
    port: parseInt(process.env.PORT ?? "4173", 10), // Use the PORT environment variable or default to 4173
    allowedHosts: ['candidate-search-h9wt.onrender.com'], // Allow this host
  },
});
