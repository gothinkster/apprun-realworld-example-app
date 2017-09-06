
export interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: true;
}

export interface IProfile {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
  tagList: Array<string>;
}


export interface IComment {
  id: number;
  body: string;
  createdAt: string;
  author: IAuthor;
}