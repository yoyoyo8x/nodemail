import { transporter } from "../configs/nodemailerConfig.js";
import dotenv from "dotenv";
dotenv.config();
import { ContactValid } from "../validation/sendContact.js";

export const sendContact = async (req, res) => {
  try {
    const formData = req.body;
    const { error } = ContactValid.validate(formData);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const mailOptions = {
      from: formData.name,
      to: process.env.GMAIL_USER,
      subject: `New Contact from ${formData.name}`,
      html: `
      <div style="font-weight:600;font-size:18px">Name</div>: ${formData.name}
      <div style="font-weight:600;font-size:18px"> Email</div>: ${
        formData.email
      }
      ${
        formData.phone
          ? `  <div style="font-weight:600;font-size:18px">
            Phone</div>: ${formData.phone}`
          : ""
      }
       <div style="font-weight:600;font-size:18px">Message</div>: ${
         formData.message
       }
       <div style="font-weight:600;font-size:18px">Budget</div>: ${
         formData.budget
       }
       <div style="font-weight:600;font-size:20px"> If you need to respond, please reply to this email.</div>
       <div style="font-weight:600;font-size:20px">Please note that this email was sent from a web application. If you are not expecting this, please disregard this message.</div>
    `,
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
