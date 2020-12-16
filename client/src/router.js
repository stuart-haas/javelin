import Vue from 'vue';
import Router from 'vue-router';
import Default from './views/layouts/Default.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'default',
      component: Default,
    },
  ],
});

export default router;
