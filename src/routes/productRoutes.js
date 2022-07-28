const { Router } = require("express");
import {
  add,
  getAll,
  get,
  update,
  remove,
  getProductByCate,
  getRelated,
  getBySlug,
} from "../controllers/productController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.get("/products/getBySlug/:slug", getBySlug);
router.get("/products/getByCate/:categoryId", getProductByCate);
router.get("/products/related/:id", getRelated);
router.post("/products", isAuth, isAdmin, add);
router.put("/products/:id", isAuth, isAdmin, update);
router.delete("/products/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);
router.param("categoryId", checkIdExits);

module.exports = router;
