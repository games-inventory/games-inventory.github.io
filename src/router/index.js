import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import GameDetails from '@/views/GameDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game/:code',
    name: 'GameDetails',
    component: GameDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
