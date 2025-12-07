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
  emailVerify,
  // handleGoogleCallback,
  // handleGithubCallback,
} = require("../../controllers/AuthController/authController");
const {
  guestAccess,
} = require("../../controllers/AuthController/guestController");
const {
  googleAuth,
  googleCallback,
} = require("../../controllers/AuthController/googleController");
const router = Router();

router.get("/auth/getUserData", getUserData);

router.get("/auth/check-session", checkUserAuth);

router.post("/auth/regist", registUser);

router.get("/verifyUser", emailVerify);

router.post("/auth/login", loginUser);

router.post("/auth/logout", logOutUser);

router.post("/auth/forgotPw", forgotPw);

router.post("/auth/verifyUserOtp", verifyOtp);

router.post("/auth/resetUserPw", resetUserPw);

router.post("/auth/changePw", roleAuthMiddleware(["admin", "user"]), changePw);

router.post("/auth/guestLogin", checkGuestExpiry, guestAccess);

// Leitet den User direkt zur Google-Anmeldeseite weiter und der scope bestimmt auf welche Daten ich zugreifen möchte.
router.get("/auth/google", googleAuth);

router.get("/auth/google/callback", googleCallback);

// router.get(
//   "/github",
//   passport.authenticate("github", { scope: ["profile", "email"] })
// );

// router.get("/github/callback", handleGithubCallback);

module.exports = router;
