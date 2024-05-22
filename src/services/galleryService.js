import GalleryImg from "../models/GalleryImg.js";

class GalleryService {
   async getAll(params) {
      const query = {};
      const limit = +params.limit || 0

      if (params.userLogin) {
         const images = await GalleryImg.find(query).populate(
            "userId",
            "login"
         ).limit(limit);
         const transformedImages = images.map((image) => {
            return {
               ...image._doc,
               userId: image.userId._id,
               login: image.userId.login,
            };
         });
         return transformedImages;
      } else {
         const images = await GalleryImg.find(query);
         return images;
      }
   }

   async getById(id) {
      const image = await GalleryImg.findById(id);
      return image;
   }

   async getByUserId(userId, params) {
      const query = { userId };
      const limit = +params.limit || 0

      if (params.userLogin) {
         const images = await GalleryImg.find(query).populate(
            "userId",
            "login"
         ).limit(limit);
         const transformedImages = images.map((image) => {
            return {
               ...image._doc,
               userId: image.userId._id,
               login: image.userId.login,
            };
         });
         return transformedImages;
      } else {
         const images = await GalleryImg.find(query).limit(limit);
         return images;
      }
   }
}

export default new GalleryService();
