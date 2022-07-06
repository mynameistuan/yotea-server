const { Router } = require("express");
import { add, get, getAll, remove, update } from "../controllers/cateProductController";

const router = Router();

router.get("/cateProduct", getAll);
router.get("/cateProduct/:id", get);
router.post("/cateProduct", add);
router.put("/cateProduct/:id", update);
router.delete("/cateProduct/:id", remove);

module.exports = router;
