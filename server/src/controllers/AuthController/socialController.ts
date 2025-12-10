import axios from "axios";
import { Request, response, Response } from "express";
const SocialUser = require("../../models/UserModel/SocialSchema");
const initGoogle = require("../../services/googleServices");
const initGithub = require("../../services/githubServices");

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

    req.session.socialAccUser = {
      id: userinfo.sub,
      userRole: user.userRole,
      email: userinfo.email,
      name: userinfo.name,
      provider: userinfo.provider,
    };

    req.session.save();
    res.redirect(`${FRONTEND_URL}/tasks`);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.githubAuth = async (req: Request, res: Response) => {
  try {
    const authorizationGithubUrl = initGithub();
    if (!authorizationGithubUrl)
      return res.status(400).json({ message: "Authentication failed" });

    res.status(200).json({ url: authorizationGithubUrl });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URL = process.env.GITHUB_REDIRECT_URL;

exports.githubCallback = async (req: Request, res: Response) => {
  try {
    const OAUTH_URL = "https://github.com/login/oauth/access_token";
    const getGithubAccountInfo = `https://api.github.com/user`;

    const accessReq = await axios.post(
      OAUTH_URL,
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: req.query.code,
        redirect_uri: GITHUB_REDIRECT_URL,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const githubToken = accessReq.data.access_token;
    const githubUserInfo = await axios.get(getGithubAccountInfo, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/json",
      },
    });

    const githubEmail = await axios.get(`${getGithubAccountInfo}/emails`, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/json",
      },
    });

    const findUserMail = githubEmail.data.map((e: any) => e.email);

    const userData = githubUserInfo.data;

    const user = await SocialUser.findOne({ providerId: userData.id });

    const initPropsGithubUser = { provider: "github", userRole: "user" };

    if (!user) {
      const newUser = new SocialUser({
        provider: "github",
        userRole: "user",
        providerId: userData.id,
        name: userData.name,
        email: findUserMail[0],
        avatar: userData.avatar_url,
      });

      await newUser.save();
    }

    req.session.socialAccUser = {
      id: userData.id,
      provider: user.provider || initPropsGithubUser.provider,
      userRole: user.userRole || initPropsGithubUser.userRole,
      email: findUserMail[0],
      name: userData.name,
    };

    req.session.save();
    res.redirect(`${FRONTEND_URL}/tasks`);
  } catch (err) {
    console.error("Fehler FEHLER", err);

    res.status(500).json({ message: "Server Error" });
  }
};
