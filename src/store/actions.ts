import { ActionTree, ActionContext } from 'vuex';
import IndexService from '../services/IndexService';
import EntryService from '../services/EntryService';
export interface LoginPayload {
  username: string;
  password: string;
}
const actions: ActionTree<State, any> = {
  /**
   * 使用用户名登录
   */
  loginWithPassword: ({commit}, opt: LoginPayload) => {
    return IndexService.loginWithPassword(opt).then((res: any) => {
      commit('setUsername', opt.username);
    });
  },
  getEntrySummarize: ({ commit }, id: string) => {
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
};


export default actions;
