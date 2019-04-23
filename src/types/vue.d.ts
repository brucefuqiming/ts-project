import VueRouter from 'vue-router';
import Vue from 'vue';
import { EventTracking } from '../components/eventtracking';
declare module 'vue/types/vue' {
  interface Vue {
    $setTitle(title:string):void,
    $previewRefresh: any
    $router: VueRouter,
    $eventTrack:  EventTracking,
    wakeupApp: (from?: string) => void
    // $message:
  }
}
