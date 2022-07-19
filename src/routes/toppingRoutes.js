import { Router } from "express";
import { add, getAll, get, update, remove, getDefault } from "../controllers/toppingController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/toppings", isAuth, isAdmin, add);
router.get("/toppings", getAll);
router.get("/toppings/default", getDefault);
router.get("/toppings/:id", get);
router.put("/toppings/:id", isAuth, isAdmin, update);
router.delete("/toppings/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);

module.exports = router;
