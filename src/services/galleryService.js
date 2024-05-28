import GalleryImg from "../models/GalleryImg.js";
import GalleryLike from "../models/GalleryLike.js";

class GalleryService {
   async getAll(params) {
      const query = {};
      const limit = +params.limit || 0;
      const sort = params.sortByDate ? { datetime: -1 } : {};

      if (params.search) {
         const searchRegex = new RegExp(params.search, "i");
         query.$or = [{ title: searchRegex }, { tags: searchRegex }];
      }

      if (params.userLogin) {
         const images = await GalleryImg.find(query)
            .populate("userId", "login")
            .limit(limit)
            .sort(sort);
         const transformedImages = images.map((image) => {
            return {
               ...image._doc,
               userId: image.userId._id,
               login: image.userId.login,
            };
         });
         return transformedImages;
      } else {
         const images = await GalleryImg.find(query).limit(limit).sort(sort);
         return images;
      }
   }

   async getById(id) {
      const image = await GalleryImg.findById(id);
      return image;
   }

   async getByUserId(userId, params) {
      const query = { userId };
      const limit = +params.limit || 0;

      if (params.userLogin) {
         const images = await GalleryImg.find(query)
            .populate("userId", "login")
            .limit(limit);
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

   async toggleLike(userId, galleryimgId) {
      const existingLike = await GalleryLike.findOne({ galleryimgId, userId });

      if (existingLike) {
         await GalleryLike.deleteOne({ _id: existingLike._id });

         const updatedImage = await GalleryImg.findByIdAndUpdate(
            galleryimgId,
            { $inc: { likes: -1 } },
            { new: true }
         );

         return { liked: false, likes: updatedImage.likes };
      } else {
         await new GalleryLike({ galleryimgId, userId }).save();

         const updatedImage = await GalleryImg.findByIdAndUpdate(
            galleryimgId,
            { $inc: { likes: 1 } },
            { new: true }
         );

         return { liked: true, likes: updatedImage.likes };
      }
   }
}

export default new GalleryService();
