import { Router } from "express";
import { add, getAll, get, update, remove, getPostByCate, getRelated, getBySlug } from "../controllers/postController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.get("/posts", getAll);
router.get("/posts/getBySlug/:slug", getBySlug);
router.get("/posts/:id", get);
router.get("/posts/getByCate/:slug", getPostByCate);
router.get("/posts/related/:slug", getRelated);
router.post("/posts", isAuth, isAdmin, add);
router.put("/posts/:id", isAuth, isAdmin, update);
router.delete("/posts/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);

module.exports = router;
