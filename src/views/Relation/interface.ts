export interface  RelationData {
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
  relationGraph: RelationGraph;
  relationItemIds: string[];
  server_type: string;
  title: string;
}

export interface RelationGraph {
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

export default RelationData;
