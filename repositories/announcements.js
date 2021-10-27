const db = require("../db");

const listAll = (offset = 0, limit = 10) => {
  const sql =
    "SELECT id, title, location, kind, price FROM announcements LIMIT ?, ?";

  const params = [offset, limit];

  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const insert = (title, location, kind, price) => {
  const sql =
    "INSERT INTO announcements(title, location, kind, price) VALUES (?, ?, ?, ?)";

  const params = [`${title}`, `${location}`, `${kind}`, +price];

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
};

module.exports = {
  listAll,
  insert,
};
