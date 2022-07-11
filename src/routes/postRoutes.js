import { Router } from "express";
import { add, getAll, get, update, remove, getPostByCate, getRelated } from "../controllers/postController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.get("/posts", getAll);
router.get("/posts/:id", get);
router.get("/posts/getByCate/:categoryId", getPostByCate);
router.get("/posts/related/:id", getRelated);
router.post("/posts", add);
router.put("/posts/:id", update);
router.delete("/posts/:id", remove);

router.param("id", checkIdExits);
router.param("categoryId", checkIdExits);

module.exports = router;
