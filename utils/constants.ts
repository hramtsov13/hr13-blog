// const { $i18n } = useNuxtApp()
// const {
//   global: { t },
// } = $i18n

export const DEFAULT_LOCALE = 'en'

// TODO: CHECK i18n outside setup

export const SIDEBAR_OPTIONS = [
  {
    title: `t('sidebar.all')`,
    path: 'articles',
    icon: 'majesticons:article-search-line',
  },
  {
    title: `t('service.frontend')`,
    path: 'articles/frontend',
    icon: 'icon-park-solid:bring-to-front',
  },
  {
    title: `t('service.backend')`,
    path: 'articles/backend',
    icon: 'pixelarticons:flip-to-back',
  },
  {
    title: `t('service.mobile')`,
    path: 'articles/mobile',
    icon: 'cil:screen-smartphone',
  },
]
