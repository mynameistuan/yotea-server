import { Router } from "express";
import { moneyStats, productStats, userStats } from "../controllers/statsController";

const router = Router();

router.get("/stats/productByCate", productStats);
router.get("/stats/userByMonth", userStats);
router.get("/stats/money", moneyStats);

module.exports = router;
