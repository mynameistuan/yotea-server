import { Router } from "express";
import { add, getAll, get, update, remove, getDefault } from "../controllers/toppingController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/toppings", add);
router.get("/toppings", getAll);
router.get("/toppings/default", getDefault);
router.get("/toppings/:id", get);
router.put("/toppings/:id", update);
router.delete("/toppings/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
