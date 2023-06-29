import expressAsyncHandler from "express-async-handler";
import { User } from "../modals/authModal.js";
import nodemailer from "nodemailer";
import { v4 } from "uuid";
// for imails with text only
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import { mailHtml } from "./mailHtml.js";
// ...

export const forgotController = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400); //bad user request
    throw new Error("email cannot be empty");
  }
  //   check user email
  const user = await User.findOne({ email });

  if (user) {
    // Generate a reset token and expiration time
    const resetToken = v4();
    const resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
    // Update the user document with the reset token and expiration time
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    // mail sending section
    // config details from env
    const email_user = process.env.EMAIL_USER;
    const email_user_pass = process.env.EMAIL_USER_PASSWORD;
    const email_host = process.env.IMAIL_HOST;
    const url = `http://localhost:5173/reset-password/${resetToken}`;
    // using images in email
    // Get the current module's file pathconst cid = uuidv4(); // Generate a unique Content-ID for the image
    const cid = v4(); // Generate a unique Content-ID for the image

    const __filename = fileURLToPath(import.meta.url);
    //Necessary only if your email contains images
    // Get the current module's directory name
    const __dirname = dirname(__filename);
    //Read the image file
    const imagePath = join(__dirname, "..", "public", "images", "logo.png");
    const image = fs.readFileSync(imagePath);
    const imageBase64 = image.toString("base64");

    let transporter = nodemailer.createTransport({
      host: email_host,
      port: 465,
      secure: true,
      auth: {
        user: email_user,
        pass: email_user_pass,
      },
    });

    let mailOptions = {
      from: email_user,
      to: email,
      subject: `password reset`,
      html: mailHtml(cid, url),
      attachments: [
        {
          filename: "logo.png",
          content: imageBase64,
          cid: cid,
          encoding: "base64",
        },
      ],
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.json(err);
      } else {
        res.json(
          `Resent link has been sent to ${user.email} please login to your email and click the reset link button to reset your password`
        );
      }
    });
  } else {
    res.status(500); //server error
    throw new Error(
      "user with such email does not exist in our system please sign up to enjoy our services"
    );
  }
});
