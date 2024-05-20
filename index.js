import express from "express";
import mongoose from "mongoose";
import authRouter from "./src/routes/auth.js";
import productRouter from "./src/routes/products.js";
import cors from 'cors'
import galleryRouter from "./src/routes/gallery.js";
import userRouter from "./src/routes/users.js";

const PORT = process.env.PORT || 5000
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const DB_NAME = "yourdoggo"
const URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.lgdjinw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

const app = express()

app.use(cors())
app.use(express.json())
app.use(authRouter)
app.use(userRouter)
app.use(productRouter)
app.use(galleryRouter)

const start = async () => {
   try {
      await mongoose.connect(URL)
      app.listen(PORT)
   } catch (e) {
      console.log(e)
   }
}

start()



