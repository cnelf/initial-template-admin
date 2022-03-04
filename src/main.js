import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import echarts from './plugins/echarts';
import Clipboard from 'v-clipboard';
import { showLoading, autoLoading } from '@/utils';

import './icons';
import './plugins/element-ui';
import './styles/index.scss';

import * as filters from './filters';
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]));

Vue.use(Clipboard);

Vue.prototype.$http = api;
Vue.prototype.$echarts = echarts;
Vue.prototype.$showLoading = showLoading;
Vue.prototype.$autoLoading = autoLoading;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
