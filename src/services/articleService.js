import Article from "../models/Article.js";
import ArticleLike from '../models/ArticleLike.js'

class ArticleService {
   async getAll(body, queryParams) {
      const userId = queryParams.userId || "";
      const limit = +queryParams.limit || 0;
      const page = +queryParams.page || 1;
      const sort = queryParams.sortByDate ? { datetime: -1 } : {};
      const liked = queryParams.liked;
      const authUserId = body.authUserId;

      const query = {};

      if (userId) {
         query.userId = userId;
      }

      if (queryParams.search) {
         const searchRegex = new RegExp(queryParams.search, "i");
         query.$or = [{ title: searchRegex }, { tags: searchRegex }];
      }

      if (liked && authUserId) {
         const likes = await ArticleLike.find({ userId: authUserId });
         const likedArticleIds = new Set(
            likes.map((like) => like.articleId.toString())
         );
         query._id = { $in: Array.from(likedArticleIds) };
      }

      const totalCount = await Article.countDocuments(query);

      let articles = [];

      if (queryParams.userLogin) {
         articles = await Article.find(query)
            .populate("userId", "login")
            .skip((page - 1) * limit)
            .limit(limit)
            .sort(sort);

         articles = articles.map((article) => ({
            ...article._doc,
            userId: article.userId._id,
            login: article.userId.login,
         }));
      } else {
         articles = await Article.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort(sort);

         articles = articles.map((article) => ({
            ...article._doc,
         }));
      }

      if (authUserId) {
         const likes = await ArticleLike.find({ userId: authUserId });
         const likedArticleIds = new Set(
            likes.map((like) => like.articleId.toString())
         );

         articles = articles.map((article) => ({
            ...article,
            isLiked: likedArticleIds.has(article._id.toString()),
         }));
      } else {
         articles = articles.map((article) => ({
            ...article,
            isLiked: false,
         }));
      }

      return { articles, totalCount };
   }

   async create(articleInfo) {
      const article = new Article(articleInfo);
      await article.save();
      return article;
   }

   async getById(id, authUserId, queryParams) {
      let article = {};

      if (queryParams.userLogin) {
         article = await Article.findById(id)
            .populate("userId", "login")

         article = {
            ...article._doc,
            userId: article._doc.userId._id,
            login: article._doc.userId.login,
         };
      } else {
         article = await Article.findById(id)
         article = article._doc
      }

      let isLiked = false;
      if (authUserId) {
          const likes = await ArticleLike.find({ userId: authUserId });
          const likedArticleIds = new Set(likes.map((like) => like.articleId.toString()));
          isLiked = likedArticleIds.has(id);
      }

      article = {
         ...article,
         isLiked
      }

      console.log(article)

      return article;
   }

   async getByUserId(userId, params) {
      const query = { userId };
      const limit = +params.limit || 0;

      if (params.userLogin) {
         const articles = await Article.find(query)
            .populate("userId", "login")
            .limit(limit);
         const transformedArticles = articles.map((article) => {
            return {
               ...article._doc,
               userId: article.userId._id,
               login: article.userId.login,
            };
         });
         return transformedArticles;
      } else {
         const articles = await Article.find(query).limit(limit);
         return articles;
      }
   }

   async toggleLike(userId, articleId) {
      const existingLike = await ArticleLike.findOne({ articleId, userId });

      if (existingLike) {
         await ArticleLike.deleteOne({ _id: existingLike._id });

         const updatedArticle = await Article.findByIdAndUpdate(
            articleId,
            { $inc: { likes: -1 } },
            { new: true }
         );

         return { liked: false, likes: updatedArticle.likes };
      } else {
         await new ArticleLike({ articleId, userId }).save();

         const updatedArticle = await Article.findByIdAndUpdate(
            articleId,
            { $inc: { likes: 1 } },
            { new: true }
         );

         return { liked: true, likes: updatedArticle.likes };
      }
   }
}

export default new ArticleService();