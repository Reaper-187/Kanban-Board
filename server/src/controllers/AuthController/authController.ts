import { NextFunction, Request, Response } from "express";
const bcrypt = require("bcrypt");
const User = require("../../models/UserModel/UserSchema");

type SessionInfo = {
  userId: string | null;
  userRole: string | null;
  isAuthenticated: boolean;
};

exports.collectUserAtuh = async (req: Request, res: Response) => {
  try {
    const { userId, userRole } = req.session;
    const isAuthenticated = !!userId && !!userRole;

    const sessionInfo: SessionInfo = {
      userId: userId ?? null,
      userRole: userRole ?? null,
      isAuthenticated,
    };
    res.status(200).json(sessionInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

exports.registUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { fistName, lastName, email, password } = req.body;

    if (!user) return;

    const usedEmail = await User.findOne({ email });

    if (usedEmail) {
      return res.status(500).json("Email already exist");
    }

    const hashedPw = await bcrypt.hash(password, 10);

    const newUser = new User({
      ...user,
      fistName,
      lastName,
      email,
      password: hashedPw,
    });

    await newUser.save();

    res.status(200).json("Registration successfully");
  } catch (err) {
    console.error("Error ", err);
    res.status(500).json("Registration Failed");
  }
};

exports.loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json("Please fill up all fields");

    const findUserAccount = await User.findOne({ email });
    if (!findUserAccount)
      return res.status(400).json("wrong email or password");

    const comparedPw = await bcrypt.compare(password, findUserAccount.password);
    if (!comparedPw) return res.status(400).json("wrong email or password");
    // bei Anfragen wird so indentifiziert ob der user auth ist

    req.session.userId = findUserAccount._id;
    req.session.userRole = findUserAccount.userRole;

    res.status(200).json({ message: "Login successfully" });
  } catch (err) {
    console.error("Fehler beim versuch dich Einzuloggen", err);
    res.status(500).json("Login failed");
  }
};

exports.logOutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session) {
      return res.status(400).json({ message: "No active session" });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return next(err);
      }
      res.clearCookie("connect.sid"); // kein muss - löscht auch das Cookie im Browser
      return res.status(200).json({ message: "Logout successful" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.forgotPw = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json("Please enter your Email");

    const findUserAccount = await User.findOne({ email });
    if (!findUserAccount) return res.status(400).json("Email not found");

    const token = Math.floor(100000 + Math.random() * 900000);

    const otpNum = Math.floor(100000 + Math.random() * 900000); //10K+ damit kein 0er Code Gen wird

    await User.findOneAndUpdate(
      { email },
      {
        otp: {
          otpNum,
          otpExp: Date.now() + 10 * 60 * 1000, // 10 min
        },
        resetToken: {
          token,
          tokenExp: Date.now() + 10 * 60 * 1000, // 10 min
        },
      }
    );

    res.status(200).json({
      message: "found User",
      token,
    });
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.verifyOtp = async (req: Request, res: Response) => {
  try {
    const { otpNum, token: otpToken } = req.body;

    const resetCodeInt = Number(otpNum);

    if (!resetCodeInt) return res.status(400).json("OTP verification failed");

    const user = await User.findOne({ "resetToken.token": otpToken });

    if (!user) return res.status(400).json("Invalid request");

    const tokenExpTime = user.resetToken.tokenExp;

    if (tokenExpTime < Date.now())
      return res.status(400).json("Invalid request");

    const resetCodeIntDB = user.otp.otpNum;

    const otpExpTime = user.otp.otpExp;

    if (otpExpTime < Date.now())
      return res.status(400).json("OTP verification failed");

    if (resetCodeInt != resetCodeIntDB)
      return res.status(400).json("OTP verification failed");

    const token = Math.floor(100000 + Math.random() * 900000);

    await User.findOneAndUpdate(
      { _id: user._id },
      {
        otp: { otpNum: null, otpExp: null },
        resetToken: {
          token: token,
          tokenExp: Date.now() + 10 * 60 * 1000,
        },
      }
    );

    res.status(200).json({ message: "Enter the new Password", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetUserPw = async (req: Request, res: Response) => {
  try {
    const { newUserPw, token: resetPwToken } = req.body;

    if (!newUserPw) return res.status(400).json("password verification failed");

    if (newUserPw.length < 12)
      return res.status(400).json("password is to short");

    const user = await User.findOne({
      "resetToken.token": resetPwToken,
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "invalid or expired reset token" });
    }

    const samePwCheck = await bcrypt.compare(newUserPw, user.password);
    if (samePwCheck)
      return res
        .status(400)
        .json({ message: "You cant use the same password as the last one" });

    const hashedNewPw = await bcrypt.hash(newUserPw, 10);

    await User.findOneAndUpdate(
      { _id: user._id },
      {
        password: hashedNewPw,
        resetToken: {
          token: null,
          tokenExp: null,
        },
      }
    );
    res.status(200).json({ message: "password is changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
