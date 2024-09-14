import express from "express";
import authRouter from "./authRouter.js";
import blogRouter from "./blogRouter.js";

const userRouter = express.Router();

userRouter.use("/auth",authRouter)
userRouter.use("/blog",blogRouter)


export default userRouter;
