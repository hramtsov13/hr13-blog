import {
  Strapi4ResponseSingle,
  StrapiUser,
} from '@nuxtjs/strapi/dist/runtime/types'

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

export interface IArticleInstance {
  readonly id: number
  attributes: IArticleInstanceAttributes
}

export interface IArticleInstanceAttributes {
  title: string
  description: string
  content: string
  createdAt: Date
  updatedAt: Date
  publishedAt: string
  cover?: Strapi4ResponseSingle<Record<any, any>>
  createdBy?: Strapi4ResponseSingle<Record<any, any>>
  category: ArticleType
}

export interface IComment {
  author: TUser
  content: string
  createdAt: Date
  id: number
  updatedAt: Date
}
export interface ILike {
  author: TUser
  createdAt: Date
  id: number
  updatedAt: Date
}

export interface ISidebarOption {
  title: string
  path: string
  icon: string
}
