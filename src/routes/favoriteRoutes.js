import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/favoriteController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/favorites", add);
router.get("/favorites", getAll);
router.get("/favorites/:id", get);
router.put("/favorites/:id", update);
router.delete("/favorites/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
