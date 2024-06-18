import ForumMessage from "../models/ForumMessage.js";
import ForumComment from "../models/ForumComment.js";

class ForumService {
   async getAll(params) {
      const userId = params.userId;
      const excludeId = params || "";
      const limit = +params.limit || 0;
      const page = +params.page || 1;
      const query = {};
      const sort = params.sortByDate ? { datetime: -1 } : {};

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
            .populate("userId", "login")
            .sort(sort);
         forummessages = forummessages.map((forummessage) => ({
            ...forummessage._doc,
            userId: forummessage.userId._id,
            login: forummessage.userId.login,
         }));
      } else {
         forummessages = await ForumMessage.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(sort);
      }

      const totalCount = await ForumMessage.countDocuments(query);

      return { forummessages, totalCount };
   }

   async getById(id, queryParams) {
      let forummessage = {};

      if (queryParams.userLogin) {
         forummessage = await ForumMessage.findById(id).populate(
            "userId",
            "login"
         );

         console.log(forummessage)

         forummessage = {
            ...forummessage._doc,
            userId: forummessage.userId._id,
            login: forummessage.userId.login,
         };
      } else {
         forummessage = await ForumMessage.findById(id);
         forummessage = forummessage._doc;
      }

      return forummessage;
   }

   async create(forumMessageInfo) {
      const forummessage = new ForumMessage(forumMessageInfo);
      await forummessage.save();
      return forummessage;
   }

   async createComment(body, datetime) {
      const {userId, forummessageId, text} = body
      const forumcomment = new ForumComment({userId, forummessageId, text, datetime});
      await forumcomment.save();
      return forumcomment;
   }

   async getAllComments(queryParams, params) {
      const userLogin = queryParams.userLogin
      const forummessageId = params.id
      const limit = +queryParams.limit || 0;
      const page = +queryParams.page || 1;
      const sort = queryParams.sortByDate ? { datetime: -1 } : {};
      const query = {forummessageId};

      let forumcomments;

      if (userLogin) {
         forumcomments = await ForumComment.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .populate("userId", "login")
            .sort(sort)
            forumcomments = forumcomments.map((forumcomment) => ({
            ...forumcomment._doc,
            userId: forumcomment.userId._id,
            login: forumcomment.userId.login,
         }));
      } else {
         forumcomments = await ForumComment.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(sort)
      }

      const totalCount = await ForumComment.countDocuments(query);

      return { forumcomments, totalCount };
   }


}

export default new ForumService();
