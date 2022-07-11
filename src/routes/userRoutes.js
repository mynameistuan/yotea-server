import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/userController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/users", add);
router.get("/users", getAll);
router.get("/users/:id", get);
router.put("/users/:id", update);
router.delete("/users/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
