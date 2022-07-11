import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/sizeController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/sizes", add);
router.get("/sizes", getAll);
router.get("/sizes/:id", get);
router.put("/sizes/:id", update);
router.delete("/sizes/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
