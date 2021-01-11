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
          path: '',
          name: 'index',
          redirect: () => {
            return '/products';
          },
        },
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
          path: 'cart',
          name: 'cart',
          component: () => import('@/views/pages/cart/Index.vue'),
        },
        {
          path: 'cart/checkout',
          name: 'cart-checkout',
          component: () => import('@/views/pages/cart/Checkout.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('@/views/pages/products/Index.vue'),
          meta: { title: 'Products' },
        },
        {
          path: 'products/:id',
          name: 'products-id',
          component: () => import('@/views/pages/products/Product.vue'),
          meta: { title: 'Product' },
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('@/views/pages/account/Index.vue'),
          meta: { title: 'Account', requiresAuth: true },
          redirect: () => {
            return '/account/orders';
          },
          children: [
            {
              path: 'orders',
              name: 'account-orders',
              component: () => import('@/views/pages/account/orders/Index.vue'),
              meta: { title: 'Orders' },
            },
            {
              path: 'orders/:id',
              name: 'account-order-id',
              component: () => import('@/views/pages/account/orders/Order.vue'),
              meta: { title: 'Order' },
            },
            {
              path: 'favorites',
              name: 'account-favorites',
              component: () => import('@/views/pages/account/Favorites.vue'),
              meta: { title: 'Favorites' },
            },
            {
              path: 'settings',
              name: 'account-settings',
              component: () =>
                import('@/views/pages/account/settings/Index.vue'),
              meta: { title: 'Settings' },
              redirect: () => {
                return 'settings/user';
              },
              children: [
                {
                  path: 'user',
                  name: 'account-settings-user',
                  component: () =>
                    import('@/views/pages/account/settings/Contact.vue'),
                  meta: { title: 'User Settings' },
                },
                {
                  path: 'shipping',
                  name: 'account-settings-shipping',
                  component: () =>
                    import('@/views/pages/account/settings/Shipping.vue'),
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
      component: () => import('@/views/layouts/CP.vue'),
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'cp',
          component: () => import('@/views/pages/cp/Index.vue'),
          meta: { title: 'Dashboard' },
          redirect: () => {
            return '/cp/orders';
          },
          children: [
            {
              path: 'orders',
              name: 'cp-order',
              component: () => import('@/views/pages/cp/orders/Index.vue'),
              meta: { title: 'Orders' },
            },
            {
              path: 'orders/new',
              name: 'cp-orders-new',
              component: () => import('@/views/pages/cp/orders/New.vue'),
              meta: { title: 'New Order' },
            },
            {
              path: 'orders/:id',
              name: 'cp-orders-id',
              component: () => import('@/views/pages/cp/orders/Order.vue'),
              meta: { title: 'Edit Order' },
            },
            {
              path: 'products',
              name: 'cp-products',
              component: () => import('@/views/pages/cp/products/Index.vue'),
              meta: { title: 'Products' },
            },
            {
              path: 'products/new',
              name: 'cp-products-new',
              component: () => import('@/views/pages/cp/products/Product.vue'),
              meta: { title: 'New Product' },
            },
            {
              path: 'products/:id',
              name: 'cp-products-id',
              component: () => import('@/views/pages/cp/products/Product.vue'),
              meta: { title: 'Edit Product' },
            },
            {
              path: 'categories',
              name: 'cp-categories',
              component: () => import('@/views/pages/cp/categories/Index.vue'),
              meta: { title: 'Categories' },
            },
            {
              path: 'categories/new',
              name: 'cp-categories-new',
              component: () =>
                import('@/views/pages/cp/categories/Category.vue'),
              meta: { title: 'New Category' },
            },
            {
              path: 'categories/:id',
              name: 'cp-categories-id',
              component: () =>
                import('@/views/pages/cp/categories/Category.vue'),
              meta: { title: 'Edit Category' },
            },
            {
              path: 'users',
              name: 'cp-users',
              component: () => import('@/views/pages/cp/users/Index.vue'),
              meta: { title: 'Users' },
            },
            {
              path: 'users/register',
              name: 'cp-users-register',
              component: () => import('@/views/pages/cp/users/Register.vue'),
              meta: { title: 'Register User' },
            },
            {
              path: 'users/:id',
              name: 'cp-users-id',
              component: () => import('@/views/pages/cp/users/User.vue'),
              meta: { title: 'Edit User' },
            },
          ],
        },
      ],
    },
    {
      path: '/cp/login',
      name: 'cp-login',
      component: () => import('@/views/pages/cp/Login.vue'),
      meta: { title: 'Login' },
      beforeEnter: (to, from, next) => {
        const user = store.state.user.user;
        if (user) {
          if (!user.isAdmin) {
            next({ name: 'index' });
          } else {
            next({ name: 'cp' });
          }
        } else {
          next();
        }
        next();
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
    ? `${to.meta.title} - Full-Stack Docker`
    : 'Full-Stack Docker';

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

router.afterEach(() => {
  if (store.state.root.sidebarOpen) {
    store.commit('setState', { name: 'sidebarOpen', value: false });
  }
});

export default router;
