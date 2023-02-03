import colors from 'windicss/colors'
import { defineConfig } from 'windicss/helpers'
import plugin from 'windicss/plugin'

export default defineConfig({
  darkMode: 'class',
  attributify: true,
  theme: {
    screens: {
      xs: '440px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      ...colors,
      green1: '#42d392',
      white: '#ffffff',
      blue: '#075985',
      yellow: '#ffd859',
      gray: '#ccc',
    },
    extend: {
      fontFamily: {
        mono: ['Source Code Pro'],
      },
      boxShadow: {
        primary: '25px 26px 72px -27px rgba(204,204,204,0.64)',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.gradient': {
          background: 'linear-gradient(to right, #374151, #111827, #000)',
        },
        '.text-gradient': {
          background: 'linear-gradient(315deg,#42d392 25%,#647eff)',
          '-webkit-text-fill-color': 'transparent',
          backgroundClip: 'text',
        },
      })
    }),
  ],
})
