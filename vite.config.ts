import {defineConfig} from 'vite';

import react from '@vitejs/plugin-react';

console.log('VITE_API_URL: ', process.env.VITE_API_URL);
console.log('VITE_BASE: ', process.env.VITE_BASE);

// https://vitejs.dev/config/

const config = {
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: process.env.VITE_API_URL,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '') // Rewrite the URL path if necessary
            }
        }
    }
};

if (process.env.VITE_BASE) {
    config.base = process.env.VITE_BASE;
}

export default defineConfig(config);