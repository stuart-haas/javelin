import Vue from 'vue';
import store from './store/store';
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
          name: 'account-login',
          component: Login,
          meta: { title: 'Login' },
        },
        {
          path: 'account/register',
          name: 'account-register',
          component: Register,
          meta: { title: 'Register' },
        },
        {
          path: 'account/favorites',
          name: 'account-favorites',
          component: Favorites,
          meta: { title: 'Your Favorites', requiresAuth: true },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} - Full-Stack Docker`
    : 'Full-Stack Docker';

  const user = store.state.user.user;
  if (to.matched.some((records) => records.meta.requiresAuth)) {
    if (!user) {
      next({ name: 'account-login', query: { from: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
