import Vue from 'vue';
import VueRouter from 'vue-router';
import { baseRoutes, adminRoutes } from './router.config';

Vue.use(VueRouter);

const routes = [...baseRoutes, ...adminRoutes];

const router = new VueRouter({
  routes
});

export default router;
