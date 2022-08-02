import { Router } from "express";
import { add, get, getAll, remove, update, getByProduct } from "../controllers/commentController";
import { isAuth } from "../middlewares/auth";

const router = Router();

router.post("/comments", add);
router.get("/comments", getAll);
router.get("/comments/getByProduct/:productId", getByProduct);
router.get("/comments/:id", get);
router.put("/comments/:id", isAuth, update);
router.delete("/comments/:id", isAuth, remove);

module.exports = router;
