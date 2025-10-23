import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
            'next/image': path.resolve(__dirname, 'resources/js/lib/next-image-shim.tsx'),
            'next/link': path.resolve(__dirname, 'resources/js/lib/next-link-shim.tsx'),
            'next/navigation': path.resolve(__dirname, 'resources/js/lib/next-navigation-shim.ts'),
        },
    },
    server: {
        host: '127.0.0.1',
        port: 5173,
        hmr: {
            host: '127.0.0.1',
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
});
