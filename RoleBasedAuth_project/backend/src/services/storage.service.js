const { ImageKit } = require("@imagekit/nodejs");

const ImagekitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_P_KEY,
});

// Returns { token, expire, signature } so the browser can upload
// directly to ImageKit (avoids Vercel's 4.5 MB request limit).
function getUploadAuth() {
  if (!process.env.IMAGEKIT_P_KEY || !process.env.IMAGEKIT_PUBLIC_KEY) {
    throw new Error("ImageKit keys are missing");
  }

  return ImagekitClient.helper.getAuthenticationParameters();
}

module.exports = { getUploadAuth };