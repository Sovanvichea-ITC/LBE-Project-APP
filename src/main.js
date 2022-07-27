import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Equal from 'equal-vue'
import 'equal-vue/dist/style.css'

import writefile from 'writefile'

const app = createApp(App)

app.use(router)
app.use(Equal);
app.use(writefile);

app.mount('#app')
