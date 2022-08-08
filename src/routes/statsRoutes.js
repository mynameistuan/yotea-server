import { Router } from "express";
import { moneyStats, productStats, userStats, orderStats } from "../controllers/statsController";

const router = Router();

router.get("/stats/productByCate", productStats);
router.get("/stats/userByMonth", userStats);
router.get("/stats/money", moneyStats);
router.get("/stats/order", orderStats);

module.exports = router;
