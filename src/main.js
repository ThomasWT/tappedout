import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as VueRouter from "vue-router";

import home from './pages/home.vue'
import randomizer from './pages/randomizer.vue'
import settings from "./pages/settings.vue";
import deck from "./pages/deck.vue";
const routes = [
  {
    path: "/",
    component: home,
    meta: { transition: "slide-right" },
  },
  {
    path: "/randomizer",
    component: randomizer,
    meta: { transition: "slide-right" },
  },
  {
    path: "/settings",
    component: settings,
    meta: { transition: "slide-right" },
  },
  {
    path: "/deck",
    component: deck,
    meta: { transition: "slide-right" },
  },
];

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
});

createApp(App).use(VueRouter).use(router).mount('#app')
