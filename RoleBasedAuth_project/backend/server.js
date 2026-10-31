
require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 3000;

// Start a local HTTP server only when running node server.js.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`MusicFy server running on port ${PORT}`);
  });
}

// Vercel imports this Express application.
module.exports = app;
