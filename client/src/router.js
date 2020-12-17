import Vue from 'vue';
import Router from 'vue-router';
import Default from './views/layouts/Default.vue';
import Login from './views/pages/account/Login.vue';
import Register from './views/pages/account/Register.vue';
import Favorites from './views/pages/account/Favorites.vue';
import Index from './views/pages/Index.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'default',
      component: Default,
      children: [
        {
          path: '',
          name: 'index',
          component: Index,
        },
        {
          path: 'account/login',
          name: 'login',
          component: Login,
        },
        {
          path: 'account/register',
          name: 'register',
          component: Register,
        },
        {
          path: 'account/favorites',
          name: 'favorites',
          component: Favorites,
        },
      ],
    },
  ],
});

export default router;
