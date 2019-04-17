import { postJson, getJson } from '../utils/ajaxUtil';

export default  {
  // 发送埋点请求
  eventTracking: (opt: any) => {
    return postJson('__ALLHISTORY_EVENT_HOSTNAME__/api/log/tracking/record', opt, {once: false});
  },
};
