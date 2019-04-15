import VueRouter from 'vue-router';
declare module 'vue/types/vue' {
  interface Vue {
    setTitle: any,
    $eventTrack: any,
    $previewRefresh: any
    $router: VueRouter
  }
}
