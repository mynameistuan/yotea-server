import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/catePostController";
import { isAuth, isAdmin } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/catePost", isAuth, isAdmin, add);
router.get("/catePost", getAll);
router.get("/catePost/:id", get);
router.put("/catePost/:id", isAuth, isAdmin, update);
router.delete("/catePost/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);

module.exports = router;
