import { Router } from "express";
import { add, getAll, get, update, remove, getAddressMe } from "../controllers/addressController";
import { checkIdExits } from "../utils/checkId";
import { isAuth } from "../middlewares/auth";

const router = Router();

router.post("/addresses", isAuth, add);
router.get("/addresses", getAll);
router.get("/addresses/getAddressMe", isAuth, getAddressMe);
router.get("/addresses/:id", get);
router.put("/addresses/:id", update);
router.delete("/addresses/:id", remove);

router.param("id", checkIdExits);

module.exports = router;
