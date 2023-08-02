export async function createTable(db) {
    try {
      await db.none(
        "CREATE TABLE IF NOT EXISTS users (name TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0 )"
      );
      console.log("Table created successfully");
    } catch (err) {
      console.error("Failed to create table", err);
    }
  }