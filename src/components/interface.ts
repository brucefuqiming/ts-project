interface Props {
  UA?: string;
  URL?: string;
  referUrl?: string;
  sessionID?: string;
  actionType?: string;
  timeTracking?: number;
  prePageID?: string;
  pageID?: string;
  modName?: string;
  params?: any;
  data?: Keyval[];
}
interface Keyval {
  key: string |number;
  val: any;
}


export {
  Props,
  Keyval,
};
