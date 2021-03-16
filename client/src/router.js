import Vue from 'vue';
import store from './store/store';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/layouts/Default.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/pages/account/Login.vue'),
          meta: { title: 'Login' },
          beforeEnter: (to, from, next) => {
            const user = store.state.user.user;
            if (user) {
              return next({ name: 'index' });
            }
            next();
          },
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/pages/account/Register.vue'),
          meta: { title: 'Register' },
        },
        {
          path: 'trackers',
          name: 'trackers',
          component: () => import('@/views/pages/trackers/Index.vue'),
          meta: { title: 'Trackers' },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Javelin` : 'Javelin';

  if (!store.state.user.user) {
    await store.dispatch('user/initialize');
  }
  const user = store.state.user.user;
  if (to.matched.some((records) => records.meta.requiresAuth)) {
    if (!user) {
      next({ name: 'login', query: { from: to.fullPath } });
    } else {
      next();
    }
  } else if (to.matched.some((records) => records.meta.requiresAdmin)) {
    if (user) {
      if (!user.isAdmin) {
        next({ name: 'index' });
      } else {
        next();
      }
    } else {
      next({ name: 'cp-login', query: { from: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;
