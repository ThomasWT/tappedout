import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as VueRouter from "vue-router";
import { createVfm } from "vue-final-modal";
const vfm = createVfm();
import home from './pages/home.vue'
import randomizer from './pages/randomizer.vue'
import settings from "./pages/settings.vue";
import deck from "./pages/deck.vue";
import "vue-final-modal/style.css";
import './registerServiceWorker'
const routes = [
  {
    path: "/",
    component: home,
    meta: { transition: "slide-fade" },
  },
  {
    path: "/randomizer",
    component: randomizer,
    meta: { transition: "slide-fade" },
  },
  {
    path: "/settings",
    component: settings,
    meta: { transition: "slide-fade" },
  },
  {
    path: "/deck",
    component: deck,
    meta: { transition: "slide-fade" },
  },
];

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
});

createApp(App).use(VueRouter).use(vfm).use(router).mount('#app')
