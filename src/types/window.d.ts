// import {WeChartInterface} from '../utils/wechart';
// declare var window:Window;

import {EventTracking} from '../components/eventtracking';
import {WeChartInterface} from '../utils/wechart';
declare global {
  interface Window {
    diamond: any,
    webkit: any,
    _diamond: any,
    wechart: WeChartInterface,
    EventTracking: EventTracking
  }
}  


