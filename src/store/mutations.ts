import { MutationTree } from 'vuex';
export interface SetDetailPopupPayload {
  id: string;
  title: string;
  desc: string;
  image: string;
  loading: boolean;
  success: boolean;
  show: boolean;
  [PropName: string]: any;
}
const mutations: MutationTree<State> = {
  setUsername(state, payload) {
    state.username = payload.username;
  },
  setDetailPopup(state, payload: SetDetailPopupPayload) {
    if (payload && payload.show) {
      console.log(payload);
      window.EventTracking.sendTracking({
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
  setDownloadPopup(state, payload: {show: boolean}) {
    if (payload && payload.show) {
      window.EventTracking.sendTracking({
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

};


export default mutations;
