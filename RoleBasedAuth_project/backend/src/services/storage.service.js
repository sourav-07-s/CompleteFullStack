const { ImageKit } = require("@imagekit/nodejs");

let client = null;

function getClient() {
  if (!process.env.IMAGEKIT_P_KEY || !process.env.IMAGEKIT_PUBLIC_KEY) {
    throw new Error("ImageKit keys are missing");
  }

  if (!client) {
    client = new ImageKit({
      privateKey: process.env.IMAGEKIT_P_KEY,
    });
  }

  return client;
}

// Returns { token, expire, signature } so the browser can upload
// directly to ImageKit (avoids Vercel's 4.5 MB request limit).
function getUploadAuth() {
  return getClient().helper.getAuthenticationParameters();
}

module.exports = { getUploadAuth };