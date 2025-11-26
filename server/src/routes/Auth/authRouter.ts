import { Router } from "express";
import { checkGuestExpiry } from "../../middleware/authentication/guestExpMiddleware";
import { roleAuthMiddleware } from "../../middleware/authentication/roleAuthMiddleware";
const {
  getUserData,
  checkUserAuth,
  registUser,
  loginUser,
  logOutUser,
  forgotPw,
  verifyOtp,
  resetUserPw,
  changePw,
} = require("../../controllers/AuthController/authController");
const {
  guestAccess,
} = require("../../controllers/AuthController/guestController");
const router = Router();

router.get("/auth/getUserData", getUserData);

router.get("/auth/check-session", checkUserAuth);

router.post("/auth/regist", registUser);

router.post("/auth/login", loginUser);

router.post("/auth/logout", logOutUser);

router.post("/auth/forgotPw", forgotPw);

router.post("/auth/verifyUserOtp", verifyOtp);

router.post("/auth/resetUserPw", resetUserPw);

router.post("/auth/changePw", roleAuthMiddleware(["admin", "user"]), changePw);

router.post("/auth/guestLogin", checkGuestExpiry, guestAccess);

module.exports = router;
