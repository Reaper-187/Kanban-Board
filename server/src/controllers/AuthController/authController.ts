import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const User = require("../../models/UserModel/UserSchema");

exports.collectUserAtuh = async (req: Request, res: Response) => {
  console.log("GET OK");
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
    req.session.userRole = findUserAccount.role;

    res.status(200).json("Login successfully");
  } catch (err) {
    console.error("Fehler beim versuch dich Einzuloggen", err);
    res.status(500).json("Login failed");
  }
};

exports.logOutUser = async (req: Request, res: Response) => {
  console.log("GET OK");
};
