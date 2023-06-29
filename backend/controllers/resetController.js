import expressAsyncHandler from "express-async-handler";
import { User } from "../modals/authModal.js";
import bcrypt from "bcryptjs";
export const resetController = expressAsyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) {
    res.status(400); //bad user request
    throw new Error("password or token cannot be empty");
  }
  // Find the user with the given reset token and valid expiration time
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() }, // $gt is a MongoDB query operator used to check if a value is greater than a specified value.
  });
  if (!user) {
    res.status(404);
    throw new Error("Invalid or expired token");
  }
  // Hash the new password and update the user's password
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;

  const updatedUser = await user.save();
  if (updatedUser) {
    res.status(200).json("Your password has now been reset.");
  } else {
    res.status(500);
    throw new Error("Server error");
  }
});
