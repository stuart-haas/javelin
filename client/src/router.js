import Vue from 'vue';
import store from './store/store';
import Router from 'vue-router';
import Default from './views/layouts/Default.vue';
import Index from './views/pages/Index.vue';
import Login from './views/pages/account/Login.vue';
import Register from './views/pages/account/Register.vue';
import Account from './views/pages/account/Index.vue';
import Orders from './views/pages/account/Orders.vue';
import Favorites from './views/pages/account/Favorites.vue';
import Settings from './views/pages/account/settings/Index.vue';
import UserSettings from './views/pages/account/settings/User.vue';
import UserShipping from './views/pages/account/settings/Shipping.vue';
import Products from './views/pages/products/Index.vue';
import Product from './views/pages/products/Product.vue';
import Cart from './views/pages/cart/Index.vue';
import Checkout from './views/pages/cart/Checkout.vue';
import CP from './views/layouts/CP.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Default,
      children: [
        {
          path: '',
          name: 'index',
          component: Index,
          redirect: () => {
            return '/products';
          },
        },
        {
          path: 'login',
          name: 'login',
          component: Login,
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
          component: Register,
          meta: { title: 'Register' },
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart,
        },
        {
          path: 'cart/checkout',
          name: 'cart-checkout',
          component: Checkout,
        },
        {
          path: 'products',
          name: 'products',
          component: Products,
          meta: { title: 'Products' },
        },
        {
          path: 'products/:id',
          name: 'products-id',
          component: Product,
          meta: { title: 'Product' },
        },
        {
          path: 'account',
          name: 'account',
          component: Account,
          meta: { title: 'Account', requiresAuth: true },
          redirect: () => {
            return '/account/orders';
          },
          children: [
            {
              path: 'orders',
              name: 'account-orders',
              component: Orders,
              meta: { title: 'Orders' },
            },
            {
              path: 'favorites',
              name: 'account-favorites',
              component: Favorites,
              meta: { title: 'Favorites' },
            },
            {
              path: 'settings',
              name: 'account-settings',
              component: Settings,
              meta: { title: 'Settings' },
              redirect: () => {
                return 'settings/user';
              },
              children: [
                {
                  path: 'user',
                  name: 'account-settings-user',
                  component: UserSettings,
                  meta: { title: 'User Settings' },
                },
                {
                  path: 'shipping',
                  name: 'account-settings-shipping',
                  component: UserShipping,
                  meta: { title: 'User Shipping' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/cp',
      name: 'cp',
      component: CP,
      meta: { title: 'Control Panel', requiresRole: 'admin' },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} - Full-Stack Docker`
    : 'Full-Stack Docker';

  const user = store.getters['user/user'];
  if (to.matched.some((records) => records.meta.requiresAuth)) {
    if (!user) {
      next({ name: 'login', query: { from: to.fullPath } });
    } else {
      next();
    }
  } else if (
    to.matched.some((records) => records.meta.requiresRole === 'admin')
  ) {
    if (user.role !== 'admin') {
      next({ name: 'index' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
