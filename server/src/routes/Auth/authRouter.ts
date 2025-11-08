import { Router, Request, Response } from "express";
const {
  collectUserAtuh,
  registUser,
  loginUser,
  logOutUser,
} = require("../../controllers/AuthController/authController");
const router = Router();

router.get("/auth", collectUserAtuh);

router.post("/auth/regist", registUser);

router.post("/auth/login", loginUser);

router.post("/auth/logout", logOutUser);

// router.get("/auth", getUser);

// router.get("/authChecking", authStatus);

// router.get("/verifyUser", verifySession);

// router.post("/forgotPw", forgotPw);

// router.post("/verifyOtp", verifyOtp);

// router.post("/resetPw", resetPw);

module.exports = router;
