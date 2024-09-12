import { emailRegex, passwordRegex } from "../common/constants.js";
import { CustomError } from "../common/CustomError.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email?.trim() === "" && password?.trim() === "") {
      throw CustomError.createError("Please fill up the fields!!", 400);
    }

    if (email?.trim() === "") {
      throw CustomError.createError("Please enter a email!!", 400);
    }

    if (!emailRegex.test(data.email)) {
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

    if (!passwordRegex.test(data.password)) {
      throw CustomError.createError(
        "Password should contain alphabets and digits!!",
        400
      );
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, designation, password, confirmPassword } = req.body;
    if (
      name?.trim() === "" &&
      email?.trim() === "" &&
      designation?.trim() === "" &&
      password?.trim() === "" &&
      confirmPassword?.trim() === ""
    ) {
      throw CustomError.createError("Please fill up the fields!!", 400);
    }
    console.log(name, email, designation, password, confirmPassword);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
