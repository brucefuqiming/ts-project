declare module 'nprogress';

declare module 'uniqid';

declare module 'vue-outside-events';

declare module 'fingerprintjs2';

declare var window: Window;
// 截取Window接口
interface Window{
  wx:any,
  diamond:any,
  webkit:any,
  _diamond:any,
  wechart:any
}
