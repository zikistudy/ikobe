import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'lib-flexible'
import VueParticles from 'vue-particles'
// main.js:注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

createApp(App).use(store).use(router).use(VueParticles).use(dataV).mount("#app");
