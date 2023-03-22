"use strict";

/**
 * article controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async getArticleComments(ctx) {
    try {
      const entries = await strapi.entityService.findMany(
        "api::comment.comment",
        {
          filters: { article: ctx.params.id },
          sort: { createdAt: "DESC" },
          populate: {
            author: {
              fields: ["id", "name", "surname", "email"],
            },
          },
        }
      );

      return entries;
    } catch (err) {
      ctx.body = err;
    }
  },

  async postArticleComment(ctx) {
    try {
      const { user } = ctx.state;

      ctx.request.body.author = user.id;
      ctx.request.body.article = ctx.params.id;

      const createNewComment = await strapi.entityService.create(
        "api::comment.comment",
        {
          data: ctx.request.body,
          populate: {
            author: {
              fields: ["id", "name", "surname", "email"],
            },
            article: {
              fields: ["id", "title"],
            },
          },
        }
      );

      return createNewComment;
    } catch (err) {
      ctx.body = err;
    }
  },

  async userHasLikedTheArticle(ctx) {
    try {
      const { user } = ctx.state;
      const { id: articleId } = ctx.params;

      // Find like that belongs to current user among all the likes to understand if he has liked this article already
      const searchedLike = await strapi.entityService.findMany(
        "api::like.like",
        {
          filters: {
            author: {
              id: {
                $eq: user.id,
              },
            },
            article: {
              id: {
                $eq: articleId,
              },
            },
          },
        }
      );
      console.log("searchedLike: ", searchedLike);

      return searchedLike;
    } catch (err) {
      ctx.body = err;
    }
  },

  async getArticleLikes(ctx) {
    try {
      const entries = await strapi.entityService.findMany("api::like.like", {
        filters: { article: ctx.params.id },
        sort: { createdAt: "DESC" },
        populate: {
          author: {
            fields: ["id", "name", "surname", "email"],
          },
        },
      });

      return entries;
    } catch (err) {
      ctx.body = err;
    }
  },

  async postArticleLike(ctx) {
    try {
      const { user } = ctx.state;

      ctx.request.body.author = user.id;
      ctx.request.body.article = ctx.params.id;

      const addNewLike = await strapi.entityService.create("api::like.like", {
        data: ctx.request.body,
        populate: {
          author: {
            fields: ["id", "name", "surname", "email"],
          },
          article: {
            fields: ["id", "title"],
          },
        },
      });

      return addNewLike;
    } catch (err) {
      ctx.body = err;
    }
  },

  async sendEmail(ctx) {
    await strapi.plugins["email"].services.email.send({
      to: "hramtsov13@mail.ru",
      from: "your verified email address", //e.g. single sender verification in SendGrid
      subject: "The Strapi Email plugin worked successfully",
      text: "Hello world!",
      html: "<b>Hello world!</b>",
    });
  },
}));
