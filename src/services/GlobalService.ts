import {
  getJson,
  postJson,
} from '../utils/ajaxUtil';


const lang = 'cn';

export default {
  getWxSing() {
    return postJson('/api/auth/w1/n/weixin/vipcn', {
      url: window.location.href.split('#')[0],
    });
  },
};
