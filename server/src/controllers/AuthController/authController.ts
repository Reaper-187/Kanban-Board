import { NextFunction, Request, Response } from "express";
const bcrypt = require("bcrypt");
const User = require("../../models/UserModel/UserSchema");

type SessionInfo = {
  userId: string | null;
  userRole: string | null;
  isAuthenticated: boolean;
};

exports.checkUserAuth = async (req: Request, res: Response) => {
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

exports.getUserData = async (req: Request, res: Response) => {
  try {
    const { userId: _id } = req.session;

    if (!_id) return;

    const user = await User.findOne({ _id });

    if (!user) return;

    const userData = {
      userId: _id,
      userRole: user.userRole,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    res.status(200).json(userData);
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
      return res.status(500).json({ message: "Email already exist" });
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
      return res.status(400).json({ message: "Please fill up all fields" });

    const findUserAccount = await User.findOne({ email });
    if (!findUserAccount)
      return res.status(400).json({ message: "wrong email or password" });

    if (await findUserAccount.blockedAccount.blocked)
      return res.status(400).json({
        message: "Your Account is blocked apply to the Admin",
      });

    const comparedPw = await bcrypt.compare(password, findUserAccount.password);

    if (!comparedPw) {
      const currentCount = await findUserAccount.blockedAccount.wrongPwCounter;
      const changeBlockStatus = currentCount >= 3 && true;
      await User.findOneAndUpdate(
        { email },
        {
          blockedAccount: {
            wrongPwCounter: currentCount + 1,
            blocked: changeBlockStatus,
          },
        }
      );
      const failMessage =
        currentCount >= 3
          ? "Your Account got blocked because you failed to many times in a row"
          : `wrong email or password ${currentCount + 1} time failed`;
      return res.status(400).json({ message: failMessage });
    } else {
      await User.findOneAndUpdate(
        { email },
        {
          blockedAccount: {
            wrongPwCounter: 0,
            blocked: false,
          },
        }
      );
    }
    // bei Anfragen wird so indentifiziert ob der user auth ist

    req.session.userId = findUserAccount._id;
    req.session.userRole = findUserAccount.userRole;

    res.status(200).json({ message: "Login successfully" });
  } catch (err) {
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

    if (!email)
      return res.status(400).json({ message: "Please enter your Email" });

    const findUserAccount = await User.findOne({ email });
    if (!findUserAccount)
      return res.status(400).json({ message: "Email not found" });

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

    if (!resetCodeInt)
      return res.status(400).json({ message: "OTP verification failed" });

    const user = await User.findOne({ "resetToken.token": otpToken });

    if (!user) return res.status(400).json({ message: "Invalid request" });

    const tokenExpTime = user.resetToken.tokenExp;

    if (tokenExpTime < Date.now())
      return res.status(400).json({ message: "Invalid request" });

    const resetCodeIntDB = user.otp.otpNum;

    const otpExpTime = user.otp.otpExp;

    if (otpExpTime < Date.now())
      return res.status(400).json({ message: "OTP verification failed" });

    if (resetCodeInt != resetCodeIntDB)
      return res.status(400).json({ message: "OTP verification failed" });

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

    if (!newUserPw)
      return res.status(400).json({ message: "password verification failed" });

    if (newUserPw.length < 12)
      return res.status(400).json({ message: "password is to short" });

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

exports.changePw = async (req: Request, res: Response) => {
  try {
    const { userId: _id } = req.session;

    const { currentPw, newPw } = req.body;

    if (!_id) return res.status(400).json({ message: "verification failed" });

    const user = await User.findOne({ _id });

    if (!user) return res.status(400).json({ message: "verification failed" });

    const oldPwCheck = await bcrypt.compare(currentPw, user.password);
    if (!oldPwCheck)
      return res.status(400).json({ message: "verification failed" });

    const hashedNewPw = await bcrypt.hash(newPw, 10);

    await User.findOneAndUpdate(
      { _id },
      {
        password: hashedNewPw,
      }
    );
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
