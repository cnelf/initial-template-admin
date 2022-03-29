const state = {
  theme: '#409EFF' // 主题色
};

const mutations = {
  SET_THEME(state, theme) {
    state.theme = theme;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
