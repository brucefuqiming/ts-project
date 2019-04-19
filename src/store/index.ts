import Vue from 'vue';
import Vuex from 'vuex';
import IndexService from '../services/IndexService';
import EntryService from '../services/EntryService';
import EventTracking from '../components/eventtracking';

import { home } from './modules/home';
import { map } from './modules/map';
Vue.use(Vuex);
import {State} from './interface';
const state: State = {
  username: '',
    routeFrom: '',
    navShow: true,
    navTheme: 'light',
    detailPopup: {
      show: false,
      success: false,
      id: '',
      loading: true,
      title: '',
      desc: '',
      image: '',
    },
    downloadPopup: {
      show: false,
    },
};
export default new Vuex.Store({
  state,
  mutations: {
    setUsername(states, payload) {
      state.username = payload.username;
    },
    setDetailPopup(states, payload) {
      if (payload && payload.show) {
        console.log(payload);
        EventTracking.sendTracking({
          actionType: 'click',
          params: {
            modName: payload.modName || 'contentlink',
            clickList: payload.clickList || 'AHLinkPreview',
            clickAction: 'show',
            id: payload.id,
          },
        });
      }
      state.detailPopup = Object.assign({}, state.detailPopup, payload);
    },
    setDownloadPopup(state, payload) {
      if (payload && payload.show) {
        EventTracking.sendTracking({
          actionType: 'click',
          params: {
            modName: 'appTipsPage',
            clickAction: 'show',
          },
        });
      }
      state.downloadPopup = Object.assign({}, state.downloadPopup, payload);
    },
    setRouteFrom(state, payload) {
      state.routeFrom = payload;
    },
    setNavTheme(state, payload) {
      state.navTheme = payload;
    },
  },
  actions: {
    /**
     * 使用用户名登录
     */
    loginWithPassword: ({commit}, opt) => {
      return IndexService.loginWithPassword(opt).then((res: any) => {
        commit('setUsername', opt.username);
      });
    },
    getEntrySummarize: ({commit}, id) => {
      return EntryService.getIntro(id).then((res: any) => {
        const result = {
          id,
          title: res.data.name,
          desc: res.data.summary,
          image: res.data.imageUrl,
          loading: false,
          success: true,
        };
        commit('setDetailPopup', result);
      }).catch(() => {
        const result = {
          id: '',
          title: '',
          desc: '',
          image: '',
          loading: false,
          success: false,
        };
        commit('setDetailPopup', result);
      });
    },
  },
  modules: {
    home,
    map,
  },
});
