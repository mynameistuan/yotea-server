import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/provinceController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/provinces", isAuth, isAdmin, add);
router.get("/provinces", getAll);
router.get("/provinces/:code", get);
router.put("/provinces/:id", isAuth, isAdmin, update);
router.delete("/provinces/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);

module.exports = router;
