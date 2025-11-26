import { NextFunction, Request, Response } from "express";
const Guest = require("../../models/UserModel/GuestSchema");

export const checkGuestExpiry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.userRole === "guest") {
    const guest = await Guest.findById(req.session.userId);
    if (guest && guest.expiresAt < new Date()) {
      await Guest.findByIdAndDelete(req.session.userId);
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return next(err);
        }
        return res.status(401).json({ message: "Guest session expired" });
      });
    }
  }
  next();
};
