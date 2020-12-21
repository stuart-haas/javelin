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
import CPLogin from './views/pages/cp/Login.vue';
import CPIndex from './views/pages/cp/Index.vue';
import CPOrders from './views/pages/cp/orders/Index.vue';
import CPProducts from './views/pages/cp/products/Index.vue';
import CPProduct from './views/pages/cp/products/Product.vue';
import CPCategories from './views/pages/cp/categories/Index.vue';
import CPCategory from './views/pages/cp/categories/Category.vue';
import CPUsers from './views/pages/cp/users/Index.vue';
import CPRegisterUser from './views/pages/cp/users/Register.vue';
import CPUser from './views/pages/cp/users/User.vue';

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
            return '/account/favorites';
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
      component: CP,
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'cp',
          component: CPIndex,
          meta: { title: 'Dashboard' },
          children: [
            {
              path: 'orders',
              name: 'cp-order',
              component: CPOrders,
              meta: { title: 'Orders' },
            },
            {
              path: 'products',
              name: 'cp-products',
              component: CPProducts,
              meta: { title: 'Products' },
            },
            {
              path: 'products/new',
              name: 'cp-products-new',
              component: CPProduct,
              meta: { title: 'New Product' },
            },
            {
              path: 'products/:id',
              name: 'cp-products-id',
              component: CPProduct,
              meta: { title: 'Edit Product' },
            },
            {
              path: 'categories',
              name: 'cp-categories',
              component: CPCategories,
              meta: { title: 'Categories' },
            },
            {
              path: 'categories/new',
              name: 'cp-categories-new',
              component: CPCategory,
              meta: { title: 'New Category' },
            },
            {
              path: 'categories/:id',
              name: 'cp-categories-id',
              component: CPCategory,
              meta: { title: 'Edit Category' },
            },
            {
              path: 'users',
              name: 'cp-users',
              component: CPUsers,
              meta: { title: 'Users' },
            },
            {
              path: 'users/register',
              name: 'cp-users-register',
              component: CPRegisterUser,
              meta: { title: 'Register User' },
            },
            {
              path: 'users/:id',
              name: 'cp-users-id',
              component: CPUser,
              meta: { title: 'Edit User' },
            },
          ],
        },
      ],
    },
    {
      path: '/cp/login',
      name: 'cp-login',
      component: CPLogin,
      meta: { title: 'Login' },
      beforeEnter: (to, from, next) => {
        const user = store.state.user.user;
        if (user) {
          if (user.role !== 'admin') {
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
      if (user.role !== 'admin') {
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
