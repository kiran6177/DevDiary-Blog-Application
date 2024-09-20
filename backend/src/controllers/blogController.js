import { CustomError } from "../common/CustomError.js";
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

export const getMyBlog = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const getMyBlogs = await BlogModel.find({ user_id: _id });
    res.status(200).json({ myBlogs: getMyBlogs });
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (req, res, next) => {
  try {
    const getAllBlogs = await BlogModel.find().populate("user_id");
    res.status(200).json({ blogs: getAllBlogs });
  } catch (error) {
    next(error);
  }
};

export const getBlogsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("BLOGID", id);
    const getBlog = await BlogModel.findOne({ _id: id }).populate("user_id");
    res.status(200).json({ blog: getBlog });
  } catch (error) {
    next(error);
  }
};

export const editBlog = async (req, res, next) => {
  try {
    const { id, title, brief, sections } = req.body;
    const { _id } = req.user;
    const postData = await BlogModel.findById({ _id: id });
    if (!postData) {
      throw CustomError.createError("Invalid Post!!", 400);
    }
    const updatedSections = sections.map((section, index) => {
      console.log("SECTION", index, section);
      if (section?.type === postData.sections[index].type) {
        if (section.type === "IMAGE") {
          return {
            type: section.type,
            content: postData.sections[index].content,
          };
        } else {
          return section;
        }
      } else {
        return section;
      }
    });

    for (let file of req.files) {
      console.log(file);
      const base64EncodedImage = Buffer.from(file.buffer).toString("base64");
      const dataUri = `data:${file.mimetype};base64,${base64EncodedImage}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "blogimages",
      });

      if (postData.sections[file.fieldname].type === "IMAGE") {
        const publicId = postData.sections[file.fieldname].content
          .split("/")
          .reverse()[0]
          .split(".")[0];
        console.log(publicId);
        await cloudinary.uploader.destroy(
          "blogimages/" + publicId,
          (error, result) => {
            if (error) {
              console.error("Error deleting asset from Cloudinary:", error); // Log any errors
            } else {
              console.log("Successfully deleted asset:", result); // Log successful deletion
            }
          }
        );
      }
      updatedSections[file.fieldname].content = result?.secure_url;
    }

    console.log("UP", updatedSections);

    const dataToSave = {
      user_id: new ObjectId(_id),
      title,
      brief,
      sections: updatedSections,
      createdAt: new Date(),
    };
    console.log(dataToSave);

    const blogSaved = await BlogModel.findByIdAndUpdate(
      { _id: id },
      { $set: dataToSave },
      { new: true }
    );
    console.log(blogSaved);

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("BLOGID", id);
    const getBlog = await BlogModel.findByIdAndDelete({ _id: id });
    for(let section of getBlog.sections){
      if(section.type === "IMAGE"){
        const publicId = section.content
          .split("/")
          .reverse()[0]
          .split(".")[0];
        console.log(publicId);
        await cloudinary.uploader.destroy(
          "blogimages/" + publicId,
          (error, result) => {
            if (error) {
              console.error("Error deleting asset from Cloudinary:", error); 
            } else {
              console.log("Successfully deleted asset:", result); 
            }
          }
        );
      }
    }   
    res.status(200).json({ deleted: true });
  } catch (error) {
    next(error);
  }
};
