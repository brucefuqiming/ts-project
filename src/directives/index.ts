import Vue from 'vue';
import store from '../store';

Vue.directive('downloadPop', {
  bind(el) {
    el.onclick = () => {
      // store.commit('setDownloadPopup', { show: true });
    };
  },
});
