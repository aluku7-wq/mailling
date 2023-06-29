import expressAsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
export const supportController = expressAsyncHandler(async (req, res) => {
  const { name, email, subject, related, message } = req.body;

  if (!name || !email || !subject || !related || !message) {
    res.status(400); //bad user request
    throw new Error("fill all the fields");
  }

  // mail sending configurations
  const email_user = process.env.EMAIL_USER;
  const email_user_pass = process.env.EMAIL_USER_PASSWORD;
  const email_host = process.env.IMAIL_HOST;
  const support_email = process.env.SUPPORT_EMAIL;

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
    to: support_email,
    subject: `Support messages`,
    html: `
    <body style="margin: 0; padding: 0; font-family: sans-serif; background-color: rgb(235, 235, 235);">
    <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
      <tr>
        <td style="padding: 24px;">
          <h1 style="margin-bottom: 8px;">Name</h1>
          <p style="margin-top: 0;">${name}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 24px;">
          <h1 style="margin-bottom: 8px;">Email</h1>
          <p style="margin-top: 0;">${email}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 24px;">
          <h1 style="margin-bottom: 8px;">Subject</h1>
          <p style="margin-top: 0;">${subject}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 24px;">
          <h1 style="margin-bottom: 8px;">Related to</h1>
          <p style="margin-top: 0;">${related}</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 24px;">
          <h1 style="margin-bottom: 8px;">Message</h1>
          <p style="margin-top: 0;">
            ${message}
          </p>
        </td>
      </tr>
    </table>
  </body>

`,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      res.status(500);
      throw new Error("error try again later");
    } else {
      res.status(201).json(`We have recieved your message`);
    }
  });
});
