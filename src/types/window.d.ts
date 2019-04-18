// import {WeChartInterface} from '../utils/wechart';
// declare var window:Window;

 interface WeChartInterface {
  setConfig(jsApiList: string[]): Promise<{}>;
  setShareInfo(info: ShareInfo): void;
}

interface ShareInfo {
  title?: string;
  desc?: string;
  link?: string;
  imgUrl?: string;
  success?: () => void;
}
interface Window {
  diamond:any,
  webkit:any,
  _diamond:any,
  wechart:WeChartInterface,
  EventTracking:any
}

