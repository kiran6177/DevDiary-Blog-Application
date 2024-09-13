import express from "express";
import { login, logout, signup } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.route("/login")
.post(login)

authRouter.route("/signup")
.post(signup)

authRouter.route("/logout")
.get(logout)

export default authRouter;
