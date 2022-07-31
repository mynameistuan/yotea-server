import { Router } from "express";
import { add, getAll, get, update, remove, getCurrentStore } from "../controllers/storeController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/stores", isAuth, isAdmin, add);
router.get("/stores", getAll);
router.get("/stores/getCurrentStore", getCurrentStore);
router.get("/stores/:id", get);
router.put("/stores/:id", isAuth, isAdmin, update);
router.delete("/stores/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);

module.exports = router;
