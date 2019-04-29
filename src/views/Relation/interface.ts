export interface  RelationGraph {
  active: boolean;
  articleIds: any;
  author: number;
  createTime: string;
  id: string;
  imageName: string;
  itemIds: string[];
  language: string;
  lastEditTime: string;
  lastEditor: number;
  relationGraph: RelationGraphData;
  relationItemIds: string[];
  server_type: string;
  title: string;
}

export interface RelationGraphData {
  links: Link[];
  nodes: RelationNode[];
}
export interface Link {
  arrowOffsetFromCenter: number;
  arrowWidth: number;
  color: string;
  direction: string;
  editable: boolean;
  formated: Formated;
  from: string;
  id: string;
  label: string;
  labelBgColor: string;
  labelBorder: { width: number, color: string };
  labelColor: string;
  lineLength: number;
  prop: LinkProp;
  relationArrow: string;
  to: string;
}

export interface RelationNode {
  backgroundImage: string;
  catelist: string[];
  disambiguation: string;
  hidden: boolean;
  id: string;
  label: string;
  locked: boolean;
  name: string;
  offsetToCollision: number;
  position: {x: number, y: number};
  summary: string;
  width: number;
}

export interface LinkProp {
  direction: string;
  id: string;
  position: [{coordinates: number[], type: string}];
  positionDesc: string;
  properties: [{key: string, value: string[]}];
  relation: string;
  relationDesc: string;
  relationId: string;
  relationType: string;
  relationTypeGroup: string;
  relationWeight: number;
}

export interface Formated {
  desc: string;
  from: string;
  fromName: string;
  positionDesc: string;
  time: string;
  to: string;
  toName: string;
}

export interface RelationData {
  birth: Life;
  death: Life;
  disambiguation: string;
  id: string;
  imageId: string;
  imageUrl: string;
  itemTag: any;
  itemWeight: number;
  name: string;
  priorRelationTypes: string[];
  relatedPoint: number;
  relationList: RelationData[];
  relations: any;
  summary: string;
  typePaths: [{name: string, id: string}];
  workIds: string[];
  workType: any;
}


interface Life {
  endAccuracy: string;
  endNote: string;
  endTime: string;
  startAccuracy: string;
  startNote: string;
  startTime: string;
  timeDesc: string;
}
