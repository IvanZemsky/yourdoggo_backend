import User from "../models/User.js";

class UserService {
   async create(req, res) {
      try {
         const { login, password } = req.body;
         const candidate = await User.findOne({ login });
         if (candidate) {
            return res.status(400).json({ errorMessage: "Пользователь с таким логином уже существует"});
         }

         const user = new User({ login, password });
         await user.save();

         return res.json({ message: "Вы успешно зарегистрировались" });
      } catch (e) {
         console.log(e);
         res.status(400).json({ errorMessage: "Произошла ошибка при регистрации" });
      }
   }

   async login(req, res) {
      try {
         const { login, password } = req.body;
         const user = await User.findOne({ login });

         if (!user) {
            return res.json({ errorMessage: "LOGIN_ERROR" });
         }

         if (password !== user.password) {
            return res.json({ errorMessage: "PASSWORD_ERROR" });
         }

         return res.json({id: user._id, login: user.login})
      } catch (e) {
         console.log(e)
      }
   }
}

export default new UserService();
