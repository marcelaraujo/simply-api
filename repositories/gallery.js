const db = require("../db");

const listAll = (announcementId, offset = 0, limit = 10) => {
  const sql =
    "SELECT id, link FROM gallery WHERE announcement_id = ? LIMIT ?, ?";

  const params = [announcementId, offset, limit];

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

const insert = (announcementId, link) => {
  const sql = "INSERT INTO gallery(announcement_id, link) VALUES (?, ?)";

  const params = [announcementId, `${link}`];

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
