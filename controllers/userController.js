import userService from '../services/userService.js'

class UserController {
   async create(req, res) {
      try {
         const user = userService.create(req, res)
         res.json(user);
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async login(req, res) {
      try {
         const user = userService.login(req, res)
         res.json(user);
      } catch (e) {
         res.status(500).json(e)
      }
   }
}

export default new UserController()