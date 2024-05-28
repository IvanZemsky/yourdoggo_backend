import galleryService from "../services/galleryService.js"

class GalleryController {
   async getAll(req, res) {
      try {
         const images = await galleryService.getAll(req.query)
         return res.json(images)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async getById(req, res) {
      try {
         const images = await galleryService.getById(req.params.id)
         return res.json(images)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async getByUserId(req, res) {
      try {
         const images = await galleryService.getByUserId(req.params.userId, req.query)
         return res.json(images)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async toggleLike(req, res) {
      try {
         console.log(req.body)
         const like = await galleryService.toggleLike(req.body.userId, req.body.galleryimgId)
         return res.json(like)
      } catch (e) {
         res.status(500).json(e)
      }
   }
}

export default new GalleryController()