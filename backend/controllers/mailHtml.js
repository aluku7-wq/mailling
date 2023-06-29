export const mailHtml = (cid, url) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body
      style="
        margin: 0;
        padding: 0;
        background: rgba(226, 226, 226, 0.1);
        width: 100%;
      "
    >
      <table style="width: 100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td
            style="
              background: linear-gradient(
                -45deg,
                rgb(102, 1, 88),
                rgb(77, 32, 136)
              );
              text-align: center;
              padding: 20px;
            "
          >
            <img src="cid:${cid}" alt="" style="max-width: 100%; height: 100px" />
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center">
            <h1 style="margin: 0; color: rgb(65, 64, 64); font-size: 24px">
              Reset your password
            </h1>
            <a
              href="${url}"
              style="
                background: rgb(77, 32, 136);
                color: #fff;
                text-decoration: none;
                padding: 16px;
                font-size: 14px;
                font-weight: bold;
                border-radius: 4px;
                display: inline-block;
                margin-top: 20px;
              "
              >Reset your Password</a
            >
            <p
              style="
                margin-top: 20px;
                color: rgb(102, 101, 101);
                text-align: center;
              "
            >
              Someone-hopefully you-requested a password reset on this account. If
              it wasn't you, safely ignore this email and your password will
              remain the same.
            </p>
          </td>
        </tr>
        <tr>
          <td
            style="
              background: linear-gradient(
                45deg,
                rgb(102, 1, 88),
                rgb(77, 32, 136)
              );
              padding: 20px;
              text-align: center;
              color: #fff;
            "
          >
            <p style="margin: 0">&copy; 2023 prodactive. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  
  `;
};
