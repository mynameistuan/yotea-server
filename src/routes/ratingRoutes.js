import { Router } from "express";
import { add, get, getAll, remove, update, getByProduct } from "../controllers/ratingController";
import { isAuth } from "../middlewares/auth";

const router = Router();

router.post("/ratings", add);
router.get("/ratings", getAll);
router.get("/ratings/getByProduct/:productId", getByProduct);
router.get("/ratings/:id", get);
router.put("/ratings/:id", isAuth, update);
router.delete("/ratings/:id", isAuth, remove);

module.exports = router;
