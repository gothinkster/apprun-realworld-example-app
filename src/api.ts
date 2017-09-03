/**
 * Conduit API
 *
 * OpenAPI spec version: 1.0.0
 *
 */

const defaultBasePath = 'https://conduit.productionready.io/api';

import { toQueryString, serializeObject, get, post } from './fetch';

export interface ITags {
  tags: Array<string>;
}

export interface IFeed {
  articles: Array<IArticle>;
  articlesCount: number;
}

export interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: true;
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

export interface IArticlesRequest {
  tag?: string;
  author?: string;
  favorited?: string;
  limit: number;
  offset: number;
}

export function getArticles(request: IArticlesRequest): Promise<IFeed> {
  const url = `${defaultBasePath}/articles?${toQueryString(request)}`
  return get(url)
}

export function getTags(): Promise<ITags> {
  const url = `${defaultBasePath}/tags`
  return get(url)
}