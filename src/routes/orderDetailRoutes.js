import { Router } from "express";
import { add, getAll, get, update, remove, getByOrder } from "../controllers/orderDetailController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/orderDetails", add);
router.get("/orderDetails", getAll);
router.get("/orderDetails/:orderId/getByOrder", getByOrder);
router.get("/orderDetails/:id", get);
router.put("/orderDetails/:id", update);
router.delete("/orderDetails/:id", remove);

router.param("id", checkIdExits);
router.param("orderId", checkIdExits);

module.exports = router;
