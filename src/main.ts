import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


const app = createApp(App)
//关于Element plus内容导入
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'


app.use(ElementPlus)

app.mount('#app')