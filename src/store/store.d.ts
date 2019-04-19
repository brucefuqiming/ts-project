interface State {
  username: string;
  routeFrom: string;
  navShow: boolean;
  navTheme: string;
  detailPopup: DetailPopup;
  downloadPopup: DownloadPopup;
}

interface DetailPopup {
  show: boolean;
  success: boolean;
  id: string;
  loading: boolean;
  title: string;
  desc: string;
  image: string;
}
interface DownloadPopup {
  show: boolean;
}