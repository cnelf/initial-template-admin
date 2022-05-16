import Vue from 'vue';
import App from './App.vue';
import router from './router';
import api from './api';
import echarts from './plugins/echarts';
import Clipboard from 'v-clipboard';
import { pinia } from '@/stores';
import { showLoading, autoLoading, getImageUrl } from '@/utils';

import 'virtual:windi.css';
import 'virtual:svg-icons-register';
import './styles/index.scss';
import './plugins/element-ui';

import * as filters from './filters';
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]));

Vue.use(Clipboard);

Vue.prototype.$http = api;
Vue.prototype.$echarts = echarts;
Vue.prototype.$showLoading = showLoading;
Vue.prototype.$autoLoading = autoLoading;
Vue.prototype.$getImageUrl = getImageUrl;

Vue.config.productionTip = false;

new Vue({
  router,
  pinia,
  render: (h) => h(App)
}).$mount('#app');
