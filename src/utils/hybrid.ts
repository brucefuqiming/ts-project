/**
 * 统一处理微信 & App 之间的公用操作
 *
 * method 名称需要与 APP 提供的注册事件保持一致
 * 注册分享内容
 * @method registerShareData
 */

import wechart , { ShareInfo } from './wechart';
import diamond from './diamond';

export default {
  /**
   * 注册分享内容
   * @param {title, desc, link, imgUrl} info
   * @param {function} cb
   */
  registerShareData(info: ShareInfo, cb?: () => void) {

    const descMeta = document.querySelector('meta[name="description"]');
    info = Object.assign({
      title: document.title,
      desc: descMeta && descMeta.getAttribute('content') || '',
      link: window.location.href,
      imgUrl: '',
    }, info);

    console.log(info);
    wechart.setShareInfo(info);
    diamond.emit('registerShareData', info, cb);
  },

  /**
   * APP 看大图
   * @param {array} images
   */
  // registerArticleImages(images = []) {
  //   diamond.emit('registerArtcleImages', images);
  // },
};
