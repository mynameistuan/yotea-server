import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/orderController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/orders", add);
router.get("/orders", getAll);
router.get("/orders/:id", get);
router.put("/orders/:id", update);
router.delete("/orders/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
