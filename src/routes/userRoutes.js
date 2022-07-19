import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/userController";
import { isAdmin, isAuth } from "../middlewares/auth";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/users", isAuth, isAdmin, add);
router.get("/users", getAll);
router.get("/users/:id", get);
router.put("/users/:id", isAuth, isAdmin, update);
router.delete("/users/:id", isAuth, isAdmin, remove);

router.param("id", checkIdExits);

module.exports = router;
