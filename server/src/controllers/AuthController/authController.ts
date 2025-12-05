import { NextFunction, Request, Response } from "express";
const bcrypt = require("bcrypt");
const User = require("../../models/UserModel/UserSchema");
const Guest = require("../../models/UserModel/GuestSchema");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const FRONTEND_URL = process.env.FRONTEND_URL;

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
    const { userId: _id, userRole } = req.session;

    if (!_id) return;

    const identType =
      userRole === "user" || userRole === "admin" ? User : Guest;

    const user = await identType.findOne({ _id });

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
    const { firstName, lastName, email, password } = req.body;

    if (!user) return;

    const usedEmail = await User.findOne({ email });

    if (usedEmail) {
      return res.status(500).json({ message: "Email already exist" });
    }

    const hashedPw = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 Stunden gültig

    const newUser = new User({
      ...user,
      firstName,
      lastName,
      email,
      password: hashedPw,
      verification: {
        veryfiStatus: false,
        veryficationToken: verificationToken,
        verifyTokenExp: tokenExpires,
      },
    });

    await newUser.save();

    const verifyLink = `${process.env.FRONTEND_URL}/emailVerify?token=${verificationToken}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "E-Mail-Verification",
      text: `Please click on the current Link, to verify your E-Mail: ${verifyLink}`,
      html: `<p>Please click on the current Link, to verify your E-Mail:</p>
             <a href="${verifyLink}">${verifyLink}</a>`,
    });

    res.status(200).json({
      message:
        "Registration successfully - Please check your inbox for the verification.",
    });
  } catch (err) {
    console.error("Error ", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.emailVerify = async (req: Request, res: Response) => {
  const { token } = req.query;

  try {
    // Benutzer mit dem Token finden
    const user = await User.findOne({ "verfication.verificationToken": token });

    if (!user) {
      return res.status(400).send("Token is wrong or expired.");
    }

    if (user.verfication.verifyTokenExp < Date.now()) {
      return res.status(400).send("Token is wrong or expired.");
    }

    // Benutzer verifizieren
    user.verfication.isVerified = true;
    user.verfication.verificationToken = null; // Token entfernen
    user.verfication.verifyTokenExp = null; // Ablaufdatum entfernen
    await user.save();

    res.status(200).json({
      success: true,
      message: "E-Mail verified successfully! Now you can Sign-in.",
    });
  } catch (err) {
    res.status(500).send("Intern Server-Error.");
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

    if (req.session.userRole === "guest") {
      await Guest.findByIdAndDelete(req.session.userId);
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

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "Password-Reset-OTP",
      text: `Your OTP is: ${otpNum}`, // Fallback für reine Text-Clients
      html: `
        <p>Your 6-digit password reset code is:</p>
        <div style="
          font-size: 2em; 
          font-weight: bold; 
          border: 2px solid #000; 
          padding: 10px; 
          display: inline-block;
          margin-top: 10px;
          text-align: center;
          border-radius: 5px;
          color: #333;
          background-color: #f0f0f0;
        ">
          ${otpNum}
        </div>
        <p>This code is valid for 10 minutes.</p>
      `,
    });

    res.status(200).json({
      message: "Reset successfully",
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
