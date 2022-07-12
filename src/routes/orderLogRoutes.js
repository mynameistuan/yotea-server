import { Router } from "express";
import { add, getAll, get, update, remove, getByOrder } from "../controllers/orderLogController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/orderLogs", add);
router.get("/orderLogs", getAll);
router.get("/orderLogs/getByOrder/:id", getByOrder);
router.get("/orderLogs/:id", get);
router.put("/orderLogs/:id", update);
router.delete("/orderLogs/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
