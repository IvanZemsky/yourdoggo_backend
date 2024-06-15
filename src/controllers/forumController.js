import forumService from "../services/forumService.js"

class ForumController {
   async getAll(req, res) {
      try {
         const {forummessages, totalCount} = await forumService.getAll(req.query)
         res.set('X-Total-Count', totalCount);
         
         return res.json(forummessages)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async getById(req, res) {
      try {
         const forummessage = await forumService.getById(req.params.id)
         return res.json(forummessage)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async create (req, res) {
      try {
         const {title, description, imgLink, userId} = req.body
         const datetime = new Date()
         const forummessage = await forumService.create({title, description, imgLink, userId, datetime})
         return res.json(forummessage)
      } catch (e) {
         res.status(500).json(e)
      }
   }
}

export default new ForumController()