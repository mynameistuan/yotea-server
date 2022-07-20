import { Router } from "express";
import { add, getAll, get, update, remove, getMyWishList } from "../controllers/favoriteController";
import { checkIdExits } from "../utils/checkId";
import { isAuth } from "../middlewares/auth";

const router = Router();

router.post("/favorites", isAuth, add);
router.get("/favorites", getAll);
router.get("/favorites/myWishlist", isAuth, getMyWishList);
router.get("/favorites/:id", get);
router.put("/favorites/:id", update);
router.delete("/favorites/:id", isAuth, remove);

router.param("id", checkIdExits);

module.exports = router;
