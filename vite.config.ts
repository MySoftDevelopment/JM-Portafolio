import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [ react() ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '~': resolve(__dirname, 'node_modules'),
            '@configuration': resolve(__dirname, 'src/api/configuration'),
            '@components': resolve(__dirname, 'src/components'),
            '@includes': resolve(__dirname, 'src/components/includes')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
        },
        emptyOutDir: true
    },
    base: '/'
})