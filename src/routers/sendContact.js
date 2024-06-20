import express from "express";
import { sendContact } from "../controllers/contact/sendContact.js";
import { sendCV } from "../controllers/contact/sendCV.js";
import { upload } from "../configs/multerConfig.js";

const routerContact = express.Router();

routerContact.post("/send-contact", sendContact);
routerContact.post("/send-cv", upload.any(), sendCV);

export default routerContact;
