import { postJson, getJson } from '../utils/ajaxUtil';

export default  {
  // 发送埋点请求
  eventTracking: (opt: any) => {
    return postJson('http://10.4.40.168:8806/api/log/tracking/record', opt, {once: false});
  },
};
