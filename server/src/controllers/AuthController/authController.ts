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

export const logOutUser = (req: Request, res: Response, next: NextFunction) => {
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
