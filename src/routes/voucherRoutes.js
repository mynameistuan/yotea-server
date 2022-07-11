import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/voucherController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/vouchers", add);
router.get("/vouchers", getAll);
router.get("/vouchers/:id", get);
router.put("/vouchers/:id", update);
router.delete("/vouchers/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
