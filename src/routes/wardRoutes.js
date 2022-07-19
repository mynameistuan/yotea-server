import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/wardController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/wards", isAuth, isAdmin, add);
router.get("/wards", getAll);
router.get("/wards/:id", get);
router.put("/wards/:id", isAuth, isAdmin, update);
router.delete("/wards/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);

module.exports = router;
