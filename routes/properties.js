const express = require("express");
const paginationMiddleware = require("../middleware/pagination");
const announcementsReposistory = require("../repositories/announcements");
const galleryRepository = require("../repositories/gallery");

const router = express.Router();

router.get("/", paginationMiddleware, async function (req, res) {
  const announcements = await announcementsReposistory.listAll(
    res.locals.offset,
    res.locals.limit
  );

  const rows = announcements.map(async (announcement) => {
    const images = await galleryRepository.listAll(announcement.id);

    return {
      ...announcement,
      images,
    };
  });

  const result = await Promise.all(rows);

  res.json({ data: result, total: result.length });
});

router.post("/", async function (req, res) {
  const { title, location, kind, price } = req.body;

  const data = await announcementsReposistory.insert(
    title,
    location,
    kind,
    price
  );

  res.json({ ...data });
});

module.exports = router;
