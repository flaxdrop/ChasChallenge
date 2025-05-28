// /scripts/runCleanup.js
// * Manual script to run the blacklist cleanup job
// Run it manually in the terminal: npm run run-cleanup


import dotenv from "dotenv";
dotenv.config(); // load .env variables

import clearOldBlacklistRecords from "./jobs/blacklistCleanup.js";

clearOldBlacklistRecords()
  .then(() => {
    console.log("✅ Cleanup complete");
    process.exit(0); // exit successfully
  })
  .catch((err) => {
    console.error("❌ Cleanup failed:", err);
    process.exit(1); // exit with error
  });
