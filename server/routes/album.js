const express = require("express");
const { upload } = require("../middleware/multer");
const { addAlbum, getAllAlbums, deleteAlbum } = require("../controllers/albumController");
const router = express.Router();
router.post("/add", upload.single('image'), addAlbum);
router.get("/get-all", getAllAlbums);
router.post("/delete", deleteAlbum);
module.exports = router;