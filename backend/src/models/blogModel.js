import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:["SUBTITLE","IMAGE","DESCRIPTION"],
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

const blogSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  brief:{
    type: String,
    required: true,
  },
  sections:[
    sectionSchema
  ],
  createdAt:{
    type: Date,
    required: true,
  }
});

export default mongoose.model("blog",blogSchema);