import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import MasonryWall from '@yeger/vue-masonry-wall'

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.use(MasonryWall);
app.mount('#app');
