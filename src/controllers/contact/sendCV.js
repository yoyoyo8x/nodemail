import { transporter } from "../../configs/nodemailerConfig.js";
import dotenv from "dotenv";
dotenv.config();
import { JobValid } from "../../validation/sendCV.js";

export const sendCV = async (req, res) => {
  try {
    const formData = req.body;
    const { error } = JobValid.validate(formData);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    if (
      req.files?.mimetype !== "application/msword" ||
      req.files?.mimetype !== "application/pdf"
    ) {
      return res.status(400).json({
        message: "File type error",
      });
    }
    const mailOptions = {
      from: formData.name,
      to: process.env.GMAIL_USER,
      subject: `New Contact from ${formData.name}`,
      html: `
      <div><span style="font-weight:600;font-size:16px">Name: </span>${
        formData.name
      }</div>
      <div><span style="font-weight:600;font-size:16px"> Email: </span> ${
        formData.email
      }</div>
      ${
        formData.phone
          ? ` <div> <span style="font-weight:600;font-size:16px">
            Phone: </span> ${formData.phone}</div>`
          : ""
      }
       <div><span style="font-weight:600;font-size:16px">Message: </span>${
         formData.message
       }</div>
       <div style="font-weight:600"> If you need to respond, please reply to this email.</div>
       <div style="font-weight:600">Please note that this email was sent from a web application. If you are not expecting this, please disregard this message.</div>
    `,
      attachments: req.files,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error:", error);
        return res.status(400).json({
          message: "Send email failed!",
        });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          message: "Send email successfully!",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error,
    });
  }
};
