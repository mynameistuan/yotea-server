import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/addressController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/addresses", add);
router.get("/addresses", getAll);
router.get("/addresses/:id", get);
router.put("/addresses/:id", update);
router.delete("/addresses/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
