import express from "express";
import { writeBlog } from "../controllers/blogController.js";
import { isUserLogin } from "../middleware/authHandler.js";
import upload from "../utils/multer.js";

const blogRouter = express.Router();

blogRouter.route("/")
.post(isUserLogin,upload.any(),writeBlog)


export default blogRouter;
