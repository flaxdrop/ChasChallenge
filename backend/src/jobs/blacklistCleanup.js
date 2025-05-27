// jobs/blacklistCleanup.js
import clearOldBlacklistRecords from "../utils/clearOldBlacklistRecords.js";

const scheduleDailyCleanupAt2AM = () => {
  const now = new Date();
  const next2AM = new Date();

  next2AM.setHours(2, 0, 0, 0); // Set to today at 02:00 AM

  // If it's already past 2 AM today, schedule for tomorrow
  if (now > next2AM) {
    next2AM.setDate(next2AM.getDate() + 1);
  }

  const msUntil2AM = next2AM - now;
  console.log(`Cleanup scheduled in ${Math.round(msUntil2AM / 1000 / 60)} minutes.`);

  setTimeout(() => {
    // Run once at 2AM
    runCleanup();

    // Then run every 24 hours
    setInterval(runCleanup, 24 * 60 * 60 * 1000);
  }, msUntil2AM);
};

const runCleanup = async () => {
  try {
    console.log("🧹 Running 2AM blacklist cleanup job...");
    await clearOldBlacklistRecords();
    console.log("✅ Blacklist cleanup complete.");
  } catch (err) {
    console.error("❌ Error during cleanup:", err.message);
  }
};

// Schedule the job
scheduleDailyCleanupAt2AM();