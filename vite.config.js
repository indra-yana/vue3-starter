import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import FullReload from 'vite-plugin-full-reload';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), /*FullReload(['./src/views/**'], { delay: 200 })*/],
  // root: './',
  // publicDir: 'src/assets',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': path.resolve(__dirname, 'src/views/components'),
      '@pages': path.resolve(__dirname, 'src/views/pages'),
      '@layouts': path.resolve(__dirname, 'src/views/layouts'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@src': path.resolve(__dirname, 'src'),
      '@public': path.resolve(__dirname, 'public'),
      '@assets': path.resolve(__dirname, 'public/assets')
    }
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       chunkFileNames: 'assets/js/[name]-[hash].js',
  //       entryFileNames: 'assets/js/[name]-[hash].js',
        
  //       assetFileNames: ({name}) => {
  //         if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
  //             return 'assets/images/[name]-[hash][extname]';
  //         }
          
  //         if (/\.css$/.test(name ?? '')) {
  //             return 'assets/css/[name]-[hash][extname]';   
  //         }
 
  //         // default value
  //         // ref: https://rollupjs.org/guide/en/#outputassetfilenames
  //         return 'assets/[name]-[hash][extname]';
  //       },
  //     },
  //   }
  // },
})
