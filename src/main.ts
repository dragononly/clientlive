
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { router } from './router'
import store from "./store";
// import VueSocketIO from 'vue-3-socket.io'

const app = createApp(App);

import vue3videoPlay from 'vue3-video-play' // 引入组件

import 'vue3-video-play/dist/style.css' // 引入css
app.use(vue3videoPlay)
app.use(Antd);
app.use(store);
app.use(router);


// app.use(new VueSocketIO({
//     debug: true,
//     connection: 'http://127.0.0.1:9000',
// }))



app.mount('#app')

