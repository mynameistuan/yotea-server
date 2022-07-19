import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/sizeController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/sizes", isAuth, isAdmin, add);
router.get("/sizes", getAll);
router.get("/sizes/:id", get);
router.put("/sizes/:id", isAuth, isAdmin, update);
router.delete("/sizes/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);

module.exports = router;
