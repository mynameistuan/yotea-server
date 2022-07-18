import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/provinceController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/provinces", add);
router.get("/provinces", getAll);
router.get("/provinces/:code", get);
router.put("/provinces/:id", update);
router.delete("/provinces/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
