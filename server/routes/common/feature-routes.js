const express = require("express");
const router = express.Router();
const {addFeatureImage , getFeatureImages} = require("../../controllers/common/feature-controller");

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);

module.exports = router;
