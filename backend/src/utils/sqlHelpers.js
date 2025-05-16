// sqlHelpers.js
export const buildPatchQuery = (table, id, data, options = {}) => {
    const {
      idColumn = "id",
      keyMap = {}, // Optional: map JS keys to DB keys (e.g. camelCase to snake_case)
      jsonKeys = [], // Keys to stringify (e.g. arrays or objects)
    } = options;
  
    const fields = [];
    const values = [id];
    let index = 2;
  
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        const dbKey = keyMap[key] || key;
        const finalValue = jsonKeys.includes(key) ? JSON.stringify(value) : value;
        fields.push(`${dbKey} = $${index}`);
        values.push(finalValue);
        index++;
      }
    }
  
    if (!fields.length) {
      throw new Error("No valid fields provided for update");
    }
  
    const query = `UPDATE ${table} SET ${fields.join(", ")} WHERE ${idColumn} = $1 RETURNING *`;
    return { query, values };
  };
  