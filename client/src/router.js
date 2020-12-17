import Vue from 'vue';
import Router from 'vue-router';
import Default from './views/layouts/Default.vue';
import Login from './views/pages/Login.vue';
import Register from './views/pages/Register.vue';
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
      ],
    },
  ],
});

export default router;
