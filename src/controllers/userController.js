import userService from "../services/userService.js"

class UserController {
   async getAll(req, res) {
      try {
         const users = await userService.getAll(req.query)
         return res.json(users)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async getById(req, res) {
      try {
         const user = await userService.getById(req.params.id)
         return res.json(user)
      } catch (e) {
         res.status(500).json(e)
      }
   }
}

export default new UserController()