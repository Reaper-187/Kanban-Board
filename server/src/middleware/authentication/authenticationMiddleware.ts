import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../types/types";

export const authVerification = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.session) {
        return res.status(401).json("Unauthorized: No session");
      }

      const { userId, userRole } = req.session;

      if (!userId || !userRole) {
        return res.status(401).json("Unauthorized");
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json("Forbidden");
      }

      next();
    } catch (err) {
      console.error("Auth middleware error:", err);
      res.status(500).json("Server Error");
    }
  };
};
