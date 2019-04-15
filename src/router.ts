import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Home from './views/Home.vue';
import NProgress from 'nprogress';
import Cookie from 'cookies-js';
import store from './store';
import uniqid from 'uniqid';
/**
 * pages
 */
// import Login from './views/Login.vue';
import Article from './views/Article.vue';
// import Relation from './views/Relation/Relation.vue';
// import MapDetail from './views/map/map-detail/map-detail.vue';
// import Book from './views/Book/Book.vue';
// import Painting from './views/Painting/Painting.vue';
// import Detail from './views/Detail/detail.vue';
// import ABPath from './views/abpath/abpath.vue';
Vue.use(Router);
NProgress.inc(0.2);


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/article/:aid',
      name: 'article',
      props: true,
      component: Article,
    },
    // {
    //   path: '/relation',
    //   name: 'relation',
    //   props: (route) => ({ ...route.query }),
    //   component: Relation,
    // },
    // {
    //   path: '/map/detail/:id/:nid?',
    //   name: 'map-detail',
    //   props: true,
    //   component: MapDetail,
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login,
    // },
    // {
    //   path: '/detail/:id',
    //   name: 'detail',
    //   props: true,
    //   component: Detail,
    // },
    // {
    //   path: '/book/read',
    //   name: 'book',
    //   props: (route) => ({ ...route.query }),
    //   component: Book,
    // },
    // {
    //   path: '/painting/:paintingId',
    //   name: 'painting',
    //   props: true,
    //   component: Painting,
    // },
    // {
    //   path: '/abpath',
    //   name: 'abpath',
    //   props: (route) => ({ ...route.query }),
    //   component: ABPath,
    // },
    // {
    //   path: '/404',
    //   name: '404',
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

let original = '';

function setNav(to: Route, from: Route) {
  if (!original || (original === to.fullPath)) {
    // store.commit('setRouteFrom', null);
    if (!original) {
      original = to.fullPath;
    }
  } else if (from.name) {
    // store.commit('setRouteFrom', from.fullPath);
  }
}

function getSessionId() { // 改动
  let sid = sessionStorage.getItem('sid') || '';
  if (!sid) {
    sid = uniqid();
    sessionStorage.setItem('sid', sid);
  }
  return sid;
}

function setCookie(to: Route, from: Route) {
  const pageID = uniqid();
  // console.log("新的pageID：：：",pageID);
  const prePageID = Cookie.get('page.id');

  Cookie.set('sid', getSessionId());

  // set previous pageID
  if (prePageID) {
    Cookie.set('page.prev.id', prePageID);
  }

  Cookie.set('page.id', pageID);

  /**
   * 如果不存在refer url 或者域名不一致，清楚page.prev.id
   */
  Cookie.set('refer.url', '');
  const referUrl = from.fullPath;
  if (from.name) {
    Cookie.set('refer.url', referUrl);
  } else {
    Cookie.set('page.prev.id', '');
  }
}

router.beforeEach((to: Route, from: Route, next) => {
  if ((to.name === 'detail' && from.name && original !== to.fullPath)) {
    console.log(to);
    store.commit('setDetailPopup', { show: true, loading: true, id: to.params.id });
    store.dispatch('getEntrySummarize', to.params.id);
    next(false);
  } else if (!to.name) {
    // store.commit('setDownloadPopup', { show: true });
    next(false);
  } else {
    NProgress.start();
    if (to.name === 'relation') {
      // store.commit('setNavTheme', 'dark');
    } else {
      // store.commit('setNavTheme', 'light');
    }
    setNav(to, from);
    setCookie(to, from);
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
