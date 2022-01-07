import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",//打包路径
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      '@components': path.join(__dirname, './src/components'),
      '@utils': path.join(__dirname, './src/utils'),
      '@config': path.join(__dirname, './src/config')
    }
  },
  // server: {
  //   port: 3000,//启动端口
  //   open: true,
  //   proxy: {
  //     // 选项写法
  //     '/api': 'http://123.56.85.24:5000'//代理网址
  //   },
  //   cors: true
  // }

})