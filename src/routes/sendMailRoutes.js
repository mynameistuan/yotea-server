import { Router } from "express";
import { sendMail } from "../controllers/sendMailController";

const router = Router();

router.post("/sendMail", sendMail);

module.exports = router;
