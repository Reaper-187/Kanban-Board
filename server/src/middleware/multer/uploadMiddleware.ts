import fs from "fs";
import { Request, Response } from "express";

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    const uploadPath = "uploads/docs";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      // falls Ordner nicht da ist wird dieser erstellt
    }
    cb(null, uploadPath);
  },
  filename: function (req: Request, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // später noch die userID mit anhängen damit wir wissen wer was hochgeladen hat.
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
