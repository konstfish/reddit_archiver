import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostsView from '../views/PostsView.vue'
import SavedView from '../views/SavedView.vue'
import StatView from '../views/StatView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/saved',
    name: 'saved',
    component: SavedView
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatView
  },
  {
    path: '/posts/:sub',
    name: 'posts',
    component: PostsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
