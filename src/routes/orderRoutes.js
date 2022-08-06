import { Router } from "express";
import { add, getAll, get, update, remove, getMyOrders } from "../controllers/orderController";
import { checkIdExits } from "../utils/checkId";
import { isAuth } from "../middlewares/auth";

const router = Router();

router.post("/orders", add);
router.get("/orders", getAll);
router.get("/orders/getMyOrders", isAuth, getMyOrders);
router.get("/orders/:id", get);
router.put("/orders/:id", update);
router.delete("/orders/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
