export const sourceTypes = {
  FACEBOOK: "FACEBOOK",
  GOOGLE: "GOOGLE",
  SHOPIFY: "SHOPIFY"
};

export const sourceConnectURLs = {
  [sourceTypes.GOOGLE]:
    "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https://www.googleapis.com/auth/adwords&redirect_uri=https://uat-dcluttr.vercel.app/welcome/callback&client_id=37783491474-6gnqrcp7i8otifmtpoir9bg93jguumhj.apps.googleusercontent.com&response_type=code",
  [sourceTypes.FACEBOOK]:
    "https://www.facebook.com/v19.0/dialog/oauth?client_id=679840067664677&redirect_uri=https://uat-dcluttr.vercel.app/welcome/callback&state=tt4vh&scope=ads_read,read_insights,pages_read_engagement"
};
