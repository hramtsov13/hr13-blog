import { StrapiUser } from '@nuxtjs/strapi/dist/runtime/types'

export type TUser =
  | ({
      name: string
      surname: string
      avatar: null | string
    } & StrapiUser)
  | null

export interface IRequestMeta {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export type ArticleType = 'frontend' | 'backend' | 'mobile' | 'other'

export interface IContentInstanceAttributes {
  title: string
  description: string
  content: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  cover?: Record<string, any>
  category: ArticleType
}

export interface IContentInstance {
  readonly id: number
  attributes: IContentInstanceAttributes
}
export interface IContentResponse {
  data: Array<IContentInstance>
  meta: IRequestMeta
}

export interface IContentSingleResponse {
  data: IContentInstance
  meta: IRequestMeta
}
