import articleService from "../services/articleService.js"

class GalleryController {
   async getAll(req, res) {
      try {
         const authUserId = req.body.authUserId || null
         const articles = await articleService.getAll(authUserId, req.query)
         return res.json(articles)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async getById(req, res) {
      try {
         const articles = await articleService.getById(req.params.id)
         return res.json(articles)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async getByUserId(req, res) {
      try {
         const articles = await articleService.getByUserId(req.params.userId, req.query)
         return res.json(articles)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async toggleLike(req, res) {
      try {
         console.log(req.body)
         const like = await articleService.toggleLike(req.body.userId, req.body.articleId)
         return res.json(like)
      } catch (e) {
         res.status(500).json(e)
      }
   }
}

export default new GalleryController()