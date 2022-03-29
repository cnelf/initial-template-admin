import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modulesFiles = import.meta.globEager('./modules/*.js');
const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
  new RegExp(/^\.\/modules\/(.*)\.\w+$/).test(modulePath);
  const name = RegExp.$1;
  const module = modulesFiles[modulePath];
  modules[name] = module.default;
  return modules;
}, {});

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules
});
