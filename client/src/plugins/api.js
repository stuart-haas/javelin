import Vue from 'vue';
import axios from 'axios';
import store from '@/store/store';

const baseURL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (next) => {
    return Promise.resolve(next);
  },
  (error) => {
    if (error.response) {
      const {
        status,
        statusText,
        data: { message },
      } = error.response;
      if ([401, 403, 404, 422, 500].includes(status)) {
        if (status === 401) {
          store.dispatch('user/logout');
        }
        const options = {
          type: 'error',
          message: message ? message : statusText,
          duration: 2000,
        };
        store.dispatch('toast', { options });
      }
    }
    return Promise.reject(error);
  }
);

Vue.prototype.$api = api;
