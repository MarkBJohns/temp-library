import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@sass': path.resolve(__dirname, '../src/sass'),
    },
  },
})

// export default defineConfig({
//   root: __dirname,
//   plugins: [react()],
//   server: {
//     fs: {
//       allow: [
//         __dirname,
//         path.resolve(__dirname, "../sass"),
//       ],
//     },
//   },
//   resolve: {
//     alias: {
//       "@sass": path.resolve(__dirname, "../sass"),
//     },
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         includePaths: [path.resolve(__dirname, "../sass")],
//       },
//     },
//   },
// });