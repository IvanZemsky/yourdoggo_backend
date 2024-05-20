import authService from '../services/authService.js'

class AuthController {
   async create(req, res) {
      try {
         const { login, password } = req.body;
         const user = await authService.create(login, password)
         res.json(user);
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async login(req, res) {
      try {
         const { login, password } = req.body;
         const user = await authService.login(login, password)
         return res.json(user);
      } catch (e) {
         console.log(e)
         res.status(500).json(e)
      }
   }
}

export default new AuthController()