import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/wardController";
import { isAdmin, isAuth } from "../middlewares/auth";

const router = Router();

router.post("/wards", isAuth, isAdmin, add);
router.get("/wards", getAll);
router.get("/wards/:code", get);
router.put("/wards/:code", isAuth, isAdmin, update);
router.delete("/wards/:code", isAuth, isAdmin, remove);

module.exports = router;
