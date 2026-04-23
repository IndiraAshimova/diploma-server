const cron = require("node-cron");
const cleanupUnverifiedUsers = require("../services/cleanupService");

const startCleanupJob = () => {
  cron.schedule("0 3 * * *", async () => {
    console.log("Running scheduled cleanup...");
    await cleanupUnverifiedUsers();
  });

  console.log("Cleanup cron scheduled");
};

module.exports = startCleanupJob;