import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
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
        // Generate precompressed assets for production (Brotli & Gzip)
        viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            apply: 'build',
            threshold: 1024,
            compressionOptions: { quality: 11 },
        }),
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
            apply: 'build',
            threshold: 1024,
        }),
    ],
    resolve: {
        alias: {
            '@/components': path.resolve(__dirname, 'resources/js/components'),
            '@': path.resolve(__dirname, 'resources/js'),
            'next/image': path.resolve(__dirname, 'resources/js/lib/next-image-shim.tsx'),
            'next/link': path.resolve(__dirname, 'resources/js/lib/next-link-shim.tsx'),
            'next/navigation': path.resolve(__dirname, 'resources/js/lib/next-navigation-shim.ts'),
            'next/script': path.resolve(__dirname, 'resources/js/lib/next-script-shim.tsx'),
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
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
            '@inertiajs/react',
            'lucide-react',
            '@radix-ui/react-label',
            '@radix-ui/react-dialog',
        ],
    },
    build: {
        sourcemap: false,
        cssCodeSplit: true,
        chunkSizeWarningLimit: 700,
    },
});
