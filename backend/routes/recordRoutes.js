const express = require("express");

const {
  getAllRecords,reviewRecord
} = require("../controllers/recordController");

const router = express.Router();

router.get("/", getAllRecords);
router.patch("/:id/review", reviewRecord);

module.exports = router;