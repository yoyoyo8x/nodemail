import express from "express";
import { sendContact } from "../controllers/sendContact.js";
const routerContact = express.Router();

routerContact.post("/send-contact", sendContact);

export default routerContact;
