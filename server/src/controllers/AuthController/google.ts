import Issuer from "openid-client";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;

const googleIssuer = await Issuer.discover("https://accounts.google.com");
console.log(
  "Discovered issuer %s %O",
  googleIssuer.issuer,
  googleIssuer.metadata
);

export const client = new googleIssuer.Client({
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uris: REDIRECT_URL,
  response_types: ["code"],
});
