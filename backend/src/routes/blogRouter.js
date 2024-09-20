import express from "express";
import { deleteBlogById, editBlog, getBlogs, getBlogsById, getMyBlog, writeBlog } from "../controllers/blogController.js";
import { isUserLogin } from "../middleware/authHandler.js";
import upload from "../utils/multer.js";

const blogRouter = express.Router();

blogRouter.route("/getmyblog")
.get(isUserLogin,getMyBlog)

blogRouter.route("/")
.post(isUserLogin,upload.any(),writeBlog)
.get(getBlogs).put(isUserLogin,upload.any(),editBlog)

blogRouter.route("/:id")
.get(getBlogsById)
.delete(deleteBlogById)



export default blogRouter;
