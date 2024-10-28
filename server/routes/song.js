const express = require("express");
const { addSong, listSong, removeSong } = require("../controllers/songController");
const { upload } = require("../middleware/multer");
const router = express.Router();

router.post("/add", upload.fields([{ name: "image", maxCount: 1 }, { name: "audio", maxCount: 1 }]), addSong);
router.get("/get-all", listSong);
router.post("/delete", removeSong);

module.exports = router;