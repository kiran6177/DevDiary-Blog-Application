import express from "express";
import { login } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.route("/login")
.post(login)

authRouter.route("/signup")
.post(login)

export default authRouter;
