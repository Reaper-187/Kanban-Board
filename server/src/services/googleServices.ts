const { Issuer } = require("openid-client");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;

let googleClient: any | null;

// die service-func prüft nur ob G-client bereits existiert
const initGoogle = async () => {
  if (googleClient) return googleClient;

  const googleIssuer = await Issuer.discover("https://accounts.google.com");

  googleClient = new googleIssuer.Client({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uris: [REDIRECT_URL],
    response_types: ["code"],
  });

  return googleClient;
};

module.exports = initGoogle;
