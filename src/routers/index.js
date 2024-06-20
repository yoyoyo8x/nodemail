import express from "express";
import routerContact from "./sendContact.js";
const router = express.Router();

router.use("/contact", routerContact);
export default router;
