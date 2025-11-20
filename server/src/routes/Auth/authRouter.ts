import { Router, Request, Response } from "express";
const {
  collectUserAtuh,
  registUser,
  loginUser,
  logOutUser,
  forgotPw,
  verifyOtp,
  resetUserPw,
} = require("../../controllers/AuthController/authController");
const router = Router();

router.get("/auth/check-session", collectUserAtuh);

router.post("/auth/regist", registUser);

router.post("/auth/login", loginUser);

router.post("/auth/logout", logOutUser);

router.post("/auth/forgotPw", forgotPw);

router.post("/auth/verifyUserOtp", verifyOtp);

router.post("/auth/resetUserPw", resetUserPw);

// router.get("/verifyUser", verifySession);

// router.get("/auth", getUser);

// router.post("/resetPw", resetPw);

module.exports = router;
