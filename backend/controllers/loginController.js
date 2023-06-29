import expressAsyncHandler from "express-async-handler";
import { User } from "../modals/authModal.js";
import bcrpt from "bcryptjs";

export const loginController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400); //bad user request
    throw new Error("email or password fields cannot be empty");
  }
  //   check user email
  const user = await User.findOne({ email });
  if (user && (await bcrpt.compare(password, user.password))) {
    res.status(201).json("You are login now");
  } else {
    res.status(400); //bad user request
    throw new Error("invalid user credentials");
  }
});
