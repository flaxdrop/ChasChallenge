// Funktion för att läsa in mockdata från JSON-fil

import fs from "fs/promises";

export const loadMockData = async () => {
  const mockDataPath = new URL("../data/mockData.json", import.meta.url);
  try {
    const data = await fs.readFile(mockDataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Kunde inte läsa mockdata: ${error.message}`);
  }
};
