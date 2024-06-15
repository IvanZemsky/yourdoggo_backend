import ForumMessage from "../models/ForumMessage.js";

class ForumService {
   async getAll(params) {
      const userLogin = params.userId;
      const excludeId = params || "";
      const limit = +params.limit || 0;
      const page = +params.page || 1;
      const query = {};

      if (params.search) {
         const searchString = params.search;
         query.$or = [
            { description: { $regex: searchString, $options: "i" } },
            { title: { $regex: searchString, $options: "i" } },
         ];
      }

      if (params.excludeId) {
         query._id = { $ne: params.excludeId };
      }

      let forummessages;

      if (params.userLogin) {
         forummessages = await ForumMessage.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .populate("userId", "login");
         forummessages = forummessages.map((forummessage) => ({
            ...forummessage._doc,
            userId: forummessage.userId._id,
            login: forummessage.userId.login,
         }));
      } else {
         forummessages = await ForumMessage.find(query)
            .limit(limit)
            .skip((page - 1) * limit);
      }

      const totalCount = await ForumMessage.countDocuments(query);

      return { forummessages, totalCount };
   }

   async getById(id) {
      const forummessage = await ForumMessage.findById(id);
      return forummessage;
   }

   async create(articleInfo) {
      const forummessage = new ForumMessage(articleInfo);
      await forummessage.save();
      return forummessage;
   }
}

export default new ForumService();
