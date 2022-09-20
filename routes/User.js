import express from "express";

import {
  forgotPassword,
  login,
  logoutUser,
  resetpassword,
  signup,
  verifyEmail,
  getAllUsers,
} from "../controllers/UserController.js";
import {
  forgotPasswordValidation,
  loginValidation,
  restPasswordValidation,
  signupValidation,
  verifyToken,
} from "../validations/AuthValidation.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("auth route working");
});

router.post("/signup", signupValidation(), signup);
router.post("/login", loginValidation(), login);
router.post("/verifyEmail/:token", verifyEmail);
router.post("/forgotPassword", forgotPasswordValidation(), forgotPassword);
router.post("/resetPassword", restPasswordValidation(), resetpassword);
router.post("/verifyToken", verifyToken);
router.post("/logoutUser", logoutUser);
router.post("/allUsers", getAllUsers);

export const userRouter = router;
