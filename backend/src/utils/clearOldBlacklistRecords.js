import pool from "./db.js";

const clearOldBlacklistRecords = async () => {
  const query = `
    DELETE FROM blacklist 
    WHERE minimum_issued_at < NOW() - INTERVAL '1 hour'
  `;
  await pool.query(query);
  console.log("Old blacklist records cleared");
};

export default clearOldBlacklistRecords;