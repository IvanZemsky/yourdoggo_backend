import { Schema, model } from "mongoose";

const ForumComment = new Schema({
   forummessageId: { type: Schema.Types.ObjectId, require: true, ref: "ForumMessage" },
   userId: { type: Schema.Types.ObjectId, require: true, ref: "User" },
   text: {type: String, required: true},
   datetime: {type: Date, require: true},
}, {versionKey: false});


export default model('ForumComment', ForumComment)