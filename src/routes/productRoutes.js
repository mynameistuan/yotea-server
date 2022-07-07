const { Router } = require("express");
import { add, getAll, get, update, remove, getProductByCate, getRelated } from "../controllers/productController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.get("/products/getByCate/:categoryId", getProductByCate);
router.get("/products/related/:id", getRelated);
router.post("/products", add);
router.put("/products/:id", update);
router.delete("/products/:id", remove);

router.param("id", checkIdExits);
router.param("categoryId", checkIdExits);

module.exports = router;
