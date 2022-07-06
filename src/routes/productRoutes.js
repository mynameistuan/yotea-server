const { Router } = require("express");
import { add, getAll, get, update, remove } from "../controllers/productController";

const router = Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", add);
router.put("/products/:id", update);
router.delete("/products/:id", remove);

module.exports = router;
