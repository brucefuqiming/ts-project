import Vue from 'vue';
import './plugins/vue-photo-preview';
import vOutsideEvents from 'vue-outside-events';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './directives';
import App from './App.vue';
import router from './router';
import store from './store/index';
import eventTracking from './components/eventtracking';
import './utils/diamond';
Vue.config.productionTip = false;
console.log(navigator.userAgent);
Vue.use(vOutsideEvents);
Vue.prototype.$setTitle = (title: string) => {
  document.title = title + '_全历史';
};

Vue.prototype.wakeupApp = (from: string = 'm_site') => {
  const t = +new Date();
  const url = window.location.href.replace(/https?:/gi, '__ALLHISTORY_APP_HOST__');
  const timer = setTimeout(() => {
    const c = +new Date();
    if (c - t > 1200) {
      clearTimeout(timer);
      return;
    }
    let downloadUrl = '__ALLHISTORY_DOMAIN_HOSTNAME__/staticPage/download';
    if (from) {
      downloadUrl += `/${from}`;
    }
    downloadUrl += `?rt=${encodeURIComponent(url)}`;
    window.location.href = downloadUrl;
  }, 1000);
  window.location.href = url;
};

Vue.prototype.$eventTrack = eventTracking;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
