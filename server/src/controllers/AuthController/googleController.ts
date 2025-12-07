import { Request, Response } from "express";
const SocialUser = require("../../models/UserModel/SocialSchema");
const initGoogle = require("../../services/googleServices");

const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

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
    res.status(500).json({ message: "Server Error1" });
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
      userRole: user.userRole,
      email: userinfo.email,
      name: userinfo.name,
      picture: userinfo.picture,
    };

    req.session.save();
    res.redirect(`${FRONTEND_URL}/tasks`);
  } catch (err) {
    res.status(500).json({ message: "Server Error2" });
  }
};
