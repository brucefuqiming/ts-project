import {
  getJson,
  postJson,
} from '../utils/ajaxUtil';

const lang = 'cn';

export default {
  getArticleDetail(id: string = '', language: string = lang) {
    return getJson(`/api/article/detail/${language}/${id}`);
  },
};
