import BlogModel from "../models/blogModel.js";
import cloudinary from "../utils/cloudinary.js";
import { ObjectId } from "mongodb";

export const writeBlog = async (req, res, next) => {
  try {
    const { title, brief, sections } = req.body;
    const { _id } = req.user;

    for (let file of req.files) {
      const base64EncodedImage = Buffer.from(file.buffer).toString("base64");
      const dataUri = `data:${file.mimetype};base64,${base64EncodedImage}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "blogimages",
      });
      sections[file.fieldname].content = result?.secure_url;
    }

    const dataToSave = {
      user_id: new ObjectId(_id),
      title,
      brief,
      sections,
      createdAt: new Date(),
    };
    const blogSaved = await BlogModel.create(dataToSave);
    console.log(blogSaved);

    res.status(200).json({ success: blogSaved });
  } catch (error) {
    next(error);
  }
};
