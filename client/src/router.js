import Vue from 'vue';
import Router from 'vue-router';
import Default from './views/layouts/Default.vue';
import Login from './views/pages/Login.vue';
import Register from './views/pages/Register.vue';

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
