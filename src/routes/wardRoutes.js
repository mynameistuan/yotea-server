import { Router } from "express";
import { add, getAll, get, update, remove } from "../controllers/wardController";
import { checkIdExits } from "../utils/checkId";

const router = Router();

router.post("/wards", add);
router.get("/wards", getAll);
router.get("/wards/:id", get);
router.put("/wards/:id", update);
router.delete("/wards/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
