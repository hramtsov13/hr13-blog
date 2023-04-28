# The Developer Blog

This is an SSR Nuxt 3 / Strapi 4 blog application that allows users to watch the articles grouped by categories, create accounts, change profile related info, leave comments and likes; and admins to create/delete/update new articles and manage its markup.

## Run Locally

Clone the project, this is monorepo so you have to install dependencies for Backend and Frontend

```bash
  git clone git@github.com:hramtsov13/hr13-blog.git
```

Install dependencies in the Backend directory

```bash
  cd backend
  yarn install
  yarn develop
```

Install dependencies in the Frontend directory

```bash
  cd frontend
  yarn install
  yarn dev
```

After that the Frontend should be available on

```bash
  localhost:3000
```

Backend

```bash
  https://api.blog.hr13.ru/admin
```

## Tech Stack

**Client:** Nuxt 3, Typescript, i18n, Vee-validate, Pinia, Vitest, Windicss and Daysyui (tailwind library of components), Husky

**Server:** Strapi 4 - Headless CMS

## Main features

- Login/Register
- Personal account - change password/update user info
- Comments - add/delete
- Likes - add/delete
- Light/Dark mode
- Adaptive (UI in progress)

## Roadmap

- Allow users to create articles
