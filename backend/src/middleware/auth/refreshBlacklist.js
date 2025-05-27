const clearOldBlacklistRecords = async () => {
  const query = "DELETE FROM blacklist WHERE minimum_issued_at < NOW() - INTERVAL 1 HOUR";
  await pool.query(query);
};

export default clearOldBlacklistRecords;