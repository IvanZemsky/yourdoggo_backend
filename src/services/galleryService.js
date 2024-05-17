import GalleryImg from "../models/GalleryImg.js"

class GalleryService {
   async getAll(params) {
      console.log('11111')
      const query = {};
      const images = await GalleryImg.find(query)
      return images;
   }

   async getById(id) {
      const image = await GalleryImg.findById(id);
      return image
   }

   async getByUserId(userId, params) {
      const query = {userId}

      const images = await GalleryImg.find(query);
      return images
   }
}

export default new GalleryService()