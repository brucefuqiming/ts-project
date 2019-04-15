export interface Article {
  articleType: number;
  authorInfo: AuthorInfo;
  commentNum?: number;
  content: string;
  coverType: string;
  covers:  ;
}


export interface AuthorInfo {
  avatar: string;
  id: number;
  name: string;
}
