const process = require("node:process");
const path = require("node:path");
const sqlite = require("sqlite3");

const dbFilePath = path.join(process.cwd(), "data", "realstate.db");

const db = new sqlite.Database(dbFilePath, (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  }
});

module.exports = db;
