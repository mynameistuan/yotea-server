import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/districtController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/districts", isAuth, isAdmin, add);
router.get("/districts", getAll);
router.get("/districts/:code", get);
router.put("/districts/:id", isAuth, isAdmin, update);
router.delete("/districts/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);

module.exports = router;
