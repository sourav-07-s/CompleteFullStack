
require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

// Start a local server only during local development
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`MusicFy server running on port ${PORT}`);
  });
}

// Export Express app for Vercel
module.exports = app;
