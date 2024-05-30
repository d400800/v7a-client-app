import {defineConfig} from 'vite';

import react from '@vitejs/plugin-react';

const apiHosts = {
    dev: 'http://localhost:3000',
    prod: 'http://167.172.109.17:3000'
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: apiHosts.prod,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '') // Rewrite the URL path if necessary
            }
        }
    }
});