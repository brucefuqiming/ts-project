
import TrackService from '@/services/TrackService';
import Cookies from 'cookies-js';
import { Props, Keyval } from './interface';
import 'colors';

class EventTracking {
  public referUrl: string;
  public prePageID: string;
  public pageID: string;
  constructor(props?: Props) {
    this.referUrl = Cookies.get('refer.url');
    this.prePageID = Cookies.get('page.prev.id');
    this.pageID = Cookies.get('page.id');
    this.bindEvent();
  }

  // 发送日志请求
  /**
   *
   * @param {Object} properties
   * @param {Node} $target
   */
  public sendTracking(properties: Props = {}, $target?: any) {
    // default value
    // this._correctCookie();
    try {

      const props: Props = Object.assign({

        // User Agent :@UserAgent,包含浏览器以及设备信息，可以分析是否微信，android chrome等信息
        UA: navigator.userAgent,

        // Current URL:@当前URL
        URL: window.location.href,

        // Referred URL:@来源URL
        referUrl: Cookies.get('refer.url'),

        // Session ID:@浏览器关闭之前的会话ID
        sessionID: Cookies.get('sid'),

        // Action Type
        actionType: 'click',

        // TimeStamp
        timeTracking: +new Date(),

        // Previous Page ID:@上一页面ID
        prePageID: Cookies.get('page.prev.id'),

        // Current Page ID:@当期那页面ID
        pageID: Cookies.get('page.id'),

        // modeName:@字段固定：ssr-page服务端渲染，fe-page前端渲染
        modName: 'fe-page',

        // external params
        params: {
          // itemId:'123',
        },
        data : [],
      }, properties);

      // 一些参数需要事件执行后才能取到,通过properties.data取到 可新增可覆盖
      // data = [{key:'itemId',val:'data-id'}],key:需要的key值，val:存放在dom的哪个属性中


      if ( properties.data && properties.data.length > 0) {
        properties.data.map((x: Keyval) => {
          props.params[x.key] = $target.attr(x.val);
          // console.log(x.key,$target.attr(x.val))
        });
      }
      delete props.data;
      // console.log({ props, co: document.cookie });

      const track = TrackService.eventTracking(props);
    } catch (err) {
      console.log(err);
    }

  }

  public _correctCookie() {
    Cookies.set('page.prev.id', this.prePageID); /* { maxAge: Infinity } */
    Cookies.set('page.id', this.pageID); /*  { maxAge: Infinity } */
  }
  /**
   * TODO: correction cookies, before redrect or open new tabs
   *
   * <a>  window.open. window.location.href,   (window.unload)
   */
  public bindEvent() {
    // 重写open方法
    const open = window.open;
    window.open = (URL, name, features, replace) => {
      this._correctCookie();
      return open(URL, name, features, replace);
    };
    window.onbeforeunload = (event) => {
      this._correctCookie();
    };
  }



}


// 单例模式
if (!window.EventTracking) {
  window.EventTracking = new EventTracking();
}

export {
  EventTracking,
};
export default window.EventTracking;
