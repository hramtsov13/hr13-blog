import {
  Strapi4ResponseData,
  StrapiUser,
} from '@nuxtjs/strapi/dist/runtime/types'

export type TUser =
  | ({
      name: string
      surname: string
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

export interface IContentInstanceAttributes {
  title: string
  description: string
  content: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  cover?: Record<string, any>
}

export interface IContentInstance {
  readonly id: number
  attributes: IContentInstanceAttributes
}
export interface IContentResponse {
  data: Array<IContentInstance>
  meta: IRequestMeta
}
