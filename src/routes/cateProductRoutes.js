import { Router } from "express";
import { add, get, getAll, remove, update } from "../controllers/cateProductController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.get("/cateProduct", getAll);
router.get("/cateProduct/:id", get);
router.post("/cateProduct", isAuth, isAdmin, add);
router.put("/cateProduct/:id", isAuth, isAdmin, update);
router.delete("/cateProduct/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);

module.exports = router;
