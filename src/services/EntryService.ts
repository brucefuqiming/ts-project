import {
  getJson,
  postJson,
} from '../utils/ajaxUtil';

import htmlparser from '@/utils/htmlparser';
import xss from '@/utils/xss';

const lang = 'cn';

export default {
  getAtobRelation(opt: any) {
    const opts = Object.assign({
      source: '',
      destination: '',
      depth: '',
      topK: '',
    }, opt);

    return postJson('/api/ab_path', opts);
  },
  getRelation(id = '', language = lang) {
    return getJson(`/api/item/relation/${language}/${id}`);
  },
  getRelationGragh(id: any, language = lang) {
    return getJson(`/api/customRelationGraph/${language}/${id}`);
  },
  getDetail(id = '', language = lang) {
    return getJson(`/api/item/detail/${language}/${id}`);
  },
  getIntro(id = '', language = lang) {
    return getJson(`/api/item/intro/${language}/${id}`).then((resp: any) => {

      if (!resp.data) {
        return {};
      }

      const entryDetail = resp.data;

      // xss 处理
      if (entryDetail.summary) {
        entryDetail.summary = htmlparser.formatLink(xss(entryDetail.summary, 'content'));
      }

      if (entryDetail.name) {
        entryDetail.name = xss(entryDetail.name);
      }

      // 获取所有lang keys
      entryDetail.langs = Object.entries(entryDetail.global)
        .filter((item) => !!item[1])
        .map((item) => item[0]);

      // 增加cn别名
      if (entryDetail.langs.indexOf('cn') > -1) {
        entryDetail.langs.push('zh');
      }

      resp.data = entryDetail;
      return resp;
    });
  },
};
