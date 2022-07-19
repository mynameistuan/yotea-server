import { Router } from "express";
import { createOrUpdateUser, getCurrentUser } from "../controllers/authController";
import { isAuth } from "../middlewares/auth";

const router = Router();

router.post("/create-or-update-user", isAuth, createOrUpdateUser);
router.post("/current-user", isAuth, getCurrentUser);

module.exports = router;
