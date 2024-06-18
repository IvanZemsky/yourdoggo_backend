import express from "express";
import mongoose from "mongoose";
import authRouter from "./src/routes/auth.js";
import productRouter from "./src/routes/products.js";
import cors from 'cors'
import galleryRouter from "./src/routes/gallery.js";
import userRouter from "./src/routes/users.js";
import articleRouter from "./src/routes/articles.js";
import forumRouter from "./src/routes/forum.js";

const PORT = process.env.PORT || 5200
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const DB_NAME = "yourdoggo"
const URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.lgdjinw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

const app = express()
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*'); // Настройте разрешенные источники
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   res.header('Access-Control-Expose-Headers', 'X-Total-Count'); // Добавьте здесь ваши кастомные заголовки
   next();
 });

app.use(cors())
app.use(express.json())
app.use(authRouter)
app.use(userRouter)
app.use(productRouter)
app.use(galleryRouter)
app.use(articleRouter)
app.use(forumRouter)

const start = async () => {
   try {
      await mongoose.connect(URL)
      app.listen(PORT)
   } catch (e) {
      console.log(e)
   }
}

start()



