import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/sliderController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/sliders", isAuth, isAdmin, add);
router.get("/sliders", getAll);
router.get("/sliders/:id", get);
router.put("/sliders/:id", isAuth, isAdmin, update);
router.delete("/sliders/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);

module.exports = router;
