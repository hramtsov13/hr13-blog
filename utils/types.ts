import { StrapiUser } from '@nuxtjs/strapi/dist/runtime/types'

export type TUser =
  | ({
      name: string
      surname: string
    } & StrapiUser)
  | null
