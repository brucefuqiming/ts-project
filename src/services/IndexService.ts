import {
  getJson,
  postJson,
} from '../utils/ajaxUtil';

const lang = 'cn';

export default {
  loginWithPassword: (opt: any) => {
    return postJson('/api/auth', opt);
  },
  /**
   * 获取推荐关系图谱
   */
  // 获取关系图谱首页信息
  getRecommendRelationList(page: any, size = 10, language = lang) {
    return getJson(`/api/recommend/get/relation/${language}/${page}/${size}`);
  },
};
