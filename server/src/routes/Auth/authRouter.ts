import { Router, Request, Response } from "express";
const {
  collectUserAtuh,
  registUser,
  loginUser,
  logOutUser,
  forgotPw,
} = require("../../controllers/AuthController/authController");
const router = Router();

router.get("/auth/check-session", collectUserAtuh);

router.post("/auth/regist", registUser);

router.post("/auth/login", loginUser);

router.post("/auth/logout", logOutUser);

router.post("/auth/forgotPw", forgotPw);

// router.get("/authChecking", authStatus);

// router.get("/verifyUser", verifySession);

// router.get("/auth", getUser);

// router.post("/verifyOtp", verifyOtp);

// router.post("/resetPw", resetPw);

module.exports = router;
