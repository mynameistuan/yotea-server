import { Router } from "express";
import { add, get, getAll, remove, update } from "../controllers/cateProductController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.get("/cateProduct", getAll);
router.get("/cateProduct/:id", get);
router.post("/cateProduct", add);
router.put("/cateProduct/:id", update);
router.delete("/cateProduct/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
