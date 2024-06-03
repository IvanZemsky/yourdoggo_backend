import GalleryImg from "../models/GalleryImg.js";
import GalleryLike from "../models/GalleryLike.js";

class GalleryService {
   async getAll(authUserId, queryParams) {
      const query = {};
      const limit = +queryParams.limit || 0
      const page = +queryParams.page || 1
      const sort = queryParams.sortByDate ? { datetime: -1 } : {}
      const liked = queryParams.liked

      if (queryParams.search) {
         const searchRegex = new RegExp(queryParams.search, "i");
         query.$or = [{ title: searchRegex }, { tags: searchRegex }];
      }

      let images = [];

      if (queryParams.userLogin) {
         images = await GalleryImg.find(query)
            .populate("userId", "login")
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(sort);

         images = images.map((image) => ({
            ...image._doc,
            userId: image.userId._id,
            login: image.userId.login,
         }));
      } else {
         images = await GalleryImg.find(query).limit(limit).skip((page - 1) * limit).sort(sort);

         images = images.map((image) => ({
            ...image._doc,
         }));
      }

      if (authUserId) {
         const likes = await GalleryLike.find({ userId: authUserId });
         console.log(likes)
         const likedImageIds = new Set(
            likes.map((like) => like.galleryimgId.toString())
         );

         images = images.map((image) => ({
            ...image,
            isLiked: likedImageIds.has(image._id.toString()),
         }));
      } else {
         images = images.map((image) => ({
            ...image,
            isLiked: false,
         }));
      }

      if (liked && authUserId) {
         images = images.filter(image => image.isLiked === true)
      }

      return images;
   }

   async create(imageData) {
      const image = new GalleryImg(imageData);
      await image.save();
      return image;
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

   async getLiked(userId, queryParams) {
      const query = {};
      const limit = +queryParams.limit || 0;
      const sort = queryParams.sortByDate ? { datetime: -1 } : {};
      const authUserId = queryParams.userId || null;

      const likedIds = await GalleryLike.find({ userId })
         .limit(limit)
         .select({_id: 0, galleryimgId: 1});

      const galleryImgIds = likedIds.map(item => item.galleryimgId);
      const images = await GalleryImg.find({ _id: { $in: galleryImgIds } })
      return images
   }
}

export default new GalleryService();
