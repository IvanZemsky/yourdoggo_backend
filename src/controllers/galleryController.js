import galleryService from "../services/galleryService.js"

class GalleryController {
   async getAll(req, res) {
      try {
         const {authUserId} = req.body.authUserId || null
         const {images, totalCount} = await galleryService.getAll(authUserId, req.query)
         res.set('X-Total-Count', totalCount);
         return res.json(images)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async create(req, res) {
      try {
         const {title, imgLink, tags, userId} = req.body
         const image = await galleryService.create({title, imgLink, tags, userId})
         return res.json(image)
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
         const like = await galleryService.toggleLike(req.body.userId, req.body.galleryimgId)
         return res.json(like)
      } catch (e) {
         res.status(500).json(e)
      }
   }
}

export default new GalleryController()