import asyncHandler from "express-async-handler";
import { User } from "../modals/authModal.js";
import bcrpt from "bcryptjs";
// @desc authenticate user
// @route post api/users/login
// @access public
export const registerController = asyncHandler(async (req, res) => {
  const { name, email, password, resetToken, resetTokenExpiration } = req.body;
  if (!name || !email || !password) {
    res.status(400); //bad user request
    throw new Error("please add all fields");
  }
  //   check if the user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409); //conflict code user already exist
    throw new Error("user already exists");
  }
  //   hash the password
  const salt = await bcrpt.genSalt(10);
  const hashedPassword = await bcrpt.hash(password, salt);
  //   create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    resetToken,
    resetTokenExpiration,
  });
  if (user) {
    res.status(201).json("registred successfully");
  } else {
    res.status(400); //bad user request
    throw new Error("invalid user data");
  }
});
