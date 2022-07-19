import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/voucherController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/vouchers", isAuth, isAdmin, add);
router.get("/vouchers", getAll);
router.get("/vouchers/:id", get);
router.put("/vouchers/:id", isAuth, update);
router.delete("/vouchers/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);

module.exports = router;
