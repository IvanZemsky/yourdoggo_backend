import articleService from "../services/articleService.js"

class ArticleController {
   async getAll(req, res) {
      try {
         const {articles, totalCount} = await articleService.getAll(req.body, req.query)
         res.set('X-Total-Count', totalCount);
         return res.json(articles)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async create (req, res) {
      try {
         const {title, imgLink, text, tags, userId} = req.body
         const article = await articleService.create({title, imgLink, text, tags, userId})
         return res.json(article)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async getById(req, res) {
      try {
         const article = await articleService.getById(req.params.id, req.body.authUserId, req.query)
         return res.json(article)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async getByUserId(req, res) {
      try {
         const articles = await articleService.getByUserId(req.params.userId)
         return res.json(articles)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async toggleLike(req, res) {
      try {
         const like = await articleService.toggleLike(req.body.userId, req.body.articleId)
         return res.json(like)
      } catch (e) {
         res.status(500).json(e)
      }
   }
}

export default new ArticleController()