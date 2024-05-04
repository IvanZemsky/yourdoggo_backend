import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import cors from 'cors'

const PORT = process.env.PORT || 5000
const DB_NAME = "yourdoggo"
const URL = `mongodb://localhost:27017/${DB_NAME}`

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

const start = async () => {
   try {
      await mongoose.connect(URL)
      app.listen(PORT)
   } catch (e) {
      console.log(e)
   }
}

start()



