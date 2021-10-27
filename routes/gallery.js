const express = require("express");
const paginationMiddleware = require("../middleware/pagination");
const galleryRepository = require("../repositories/gallery");

const router = express.Router();

router.get("/:announcementId", paginationMiddleware, async function (req, res) {
  const announcementId = req.params.announcementId;

  const data = await galleryRepository.listAll(
    announcementId,
    res.locals.offset,
    res.locals.limit
  );

  res.json({ data: result, total: result.length });
});

router.post("/:announcementId", async function (req, res) {
  const announcementId = req.params.announcementId;
  const { link } = req.body;

  const data = await galleryRepository.insert(announcementId, link);

  res.json({ ...data });
});

module.exports = router;
