import { Schema, model } from "mongoose";

const GalleryLike = new Schema({
   galleryimgId: { type: Schema.Types.ObjectId, require: true, ref: "Gallery" },
   userId: { type: Schema.Types.ObjectId, require: true, ref: "User" },
}, {versionKey: false});


export default model('GalleryLike', GalleryLike)
