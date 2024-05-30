import { Schema, model } from "mongoose";

const ArticleLike = new Schema({
   articleId: { type: Schema.Types.ObjectId, require: true, ref: "Article" },
   userId: { type: Schema.Types.ObjectId, require: true, ref: "User" },
}, {versionKey: false});


export default model('ArticleLike', ArticleLike)