import express from "express";
import {
  createPaymentLink,
  verifyPaymentStatus,
} from "../controllers/PaymentController.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("lead route working");
});

router.post("/createLink", createPaymentLink);
router.post("/verify", verifyPaymentStatus);

export const paymentRouter = router;
