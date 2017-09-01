/**
 * Conduit API
 *
 * OpenAPI spec version: 1.0.0
 *
 */

const defaultBasePath = 'https://conduit.productionready.io/api';

import { toQueryString, get, post } from './fetch';

/* Article */

export interface ArticlesRequest {
  tag?: string,
  author?: string,
  favorited?: string,
  limit: number
  offset: number
}

export interface ArticlesResponse {
  articles: Array<Article>;
  articlesCount: number
}


export class Article {
  'title': string;
  'description': string;
  'body': string;
  'tagList': Array<string>;
}

export async function getArticles(request: ArticlesRequest): Promise<ArticlesResponse> {
  const url = `${defaultBasePath}/articles?${toQueryString(request)}`
  return get(url)
}