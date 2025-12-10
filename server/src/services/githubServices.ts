const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URL = process.env.GITHUB_REDIRECT_URL;

// die service-func prüft nur ob G-client bereits existiert
const initGithub = () => {
  // kein API-Req nur eine Adresse zum navigieren des Browsers
  const githubBaseUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}&scope=user,user:emails`;

  return githubBaseUrl;
};

module.exports = initGithub;
