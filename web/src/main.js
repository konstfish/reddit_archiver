import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import MasonryWall from '@yeger/vue-masonry-wall'
import VueLazyLoad from 'vue3-lazyload'

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.use(MasonryWall);
app.use(VueLazyLoad);
app.mount('#app');
