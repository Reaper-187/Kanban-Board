import { Request, Response } from "express";
import { SessionData } from "express-session";
const SocialUser = require("../../models/UserModel/SocialSchema");

const initGoogle = require("../../services/googleServices");

const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;

exports.googleAuth = async (req: Request, res: Response) => {
  try {
    const client = await initGoogle(); //holt den client aus der service-func und baut url
    if (!client)
      return res.status(400).json({ message: "Authentication failed" });

    //g-login-url wird erzeugt => diese geht dann ans Frotnend
    const authorizationUrl = client.authorizationUrl({
      scope: "openid email profile",
    });

    res.status(200).json({ url: authorizationUrl });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.googleCallback = async (req: Request, res: Response) => {
  try {
    const client = await initGoogle();
    if (!client)
      return res.status(400).json({ message: "Authentication failed" });

    //callbackParams holt den Code aus der url
    const params = client.callbackParams(req); // holt code + state aus der URL
    if (!params.code)
      return res.status(400).json({ message: "No code from Google" });
    // callback tauscht den Code gegen Tokens
    const tokenSet = await client.callback(REDIRECT_URL, params);
    if (!tokenSet || !tokenSet.access_token)
      return res.status(400).json({ message: "Token exchange failed" });

    const userinfo = await client.userinfo(tokenSet.access_token);
    if (!userinfo || !userinfo.sub)
      return res.status(400).json({ message: "Failed to fetch user info" });

    const user = await SocialUser.findOne({ providerId: userinfo.sub });

    if (!user) {
      const newUser = new SocialUser({
        provider: "google",
        userRole: "user",
        providerId: userinfo.sub,
        name: userinfo.name,
        email: userinfo.email,
        avatar: userinfo.picture,
      });

      await newUser.save();
    }

    req.session.googleUser = {
      id: userinfo.sub,
      email: userinfo.email,
      name: userinfo.name,
      picture: userinfo.picture,
    };
    req.session.save();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

type SocialSessionInfo = {
  userId: string | null;
  isAuthenticated: boolean;
};

exports.checkSocialSession = async (req: Request, res: Response) => {
  try {
    const user = req.session.googleUser;
    if (!user) return res.status(400).json({ message: "session expired" });
    const isAuthenticated = !!user;

    const sessionInfo: SocialSessionInfo = {
      userId: user.id ?? null,
      isAuthenticated,
    };

    res.status(200).json(sessionInfo);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
