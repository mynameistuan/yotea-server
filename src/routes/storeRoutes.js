import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/storeController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/stores", add);
router.get("/stores", getAll);
router.get("/stores/:id", get);
router.put("/stores/:id", update);
router.delete("/stores/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
