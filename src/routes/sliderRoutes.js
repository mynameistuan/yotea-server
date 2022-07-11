import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/sliderController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/sliders", add);
router.get("/sliders", getAll);
router.get("/sliders/:id", get);
router.put("/sliders/:id", update);
router.delete("/sliders/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
