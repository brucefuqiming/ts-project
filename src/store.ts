import Vue from 'vue';
import Vuex from 'vuex';
import {State} from './interface';
Vue.use(Vuex);
const states: State = {
  list: [1, 2, 3],
};

const mutations: any = {
  CHANGE_VALUE(state: State) {
    state.list.push(4);
  },
};

const actions: any = {
  changValue(context: any) {
    context.commit('CHANGE_VALUE', 123);
  },
};

export default new Vuex.Store({
  state: states,
  mutations,
  actions,
});
