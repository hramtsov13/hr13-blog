module.exports = {
  routes: [
    {
      method: "GET",
      path: "/articles/:id/comments",
      handler: "article.getArticleComments",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/articles/:id/comments",
      handler: "article.postArticleComment",
    },

    {
      method: "GET",
      path: "/articles/:id/likes",
      handler: "article.getArticleLikes",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/articles/:id/did-like-article",
      handler: "article.userHasLikedTheArticle",
    },
    {
      method: "POST",
      path: "/articles/:id/likes",
      handler: "article.postArticleLike",
    },
  ],
};
