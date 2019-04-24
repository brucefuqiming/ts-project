/* eslint-disable no-undef */
/**
 * 处理微信 JSSDK API
 */

// import VConsole from 'vconsole';
import GlobalService from '../services/GlobalService';

// console.log(navigator.userAgent)
// new VConsole()

export interface ShareInfo {
  title?: string;
  desc?: string;
  link?: string;
  imgUrl?: string;
  success?: () => void;
}

class WeChart {
  constructor() {

    if (navigator.userAgent.indexOf('MicroMessenger') < 0) {
      return;
    }

  }

  public setConfig(jsApiList = ['updateAppMessageShareData', 'updateTimelineShareData']) {
    return new Promise((resolve) => {
      GlobalService.getWxSing().then((resp: any) => {

        const data = resp.data;

        if (!wx) { resolve(); }
        wx.config({
          // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.noncestr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList, // 必填，需要使用的JS接口列表
        });

        wx.ready(() => {
          resolve(wx);
        });
      });
    });
  }

  /**
   * 设置微信分享信息 ，包括QQ和微信
   * @param {Object} info
   */
  public setShareInfo(info: ShareInfo) {
    this.setConfig().then((wx: any) => {

      info = Object.assign({
        title: '',
        desc: '',
        link: '',
        imgUrl: '',
        success : () => {},
      }, info);

      wx.updateAppMessageShareData(info);
      wx.updateTimelineShareData(info);
    });
  }
}


if (!window.wechart) {
  window.wechart = new WeChart();
}

export {
  WeChart,
};

export default window.wechart;
