const express = require("express");
const multer = require("multer");

const {uploadSAPData, uploadElectricityData,uploadTravelData} = require("../controllers/uploadController");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/sap",
  upload.single("file"),
  uploadSAPData
);
router.post(
  "/electricity",
  upload.single("file"),
  uploadElectricityData
);
router.post("/travel", uploadTravelData);
module.exports = router;