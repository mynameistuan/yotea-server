import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/districtController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/districts", add);
router.get("/districts", getAll);
router.get("/districts/:code", get);
router.put("/districts/:id", update);
router.delete("/districts/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
