import { emailRegex, passwordRegex } from "../common/constants.js";
import { CustomError } from "../common/CustomError.js";
import { compare, hash } from "bcrypt";
import UserModel from "../models/userModel.js";
import { createRefreshToken, createToken } from "../utils/jwt.js";
const SALT_ROUNDS = 10;

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email?.trim() === "" && password?.trim() === "") {
      throw CustomError.createError("Please fill up the fields!!", 400);
    }

    if (email?.trim() === "") {
      throw CustomError.createError("Please enter a email!!", 400);
    }

    if (!emailRegex.test(email)) {
      throw CustomError.createError("Please enter a valid email!!", 400);
    }

    if (password?.trim() === "") {
      throw CustomError.createError("Please enter a password!!", 400);
    }

    if (password?.trim().length < 8) {
      throw CustomError.createError(
        "Password should contain minimum 8 digits!!",
        400
      );
    }

    if (!passwordRegex.test(password)) {
      throw CustomError.createError(
        "Password should contain alphabets and digits!!",
        400
      );
    }

    const findUser = await UserModel.findOne({ email });

    if (!findUser) {
      throw CustomError.createError("User Not Found!!", 400);
    }
    const isUser = await compare(password, findUser.password);
    if (!isUser) {
      throw CustomError.createError("Invalid Password!!", 400);
    }

    const userData = {
      _id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      designation: findUser.designation,
    };

    const access_token = await createToken(userData);
    const refresh_token = await createRefreshToken({ _id: userData._id });

    res.cookie("token", access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 1000, //1 min
    });

    res.cookie("refresh", refresh_token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    res.json({ user: userData });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, designation, password, cPassword } = req.body;
    if (
      name?.trim() === "" &&
      email?.trim() === "" &&
      designation?.trim() === "" &&
      password?.trim() === "" &&
      cPassword?.trim() === ""
    ) {
      throw CustomError.createError("Please fill up the fields!!", 400);
    }

    if (email?.trim() === "") {
      throw CustomError.createError("Please enter a email!!", 400);
    }

    if (!emailRegex.test(email)) {
      throw CustomError.createError("Please enter a valid email!!", 400);
    }

    if (password?.trim() === "") {
      throw CustomError.createError("Please enter a password!!", 400);
    }

    if (password?.trim().length < 8) {
      throw CustomError.createError(
        "Password should contain minimum 8 digits!!",
        400
      );
    }

    if (!passwordRegex.test(password)) {
      throw CustomError.createError(
        "Password should contain alphabets and digits!!",
        400
      );
    }

    if (cPassword?.trim() === "") {
      throw CustomError.createError("Please Confirm your password!!", 400);
    }

    if (password?.trim() !== cPassword?.trim()) {
      throw CustomError.createError("Password Mismatch!!", 400);
    }

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      throw CustomError.createError("Account Exists!!", 400);
    }
    console.log(name, email, designation, password, cPassword);
    const hashed = await hash(password, SALT_ROUNDS);
    const userData = {
      name,
      email,
      designation,
      password: hashed,
    };

    const createdUser = await UserModel.create(userData);
    console.log(createdUser);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    
    res.cookie("token", null, {
      httpOnly: true,
      secure: true,
      maxAge: 1000, //1 min
    });

    res.cookie("refresh", null, {
      httpOnly: true,
      secure: true,
      maxAge:  1000, //30 days
    });
    res.status(200).json({success:true})

  } catch (error) {
    next(error);
  }
};
