import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/catePostController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/catePost", add);
router.get("/catePost", getAll);
router.get("/catePost/:id", get);
router.put("/catePost/:id", update);
router.delete("/catePost/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
