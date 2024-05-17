import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const GalleryImg = new Schema({
   title: { type: String },
   imgLink: { type: String, require: true },
   tags: { type: [String] },
   userId: { type: Schema.Types.ObjectId }
});


export default model('GalleryImg', GalleryImg)
