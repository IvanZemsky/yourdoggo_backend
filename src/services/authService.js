import User from "../models/User.js";

class AuthService {
   async create(login, password) {
      try {
         const candidate = await User.findOne({ login });
         if (candidate) {
            return {errorMessage: "USER_EXISTS_ERROR"};
         }

         const user = new User({ login, password });
         await user.save();

         return { message: "REGISTRATION_SUCCESS" };
      } catch (e) {
         res.status(400).json({
            errorMessage: "REGISTRATION_ERROR",
         });
      }
   }

   async login(login, password) {
      const user = await User.findOne({ login });

      if (!user) {
         return { errorMessage: "LOGIN_ERROR" };
      }

      if (password !== user.password) {
         return { errorMessage: "PASSWORD_ERROR" };
      }

      return {id: user._id, login: user.login}
   }
}

export default new AuthService();
