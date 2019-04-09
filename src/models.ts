
export interface IUser {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface IProfile extends IUser {
  email: string;
  token: string;
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
  author: IUser;
  tagList: Array<string>;
}


export interface IComment {
  id: number;
  body: string;
  createdAt: string;
  author: IUser;
}

export type ITag = string;