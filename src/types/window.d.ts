// import {WeChartInterface} from '../utils/wechart';
// declare var window:Window;

import {EventTracking} from '../components/eventtracking';
import {WeChart} from '../utils/wechart';
declare global {
  interface Window {
    diamond: any,
    webkit: any,
    _diamond: any,
    wechart: WeChart,
    EventTracking: EventTracking
  }
}  


