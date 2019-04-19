import Vue from 'vue';
import Vuex from 'vuex';
import { home } from './modules/home';
import { map } from './modules/map';
Vue.use(Vuex);
import state from './state';
import mutations from './mutations';
import actions from './actions';
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    home,
    map,
  },
});
