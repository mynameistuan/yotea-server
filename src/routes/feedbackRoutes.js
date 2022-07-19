import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/feedbackController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/feedback", add);
router.get("/feedback", getAll);
router.get("/feedback/:id", get);
router.put("/feedback/:id", isAuth, isAdmin, update);
router.delete("/feedback/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);

module.exports = router;
