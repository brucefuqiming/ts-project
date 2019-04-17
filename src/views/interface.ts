export interface ArticleResp {
  id: string;
  language: string;
  title: string;
  content: string;
  thumb: string;
  tags: string[];
  articleType: number;
  type: number;
  delta?: any;
  refer: Refer;
  supRefs?: any;
  likeNum?: any;
  commentNum?: any;
  viewNum?: any;
  authorInfo: AuthorInfo;
  lastEditTime: string;
  coverType?: any;
  covers?: any;
  signing: boolean;
  summary?: any;
  topImage?: any;
  [propName: string]: any;
}


export interface AuthorInfo {
  avatar: string;
  id: number;
  name: string;
}


export interface Refer {
  authorName: string;
  originalUrl: string;
  websiteName: string;
}
