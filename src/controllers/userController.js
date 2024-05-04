import userService from '../services/userService.js'

class UserController {
   async create(req, res) {
      try {
         const { login, password } = req.body;
         const user = await userService.create(login, password)
         res.json(user);
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async login(req, res) {
      try {
         const { login, password } = req.body;
         const user = await userService.login(login, password)
         return res.json(user);
      } catch (e) {
         console.log(e)
         res.status(500).json(e)
      }
   }
}

export default new UserController()